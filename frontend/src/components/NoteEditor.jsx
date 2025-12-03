import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Share2, Lock, Unlock, Key, Trash2, Sun, Moon, Copy, ArrowUpCircle, Download } from 'lucide-react';
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
        // Note exists and is encrypted - need password
        setShowPasswordDialog(true);
        setPasswordDialogMode('unlock');
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
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-blue-900 border-b border-blue-800 px-2 sm:px-4 py-2 sm:py-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4">
            <h1 className="text-lg sm:text-xl font-bold text-white">Puretext</h1>
            <span className="text-gray-400 text-sm sm:text-base truncate max-w-[150px] sm:max-w-none">/ {noteName}</span>
            <span className="hidden md:inline text-xs text-gray-500">| Built by Sanjay [MGIT]</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {isDirty && (
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400 transition-colors flex items-center gap-2"
              >
                <Save size={18} />
                <span className="text-sm font-medium">{isSaving ? 'Saving...' : 'Save'}</span>
              </button>
            )}

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={handleCopyURL}
              className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              title="Share URL"
            >
              <Share2 size={20} />
            </button>

            {!isLocked && !password && (
              <button
                onClick={handleLockNote}
                className="p-2 rounded-full bg-yellow-600 text-white hover:bg-yellow-700 transition-colors"
                title="Lock Note"
              >
                <Lock size={20} />
              </button>
            )}

            {password && (
              <button
                onClick={handleChangePassword}
                className="p-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors"
                title="Change Password"
              >
                <Key size={20} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={`border-b px-2 sm:px-4 py-2 relative z-10 ${isDarkMode ? 'bg-black border-gray-800' : 'bg-gray-200 border-gray-300'}`}>
        <div className="flex flex-wrap items-center gap-2 justify-center min-h-[40px]">
        {noteData.tabs.map((tab, index) => (
          <div
            key={tab.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={`flex items-center gap-2 px-3 py-1 rounded cursor-move ${
              isDarkMode
                ? index === noteData.activeTab
                  ? 'bg-zinc-900 text-white border border-zinc-700'
                  : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                : index === noteData.activeTab
                ? 'bg-white text-gray-900 border border-gray-400'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
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
                className={`text-xs focus:outline-none ${
                  isDarkMode ? 'hover:text-red-400' : 'hover:text-red-600'
                }`}
                title="Delete"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          onClick={handleAddTab}
          className={`px-3 py-1 rounded text-sm font-medium focus:outline-none whitespace-nowrap ${
            isDarkMode
              ? 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
              : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
          }`}
        >
          + Add Tab
        </button>
        </div>
      </div>

      {/* Editor */}
      <div className={`flex-1 p-2 sm:p-4 flex justify-center ${isDarkMode ? 'bg-black' : 'bg-gray-100'}`}>
        <div className="w-full max-w-4xl h-full flex gap-1 sm:gap-4">
          {/* Line numbers - starts from content area */}
          <div className={`hidden sm:flex flex-shrink-0 text-right ${isDarkMode ? 'text-zinc-700' : 'text-gray-400'} text-lg font-mono leading-relaxed select-none flex-col`}>
            <div className="h-[46px]"></div>
            <div className="pt-3 pr-2">
              {currentTab.content.split('\n').map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          </div>

          {/* Editor container */}
          <div className={`flex-1 flex flex-col rounded-lg overflow-hidden shadow-sm ${
            isDarkMode ? 'bg-zinc-950' : 'bg-white'
          }`}>
            {/* Title input with copy icon */}
            <div className="flex items-center gap-2 px-3 sm:px-6 sm:pl-2 py-2">
              <input
                type="text"
                value={currentTab.title || ''}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Title or program name..."
                className={`flex-1 outline-none border-0 font-mono text-base sm:text-lg ${
                  isDarkMode 
                    ? 'bg-zinc-950 text-gray-100 placeholder-zinc-700' 
                    : 'bg-white text-gray-900 placeholder-gray-400'
                }`}
                disabled={isLocked}
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'text-white hover:bg-zinc-800' 
                      : 'text-gray-900 hover:bg-gray-200'
                  }`}
                  title="Download as .txt"
                >
                  <Download size={18} />
                </button>
                <button
                  onClick={handleCopyContent}
                  className={`p-1.5 rounded-lg transition-colors ${
                    showCopiedMessage
                      ? 'text-green-500 hover:bg-green-500/10'
                      : isDarkMode 
                        ? 'text-white hover:bg-zinc-800' 
                        : 'text-gray-900 hover:bg-gray-200'
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

            {/* Horizontal divider */}
            <hr className={`border-0 ${isDarkMode ? 'border-t border-zinc-800' : 'border-t border-gray-300'}`} />

            {/* Content textarea */}
            <textarea
              value={currentTab.content}
              onChange={(e) => handleContentChange(e.target.value)}
              className={`flex-1 p-3 sm:p-6 sm:pl-2 outline-none border-0 resize-none font-mono text-sm sm:text-lg leading-relaxed ${
                isDarkMode 
                  ? 'bg-zinc-950 text-gray-100 placeholder-zinc-700' 
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
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          {error}
        </div>
      )}

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 shadow-lg focus:outline-none transition-colors"
        title="Scroll to Top"
      >
        <ArrowUpCircle size={24} />
      </button>
    </div>
  );
};

export default NoteEditor;
