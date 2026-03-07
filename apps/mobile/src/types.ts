/**
 * TravelRN — Shared TypeScript Types
 */

export interface Job {
    externalId: string;
    source: string;
    title: string;
    specialty: string;
    facilityName: string;
    city: string;
    state: string;
    zipCode: string;
    shiftType: 'DAY' | 'NIGHT' | 'SWING';
    contractWeeks: number;
    grossWeeklyPay: number;
    hoursPerWeek: number;
    startDate: string | null;
    requirements: string[];
    description: string;
    isActive: boolean;
}

export interface License {
    id: string;
    state: string;
    licenseNumber: string;
    licenseType: string;
    expiresAt: string;
    verified: boolean;
    isCompact: boolean;
}

export interface Certification {
    id: string;
    name: string;
    issuingBody: string;
    expiresAt: string;
    verified: boolean;
}
