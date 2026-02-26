import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllUsers, deleteNoteAsAdmin } from '../api/notes';
import { decryptNote } from '../utils/crypto';
import { Button } from './ui/button';

const AdminPanel = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [decryptedContents, setDecryptedContents] = useState({});
  const navigate = useNavigate();
  const adminSecret = import.meta.env.VITE_ADMIN_SECRET;

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAllUsers(adminSecret);
        setAdminData(data);
        const decrypted = {};
        for (const user of data.users) {
          if (user.password && user.encryptedData) {
            try {
              const decryptedData = await decryptNote(user.encryptedData, user.password);
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
  }, [adminSecret, navigate]);

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
            <Button variant="outline" onClick={() => navigate('/')}>
              ← Back
            </Button>
          </div>
          <div className="space-y-4">
            {adminData.users.map((user) => {
              const decryptedData = decryptedContents[user.id];
              return (
                <div key={user.id} className="bg-muted/50 rounded-xl p-5 border border-border/50">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <p className="font-mono text-sm font-medium text-foreground">{user.id}</p>
                      <p className="text-xs text-muted-foreground">{new Date(user.createdAt).toLocaleString()}</p>
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
            {adminData.users.length === 0 && (
              <p className="text-center py-12 text-muted-foreground">No notes found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
