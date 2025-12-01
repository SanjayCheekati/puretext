import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllUsers } from '../api/notes';

const Home = () => {
  const [noteName, setNoteName] = useState('');
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(false);
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

  // If admin data is loaded, show the admin view
  if (adminData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">
                🔐 Admin Panel
              </h1>
              <button
                onClick={() => {
                  setAdminData(null);
                  setNoteName('');
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

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">ID</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Password</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Tab Content Preview</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {adminData.users.map((user, index) => (
                    <tr key={user.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">
                        {user.id}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-700 font-mono text-sm">
                        {user.password}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-600 text-sm">
                        {user.encryptedData ? (
                          <div className="max-w-md truncate">
                            Encrypted - Password required to view
                          </div>
                        ) : (
                          <span>No data</span>
                        )}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-gray-600 text-sm whitespace-nowrap">
                        {new Date(user.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-800 mb-2">
              🔒 Puretext
            </h1>
            <p className="text-gray-600">
              Secure, encrypted notes. Zero-knowledge.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mb-6">
            <div className="space-y-3">
              <input
                type="text"
                value={noteName}
                onChange={(e) => setNoteName(e.target.value)}
                placeholder="Enter id or name"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
                autoFocus
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg transition-colors disabled:bg-gray-300"
                disabled={!noteName.trim() || loading}
              >
                {loading ? 'Loading...' : 'Open Note →'}
              </button>
            </div>
          </form>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">Features</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✓ Client-side encryption (AES-256)</li>
              <li>✓ Password protection</li>
              <li>✓ Multiple tabs</li>
              <li>✓ Custom URLs</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Your data is encrypted in your browser.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Built by San
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
