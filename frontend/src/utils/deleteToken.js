/**
 * Hash a delete token using SHA-256 (browser implementation)
 */
export const hashDeleteToken = async (token) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(token);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

/**
 * Get or create delete token for a note
 */
export const getDeleteToken = (noteName) => {
  return localStorage.getItem(`deleteToken_${noteName}`);
};

/**
 * Save delete token for a note
 */
export const saveDeleteToken = (noteName, token) => {
  localStorage.setItem(`deleteToken_${noteName}`, token);
};

/**
 * Remove delete token for a note
 */
export const removeDeleteToken = (noteName) => {
  localStorage.removeItem(`deleteToken_${noteName}`);
};
