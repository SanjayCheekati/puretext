import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Share2, Lock, Key, Trash2, Copy, Download, Home, Plus, X, Moon, Sun } from 'lucide-react';
import { fetchNote, saveNote, deleteNote } from '../api/notes';
import { encryptNote, decryptNote, generateDeleteToken } from '../utils/crypto';
import { hashDeleteToken, getDeleteToken, saveDeleteToken, removeDeleteToken } from '../utils/deleteToken';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { toast } from './ui/use-toast.jsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

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
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Load theme from localStorage or default to light mode
    return localStorage.getItem('theme') === 'dark';
  });

  // Dialogs
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwordDialogMode, setPasswordDialogMode] = useState('unlock');
  const [passwordError, setPasswordError] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showTabNameDialog, setShowTabNameDialog] = useState(false);
  const [tabNameDialogMode, setTabNameDialogMode] = useState('add');
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [draggedTabIndex, setDraggedTabIndex] = useState(null);

  const isPasswordProcessing = useRef(false);
  const autoSaveTimeoutRef = useRef(null);

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

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
    toast({
      title: "URL Copied",
      description: "Note URL copied to clipboard",
    });
  };

  const handleCopyContent = () => {
    const currentTab = noteData.tabs[noteData.activeTab];
    if (currentTab && currentTab.content) {
      navigator.clipboard.writeText(currentTab.content);
      toast({
        title: "Content Copied",
        description: "Tab content copied to clipboard",
      });
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
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-600">Loading...</p>
      </div>
    );
  }

  if (isLocked && !noteData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <a href="https://www.puretext.me" className="text-xl font-semibold text-gray-900">
              PureText
            </a>
          </div>
        </nav>
        <div className="flex items-center justify-center py-16">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Password Protected</CardTitle>
              <CardDescription>This note is password-protected. Enter the password to unlock it.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handlePasswordSubmit(formData.get('password'));
              }} className="space-y-4">
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  autoFocus
                />
                {passwordError && (
                  <p className="text-sm text-red-600">{passwordError}</p>
                )}
                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => navigate('/')} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">Unlock</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!noteData) {
    return <div>Error loading note</div>;
  }

  const currentTab = noteData.tabs[noteData.activeTab] || noteData.tabs[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal Navbar */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="https://www.puretext.me" className="text-xl font-semibold text-foreground hover:text-foreground/80">
              PureText
            </a>
            <Separator orientation="vertical" className="h-5" />
            <span className="text-sm text-muted-foreground truncate max-w-xs">
              {noteName}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              title="Home"
            >
              <Home className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {isDirty && (
              <Button
                variant="default"
                size="sm"
                onClick={handleSave}
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-1.5" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopyURL}
              title="Copy URL"
            >
              <Share2 className="h-4 w-4" />
            </Button>

            {!isLocked && !password && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLockNote}
                title="Lock Note"
              >
                <Lock className="h-4 w-4" />
              </Button>
            )}

            {password && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleChangePassword}
                title="Change Password"
              >
                <Key className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {noteData.tabs.map((tab, index) => (
            <button
              key={tab.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              onClick={() => setNoteData({ ...noteData, activeTab: index })}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                index === noteData.activeTab
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-foreground border border-border hover:bg-muted'
              } ${draggedTabIndex === index ? 'opacity-50' : ''}`}
            >
              {tab.name}
              {noteData.tabs.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTab(index);
                  }}
                  className="hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddTab}
            className="text-foreground"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Tab
          </Button>
        </div>

        {/* Editor Card */}
        <Card className="bg-card border-border">
          {/* Title Bar */}
          <div className="flex items-center gap-3 px-6 py-3 border-b border-border">
            <Input
              type="text"
              value={currentTab.title || ''}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Untitled"
              className="flex-1 border-0 text-base font-medium px-0 focus-visible:ring-0 bg-transparent text-foreground placeholder:text-muted-foreground"
              disabled={isLocked}
            />
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDownload}
                title="Download"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopyContent}
                title="Copy Content"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Editor */}
          <Textarea
            value={currentTab.content}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder="Start typing..."
            disabled={isLocked}
            className="min-h-[600px] border-0 rounded-none font-mono text-sm resize-none focus-visible:ring-0 bg-card text-foreground placeholder:text-muted-foreground"
            style={{ scrollbarWidth: 'thin' }}
          />
        </Card>
      </div>

      {/* Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {passwordDialogMode === 'unlock' ? 'Enter Password' : passwordDialogMode === 'lock' ? 'Lock Note' : 'Change Password'}
            </DialogTitle>
            <DialogDescription>
              {passwordDialogMode === 'unlock' ? 'Enter the password to unlock this note.' : passwordDialogMode === 'lock' ? 'Enter a password to lock this note.' : 'Enter a new password for this note.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            handlePasswordSubmit(formData.get('password'));
          }}>
            <div className="space-y-4 py-4">
              <Input
                type="password"
                name="password"
                placeholder="Enter password"
                required
                autoFocus
              />
              {passwordError && (
                <p className="text-sm text-red-600">{passwordError}</p>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowPasswordDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Note</DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently delete this note? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteNote}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tab Name Dialog */}
      <Dialog open={showTabNameDialog} onOpenChange={setShowTabNameDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{tabNameDialogMode === 'add' ? 'Add New Tab' : 'Rename Tab'}</DialogTitle>
            <DialogDescription>
              {tabNameDialogMode === 'add' ? 'Enter a name for the new tab' : 'Enter a new name for the tab'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            handleTabNameSubmit(formData.get('tabName'));
          }}>
            <div className="space-y-4 py-4">
              <Input
                type="text"
                name="tabName"
                placeholder="Tab name"
                defaultValue={tabNameDialogMode === 'rename' ? noteData.tabs[selectedTabIndex]?.name : ''}
                required
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowTabNameDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NoteEditor;
