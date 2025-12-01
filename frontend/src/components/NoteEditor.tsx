import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NoteData, Tab } from '../types';
import { fetchNote, saveNote, deleteNote } from '../api/notes';
import { encryptNote, decryptNote, generateDeleteToken } from '../utils/crypto';
import { hashDeleteToken, getDeleteToken, saveDeleteToken, removeDeleteToken } from '../utils/deleteToken';
import PasswordDialog from './PasswordDialog';
import ConfirmDialog from './ConfirmDialog';
import TextInputDialog from './TextInputDialog';

const NoteEditor: React.FC = () => {
  const { noteName } = useParams<{ noteName: string }>();
  const navigate = useNavigate();

  // State
  const [noteData, setNoteData] = useState<NoteData | null>(null);
  const [isLocked, setIsLocked] = useState(true);
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string>('');

  // Dialogs
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwordDialogMode, setPasswordDialogMode] = useState<'unlock' | 'lock' | 'change'>('unlock');
  const [passwordError, setPasswordError] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showTabNameDialog, setShowTabNameDialog] = useState(false);
  const [tabNameDialogMode, setTabNameDialogMode] = useState<'add' | 'rename'>('add');
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

  const isPasswordProcessing = useRef(false);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load note on mount
  useEffect(() => {
    if (noteName) {
      loadNote();
    }
  }, [noteName]);

  // Auto-save when no password and content changes
  useEffect(() => {
    if (noteData && !password && isDirty && !isLocked) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }

      autoSaveTimeoutRef.current = setTimeout(() => {
        handleSaveWithoutPassword();
      }, 1500);
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [noteData, isDirty, password, isLocked]);

  const loadNote = async () => {
    try {
      setIsLoading(true);
      const response = await fetchNote(noteName!);

      if (response.exists && response.data) {
        // Note exists and is encrypted - need password
        setShowPasswordDialog(true);
        setPasswordDialogMode('unlock');
      } else {
        // New note - create default structure
        const newNote: NoteData = {
          tabs: [{
            id: crypto.randomUUID(),
            name: 'Tab 1',
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

  const handlePasswordSubmit = async (inputPassword: string) => {
    if (isPasswordProcessing.current) return;
    isPasswordProcessing.current = true;

    try {
      setPasswordError('');

      if (passwordDialogMode === 'unlock') {
        // Decrypt existing note
        const response = await fetchNote(noteName!);
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

  const saveNoteWithPassword = async (pwd: string) => {
    if (!noteData || !noteName) return;

    try {
      setIsSaving(true);
      const encrypted = await encryptNote(noteData, pwd);

      // Check if we need to create delete token
      let deleteTokenHash: string | undefined;
      let existingToken = getDeleteToken(noteName);

      if (!existingToken) {
        const newToken = generateDeleteToken();
        const hash = await hashDeleteToken(newToken);
        saveDeleteToken(noteName, newToken);
        deleteTokenHash = hash;
      }

      await saveNote(noteName, encrypted, deleteTokenHash);
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
      let deleteTokenHash: string | undefined;
      let existingToken = getDeleteToken(noteName);

      if (!existingToken) {
        const newToken = generateDeleteToken();
        const hash = await hashDeleteToken(newToken);
        saveDeleteToken(noteName, newToken);
        deleteTokenHash = hash;
      }

      await saveNote(noteName, encrypted, deleteTokenHash);
      setIsDirty(false);
    } catch (err) {
      setError('Failed to auto-save note');
    } finally {
      setIsSaving(false);
    }
  };

  const handleContentChange = (content: string) => {
    if (!noteData) return;

    const updatedTabs = [...noteData.tabs];
    const firstLine = content.split('\n')[0];
    const firstWord = firstLine.trim().split(/\s+/)[0];
    const tabName = firstWord && firstWord.length > 0 ? firstWord : `Tab ${noteData.activeTab + 1}`;
    
    updatedTabs[noteData.activeTab] = {
      ...updatedTabs[noteData.activeTab],
      content,
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
    const newTab: Tab = {
      id: crypto.randomUUID(),
      name: `Tab ${newTabNumber}`,
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

  const handleTabNameSubmit = (name: string) => {
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

  const handleRenameTab = (index: number) => {
    setSelectedTabIndex(index);
    setTabNameDialogMode('rename');
    setShowTabNameDialog(true);
  };

  const handleDeleteTab = (index: number) => {
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

  const handleLockNote = () => {
    setPasswordDialogMode('lock');
    setShowPasswordDialog(true);
  };

  const handleChangePassword = () => {
    setPasswordDialogMode('change');
    setShowPasswordDialog(true);
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
    } catch (err: any) {
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

  const currentTab = noteData.tabs[noteData.activeTab];

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-blue-900 border-b border-blue-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-white">Puretext</h1>
            <span className="text-gray-400">/ {noteName}</span>
          </div>

          <div className="flex items-center gap-2">
            {isDirty && (
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm disabled:bg-gray-400"
              >
                {isSaving ? '⟳ Saving...' : '💾 Save'}
              </button>
            )}

            <button
              onClick={handleCopyURL}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Share
            </button>

            {!isLocked && !password && (
              <button
                onClick={handleLockNote}
                className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm"
              >
                🔓 Lock
              </button>
            )}

            {password && (
              <button
                onClick={handleChangePassword}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              >
                🔒 Change Password
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-200 border-b border-gray-300 px-4 py-2 flex justify-center">
        <div className="flex flex-wrap items-center gap-2 max-w-4xl w-full">
        {noteData.tabs.map((tab, index) => (
          <div
            key={tab.id}
            className={`flex items-center gap-2 px-3 py-1 rounded ${
              index === noteData.activeTab
                ? 'bg-white text-gray-900 border border-gray-400'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
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
                className="text-xs hover:text-red-600 focus:outline-none"
                title="Delete"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          onClick={handleAddTab}
          className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm font-medium focus:outline-none"
        >
          + Add Tab
        </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 p-4 flex justify-center bg-gray-100">
        <div className="w-full max-w-4xl h-full flex gap-4">
          {/* Line numbers */}
          <div className="flex-shrink-0 pt-6 pr-2 text-right text-gray-400 text-lg font-mono leading-relaxed select-none">
            {currentTab.content.split('\n').map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          {/* Text area */}
          <textarea
            value={currentTab.content}
            onChange={(e) => handleContentChange(e.target.value)}
            className="flex-1 h-full p-6 pl-2 bg-white text-gray-900 border-0 rounded-lg focus:outline-none resize-none font-mono text-lg leading-relaxed shadow-sm"
            placeholder="Start typing..."
            disabled={isLocked}
          />
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
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-lg flex items-center gap-2 focus:outline-none"
        title="Scroll to Top"
      >
        <span>⬆️</span>
        <span>Top</span>
      </button>
    </div>
  );
};

export default NoteEditor;
