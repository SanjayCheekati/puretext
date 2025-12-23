import crypto from 'crypto';

/**
 * Hash a delete token using SHA-256
 * @param {string} token - The delete token to hash
 * @returns {string} - The hex-encoded hash
 */
export const hashDeleteToken = (token) => {
  return crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
};

/**
 * Validate a delete token against a hash using timing-safe comparison
 * @param {string} token - The token to validate
 * @param {string} hash - The hash to validate against
 * @returns {boolean} - Whether the token is valid
 */
export const validateDeleteToken = (token, hash) => {
  try {
    const tokenHash = hashDeleteToken(token);
    // Use timing-safe comparison to prevent timing attacks
    return crypto.timingSafeEqual(
      Buffer.from(tokenHash, 'hex'),
      Buffer.from(hash, 'hex')
    );
  } catch {
    return false;
  }
};
