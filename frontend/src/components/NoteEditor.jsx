import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Share2, Lock, Key, Trash2, Copy, Download, Home, Plus, X, Moon, Sun, ChevronLeft, ChevronRight, Eye, Edit3, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { fetchNote, saveNote, deleteNote, invalidateNoteCache } from '../api/notes';
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

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="min-h-screen gradient-bg animate-pulse">
    <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-muted rounded-lg" />
          <div className="h-6 w-24 bg-muted rounded" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 bg-muted rounded-lg" />
          <div className="h-9 w-9 bg-muted rounded-lg" />
          <div className="h-9 w-9 bg-muted rounded-lg" />
        </div>
      </div>
    </nav>
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-9 w-24 bg-muted rounded-xl" />
        <div className="h-9 w-24 bg-muted rounded-xl" />
        <div className="h-9 w-28 bg-muted rounded-xl" />
      </div>
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border/50">
          <div className="h-6 w-48 bg-muted rounded" />
        </div>
        <div className="p-6 space-y-3">
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-3/4 bg-muted rounded" />
          <div className="h-4 w-5/6 bg-muted rounded" />
          <div className="h-4 w-2/3 bg-muted rounded" />
        </div>
      </div>
    </div>
  </div>
);

const NoteEditor = () => {
  const { noteName } = useParams();
  const navigate = useNavigate();
  const tabsContainerRef = useRef(null);

  // State
  const [noteData, setNoteData] = useState(null);
  const [isLocked, setIsLocked] = useState(true);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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

  // Check tabs scroll state for mobile
  const checkTabsScroll = useCallback(() => {
    const container = tabsContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 1);
    }
  }, []);

  const scrollTabs = (direction) => {
    const container = tabsContainerRef.current;
    if (container) {
      const scrollAmount = 150;
      container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

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

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + S - Save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (noteData && isDirty && !isLocked) {
          if (password) {
            saveNoteWithPassword(password);
          } else {
            handleSaveWithoutPassword();
          }
          toast({ title: "Saved", description: "Note saved successfully" });
        }
      }
      // Ctrl/Cmd + N - New Tab
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        if (noteData && !isLocked) {
          handleAddTab();
        }
      }
      // Ctrl/Cmd + W - Close Tab
      if ((e.ctrlKey || e.metaKey) && e.key === 'w') {
        e.preventDefault();
        if (noteData && noteData.tabs.length > 1 && !isLocked) {
          handleDeleteTab(noteData.activeTab);
        }
      }
      // Ctrl/Cmd + Tab - Next Tab
      if ((e.ctrlKey || e.metaKey) && e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        if (noteData) {
          const nextTab = (noteData.activeTab + 1) % noteData.tabs.length;
          setNoteData({ ...noteData, activeTab: nextTab });
        }
      }
      // Ctrl/Cmd + Shift + Tab - Previous Tab
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Tab') {
        e.preventDefault();
        if (noteData) {
          const prevTab = noteData.activeTab === 0 ? noteData.tabs.length - 1 : noteData.activeTab - 1;
          setNoteData({ ...noteData, activeTab: prevTab });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [noteData, isDirty, isLocked, password]);

  // Check scroll on mount and resize
  useEffect(() => {
    checkTabsScroll();
    window.addEventListener('resize', checkTabsScroll);
    return () => window.removeEventListener('resize', checkTabsScroll);
  }, [checkTabsScroll, noteData?.tabs]);

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
      toast({ title: "Auto-saved", description: "Changes saved automatically" });
    } catch (err) {
      setError('Failed to save note');
      toast({ title: "Error", description: "Failed to save note", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async () => {
    if (!password || !noteData || !noteName || !isDirty) return;
    await saveNoteWithPassword(password);
    toast({ title: "Saved", description: "Note saved successfully" });
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
      toast({ title: "Error", description: "No delete token found", variant: "destructive" });
      return;
    }

    try {
      await deleteNote(noteName, token);
      removeDeleteToken(noteName);
      invalidateNoteCache(noteName);
      toast({ title: "Deleted", description: "Note deleted successfully" });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to delete note');
      toast({ title: "Error", description: "Failed to delete note", variant: "destructive" });
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
      toast({ title: "Downloaded", description: `${currentTab.name || 'Untitled'}.txt saved` });
    }
  };

  const handleShareReadOnly = () => {
    const currentTab = noteData.tabs[noteData.activeTab];
    if (currentTab && currentTab.content) {
      // Encode content in base64 for URL
      const encodedContent = btoa(encodeURIComponent(currentTab.content));
      const encodedTitle = btoa(encodeURIComponent(currentTab.title || 'Shared Note'));
      const shareUrl = `${window.location.origin}/view?t=${encodedTitle}&c=${encodedContent}`;
      
      // Copy to clipboard
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Read-Only Link Copied!",
        description: "Anyone with this link can view (but not edit) your note.",
      });
    } else {
      toast({
        title: "Nothing to share",
        description: "Add some content first.",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isLocked && !noteData) {
    return (
      <div className="min-h-screen gradient-bg">
        <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="https://www.puretext.me" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Lock className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">PureText</span>
            </a>
          </div>
        </nav>
        <div className="flex items-center justify-center py-20 px-4">
          <div className="glass-card rounded-2xl p-8 w-full max-w-md">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Password Protected</h2>
              <p className="text-sm text-muted-foreground">This note is password-protected. Enter the password to unlock it.</p>
            </div>
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
                className="h-12"
              />
              {passwordError && (
                <p className="text-sm text-destructive">{passwordError}</p>
              )}
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => navigate('/')} className="flex-1 h-12">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 h-12">Unlock</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (!noteData) {
    return <div>Error loading note</div>;
  }

  const currentTab = noteData.tabs[noteData.activeTab] || noteData.tabs[0];

  return (
    <div className="min-h-screen gradient-bg">
      {/* Minimal Navbar */}
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="https://www.puretext.me" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Lock className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground hidden sm:block">PureText</span>
            </a>
            <Separator orientation="vertical" className="h-6 bg-border/50" />
            <span className="text-sm font-medium text-muted-foreground truncate max-w-[120px] sm:max-w-xs">
              {noteName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              title="Home"
              className="rounded-xl"
            >
              <Home className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="rounded-xl"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {isDirty && (
              <Button
                variant="default"
                size="sm"
                onClick={handleSave}
                disabled={isSaving}
                className="rounded-xl"
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
              className="rounded-xl"
            >
              <Share2 className="h-4 w-4" />
            </Button>

            {!isLocked && !password && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLockNote}
                title="Lock Note"
                className="rounded-xl"
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
                className="rounded-xl"
              >
                <Key className="h-4 w-4" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={handleShareReadOnly}
              title="Share Read-Only Link"
              className="rounded-xl"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Tabs - Mobile optimized with scroll */}
        <div className="flex items-center gap-2 mb-6">
          {/* Left scroll button - mobile only */}
          {canScrollLeft && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scrollTabs('left')}
              className="flex-shrink-0 sm:hidden h-9 w-9 rounded-xl"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
          
          <div 
            ref={tabsContainerRef}
            onScroll={checkTabsScroll}
            className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1 sm:flex-wrap"
          >
            {noteData.tabs.map((tab, index) => (
              <button
                key={tab.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                onClick={() => setNoteData({ ...noteData, activeTab: index })}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all whitespace-nowrap flex-shrink-0 ${
                  index === noteData.activeTab
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                    : 'bg-card text-foreground border border-border/50 hover:border-primary/30 hover:bg-muted/50'
                } ${draggedTabIndex === index ? 'opacity-50' : ''}`}
              >
                {tab.name}
                {noteData.tabs.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTab(index);
                    }}
                    className={`hover:text-destructive transition-colors ${index === noteData.activeTab ? 'text-primary-foreground/70 hover:text-primary-foreground' : ''}`}
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
              className="flex-shrink-0 rounded-xl border-dashed hover:bg-primary/10 hover:text-primary hover:border-primary/50"
            >
              <Plus className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Add Tab</span>
              <span className="sm:hidden">New</span>
            </Button>
          </div>

          {/* Right scroll button - mobile only */}
          {canScrollRight && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scrollTabs('right')}
              className="flex-shrink-0 sm:hidden h-9 w-9 rounded-xl"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Editor Card */}
        <div className="glass-card rounded-2xl overflow-hidden">
          {/* Title Bar */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-border/50">
            <Input
              type="text"
              value={currentTab.title || ''}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Untitled"
              className="flex-1 border-0 text-lg font-medium px-0 focus-visible:ring-0 bg-transparent text-foreground placeholder:text-muted-foreground/60"
              disabled={isLocked}
            />
            <div className="flex items-center gap-1">
              {/* Preview Toggle */}
              <Button
                variant={isPreviewMode ? "default" : "ghost"}
                size="icon"
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                title={isPreviewMode ? "Edit Mode" : "Preview Markdown"}
                className="rounded-xl"
              >
                {isPreviewMode ? <Edit3 className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDownload}
                title="Download"
                className="rounded-xl"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopyContent}
                title="Copy Content"
                className="rounded-xl"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Editor / Preview */}
          <div className="relative">
            {isPreviewMode ? (
              <div className="min-h-[500px] sm:min-h-[600px] p-6 prose prose-sm dark:prose-invert max-w-none overflow-auto">
                {currentTab.content ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {currentTab.content}
                  </ReactMarkdown>
                ) : (
                  <p className="text-muted-foreground">Nothing to preview yet...</p>
                )}
              </div>
            ) : (
              <>
                <Textarea
                  value={currentTab.content}
                  onChange={(e) => handleContentChange(e.target.value)}
                  placeholder=""
                  disabled={isLocked}
                  className="min-h-[500px] sm:min-h-[600px] border-0 rounded-none font-mono text-sm resize-none focus-visible:ring-0 bg-transparent text-foreground placeholder:text-muted-foreground p-6"
                  style={{ scrollbarWidth: 'thin' }}
                />
                {/* Empty State Overlay */}
                {!currentTab.content && !isLocked && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center px-4">
                      <p className="text-muted-foreground text-base">Start typing your notes...</p>
                      <p className="text-xs text-muted-foreground/50 mt-2">Supports Markdown formatting</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
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
