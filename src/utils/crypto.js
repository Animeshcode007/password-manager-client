// src/utils/crypto.js
import CryptoJS from "crypto-js";

/**
 * Encrypts a UTF‑8 string into an AES cipher text using the given key.
 */
export function encryptData(plainText, key) {
    return CryptoJS.AES.encrypt(plainText, key).toString();
}

/**
 * Decrypts an AES cipher text back into a UTF‑8 string using the given key.
 */
export function decryptData(cipherText, key) {
    const bytes = CryptoJS.AES.decrypt(cipherText, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}
