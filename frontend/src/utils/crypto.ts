/**
 * Client-side encryption utilities using Web Crypto API
 * All encryption/decryption happens in the browser
 * Passwords and plaintext NEVER reach the server
 */

const PBKDF2_ITERATIONS = 100000;
const KEY_LENGTH = 256;
const SALT_LENGTH = 16;
const IV_LENGTH = 12;

/**
 * Generate a random salt
 */
export const generateSalt = (): Uint8Array => {
  return crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
};

/**
 * Generate a random IV (Initialization Vector)
 */
export const generateIV = (): Uint8Array => {
  return crypto.getRandomValues(new Uint8Array(IV_LENGTH));
};

/**
 * Generate a random delete token (32 bytes = 256 bits)
 */
export const generateDeleteToken = (): string => {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return arrayBufferToBase64(bytes);
};

/**
 * Convert ArrayBuffer to Base64 string
 */
export const arrayBufferToBase64 = (buffer: ArrayBuffer | Uint8Array): string => {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

/**
 * Convert Base64 string to Uint8Array
 */
export const base64ToArrayBuffer = (base64: string): Uint8Array => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};

/**
 * Derive a cryptographic key from a password using PBKDF2
 * @param password - The user's password
 * @param salt - Salt for key derivation
 * @returns CryptoKey for AES-GCM encryption
 */
export const deriveKey = async (
  password: string,
  salt: Uint8Array
): Promise<CryptoKey> => {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);

  // Import password as a key
  const passwordKey = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );

  // Derive actual encryption key using PBKDF2
  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256'
    },
    passwordKey,
    { name: 'AES-GCM', length: KEY_LENGTH },
    false,
    ['encrypt', 'decrypt']
  );

  return key;
};

/**
 * Encrypt data using AES-GCM
 * @param key - The encryption key
 * @param iv - Initialization vector
 * @param data - The plaintext to encrypt (as string)
 * @returns Encrypted ciphertext as Base64
 */
export const encrypt = async (
  key: CryptoKey,
  iv: Uint8Array,
  data: string
): Promise<string> => {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);

  const ciphertext = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv
    },
    key,
    dataBuffer
  );

  return arrayBufferToBase64(ciphertext);
};

/**
 * Decrypt data using AES-GCM
 * @param key - The decryption key
 * @param iv - Initialization vector
 * @param ciphertext - The ciphertext to decrypt (Base64)
 * @returns Decrypted plaintext as string
 */
export const decrypt = async (
  key: CryptoKey,
  iv: Uint8Array,
  ciphertext: string
): Promise<string> => {
  const ciphertextBuffer = base64ToArrayBuffer(ciphertext);

  const decryptedBuffer = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv
    },
    key,
    ciphertextBuffer
  );

  const decoder = new TextDecoder();
  return decoder.decode(decryptedBuffer);
};

/**
 * Encrypt an entire note object
 * @param noteData - The note data to encrypt
 * @param password - The user's password
 * @returns Encrypted data bundle with salt, iv, and ciphertext
 */
export const encryptNote = async (
  noteData: any,
  password: string
): Promise<{
  version: number;
  salt: string;
  iv: string;
  ciphertext: string;
}> => {
  const salt = generateSalt();
  const iv = generateIV();
  const key = await deriveKey(password, salt);

  const jsonString = JSON.stringify(noteData);
  const ciphertext = await encrypt(key, iv, jsonString);

  return {
    version: 1,
    salt: arrayBufferToBase64(salt),
    iv: arrayBufferToBase64(iv),
    ciphertext: ciphertext
  };
};

/**
 * Decrypt an entire note object
 * @param encryptedData - The encrypted data bundle
 * @param password - The user's password
 * @returns Decrypted note data
 */
export const decryptNote = async (
  encryptedData: {
    version: number;
    salt: string;
    iv: string;
    ciphertext: string;
  },
  password: string
): Promise<any> => {
  const salt = new Uint8Array(base64ToArrayBuffer(encryptedData.salt));
  const iv = new Uint8Array(base64ToArrayBuffer(encryptedData.iv));
  const key = await deriveKey(password, salt);

  const decryptedJson = await decrypt(key, iv, encryptedData.ciphertext);
  return JSON.parse(decryptedJson);
};
