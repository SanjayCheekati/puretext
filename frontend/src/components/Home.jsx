import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllUsers, deleteNoteAsAdmin } from '../api/notes';
import { decryptNote } from '../utils/crypto';

const Home = () => {
  const [noteName, setNoteName] = useState('');
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [decryptedContents, setDecryptedContents] = useState({});
  const navigate = useNavigate();

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-blue-100">
          <div className="text-center mb-8">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Puretext
            </h1>
            <p className="text-gray-600 text-lg">
              Secure, encrypted notes. Zero-knowledge.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mb-6">
            <div className="space-y-3">
              <input
                type="text"
                value={noteName}
                onChange={(e) => setNoteName(e.target.value)}
                placeholder="Enter note name or ID"
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-lg transition-colors bg-white/50"
                autoFocus
              />
              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-semibold text-lg transition-all shadow-lg hover:shadow-xl disabled:from-gray-300 disabled:to-gray-400"
                disabled={!noteName.trim() || loading}
              >
                {loading ? 'Loading...' : 'Open Note →'}
              </button>
            </div>
          </form>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">✨ Features</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Client-side AES-256 encryption</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Password protection & custom URLs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Multiple tabs & auto-save</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>No registration required</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 mb-2">
            🔒 Your data is encrypted in your browser.
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
