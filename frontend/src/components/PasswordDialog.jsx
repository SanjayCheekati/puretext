import React, { useState } from 'react';

const PasswordDialog = ({
  isOpen,
  onSubmit,
  onCancel,
  title,
  message,
  isLoading = false,
  error = ''
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.trim()) {
      onSubmit(password);
    }
  };

  return (
    <div className="fixed inset-0 bg-white/95 backdrop-blur-sm flex items-start pt-20 sm:items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 max-w-sm sm:max-w-md w-full mx-4">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{title}</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{message}</p>
        
        <form onSubmit={handleSubmit}>
          <div className="relative mb-3 sm:mb-4">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-3 sm:px-4 py-2 pr-10 sm:pr-12 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
              disabled={isLoading}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          
          {error && (
            <p className="text-red-500 text-xs sm:text-sm mb-3 sm:mb-4">{error}</p>
          )}
          
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isLoading || !password.trim()}
              className="flex-1 bg-blue-600 text-white py-2 px-3 sm:px-4 text-sm sm:text-base rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-3 sm:px-4 text-sm sm:text-base rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordDialog;
