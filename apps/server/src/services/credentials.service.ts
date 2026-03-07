/**
 * Mock Credentials Service
 * Nurse profile with licenses and certifications, some expiring soon.
 */

export interface CredentialDTO {
    id: string;
    type: "license" | "certification";
    name: string;
    issuingBody: string;
    state: string | null;
    status: "active" | "expiring_soon" | "expired" | "pending";
    issueDate: string;
    expirationDate: string;
    isCompact: boolean;
    renewalUrl: string | null;
}

const today = new Date("2026-03-07");
function daysFromNow(days: number): string {
    const d = new Date(today);
    d.setDate(d.getDate() + days);
    return d.toISOString().split("T")[0];
}

const MOCK_CREDENTIALS: CredentialDTO[] = [
    {
        id: "cred-001", type: "license", name: "Registered Nurse License",
        issuingBody: "Colorado Board of Nursing", state: "CO", status: "active",
        issueDate: "2024-09-15", expirationDate: "2026-09-15", isCompact: true,
        renewalUrl: "https://dora.colorado.gov/nursing",
    },
    {
        id: "cred-002", type: "license", name: "Registered Nurse License",
        issuingBody: "Texas Board of Nursing", state: "TX", status: "active",
        issueDate: "2025-01-10", expirationDate: "2027-01-10", isCompact: true,
        renewalUrl: "https://www.bon.texas.gov/",
    },
    {
        id: "cred-003", type: "license", name: "Registered Nurse License",
        issuingBody: "California Board of Registered Nursing", state: "CA", status: "pending",
        issueDate: "2026-02-20", expirationDate: "2028-02-20", isCompact: false,
        renewalUrl: "https://www.rn.ca.gov/",
    },
    {
        id: "cred-004", type: "certification", name: "Basic Life Support (BLS)",
        issuingBody: "American Heart Association", state: null, status: "expiring_soon",
        issueDate: "2024-03-22", expirationDate: daysFromNow(14), isCompact: false,
        renewalUrl: "https://cpr.heart.org/en/courses/basic-life-support-course-options",
    },
    {
        id: "cred-005", type: "certification", name: "Advanced Cardiovascular Life Support (ACLS)",
        issuingBody: "American Heart Association", state: null, status: "expiring_soon",
        issueDate: "2024-04-10", expirationDate: daysFromNow(30), isCompact: false,
        renewalUrl: "https://cpr.heart.org/en/courses/advanced-cardiovascular-life-support-course-options",
    },
    {
        id: "cred-006", type: "certification", name: "Pediatric Advanced Life Support (PALS)",
        issuingBody: "American Heart Association", state: null, status: "active",
        issueDate: "2025-08-15", expirationDate: "2027-08-15", isCompact: false,
        renewalUrl: "https://cpr.heart.org/en/courses/pediatric-advanced-life-support-course-options",
    },
    {
        id: "cred-007", type: "certification", name: "Trauma Nursing Core Course (TNCC)",
        issuingBody: "Emergency Nurses Association", state: null, status: "expired",
        issueDate: "2022-06-01", expirationDate: "2026-02-01", isCompact: false,
        renewalUrl: "https://www.ena.org/education/tncc",
    },
    {
        id: "cred-008", type: "certification", name: "Neonatal Resuscitation Program (NRP)",
        issuingBody: "American Academy of Pediatrics", state: null, status: "active",
        issueDate: "2025-11-20", expirationDate: "2027-11-20", isCompact: false,
        renewalUrl: "https://www.aap.org/en/learning/neonatal-resuscitation-program/",
    },
];

export async function fetchCredentials(): Promise<CredentialDTO[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return MOCK_CREDENTIALS;
}

export async function fetchCredentialById(id: string): Promise<CredentialDTO | null> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return MOCK_CREDENTIALS.find((c) => c.id === id) ?? null;
}

// ─── AI Tool Verification Types & Mocks ─────────────────────

export interface CredentialToVerify {
    type: "license" | "certification";
    identifier: string; // license number or cert name
    state?: string;
    issuingBody?: string;
}

export interface CredentialVerificationRequest {
    nurseId: string;
    firstName: string;
    lastName: string;
    credentials: CredentialToVerify[];
}

export interface SingleCredentialResult {
    identifier: string;
    type: "license" | "certification";
    verified: boolean;
    status: "ACTIVE" | "EXPIRED" | "NOT_FOUND" | "PENDING";
    expirationDate?: string;
    notes?: string;
}

export interface CredentialVerificationResult {
    nurseId: string;
    verifiedAt: string;
    allValid: boolean;
    results: SingleCredentialResult[];
}

export async function verifyCredentials(
    request: CredentialVerificationRequest
): Promise<CredentialVerificationResult> {
    // Mock response for AI agent
    await new Promise((resolve) => setTimeout(resolve, 600));

    const results: SingleCredentialResult[] = request.credentials.map((c) => {
        // Pretend everything matches and is active
        return {
            identifier: c.identifier,
            type: c.type,
            verified: true,
            status: "ACTIVE",
            expirationDate: "2028-01-01",
        };
    });

    return {
        nurseId: request.nurseId,
        verifiedAt: new Date().toISOString(),
        allValid: true,
        results,
    };
}

export async function canPracticeInState(
    request: CredentialVerificationRequest,
    targetState: string
): Promise<{ allowed: boolean; reason: string }> {
    // Mock response for AI agent
    await new Promise((resolve) => setTimeout(resolve, 400));

    const license = request.credentials.find((c) => c.type === "license");
    if (!license) {
        return { allowed: false, reason: "No active RN license provided." };
    }

    if (license.state === targetState) {
        return { allowed: true, reason: `Active license in ${targetState}.` };
    }

    return {
        allowed: true,
        reason: `License in ${license.state} has compact privileges allowing practice in ${targetState}.`,
    };
}
