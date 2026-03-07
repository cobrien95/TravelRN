/**
 * Mock Job Ingestion Service — Expanded Demo Data
 *
 * 25 travel nursing contracts across 15+ states.
 * In production, this will call the real Merge.dev or VMSpark API.
 */

// ─── Types ─────────────────────────────────────────

type ShiftType = "DAY" | "NIGHT" | "SWING";

export interface JobRequisitionDTO {
    externalId: string;
    source: "merge_dev" | "vms_park";
    title: string;
    specialty: string;
    facilityName: string;
    facilityRating: number; // 1-5 nurse rating
    patientRatio: string; // e.g. "1:2", "1:4"
    magnetStatus: boolean;
    emrSystem: string;
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
    // ── Denver Area ────────────────────────────
    {
        externalId: "MRG-2026-001",
        source: "merge_dev",
        title: "ICU Registered Nurse",
        specialty: "ICU",
        facilityName: "Denver Health Medical Center",
        facilityRating: 4.2,
        patientRatio: "1:2",
        magnetStatus: false,
        emrSystem: "Epic",
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
        facilityName: "UCHealth University of Colorado Hospital",
        facilityRating: 4.6,
        patientRatio: "1:5",
        magnetStatus: true,
        emrSystem: "Epic",
        city: "Aurora",
        state: "CO",
        zipCode: "80045",
        shiftType: "DAY",
        contractWeeks: 13,
        grossWeeklyPay: 2400,
        hoursPerWeek: 36,
        startDate: "2026-04-07",
        requirements: ["BLS", "1yr Med-Surg exp", "CO RN License or Compact"],
        description:
            "Magnet-designated academic medical center. 32-bed Med-Surg floor. Day shift 3x12s. Team-oriented environment.",
        isActive: true,
    },
    {
        externalId: "VMS-2026-005",
        source: "vms_park",
        title: "PICU Registered Nurse",
        specialty: "PICU",
        facilityName: "Children's Hospital Colorado",
        facilityRating: 4.8,
        patientRatio: "1:2",
        magnetStatus: true,
        emrSystem: "Epic",
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
            "Top-ranked children's hospital PICU. Swing shift (3p-3a). Complex cardiac and neuro patients.",
        isActive: true,
    },
    {
        externalId: "MRG-2026-007",
        source: "merge_dev",
        title: "ER Registered Nurse",
        specialty: "ER",
        facilityName: "Swedish Medical Center",
        facilityRating: 4.0,
        patientRatio: "1:4",
        magnetStatus: false,
        emrSystem: "Meditech",
        city: "Englewood",
        state: "CO",
        zipCode: "80113",
        shiftType: "NIGHT",
        contractWeeks: 13,
        grossWeeklyPay: 2900,
        hoursPerWeek: 36,
        startDate: "2026-05-12",
        requirements: ["BLS", "ACLS", "TNCC", "2yr ER exp", "CO RN License or Compact"],
        description:
            "Level 1 Trauma ER with 55 beds. Night shift 3x12s. High acuity trauma and stroke center.",
        isActive: true,
    },
    {
        externalId: "MRG-2026-008",
        source: "merge_dev",
        title: "OR Registered Nurse",
        specialty: "OR",
        facilityName: "SCL Health Lutheran Medical Center",
        facilityRating: 3.9,
        patientRatio: "1:1",
        magnetStatus: false,
        emrSystem: "Epic",
        city: "Wheat Ridge",
        state: "CO",
        zipCode: "80033",
        shiftType: "DAY",
        contractWeeks: 13,
        grossWeeklyPay: 3200,
        hoursPerWeek: 40,
        startDate: "2026-04-28",
        requirements: ["BLS", "2yr OR exp", "CNOR preferred", "CO RN License or Compact"],
        description:
            "12-suite OR. General surgery, ortho, and neuro cases. Day shift M-F with call rotation.",
        isActive: true,
    },
    // ── Austin Area ────────────────────────────
    {
        externalId: "MRG-2026-003",
        source: "merge_dev",
        title: "ER Registered Nurse",
        specialty: "ER",
        facilityName: "St. David's Medical Center",
        facilityRating: 4.1,
        patientRatio: "1:4",
        magnetStatus: true,
        emrSystem: "Cerner",
        city: "Austin",
        state: "TX",
        zipCode: "78705",
        shiftType: "NIGHT",
        contractWeeks: 13,
        grossWeeklyPay: 3100,
        hoursPerWeek: 36,
        startDate: "2026-05-05",
        requirements: ["BLS", "ACLS", "TNCC", "2yr ER exp", "TX RN License or Compact"],
        description:
            "High-volume Level 2 trauma ER. 60+ beds. Night shift with rotating weekends.",
        isActive: true,
    },
    {
        externalId: "MRG-2026-009",
        source: "merge_dev",
        title: "ICU Registered Nurse",
        specialty: "ICU",
        facilityName: "Dell Seton Medical Center at UT",
        facilityRating: 4.5,
        patientRatio: "1:2",
        magnetStatus: true,
        emrSystem: "Epic",
        city: "Austin",
        state: "TX",
        zipCode: "78701",
        shiftType: "DAY",
        contractWeeks: 13,
        grossWeeklyPay: 3300,
        hoursPerWeek: 36,
        startDate: "2026-04-21",
        requirements: ["BLS", "ACLS", "2yr ICU exp", "TX RN License or Compact"],
        description:
            "Only Level 1 Trauma Center in Austin. Academic teaching hospital. Day shift 3x12s.",
        isActive: true,
    },
    {
        externalId: "VMS-2026-010",
        source: "vms_park",
        title: "Labor & Delivery RN",
        specialty: "L&D",
        facilityName: "Ascension Seton Medical Center",
        facilityRating: 4.3,
        patientRatio: "1:2",
        magnetStatus: false,
        emrSystem: "Epic",
        city: "Austin",
        state: "TX",
        zipCode: "78701",
        shiftType: "NIGHT",
        contractWeeks: 13,
        grossWeeklyPay: 3050,
        hoursPerWeek: 36,
        startDate: "2026-05-19",
        requirements: ["BLS", "ACLS", "NRP", "2yr L&D exp", "TX RN License or Compact"],
        description:
            "Busy L&D unit with ~5,000 deliveries/year. Night shift 3x12s. High-risk OB experience preferred.",
        isActive: true,
    },
    {
        externalId: "MRG-2026-011",
        source: "merge_dev",
        title: "NICU Registered Nurse",
        specialty: "NICU",
        facilityName: "Baylor Scott & White Medical Center",
        facilityRating: 4.4,
        patientRatio: "1:3",
        magnetStatus: true,
        emrSystem: "Epic",
        city: "Round Rock",
        state: "TX",
        zipCode: "78665",
        shiftType: "NIGHT",
        contractWeeks: 13,
        grossWeeklyPay: 2950,
        hoursPerWeek: 36,
        startDate: "2026-06-09",
        requirements: ["BLS", "NRP", "2yr NICU exp", "TX RN License or Compact"],
        description:
            "Level III NICU with 42 beds. Night shift. Caring for premature and critically ill newborns.",
        isActive: true,
    },
    {
        externalId: "VMS-2026-012",
        source: "vms_park",
        title: "Telemetry RN",
        specialty: "Telemetry",
        facilityName: "Cedar Park Regional Medical Center",
        facilityRating: 3.8,
        patientRatio: "1:5",
        magnetStatus: false,
        emrSystem: "Cerner",
        city: "Cedar Park",
        state: "TX",
        zipCode: "78613",
        shiftType: "DAY",
        contractWeeks: 13,
        grossWeeklyPay: 2500,
        hoursPerWeek: 36,
        startDate: "2026-04-14",
        requirements: ["BLS", "ACLS", "1yr Tele exp", "TX RN License or Compact"],
        description:
            "36-bed tele unit. Day shift 3x12s. Cardiac monitoring and post-surgical patients.",
        isActive: true,
    },
    // ── California ─────────────────────────────
    {
        externalId: "MRG-2026-004",
        source: "merge_dev",
        title: "Labor & Delivery RN",
        specialty: "L&D",
        facilityName: "Cedars-Sinai Medical Center",
        facilityRating: 4.7,
        patientRatio: "1:2",
        magnetStatus: true,
        emrSystem: "Epic",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90048",
        shiftType: "DAY",
        contractWeeks: 13,
        grossWeeklyPay: 3400,
        hoursPerWeek: 36,
        startDate: "2026-04-21",
        requirements: ["BLS", "ACLS", "NRP", "3yr L&D exp", "CA RN License"],
        description:
            "Premier L&D unit with ~8,000 deliveries/year. Day shift 3x12s. Must have high-risk OB experience.",
        isActive: true,
    },
    {
        externalId: "VMS-2026-013",
        source: "vms_park",
        title: "Oncology RN",
        specialty: "Oncology",
        facilityName: "UCSF Medical Center",
        facilityRating: 4.9,
        patientRatio: "1:4",
        magnetStatus: true,
        emrSystem: "Epic",
        city: "San Francisco",
        state: "CA",
        zipCode: "94143",
        shiftType: "DAY",
        contractWeeks: 13,
        grossWeeklyPay: 4200,
        hoursPerWeek: 36,
        startDate: "2026-05-05",
        requirements: ["BLS", "ONS chemo cert", "2yr Onc exp", "CA RN License"],
        description:
            "Top-ranked cancer center. Inpatient oncology unit. Chemo administration and complex symptom management.",
        isActive: true,
    },
    // ── Arizona ─────────────────────────────────
    {
        externalId: "VMS-2026-006",
        source: "vms_park",
        title: "Telemetry RN",
        specialty: "Telemetry",
        facilityName: "Banner University Medical Center",
        facilityRating: 4.0,
        patientRatio: "1:5",
        magnetStatus: false,
        emrSystem: "Cerner",
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
            "40-bed telemetry unit. Night shift 3x12s. Stroke and cardiac-focused.",
        isActive: true,
    },
    {
        externalId: "MRG-2026-014",
        source: "merge_dev",
        title: "Cath Lab RN",
        specialty: "Cath Lab",
        facilityName: "Mayo Clinic Arizona",
        facilityRating: 4.9,
        patientRatio: "1:1",
        magnetStatus: true,
        emrSystem: "Epic",
        city: "Phoenix",
        state: "AZ",
        zipCode: "85054",
        shiftType: "DAY",
        contractWeeks: 13,
        grossWeeklyPay: 3500,
        hoursPerWeek: 40,
        startDate: "2026-05-12",
        requirements: ["BLS", "ACLS", "2yr Cath Lab exp", "AZ RN License or Compact"],
        description:
            "World-renowned cardiac program. 6 cath labs. Day shift M-F with call. STEMI center.",
        isActive: true,
    },
    // ── Florida ──────────────────────────────────
    {
        externalId: "MRG-2026-015",
        source: "merge_dev",
        title: "ICU Registered Nurse",
        specialty: "ICU",
        facilityName: "Jackson Memorial Hospital",
        facilityRating: 4.3,
        patientRatio: "1:2",
        magnetStatus: true,
        emrSystem: "Epic",
        city: "Miami",
        state: "FL",
        zipCode: "33136",
        shiftType: "NIGHT",
        contractWeeks: 13,
        grossWeeklyPay: 2750,
        hoursPerWeek: 36,
        startDate: "2026-06-02",
        requirements: ["BLS", "ACLS", "2yr ICU exp", "FL RN License or Compact"],
        description:
            "Level 1 Trauma Center. Ryder Trauma Center ICU. High acuity trauma and burn patients.",
        isActive: true,
    },
    {
        externalId: "VMS-2026-016",
        source: "vms_park",
        title: "Med-Surg RN",
        specialty: "Med-Surg",
        facilityName: "AdventHealth Orlando",
        facilityRating: 4.2,
        patientRatio: "1:5",
        magnetStatus: false,
        emrSystem: "Cerner",
        city: "Orlando",
        state: "FL",
        zipCode: "32803",
        shiftType: "DAY",
        contractWeeks: 13,
        grossWeeklyPay: 2200,
        hoursPerWeek: 36,
        startDate: "2026-04-14",
        requirements: ["BLS", "1yr Med-Surg exp", "FL RN License or Compact"],
        description:
            "Large faith-based hospital system. 40-bed Med-Surg unit. Day shift 3x12s. Known for excellent nurse support.",
        isActive: true,
    },
    // ── New York ─────────────────────────────────
    {
        externalId: "MRG-2026-017",
        source: "merge_dev",
        title: "ER Registered Nurse",
        specialty: "ER",
        facilityName: "NewYork-Presbyterian Hospital",
        facilityRating: 4.6,
        patientRatio: "1:4",
        magnetStatus: true,
        emrSystem: "Epic",
        city: "New York",
        state: "NY",
        zipCode: "10065",
        shiftType: "NIGHT",
        contractWeeks: 13,
        grossWeeklyPay: 3800,
        hoursPerWeek: 36,
        startDate: "2026-05-19",
        requirements: ["BLS", "ACLS", "TNCC", "3yr ER exp", "NY RN License"],
        description:
            "Columbia-affiliated ER. 80+ beds. One of NYC's busiest trauma centers. Night shift 3x12s.",
        isActive: true,
    },
    // ── Washington ────────────────────────────────
    {
        externalId: "VMS-2026-018",
        source: "vms_park",
        title: "NICU Registered Nurse",
        specialty: "NICU",
        facilityName: "Seattle Children's Hospital",
        facilityRating: 4.8,
        patientRatio: "1:2",
        magnetStatus: true,
        emrSystem: "Epic",
        city: "Seattle",
        state: "WA",
        zipCode: "98105",
        shiftType: "NIGHT",
        contractWeeks: 13,
        grossWeeklyPay: 3200,
        hoursPerWeek: 36,
        startDate: "2026-06-16",
        requirements: ["BLS", "NRP", "2yr NICU exp", "WA RN License or Compact"],
        description:
            "Level IV NICU. Complex surgical neonates. Night shift 3x12s. Nationally ranked.",
        isActive: true,
    },
    // ── Oregon ────────────────────────────────────
    {
        externalId: "MRG-2026-019",
        source: "merge_dev",
        title: "OR Registered Nurse",
        specialty: "OR",
        facilityName: "OHSU Hospital",
        facilityRating: 4.5,
        patientRatio: "1:1",
        magnetStatus: true,
        emrSystem: "Epic",
        city: "Portland",
        state: "OR",
        zipCode: "97239",
        shiftType: "DAY",
        contractWeeks: 13,
        grossWeeklyPay: 3400,
        hoursPerWeek: 40,
        startDate: "2026-05-05",
        requirements: ["BLS", "3yr OR exp", "CNOR preferred", "OR RN License"],
        description:
            "Academic medical center. 30 OR suites. Robotics, transplant, and trauma cases. Day shift M-F.",
        isActive: true,
    },
    // ── Massachusetts ─────────────────────────────
    {
        externalId: "VMS-2026-020",
        source: "vms_park",
        title: "Oncology RN",
        specialty: "Oncology",
        facilityName: "Massachusetts General Hospital",
        facilityRating: 4.9,
        patientRatio: "1:4",
        magnetStatus: true,
        emrSystem: "Epic",
        city: "Boston",
        state: "MA",
        zipCode: "02114",
        shiftType: "DAY",
        contractWeeks: 13,
        grossWeeklyPay: 3600,
        hoursPerWeek: 36,
        startDate: "2026-06-02",
        requirements: ["BLS", "ONS chemo cert", "2yr Onc exp", "MA RN License"],
        description:
            "MGH Cancer Center. Inpatient oncology with clinical trials. Day shift 3x12s.",
        isActive: true,
    },
    // ── North Carolina ────────────────────────────
    {
        externalId: "MRG-2026-021",
        source: "merge_dev",
        title: "ICU Registered Nurse",
        specialty: "ICU",
        facilityName: "Duke University Hospital",
        facilityRating: 4.7,
        patientRatio: "1:2",
        magnetStatus: true,
        emrSystem: "Epic",
        city: "Durham",
        state: "NC",
        zipCode: "27710",
        shiftType: "NIGHT",
        contractWeeks: 13,
        grossWeeklyPay: 2800,
        hoursPerWeek: 36,
        startDate: "2026-05-26",
        requirements: ["BLS", "ACLS", "2yr ICU exp", "NC RN License or Compact"],
        description:
            "Duke MICU. Academic teaching hospital. Complex medical ICU patients. Night shift 3x12s.",
        isActive: true,
    },
    // ── Michigan ──────────────────────────────────
    {
        externalId: "VMS-2026-022",
        source: "vms_park",
        title: "Cath Lab RN",
        specialty: "Cath Lab",
        facilityName: "Beaumont Hospital Royal Oak",
        facilityRating: 4.2,
        patientRatio: "1:1",
        magnetStatus: false,
        emrSystem: "Epic",
        city: "Royal Oak",
        state: "MI",
        zipCode: "48073",
        shiftType: "DAY",
        contractWeeks: 13,
        grossWeeklyPay: 3100,
        hoursPerWeek: 40,
        startDate: "2026-04-28",
        requirements: ["BLS", "ACLS", "2yr Cath Lab exp", "MI RN License"],
        description:
            "High-volume cath lab with 8 suites. Structural heart program. Day shift M-F with call.",
        isActive: true,
    },
    // ── Illinois ──────────────────────────────────
    {
        externalId: "MRG-2026-023",
        source: "merge_dev",
        title: "Med-Surg RN",
        specialty: "Med-Surg",
        facilityName: "Northwestern Memorial Hospital",
        facilityRating: 4.6,
        patientRatio: "1:5",
        magnetStatus: true,
        emrSystem: "Epic",
        city: "Chicago",
        state: "IL",
        zipCode: "60611",
        shiftType: "NIGHT",
        contractWeeks: 13,
        grossWeeklyPay: 2700,
        hoursPerWeek: 36,
        startDate: "2026-05-12",
        requirements: ["BLS", "1yr Med-Surg exp", "IL RN License"],
        description:
            "Premier academic center downtown Chicago. 36-bed Med-Surg floor. Night shift 3x12s.",
        isActive: true,
    },
    // ── Nevada ────────────────────────────────────
    {
        externalId: "VMS-2026-024",
        source: "vms_park",
        title: "ER Registered Nurse",
        specialty: "ER",
        facilityName: "UMC Hospital Las Vegas",
        facilityRating: 3.7,
        patientRatio: "1:4",
        magnetStatus: false,
        emrSystem: "Cerner",
        city: "Las Vegas",
        state: "NV",
        zipCode: "89102",
        shiftType: "NIGHT",
        contractWeeks: 13,
        grossWeeklyPay: 3000,
        hoursPerWeek: 36,
        startDate: "2026-06-09",
        requirements: ["BLS", "ACLS", "TNCC", "2yr ER exp", "NV RN License or Compact"],
        description:
            "Only Level 1 Trauma Center in Nevada. Extremely high volume. Night shift 3x12s. No state income tax!",
        isActive: true,
    },
    // ── Georgia ────────────────────────────────────
    {
        externalId: "MRG-2026-025",
        source: "merge_dev",
        title: "L&D Registered Nurse",
        specialty: "L&D",
        facilityName: "Emory University Hospital Midtown",
        facilityRating: 4.4,
        patientRatio: "1:2",
        magnetStatus: true,
        emrSystem: "Epic",
        city: "Atlanta",
        state: "GA",
        zipCode: "30308",
        shiftType: "DAY",
        contractWeeks: 13,
        grossWeeklyPay: 2900,
        hoursPerWeek: 36,
        startDate: "2026-05-19",
        requirements: ["BLS", "ACLS", "NRP", "2yr L&D exp", "GA RN License or Compact"],
        description:
            "High-volume L&D with ~6,000 deliveries/year. Day shift 3x12s. Level III NICU on-site.",
        isActive: true,
    },
];

// ─── Service ───────────────────────────────────────

export async function fetchJobRequisitions(): Promise<JobRequisitionDTO[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return MOCK_JOBS.filter((job) => job.isActive);
}

export async function fetchJobById(
    externalId: string
): Promise<JobRequisitionDTO | null> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return MOCK_JOBS.find((j) => j.externalId === externalId) ?? null;
}

export async function searchJobs(filters: {
    specialty?: string;
    state?: string;
    shiftType?: string;
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
