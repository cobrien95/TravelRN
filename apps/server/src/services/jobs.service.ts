/**
 * Mock Merge.dev Job Ingestion Service
 *
 * Simulates fetching standardized job requisitions from a Unified ATS/HRIS API.
 * Returns realistic dummy JSON so we can test the agent workflow end-to-end.
 *
 * In production, this will call the real Merge.dev or VMSpark API.
 */

import type { ShiftType } from "@prisma/client";

// ─── Types ─────────────────────────────────────────

export interface JobRequisitionDTO {
    externalId: string;
    source: "merge_dev" | "vms_park";
    title: string;
    specialty: string;
    facilityName: string;
    city: string;
    state: string;
    zipCode: string;
    shiftType: ShiftType;
    contractWeeks: number;
    grossWeeklyPay: number;
    hoursPerWeek: number;
    startDate: string | null;
    requirements: string[];
    description: string;
    isActive: boolean;
}

// ─── Mock Data ─────────────────────────────────────

const MOCK_JOBS: JobRequisitionDTO[] = [
    {
        externalId: "MRG-2026-001",
        source: "merge_dev",
        title: "ICU Registered Nurse",
        specialty: "ICU",
        facilityName: "Denver Health Medical Center",
        city: "Denver",
        state: "CO",
        zipCode: "80204",
        shiftType: "NIGHT",
        contractWeeks: 13,
        grossWeeklyPay: 2850,
        hoursPerWeek: 36,
        startDate: "2026-04-14",
        requirements: ["BLS", "ACLS", "2yr ICU exp", "CO RN License or Compact"],
        description:
            "Level 1 Trauma Center seeking experienced ICU RN for 13-week night shift assignment. Fast-paced unit with 1:2 patient ratio. EMR: Epic.",
        isActive: true,
    },
    {
        externalId: "MRG-2026-002",
        source: "merge_dev",
        title: "Med-Surg RN",
        specialty: "Med-Surg",
        facilityName: "UCHealth Memorial Hospital",
        city: "Colorado Springs",
        state: "CO",
        zipCode: "80909",
        shiftType: "DAY",
        contractWeeks: 13,
        grossWeeklyPay: 2400,
        hoursPerWeek: 36,
        startDate: "2026-04-07",
        requirements: ["BLS", "1yr Med-Surg exp", "CO RN License or Compact"],
        description:
            "Busy Med-Surg floor with 32 beds. Day shift 3x12s. Team-oriented environment. EMR: Epic.",
        isActive: true,
    },
    {
        externalId: "MRG-2026-003",
        source: "merge_dev",
        title: "ER Registered Nurse",
        specialty: "ER",
        facilityName: "Texas Health Dallas",
        city: "Dallas",
        state: "TX",
        zipCode: "75231",
        shiftType: "NIGHT",
        contractWeeks: 13,
        grossWeeklyPay: 3100,
        hoursPerWeek: 36,
        startDate: "2026-05-05",
        requirements: ["BLS", "ACLS", "TNCC", "2yr ER exp", "TX RN License or Compact"],
        description:
            "High-volume Level 2 trauma ER. 60+ beds. Night shift with rotating weekends. EMR: Cerner.",
        isActive: true,
    },
    {
        externalId: "MRG-2026-004",
        source: "merge_dev",
        title: "Labor & Delivery RN",
        specialty: "L&D",
        facilityName: "Cedars-Sinai Medical Center",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90048",
        shiftType: "DAY",
        contractWeeks: 13,
        grossWeeklyPay: 3400,
        hoursPerWeek: 36,
        startDate: "2026-04-21",
        requirements: [
            "BLS",
            "ACLS",
            "NRP",
            "3yr L&D exp",
            "CA RN License",
        ],
        description:
            "Premier L&D unit with ~8,000 deliveries/year. Day shift 3x12s. Must have high-risk OB experience. EMR: Epic.",
        isActive: true,
    },
    {
        externalId: "VMS-2026-005",
        source: "vms_park",
        title: "PICU Registered Nurse",
        specialty: "PICU",
        facilityName: "Children's Hospital Colorado",
        city: "Aurora",
        state: "CO",
        zipCode: "80045",
        shiftType: "SWING",
        contractWeeks: 8,
        grossWeeklyPay: 3000,
        hoursPerWeek: 36,
        startDate: "2026-06-02",
        requirements: ["BLS", "PALS", "2yr PICU exp", "CO RN License or Compact"],
        description:
            "Top-ranked children's hospital PICU. Swing shift (3p-3a). Complex cardiac and neuro patients. EMR: Epic.",
        isActive: true,
    },
    {
        externalId: "VMS-2026-006",
        source: "vms_park",
        title: "Telemetry RN",
        specialty: "Telemetry",
        facilityName: "Banner University Medical Center",
        city: "Phoenix",
        state: "AZ",
        zipCode: "85006",
        shiftType: "NIGHT",
        contractWeeks: 13,
        grossWeeklyPay: 2600,
        hoursPerWeek: 36,
        startDate: "2026-04-28",
        requirements: ["BLS", "ACLS", "1yr Tele exp", "AZ RN License or Compact"],
        description:
            "40-bed telemetry unit. Night shift 3x12s. Stroke and cardiac-focused. EMR: Cerner.",
        isActive: true,
    },
];

// ─── Service ───────────────────────────────────────

/**
 * Fetch all active job requisitions from the mock VMS/ATS.
 * Simulates an API call with a small delay.
 */
export async function fetchJobRequisitions(): Promise<JobRequisitionDTO[]> {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 200));
    return MOCK_JOBS.filter((job) => job.isActive);
}

/**
 * Fetch a single job by its external ID.
 */
export async function fetchJobById(
    externalId: string
): Promise<JobRequisitionDTO | null> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return MOCK_JOBS.find((j) => j.externalId === externalId) ?? null;
}

/**
 * Search jobs by specialty and/or state.
 */
export async function searchJobs(filters: {
    specialty?: string;
    state?: string;
    shiftType?: ShiftType;
    minWeeklyPay?: number;
}): Promise<JobRequisitionDTO[]> {
    await new Promise((resolve) => setTimeout(resolve, 150));

    return MOCK_JOBS.filter((job) => {
        if (!job.isActive) return false;
        if (
            filters.specialty &&
            !job.specialty.toLowerCase().includes(filters.specialty.toLowerCase())
        )
            return false;
        if (
            filters.state &&
            job.state.toUpperCase() !== filters.state.toUpperCase()
        )
            return false;
        if (filters.shiftType && job.shiftType !== filters.shiftType) return false;
        if (filters.minWeeklyPay && job.grossWeeklyPay < filters.minWeeklyPay)
            return false;
        return true;
    });
}
