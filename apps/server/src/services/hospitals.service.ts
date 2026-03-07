/**
 * Mock Hospital Profiles — Real hospitals in Denver and Austin areas
 */

export interface HospitalDTO {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    nurseRating: number;
    patientRatio: Record<string, string>;
    magnetStatus: boolean;
    emrSystem: string;
    parkingInfo: string;
    unitHighlights: string[];
    totalBeds: number;
    traumaLevel: string | null;
    teachingHospital: boolean;
}

const MOCK_HOSPITALS: HospitalDTO[] = [
    // ── Denver Area ────────────────────────────
    {
        id: "hosp-001",
        name: "Denver Health Medical Center",
        address: "777 Bannock St",
        city: "Denver",
        state: "CO",
        zipCode: "80204",
        nurseRating: 4.2,
        patientRatio: { ICU: "1:2", ER: "1:4", "Med-Surg": "1:5" },
        magnetStatus: false,
        emrSystem: "Epic",
        parkingInfo: "Free garage parking for travelers. Badge required after orientation.",
        unitHighlights: [
            "Level 1 Trauma Center — only one in the Denver metro",
            "Strong nurse residency program",
            "Union hospital with clear staffing ratios",
        ],
        totalBeds: 525,
        traumaLevel: "Level I",
        teachingHospital: true,
    },
    {
        id: "hosp-002",
        name: "UCHealth University of Colorado Hospital",
        address: "12605 E 16th Ave",
        city: "Aurora",
        state: "CO",
        zipCode: "80045",
        nurseRating: 4.6,
        patientRatio: { ICU: "1:2", "Med-Surg": "1:5", NICU: "1:2" },
        magnetStatus: true,
        emrSystem: "Epic",
        parkingInfo: "Paid garage ($5/day for staff). Shuttle from remote lot available.",
        unitHighlights: [
            "Magnet-designated academic medical center",
            "Home to the CU Anschutz Medical Campus",
            "Excellent orientation program for travelers",
            "Research hospital — exposure to cutting-edge care",
        ],
        totalBeds: 620,
        traumaLevel: "Level I",
        teachingHospital: true,
    },
    {
        id: "hosp-003",
        name: "Children's Hospital Colorado",
        address: "13123 E 16th Ave",
        city: "Aurora",
        state: "CO",
        zipCode: "80045",
        nurseRating: 4.8,
        patientRatio: { PICU: "1:2", NICU: "1:2", "Peds Med-Surg": "1:4" },
        magnetStatus: true,
        emrSystem: "Epic",
        parkingInfo: "Free parking in designated traveler lot. 5-min walk to main entrance.",
        unitHighlights: [
            "Ranked #6 nationally by US News for pediatrics",
            "Level I Pediatric Trauma Center",
            "Incredible team culture — travelers love it here",
            "Child life specialists on every floor",
        ],
        totalBeds: 434,
        traumaLevel: "Level I Pediatric",
        teachingHospital: true,
    },
    {
        id: "hosp-004",
        name: "Swedish Medical Center",
        address: "501 E Hampden Ave",
        city: "Englewood",
        state: "CO",
        zipCode: "80113",
        nurseRating: 4.0,
        patientRatio: { ER: "1:4", ICU: "1:2", "Med-Surg": "1:6" },
        magnetStatus: false,
        emrSystem: "Meditech",
        parkingInfo: "Free parking. Surface lot adjacent to ER entrance.",
        unitHighlights: [
            "Level I Trauma Center — South Denver",
            "Comprehensive Stroke Center",
            "HCA-affiliated — familiar systems for returning travelers",
        ],
        totalBeds: 408,
        traumaLevel: "Level I",
        teachingHospital: false,
    },
    {
        id: "hosp-005",
        name: "SCL Health Lutheran Medical Center",
        address: "8300 W 38th Ave",
        city: "Wheat Ridge",
        state: "CO",
        zipCode: "80033",
        nurseRating: 3.9,
        patientRatio: { OR: "1:1", "Med-Surg": "1:5", ICU: "1:2" },
        magnetStatus: false,
        emrSystem: "Epic",
        parkingInfo: "Free parking in visitor lot. Staff badge opens gate to reserved section.",
        unitHighlights: [
            "Community hospital feel with strong OR program",
            "Known for ortho and spine surgery",
            "Flexible scheduling for travelers",
        ],
        totalBeds: 280,
        traumaLevel: "Level II",
        teachingHospital: false,
    },
    // ── Austin Area ────────────────────────────
    {
        id: "hosp-006",
        name: "St. David's Medical Center",
        address: "919 E 32nd St",
        city: "Austin",
        state: "TX",
        zipCode: "78705",
        nurseRating: 4.1,
        patientRatio: { ER: "1:4", ICU: "1:2", "Med-Surg": "1:6" },
        magnetStatus: true,
        emrSystem: "Cerner",
        parkingInfo: "Paid garage ($3/day). Valet available during day shift.",
        unitHighlights: [
            "HCA's flagship Austin facility",
            "Level IV Trauma Center — comprehensive cardiac",
            "Great location near UT Austin campus",
            "Strong traveler community — good networking",
        ],
        totalBeds: 350,
        traumaLevel: "Level IV",
        teachingHospital: false,
    },
    {
        id: "hosp-007",
        name: "Dell Seton Medical Center at UT",
        address: "1500 Red River St",
        city: "Austin",
        state: "TX",
        zipCode: "78701",
        nurseRating: 4.5,
        patientRatio: { ICU: "1:2", ER: "1:4", Neuro: "1:3" },
        magnetStatus: true,
        emrSystem: "Epic",
        parkingInfo: "Garage parking ($6/day). Public transit stop at front entrance.",
        unitHighlights: [
            "Only Level I Trauma Center in Austin",
            "Academic partnership with Dell Medical School",
            "Brand new facility (opened 2017) — modern equipment",
            "Strong teaching culture — travelers are valued",
        ],
        totalBeds: 211,
        traumaLevel: "Level I",
        teachingHospital: true,
    },
    {
        id: "hosp-008",
        name: "Ascension Seton Medical Center",
        address: "1201 W 38th St",
        city: "Austin",
        state: "TX",
        zipCode: "78705",
        nurseRating: 4.3,
        patientRatio: { "L&D": "1:2", "Med-Surg": "1:5", ICU: "1:2" },
        magnetStatus: false,
        emrSystem: "Epic",
        parkingInfo: "Free parking in staff lot behind main building.",
        unitHighlights: [
            "Largest faith-based employer in Austin",
            "Busy L&D unit — ~5,000 deliveries/year",
            "Good cafeteria and break rooms",
            "Supportive charge nurses for travelers",
        ],
        totalBeds: 422,
        traumaLevel: null,
        teachingHospital: false,
    },
    {
        id: "hosp-009",
        name: "Baylor Scott & White Medical Center - Round Rock",
        address: "300 University Blvd",
        city: "Round Rock",
        state: "TX",
        zipCode: "78665",
        nurseRating: 4.4,
        patientRatio: { NICU: "1:3", "Med-Surg": "1:5", ICU: "1:2" },
        magnetStatus: true,
        emrSystem: "Epic",
        parkingInfo: "Free parking. Large lot, never an issue finding a spot.",
        unitHighlights: [
            "Rapidly growing — lots of opportunity",
            "Level III NICU with 42 beds",
            "Strong onboarding for travel nurses",
            "20 minutes north of Austin — lower cost of living",
        ],
        totalBeds: 335,
        traumaLevel: "Level II",
        teachingHospital: true,
    },
    {
        id: "hosp-010",
        name: "Cedar Park Regional Medical Center",
        address: "1401 Medical Pkwy",
        city: "Cedar Park",
        state: "TX",
        zipCode: "78613",
        nurseRating: 3.8,
        patientRatio: { Telemetry: "1:5", "Med-Surg": "1:6", ER: "1:4" },
        magnetStatus: false,
        emrSystem: "Cerner",
        parkingInfo: "Free parking right at the door. Small hospital, easy access.",
        unitHighlights: [
            "Smaller community hospital — quieter pace",
            "Quick orientation (2 days for experienced travelers)",
            "Friendly staff — tight-knit environment",
        ],
        totalBeds: 148,
        traumaLevel: null,
        teachingHospital: false,
    },
];

// ─── Service ───────────────────────────────────────

export async function fetchHospitals(): Promise<HospitalDTO[]> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return MOCK_HOSPITALS;
}

export async function fetchHospitalById(
    id: string
): Promise<HospitalDTO | null> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return MOCK_HOSPITALS.find((h) => h.id === id) ?? null;
}

export async function searchHospitals(city?: string): Promise<HospitalDTO[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    if (!city) return MOCK_HOSPITALS;
    return MOCK_HOSPITALS.filter((h) =>
        h.city.toLowerCase().includes(city.toLowerCase())
    );
}
