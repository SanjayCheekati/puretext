import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Share2, Lock, Unlock, Key, Trash2, Sun, Moon, Copy, ArrowUpCircle, Download, Home } from 'lucide-react';
import { fetchNote, saveNote, deleteNote } from '../api/notes';
import { encryptNote, decryptNote, generateDeleteToken } from '../utils/crypto';
import { hashDeleteToken, getDeleteToken, saveDeleteToken, removeDeleteToken } from '../utils/deleteToken';
import PasswordDialog from './PasswordDialog';
import ConfirmDialog from './ConfirmDialog';
import TextInputDialog from './TextInputDialog';

const NoteEditor = () => {
  const { noteName } = useParams();
  const navigate = useNavigate();

  // State
  const [noteData, setNoteData] = useState(null);
  const [isLocked, setIsLocked] = useState(true);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  // Dialogs
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwordDialogMode, setPasswordDialogMode] = useState('unlock');
  const [passwordError, setPasswordError] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showTabNameDialog, setShowTabNameDialog] = useState(false);
  const [tabNameDialogMode, setTabNameDialogMode] = useState('add');
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [draggedTabIndex, setDraggedTabIndex] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('editorDarkMode');
    return saved !== null ? JSON.parse(saved) : true; // Default to dark mode
  });
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  const isPasswordProcessing = useRef(false);
  const autoSaveTimeoutRef = useRef(null);

  // Load note on mount
  useEffect(() => {
    if (noteName) {
      loadNote();
    }
  }, [noteName]);

  // Auto-save when content changes (with or without password)
  useEffect(() => {
    if (noteData && isDirty && !isLocked) {
      if (autoSaveTimeoutRef.current) {
        window.clearTimeout(autoSaveTimeoutRef.current);
      }

      autoSaveTimeoutRef.current = window.setTimeout(() => {
        if (password) {
          saveNoteWithPassword(password);
        } else {
          handleSaveWithoutPassword();
        }
      }, 1500);
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        window.clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [noteData, isDirty, password, isLocked]);

  const loadNote = async () => {
    try {
      setIsLoading(true);
      const response = await fetchNote(noteName);

      if (response.exists && response.data) {
        // Note exists - check if it has user password
        if (response.hasUserPassword) {
          // Has user password - need to prompt
          setShowPasswordDialog(true);
          setPasswordDialogMode('unlock');
        } else {
          // No user password - auto-decrypt with default password
          try {
            const decrypted = await decryptNote(response.data, 'no-password-set');
            setNoteData(decrypted);
            setPassword('');
            setIsLocked(false);
          } catch (err) {
            // If auto-decrypt fails, ask for password
            setShowPasswordDialog(true);
            setPasswordDialogMode('unlock');
          }
        }
      } else {
        // New note - create default structure
        const newNote = {
          tabs: [{
            id: crypto.randomUUID(),
            name: 'Tab 1',
            title: '',
            content: '',
            createdAt: Date.now(),
            updatedAt: Date.now()
          }],
          activeTab: 0,
          lastSaved: Date.now()
        };
        setNoteData(newNote);
        setIsLocked(false);
      }
    } catch (err) {
      setError('Failed to load note');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (inputPassword) => {
    if (isPasswordProcessing.current) return;
    isPasswordProcessing.current = true;

    try {
      setPasswordError('');

      if (passwordDialogMode === 'unlock') {
        // Decrypt existing note
        const response = await fetchNote(noteName);
        if (response.exists && response.data) {
          // Try to decrypt with user password first
          try {
            const decrypted = await decryptNote(response.data, inputPassword);
            setNoteData(decrypted);
            setPassword(inputPassword);
            setIsLocked(false);
            setShowPasswordDialog(false);
          } catch (decryptErr) {
            // If failed, try with default password (no-password notes)
            try {
              const decrypted = await decryptNote(response.data, 'no-password-set');
              setNoteData(decrypted);
              setPassword('');
              setIsLocked(false);
              setShowPasswordDialog(false);
            } catch {
              throw new Error('Incorrect password');
            }
          }
        }
      } else if (passwordDialogMode === 'lock') {
        // Lock the note with new password
        if (noteData) {
          setPassword(inputPassword);
          setIsLocked(false);
          setShowPasswordDialog(false);
          // Save immediately with new password
          await saveNoteWithPassword(inputPassword);
        }
      } else if (passwordDialogMode === 'change') {
        // Change password
        if (noteData) {
          setPassword(inputPassword);
          setShowPasswordDialog(false);
          // Save with new password
          await saveNoteWithPassword(inputPassword);
        }
      }
    } catch (err) {
      setPasswordError('Incorrect password or decryption failed');
    } finally {
      isPasswordProcessing.current = false;
    }
  };

  const saveNoteWithPassword = async (pwd) => {
    if (!noteData || !noteName) return;

    try {
      setIsSaving(true);
      const encrypted = await encryptNote(noteData, pwd);

      // Check if we need to create delete token
      let deleteTokenHash;
      let existingToken = getDeleteToken(noteName);

      if (!existingToken) {
        const newToken = generateDeleteToken();
        const hash = await hashDeleteToken(newToken);
        saveDeleteToken(noteName, newToken);
        deleteTokenHash = hash;
        existingToken = newToken;
      }

      await saveNote(noteName, encrypted, deleteTokenHash, existingToken, pwd);
      setIsDirty(false);
    } catch (err) {
      setError('Failed to save note');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async () => {
    if (!password || !noteData || !noteName || !isDirty) return;
    await saveNoteWithPassword(password);
  };

  const handleSaveWithoutPassword = async () => {
    if (!noteData || !noteName || password) return;

    try {
      setIsSaving(true);
      // Save without encryption - use a default password for storage
      const defaultPassword = 'no-password-set';
      const encrypted = await encryptNote(noteData, defaultPassword);

      // Check if we need to create delete token
      let deleteTokenHash;
      let existingToken = getDeleteToken(noteName);

      if (!existingToken) {
        const newToken = generateDeleteToken();
        const hash = await hashDeleteToken(newToken);
        saveDeleteToken(noteName, newToken);
        deleteTokenHash = hash;
        existingToken = newToken;
      }

      await saveNote(noteName, encrypted, deleteTokenHash, existingToken, defaultPassword);
      setIsDirty(false);
    } catch (err) {
      setError('Failed to auto-save note');
    } finally {
      setIsSaving(false);
    }
  };

  const handleContentChange = (content) => {
    if (!noteData) return;

    const updatedTabs = [...noteData.tabs];
    
    updatedTabs[noteData.activeTab] = {
      ...updatedTabs[noteData.activeTab],
      content,
      updatedAt: Date.now()
    };

    setNoteData({
      ...noteData,
      tabs: updatedTabs
    });
    setIsDirty(true);
  };

  const handleTitleChange = (title) => {
    if (!noteData) return;

    const updatedTabs = [...noteData.tabs];
    const tabName = title.trim() || `Tab ${noteData.activeTab + 1}`;
    
    updatedTabs[noteData.activeTab] = {
      ...updatedTabs[noteData.activeTab],
      title: title,
      name: tabName,
      updatedAt: Date.now()
    };

    setNoteData({
      ...noteData,
      tabs: updatedTabs
    });
    setIsDirty(true);
  };

  const handleAddTab = () => {
    if (!noteData) return;
    
    const newTabNumber = noteData.tabs.length + 1;
    const newTab = {
      id: crypto.randomUUID(),
      name: `Tab ${newTabNumber}`,
      title: '',
      content: '',
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    setNoteData({
      ...noteData,
      tabs: [...noteData.tabs, newTab],
      activeTab: noteData.tabs.length
    });
    setIsDirty(true);
  };

  const handleTabNameSubmit = (name) => {
    if (!noteData) return;

    if (tabNameDialogMode === 'rename') {
      const updatedTabs = [...noteData.tabs];
      updatedTabs[selectedTabIndex] = {
        ...updatedTabs[selectedTabIndex],
        name,
        updatedAt: Date.now()
      };

      setNoteData({
        ...noteData,
        tabs: updatedTabs
      });
      setIsDirty(true);
    }

    setShowTabNameDialog(false);
  };

  const handleDeleteTab = (index) => {
    if (!noteData || noteData.tabs.length === 1) return;

    const updatedTabs = noteData.tabs.filter((_, i) => i !== index);
    const newActiveTab = index === noteData.activeTab
      ? Math.max(0, index - 1)
      : noteData.activeTab > index
      ? noteData.activeTab - 1
      : noteData.activeTab;

    setNoteData({
      ...noteData,
      tabs: updatedTabs,
      activeTab: newActiveTab
    });
    setIsDirty(true);
  };

  const handleDragStart = (index) => {
    setDraggedTabIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedTabIndex === null || draggedTabIndex === dropIndex) return;

    const updatedTabs = [...noteData.tabs];
    const [draggedTab] = updatedTabs.splice(draggedTabIndex, 1);
    updatedTabs.splice(dropIndex, 0, draggedTab);

    // Update active tab index
    let newActiveTab = noteData.activeTab;
    if (noteData.activeTab === draggedTabIndex) {
      newActiveTab = dropIndex;
    } else if (draggedTabIndex < noteData.activeTab && dropIndex >= noteData.activeTab) {
      newActiveTab = noteData.activeTab - 1;
    } else if (draggedTabIndex > noteData.activeTab && dropIndex <= noteData.activeTab) {
      newActiveTab = noteData.activeTab + 1;
    }

    setNoteData({
      ...noteData,
      tabs: updatedTabs,
      activeTab: newActiveTab
    });
    setDraggedTabIndex(null);
    setIsDirty(true);
  };

  const handleDragEnd = () => {
    setDraggedTabIndex(null);
  };

  const handleLockNote = () => {
    setPasswordDialogMode('lock');
    setShowPasswordDialog(true);
  };

  const handleChangePassword = () => {
    setPasswordDialogMode('change');
    setShowPasswordDialog(true);
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('editorDarkMode', JSON.stringify(newMode));
  };

  const handleDeleteNote = async () => {
    if (!noteName) return;

    const token = getDeleteToken(noteName);
    if (!token) {
      setError('No delete token found. Cannot delete this note.');
      return;
    }

    try {
      await deleteNote(noteName, token);
      removeDeleteToken(noteName);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to delete note');
    } finally {
      setShowDeleteDialog(false);
    }
  };

  const handleCopyURL = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard!');
  };

  const handleCopyContent = () => {
    const currentTab = noteData.tabs[noteData.activeTab];
    if (currentTab && currentTab.content) {
      navigator.clipboard.writeText(currentTab.content);
      setShowCopiedMessage(true);
      setTimeout(() => {
        setShowCopiedMessage(false);
      }, 5000);
    }
  };

  const handleDownload = () => {
    const currentTab = noteData.tabs[noteData.activeTab];
    if (currentTab) {
      const content = (currentTab.title ? currentTab.title + '\n\n' : '') + currentTab.content;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${currentTab.name || 'Untitled'}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (isLocked && !noteData) {
    return (
      <>
        <div className="h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Puretext</h1>
            <p className="text-gray-600">Loading note...</p>
          </div>
        </div>
        <PasswordDialog
          isOpen={showPasswordDialog}
          onSubmit={handlePasswordSubmit}
          onCancel={() => navigate('/')}
          title="Enter Password"
          message="This note is password-protected. Enter the password to unlock it."
          error={passwordError}
        />
      </>
    );
  }

  if (!noteData) {
    return <div>Error loading note</div>;
  }

  const currentTab = noteData.tabs[noteData.activeTab] || noteData.tabs[0];

  return (
    <div className={`h-screen flex flex-col ${
      isDarkMode 
        ? 'bg-gray-900' 
        : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className={`border-b px-4 sm:px-6 py-3 sm:py-4 ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200 shadow-sm'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <h1 className={`text-xl sm:text-2xl font-bold ${
              isDarkMode 
                ? 'text-blue-400' 
                : 'text-blue-600'
            }`}>
              Puretext
            </h1>
            <span className={`text-sm sm:text-base truncate max-w-[150px] sm:max-w-none ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              / {noteName}
            </span>
            <span className={`hidden md:inline text-xs ${
              isDarkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>
              | Built by Sanjay [MGIT]
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <a
              href="https://puretext.me"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
              title="Open Puretext Homepage"
            >
              <Home size={18} />
            </a>

            {isDirty && (
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors ${
                  isSaving
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                <Save size={16} />
                <span>{isSaving ? 'Saving...' : 'Save'}</span>
              </button>
            )}

            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={handleCopyURL}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
              title="Share URL"
            >
              <Share2 size={18} />
            </button>

            {!isLocked && !password && (
              <button
                onClick={handleLockNote}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                    : 'bg-orange-600 hover:bg-orange-700 text-white'
                }`}
                title="Lock Note"
              >
                <Lock size={18} />
              </button>
            )}

            {password && (
              <button
                onClick={handleChangePassword}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
                title="Change Password"
              >
                <Key size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={`border-b px-3 sm:px-6 py-3 ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex flex-wrap items-center gap-2 justify-center min-h-[40px]">
        {noteData.tabs.map((tab, index) => (
          <div
            key={tab.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-move transition-colors ${
              isDarkMode
                ? index === noteData.activeTab
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : index === noteData.activeTab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } ${draggedTabIndex === index ? 'opacity-50' : ''}`}
          >
            <button
              onClick={() => setNoteData({ ...noteData, activeTab: index })}
              className="font-medium focus:outline-none"
            >
              {tab.name}
            </button>
            {noteData.tabs.length > 1 && (
              <button
                onClick={() => handleDeleteTab(index)}
                className="text-xs focus:outline-none hover:text-red-400 transition-colors"
                title="Delete"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          onClick={handleAddTab}
          className={`px-4 py-2 rounded-lg text-sm font-medium focus:outline-none whitespace-nowrap transition-colors ${
            isDarkMode
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          + Add Tab
        </button>
        >
          + Add Tab
        </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 p-4 sm:p-6 flex justify-center overflow-hidden">
        <div className="w-full max-w-5xl h-full flex gap-3 sm:gap-6">
          {/* Line numbers */}
          <div className={`hidden sm:flex flex-shrink-0 text-right font-mono text-base leading-relaxed select-none flex-col ${
            isDarkMode ? 'text-gray-600' : 'text-gray-400'
          }`}>
            <div className="h-[52px]"></div>
            <div className="pt-4 pr-3">
              {currentTab.content.split('\n').map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          </div>

          {/* Editor container */}
          <div className={`flex-1 flex flex-col rounded-lg overflow-hidden shadow-lg ${
            isDarkMode 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          }`}>
            {/* Title input with icons */}
            <div className={`flex items-center gap-3 px-4 sm:px-6 py-3 border-b ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <input
                type="text"
                value={currentTab.title || ''}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Title or program name..."
                className={`flex-1 outline-none border-0 font-mono text-base sm:text-lg bg-transparent ${
                  isDarkMode 
                    ? 'text-gray-100 placeholder-gray-600' 
                    : 'text-gray-900 placeholder-gray-400'
                }`}
                disabled={isLocked}
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  title="Download as .txt"
                >
                  <Download size={18} />
                </button>
                <button
                  onClick={handleCopyContent}
                  className={`p-2 rounded-lg transition-colors ${
                    showCopiedMessage
                      ? 'text-green-500 hover:bg-green-500/10'
                      : isDarkMode 
                        ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  title="Copy tab content"
                >
                  <Copy size={18} />
                </button>
                {showCopiedMessage && (
                  <span className="text-sm font-medium text-green-500">
                    Copied
                  </span>
                )}
              </div>
            </div>

            {/* Content textarea */}
            <textarea
              value={currentTab.content}
              onChange={(e) => handleContentChange(e.target.value)}
              className={`flex-1 p-4 sm:p-6 outline-none border-0 resize-none font-mono text-base sm:text-lg leading-relaxed ${
                isDarkMode 
                  ? 'bg-gray-800 text-gray-100 placeholder-gray-600' 
                  : 'bg-white text-gray-900 placeholder-gray-400'
              }`}
              placeholder="Start typing..."
              disabled={isLocked}
            />
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <PasswordDialog
        isOpen={showPasswordDialog}
        onSubmit={handlePasswordSubmit}
        onCancel={() => setShowPasswordDialog(false)}
        title={
          passwordDialogMode === 'unlock'
            ? 'Enter Password'
            : passwordDialogMode === 'lock'
            ? 'Lock Note'
            : 'Change Password'
        }
        message={
          passwordDialogMode === 'unlock'
            ? 'Enter the password to unlock this note.'
            : passwordDialogMode === 'lock'
            ? 'Enter a password to lock this note.'
            : 'Enter a new password for this note.'
        }
        error={passwordError}
      />

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onConfirm={handleDeleteNote}
        onCancel={() => setShowDeleteDialog(false)}
        title="Delete Note"
        message="Are you sure you want to permanently delete this note? This action cannot be undone."
        confirmText="Delete"
      />

      <TextInputDialog
        isOpen={showTabNameDialog}
        onSubmit={handleTabNameSubmit}
        onCancel={() => setShowTabNameDialog(false)}
        title={tabNameDialogMode === 'add' ? 'Add New Tab' : 'Rename Tab'}
        message={tabNameDialogMode === 'add' ? 'Enter a name for the new tab:' : 'Enter a new name for the tab:'}
        placeholder="Tab name"
        defaultValue={tabNameDialogMode === 'rename' ? noteData.tabs[selectedTabIndex]?.name : ''}
      />

      {error && (
        <div className={`fixed bottom-20 right-4 px-5 py-3 rounded-lg shadow-lg ${
          isDarkMode 
            ? 'bg-red-900 border border-red-700 text-red-200' 
            : 'bg-red-50 border border-red-300 text-red-700'
        }`}>
          {error}
        </div>
      )}

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-xl transition-colors ${
          isDarkMode
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
        title="Scroll to Top"
      >
        <ArrowUpCircle size={24} />
      </button>
    </div>
  );
};

export default NoteEditor;
