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
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
    }`}>
      {/* Header */}
      <div className={`backdrop-blur-md border-b px-4 sm:px-6 py-3 sm:py-4 ${
        isDarkMode 
          ? 'bg-slate-800/80 border-slate-700/50 shadow-lg shadow-slate-900/20' 
          : 'bg-white/80 border-slate-200/50 shadow-sm'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <h1 className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${
              isDarkMode 
                ? 'from-blue-400 to-violet-400' 
                : 'from-blue-600 to-violet-600'
            } bg-clip-text text-transparent`}>
              Puretext
            </h1>
            <span className={`text-sm sm:text-base truncate max-w-[150px] sm:max-w-none ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              / {noteName}
            </span>
            <span className={`hidden md:inline text-xs ${
              isDarkMode ? 'text-slate-500' : 'text-slate-400'
            }`}>
              | Built by Sanjay [MGIT]
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <a
              href="https://puretext.me"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2.5 rounded-xl transition-all duration-200 ${
                isDarkMode 
                  ? 'bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900'
              } hover:scale-105 active:scale-95`}
              title="Open Puretext Homepage"
            >
              <Home size={18} />
            </a>

            {isDirty && (
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all duration-200 shadow-md ${
                  isSaving
                    ? isDarkMode
                      ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white hover:scale-105 active:scale-95 hover:shadow-lg'
                }`}
              >
                <Save size={16} />
                <span>{isSaving ? 'Saving...' : 'Save'}</span>
              </button>
            )}

            <button
              onClick={toggleDarkMode}
              className={`p-2.5 rounded-xl transition-all duration-200 ${
                isDarkMode 
                  ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 hover:text-amber-300' 
                  : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-600 hover:text-indigo-700'
              } hover:scale-105 active:scale-95`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={handleCopyURL}
              className={`p-2.5 rounded-xl transition-all duration-200 ${
                isDarkMode 
                  ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300' 
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-700'
              } hover:scale-105 active:scale-95`}
              title="Share URL"
            >
              <Share2 size={18} />
            </button>

            {!isLocked && !password && (
              <button
                onClick={handleLockNote}
                className={`p-2.5 rounded-xl transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 hover:text-amber-300' 
                    : 'bg-amber-100 hover:bg-amber-200 text-amber-600 hover:text-amber-700'
                } hover:scale-105 active:scale-95`}
                title="Lock Note"
              >
                <Lock size={18} />
              </button>
            )}

            {password && (
              <button
                onClick={handleChangePassword}
                className={`p-2.5 rounded-xl transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-violet-500/20 hover:bg-violet-500/30 text-violet-400 hover:text-violet-300' 
                    : 'bg-violet-100 hover:bg-violet-200 text-violet-600 hover:text-violet-700'
                } hover:scale-105 active:scale-95`}
                title="Change Password"
              >
                <Key size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={`backdrop-blur-sm border-b px-3 sm:px-6 py-3 ${
        isDarkMode 
          ? 'bg-slate-800/50 border-slate-700/30' 
          : 'bg-white/50 border-slate-200/30'
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
            className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-move transition-all duration-200 ${
              isDarkMode
                ? index === noteData.activeTab
                  ? 'bg-gradient-to-r from-blue-500/20 to-violet-500/20 text-white border border-blue-500/30 shadow-lg shadow-blue-500/10'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 border border-slate-600/30'
                : index === noteData.activeTab
                ? 'bg-gradient-to-r from-blue-50 to-violet-50 text-slate-900 border border-blue-200 shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            } ${draggedTabIndex === index ? 'opacity-50' : ''} hover:scale-105 active:scale-95`}
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
                className={`text-xs focus:outline-none transition-colors ${
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
          className={`px-4 py-2 rounded-lg text-sm font-medium focus:outline-none whitespace-nowrap transition-all duration-200 border ${
            isDarkMode
              ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 border-slate-600/30 hover:border-slate-500/50'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200 hover:border-slate-300'
          } hover:scale-105 active:scale-95`}
          }`}
        >
          + Add Tab
        </button>
        </div>
      </div>

      {/* Editor */}
      <div className={`flex-1 p-4 sm:p-6 flex justify-center overflow-hidden`}>
        <div className="w-full max-w-5xl h-full flex gap-3 sm:gap-6">
          {/* Line numbers */}
          <div className={`hidden sm:flex flex-shrink-0 text-right font-mono text-base leading-relaxed select-none flex-col ${
            isDarkMode ? 'text-slate-600' : 'text-slate-400'
          }`}>
            <div className="h-[52px]"></div>
            <div className="pt-4 pr-3">
              {currentTab.content.split('\n').map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          </div>

          {/* Editor container */}
          <div className={`flex-1 flex flex-col rounded-2xl overflow-hidden backdrop-blur-sm border ${
            isDarkMode 
              ? 'bg-slate-800/40 border-slate-700/50 shadow-2xl shadow-slate-900/50' 
              : 'bg-white/60 border-slate-200/50 shadow-xl'
          }`}>
            {/* Title input with icons */}
            <div className={`flex items-center gap-3 px-4 sm:px-6 py-3 border-b ${
              isDarkMode ? 'border-slate-700/50' : 'border-slate-200/50'
            }`}>
              <input
                type="text"
                value={currentTab.title || ''}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Title or program name..."
                className={`flex-1 outline-none border-0 font-mono text-base sm:text-lg bg-transparent ${
                  isDarkMode 
                    ? 'text-slate-100 placeholder-slate-600' 
                    : 'text-slate-900 placeholder-slate-400'
                }`}
                disabled={isLocked}
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    isDarkMode 
                      ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  } hover:scale-110 active:scale-95`}
                  title="Download as .txt"
                >
                  <Download size={18} />
                </button>
                <button
                  onClick={handleCopyContent}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    showCopiedMessage
                      ? 'text-emerald-500 hover:bg-emerald-500/10 scale-110'
                      : isDarkMode 
                        ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  } ${!showCopiedMessage && 'hover:scale-110 active:scale-95'}`}
                  title="Copy tab content"
                >
                  <Copy size={18} />
                </button>
                {showCopiedMessage && (
                  <span className="text-sm font-medium text-emerald-500 animate-pulse">
                    Copied
                  </span>
                )}
              </div>
            </div>

            {/* Content textarea */}
            <textarea
              value={currentTab.content}
              onChange={(e) => handleContentChange(e.target.value)}
              className={`flex-1 p-4 sm:p-6 outline-none border-0 resize-none font-mono text-base sm:text-lg leading-relaxed bg-transparent ${
                isDarkMode 
                  ? 'text-slate-100 placeholder-slate-600' 
                  : 'text-slate-900 placeholder-slate-400'
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
        <div className={`fixed bottom-20 right-4 px-5 py-3 rounded-xl shadow-lg border backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-red-500/20 border-red-500/50 text-red-300' 
            : 'bg-red-50 border-red-300 text-red-700'
        }`}>
          {error}
        </div>
      )}

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 p-4 rounded-2xl shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 ${
          isDarkMode
            ? 'bg-gradient-to-r from-blue-500/30 to-violet-500/30 hover:from-blue-500/40 hover:to-violet-500/40 text-blue-300 border border-blue-500/30'
            : 'bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white'
        }`}
        title="Scroll to Top"
      >
        <ArrowUpCircle size={24} />
      </button>
    </div>
  );
};

export default NoteEditor;
