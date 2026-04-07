import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllUsers, deleteNoteAsAdmin } from '../api/notes';
import { decryptNote } from '../utils/crypto';
import { Button } from './ui/button';
import { Input } from './ui/input';

const ADMIN_PANEL_PASSWORD = 'Sanjay@649893659901';
const ADMIN_AUTO_LOCK_MS = 3 * 60 * 1000;

const AdminPanel = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [decryptedContents, setDecryptedContents] = useState({});
  const [passwordFilter, setPasswordFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest-accessed');
  const navigate = useNavigate();
  const adminSecret = import.meta.env.VITE_ADMIN_SECRET;

  const displayedUsers = useMemo(() => {
    if (!adminData?.users) return [];

    const filtered = adminData.users.filter((user) => {
      const hasPassword = Boolean(user.adminPassword);
      if (passwordFilter === 'with-password') return hasPassword;
      if (passwordFilter === 'without-password') return !hasPassword;
      return true;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'latest-created') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }

      const aAccessed = a.lastAccessedAt ? new Date(a.lastAccessedAt).getTime() : 0;
      const bAccessed = b.lastAccessedAt ? new Date(b.lastAccessedAt).getTime() : 0;
      return bAccessed - aAccessed;
    });
  }, [adminData, passwordFilter, sortBy]);

  useEffect(() => {
    if (!isAuthenticated) return;

    let lockTimer;
    const activityEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];

    const lockForInactivity = () => {
      setIsAuthenticated(false);
      setAdminData(null);
      setDecryptedContents({});
      setPasswordInput('');
      setAuthError('Session locked due to inactivity. Please enter password again.');
    };

    const resetLockTimer = () => {
      clearTimeout(lockTimer);
      lockTimer = setTimeout(lockForInactivity, ADMIN_AUTO_LOCK_MS);
    };

    resetLockTimer();
    activityEvents.forEach((eventName) => window.addEventListener(eventName, resetLockTimer));

    return () => {
      clearTimeout(lockTimer);
      activityEvents.forEach((eventName) => window.removeEventListener(eventName, resetLockTimer));
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const loadData = async () => {
      if (!adminSecret) {
        alert('Admin panel is not configured');
        navigate('/');
        return;
      }

      setLoading(true);
      try {
        const data = await fetchAllUsers(adminSecret);
        setAdminData(data);
        const decrypted = {};
        for (const user of data.users) {
          if (user.adminPassword && user.encryptedData) {
            try {
              const decryptedData = await decryptNote(user.encryptedData, user.adminPassword);
              decrypted[user.id] = decryptedData;
            } catch (err) {
              decrypted[user.id] = { error: 'Decryption failed' };
            }
          }
        }
        setDecryptedContents(decrypted);
      } catch (error) {
        alert('Failed to fetch admin data');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [isAuthenticated, adminSecret, navigate]);

  const handleUnlock = (event) => {
    event.preventDefault();
    if (passwordInput === ADMIN_PANEL_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError('');
      setPasswordInput('');
      return;
    }

    setAuthError('Incorrect password');
  };

  const handleLock = () => {
    setIsAuthenticated(false);
    setAdminData(null);
    setDecryptedContents({});
    setPasswordInput('');
    setAuthError('');
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm(`Delete "${userId}"? This cannot be undone.`)) return;
    try {
      await deleteNoteAsAdmin(adminSecret, userId);
      const data = await fetchAllUsers(adminSecret);
      setAdminData(data);
      const newDecrypted = { ...decryptedContents };
      delete newDecrypted[userId];
      setDecryptedContents(newDecrypted);
    } catch (error) {
      alert('Failed to delete user');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center px-4">
        <div className="glass-card w-full max-w-md rounded-2xl border border-border/50 p-8">
          <h1 className="text-2xl font-bold text-foreground">Admin Access</h1>
          <p className="mt-2 text-muted-foreground">Enter the admin password to unlock this page.</p>

          <form onSubmit={handleUnlock} className="mt-6 space-y-4">
            <Input
              autoFocus
              type="password"
              placeholder="Admin password"
              value={passwordInput}
              onChange={(event) => {
                setPasswordInput(event.target.value);
                if (authError) setAuthError('');
              }}
            />
            {authError && <p className="text-sm text-destructive">{authError}</p>}

            <div className="flex gap-3">
              <Button type="submit" className="flex-1">Unlock</Button>
              <Button type="button" variant="outline" onClick={() => navigate('/')}>Back</Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!adminData) return null;

  return (
    <div className="min-h-screen gradient-bg py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="glass-card rounded-2xl p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
              <p className="text-muted-foreground mt-1">{adminData.count} notes stored</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleLock}>Lock</Button>
              <Button variant="outline" onClick={() => navigate('/')}>
                ← Back
              </Button>
            </div>
          </div>
          <div className="mb-6 flex flex-col gap-3 rounded-xl border border-border/50 bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">{displayedUsers.length} notes shown</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <label className="text-xs text-muted-foreground">Password</label>
                <select
                  value={passwordFilter}
                  onChange={(event) => setPasswordFilter(event.target.value)}
                  className="h-9 rounded-md border border-border bg-card px-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="all">All</option>
                  <option value="with-password">Password</option>
                  <option value="without-password">Passwordless</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs text-muted-foreground">Sort</label>
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="h-9 rounded-md border border-border bg-card px-3 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="latest-accessed">Latest Accessed</option>
                  <option value="latest-created">Latest Created</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {displayedUsers.map((user) => {
              const decryptedData = decryptedContents[user.id];
              const notePath = `/${encodeURIComponent(user.id)}`;
              const passwordLabel = user.adminPassword || 'nill';
              const hasPasswordValue = Boolean(user.adminPassword);
              const lastAccessedLabel = user.lastAccessedAt ? new Date(user.lastAccessedAt).toLocaleString() : 'Never';
              return (
                <div key={user.id} className="bg-muted/50 rounded-xl p-5 border border-border/50">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <a href={notePath} className="font-mono text-sm font-medium text-foreground hover:text-primary hover:underline">
                        {user.id}
                      </a>
                      <p className="text-xs text-muted-foreground">Created: {new Date(user.createdAt).toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Last accessed: {lastAccessedLabel}</p>
                      <p className="text-xs text-muted-foreground">
                        Password:{' '}
                        <span className={`font-mono font-medium ${hasPasswordValue ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {passwordLabel}
                        </span>
                      </p>
                      {decryptedData && !decryptedData.error && (
                        <div className="flex gap-1.5 mt-2">
                          {decryptedData.tabs?.map((tab, i) => (
                            <span key={tab.id} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">
                              {tab.name || `Tab ${i + 1}`}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteUser(user.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })}
            {displayedUsers.length === 0 && (
              <p className="text-center py-12 text-muted-foreground">No notes found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
