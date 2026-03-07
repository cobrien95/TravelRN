/**
 * AES-256-GCM Encryption Utilities
 * Used to encrypt/decrypt PII fields on NurseProfile.
 *
 * Storage format: iv:authTag:ciphertext  (all Base64-encoded)
 */

import crypto from "node:crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16; // 128-bit IV
const AUTH_TAG_LENGTH = 16; // 128-bit auth tag

function getEncryptionKey(): Buffer {
    const key = process.env.ENCRYPTION_KEY;
    if (!key) {
        throw new Error(
            "ENCRYPTION_KEY env var is required. Must be a 64-char hex string (32 bytes)."
        );
    }
    return Buffer.from(key, "hex");
}

/**
 * Encrypt plaintext using AES-256-GCM.
 * @returns Encrypted string in format: base64(iv):base64(authTag):base64(ciphertext)
 */
export function encrypt(plaintext: string): string {
    const key = getEncryptionKey();
    const iv = crypto.randomBytes(IV_LENGTH);

    const cipher = crypto.createCipheriv(ALGORITHM, key, iv, {
        authTagLength: AUTH_TAG_LENGTH,
    });

    let encrypted = cipher.update(plaintext, "utf8", "base64");
    encrypted += cipher.final("base64");

    const authTag = cipher.getAuthTag();

    return `${iv.toString("base64")}:${authTag.toString("base64")}:${encrypted}`;
}

/**
 * Decrypt an AES-256-GCM encrypted string.
 * @param encryptedData String in format: base64(iv):base64(authTag):base64(ciphertext)
 * @returns Decrypted plaintext
 */
export function decrypt(encryptedData: string): string {
    const key = getEncryptionKey();
    const [ivB64, authTagB64, ciphertext] = encryptedData.split(":");

    if (!ivB64 || !authTagB64 || !ciphertext) {
        throw new Error("Invalid encrypted data format. Expected iv:authTag:ciphertext");
    }

    const iv = Buffer.from(ivB64, "base64");
    const authTag = Buffer.from(authTagB64, "base64");

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv, {
        authTagLength: AUTH_TAG_LENGTH,
    });
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(ciphertext, "base64", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
}

/**
 * Encrypt a value only if it is non-null/non-undefined.
 * Returns null if input is nullish.
 */
export function encryptOptional(value: string | null | undefined): string | null {
    if (value == null) return null;
    return encrypt(value);
}

/**
 * Decrypt a value only if it is non-null/non-undefined.
 * Returns null if input is nullish.
 */
export function decryptOptional(value: string | null | undefined): string | null {
    if (value == null) return null;
    return decrypt(value);
}
