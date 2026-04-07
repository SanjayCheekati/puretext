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

const sanitizeNoteName = (name) => {
  if (!name || typeof name !== 'string') return '';
  return name.toLowerCase().replace(/[^a-z0-9-]/g, '').substring(0, 100);
};

const getStorageKey = (noteName) => `deleteToken_${sanitizeNoteName(noteName)}`;

/**
 * Get or create delete token for a note
 */
export const getDeleteToken = (noteName) => {
  const canonicalKey = getStorageKey(noteName);
  const canonicalToken = localStorage.getItem(canonicalKey);
  if (canonicalToken) return canonicalToken;

  // Backward compatibility for tokens stored with raw note names.
  return localStorage.getItem(`deleteToken_${noteName}`);
};

/**
 * Save delete token for a note
 */
export const saveDeleteToken = (noteName, token) => {
  localStorage.setItem(getStorageKey(noteName), token);
};

/**
 * Remove delete token for a note
 */
export const removeDeleteToken = (noteName) => {
  localStorage.removeItem(getStorageKey(noteName));
  localStorage.removeItem(`deleteToken_${noteName}`);
};
