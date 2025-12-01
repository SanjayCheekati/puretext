import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [noteName, setNoteName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (noteName.trim()) {
      const sanitizedName = noteName.trim().toLowerCase().replace(/\s+/g, '-');
      navigate(`/${sanitizedName}`);
    }
  };

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
                disabled={!noteName.trim()}
              >
                Open Note →
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
