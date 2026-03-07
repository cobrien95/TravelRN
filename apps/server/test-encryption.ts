/**
 * Quick smoke test for AES-256-GCM encryption round-trip.
 * Run with: npx tsx test-encryption.ts
 */
import { encrypt, decrypt } from "./src/utils/encryption.js";

// Set a test key (32 bytes = 64 hex chars)
process.env.ENCRYPTION_KEY =
    "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2";

const testValues = [
    "123-45-6789",       // SSN
    "1990-05-15",        // Date of birth
    "+1-555-867-5309",   // Phone
    "742 Evergreen Terrace, Springfield, IL 62704", // Tax home address
];

console.log("🔐 AES-256-GCM Encryption Round-Trip Test\n");

let allPassed = true;

for (const original of testValues) {
    const encrypted = encrypt(original);
    const decrypted = decrypt(encrypted);
    const passed = decrypted === original;

    if (!passed) allPassed = false;

    console.log(`  Original:  ${original}`);
    console.log(`  Encrypted: ${encrypted.substring(0, 40)}...`);
    console.log(`  Decrypted: ${decrypted}`);
    console.log(`  Match:     ${passed ? "✅ PASS" : "❌ FAIL"}\n`);
}

console.log(allPassed ? "✅ All tests passed!" : "❌ Some tests failed!");
process.exit(allPassed ? 0 : 1);
