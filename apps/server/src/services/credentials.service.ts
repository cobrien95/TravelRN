/**
 * Mock Verifiable / Propelus Credentialing Service
 *
 * Simulates Primary Source Verification (PSV) for nurse licenses
 * and certifications. Returns dummy verification results.
 *
 * In production, this will call the real Verifiable or Propelus API
 * for automated credential checks against state boards and issuing bodies.
 */

// ─── Types ─────────────────────────────────────────

export interface CredentialVerificationRequest {
    nurseId: string;
    firstName: string;
    lastName: string;
    credentials: CredentialToVerify[];
}

export interface CredentialToVerify {
    type: "license" | "certification";
    identifier: string; // License number or cert name
    state?: string;     // For licenses
    issuingBody?: string; // For certifications
}

export interface CredentialVerificationResult {
    nurseId: string;
    verifiedAt: string;
    overallStatus: "PASS" | "FAIL" | "PARTIAL";
    results: SingleCredentialResult[];
    summary: string;
}

export interface SingleCredentialResult {
    type: "license" | "certification";
    identifier: string;
    status: "VERIFIED" | "EXPIRED" | "NOT_FOUND" | "SUSPENDED";
    expiresAt: string | null;
    isCompact: boolean;
    compactStates: string[];
    details: string;
}

// ─── Mock Verification Logic ───────────────────────

/**
 * Known compact (eNLC) states as of 2025.
 * Nurses with a compact license from one of these states can
 * practice in all other compact states without additional licenses.
 */
const COMPACT_STATES = new Set([
    "AL", "AZ", "AR", "CO", "DE", "FL", "GA", "ID", "IN", "IA",
    "KS", "KY", "LA", "ME", "MD", "MS", "MO", "MT", "NE", "NH",
    "NJ", "NM", "NC", "ND", "OH", "OK", "SC", "SD", "TN", "TX",
    "UT", "VA", "VT", "WV", "WI", "WY",
]);

/**
 * Simulate credential verification via Verifiable/Propelus API.
 * Returns mock results with realistic verification statuses.
 *
 * @param request - Nurse credentials to verify
 */
export async function verifyCredentials(
    request: CredentialVerificationRequest
): Promise<CredentialVerificationResult> {
    // Simulate API latency
    await new Promise((resolve) => setTimeout(resolve, 300));

    const results: SingleCredentialResult[] = request.credentials.map(
        (cred) => {
            if (cred.type === "license") {
                return verifyLicense(cred);
            } else {
                return verifyCertification(cred);
            }
        }
    );

    const allVerified = results.every((r) => r.status === "VERIFIED");
    const anyFailed = results.some(
        (r) => r.status === "EXPIRED" || r.status === "SUSPENDED"
    );

    const overallStatus: "PASS" | "FAIL" | "PARTIAL" = allVerified
        ? "PASS"
        : anyFailed
            ? "FAIL"
            : "PARTIAL";

    const verifiedCount = results.filter((r) => r.status === "VERIFIED").length;

    return {
        nurseId: request.nurseId,
        verifiedAt: new Date().toISOString(),
        overallStatus,
        results,
        summary: `Verified ${verifiedCount}/${results.length} credentials. Status: ${overallStatus}`,
    };
}

/**
 * Check if a nurse can practice in a specific state
 * based on their verified licenses.
 */
export async function canPracticeInState(
    request: CredentialVerificationRequest,
    targetState: string
): Promise<{ canPractice: boolean; reason: string }> {
    const verification = await verifyCredentials(request);

    const licenseResults = verification.results.filter(
        (r) => r.type === "license" && r.status === "VERIFIED"
    );

    // Check direct state license
    const hasDirectLicense = request.credentials.some(
        (c) =>
            c.type === "license" &&
            c.state?.toUpperCase() === targetState.toUpperCase()
    );

    if (hasDirectLicense) {
        const directResult = licenseResults.find(
            (r) =>
                r.identifier ===
                request.credentials.find(
                    (c) => c.state?.toUpperCase() === targetState.toUpperCase()
                )?.identifier
        );
        if (directResult?.status === "VERIFIED") {
            return {
                canPractice: true,
                reason: `Active ${targetState} RN license verified.`,
            };
        }
    }

    // Check compact license
    const hasCompact = licenseResults.some((r) => r.isCompact);
    const targetIsCompact = COMPACT_STATES.has(targetState.toUpperCase());

    if (hasCompact && targetIsCompact) {
        return {
            canPractice: true,
            reason: `Compact (eNLC) license covers ${targetState}.`,
        };
    }

    return {
        canPractice: false,
        reason: `No valid license for ${targetState}. Nurse needs a ${targetState} state license or a compact license.`,
    };
}

// ─── Mock Helpers ──────────────────────────────────

function verifyLicense(cred: CredentialToVerify): SingleCredentialResult {
    const state = cred.state?.toUpperCase() || "UNKNOWN";
    const isCompact =
        state === "COMPACT" || COMPACT_STATES.has(state);

    // Mock: licenses ending in odd numbers are expired (for testing)
    const lastChar = cred.identifier.slice(-1);
    const isExpired = /^[13579]$/.test(lastChar);

    const expiresAt = isExpired
        ? "2025-06-15T00:00:00.000Z" // expired
        : "2027-12-31T00:00:00.000Z"; // valid

    return {
        type: "license",
        identifier: cred.identifier,
        status: isExpired ? "EXPIRED" : "VERIFIED",
        expiresAt,
        isCompact,
        compactStates: isCompact ? Array.from(COMPACT_STATES) : [],
        details: isExpired
            ? `License ${cred.identifier} in ${state} is EXPIRED as of 06/15/2025.`
            : `License ${cred.identifier} in ${state} is ACTIVE through 12/31/2027.${isCompact ? " Compact (eNLC) privilege included." : ""}`,
    };
}

function verifyCertification(
    cred: CredentialToVerify
): SingleCredentialResult {
    const certName = cred.identifier.toUpperCase();

    // Mock: PALS and TNCC are expired (for testing variety)
    const expiredCerts = new Set(["PALS", "TNCC"]);
    const isExpired = expiredCerts.has(certName);

    const expiresAt = isExpired
        ? "2025-03-01T00:00:00.000Z"
        : "2028-06-30T00:00:00.000Z";

    return {
        type: "certification",
        identifier: cred.identifier,
        status: isExpired ? "EXPIRED" : "VERIFIED",
        expiresAt,
        isCompact: false,
        compactStates: [],
        details: isExpired
            ? `${certName} certification from ${cred.issuingBody || "AHA"} is EXPIRED.`
            : `${certName} certification from ${cred.issuingBody || "AHA"} is ACTIVE through 06/30/2028.`,
    };
}
