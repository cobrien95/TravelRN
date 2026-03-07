/**
 * Mock Furnished Housing Service
 * 12 options near Denver and Austin hospitals.
 */

export interface HousingDTO {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    monthlyRent: number;
    securityDeposit: number;
    bedroomCount: number;
    bathroomCount: number;
    distanceMiles: number;
    nearestHospital: string;
    petPolicy: "allowed" | "cats_only" | "no_pets";
    amenities: string[];
    availableDate: string;
    minLeaseDays: number;
    furnished: boolean;
    description: string;
}

const MOCK_HOUSING: HousingDTO[] = [
    // ── Denver Area ────────────────────────────
    {
        id: "hsg-001",
        name: "Capitol Hill Furnished Studio",
        address: "1250 N Grant St",
        city: "Denver",
        state: "CO",
        zipCode: "80203",
        monthlyRent: 1850,
        securityDeposit: 500,
        bedroomCount: 0,
        bathroomCount: 1,
        distanceMiles: 1.2,
        nearestHospital: "Denver Health Medical Center",
        petPolicy: "cats_only",
        amenities: ["WiFi", "In-unit laundry", "Gym", "Rooftop deck", "Furnished"],
        availableDate: "2026-04-01",
        minLeaseDays: 30,
        furnished: true,
        description:
            "Modern studio in walkable Cap Hill. 10-min drive to Denver Health. All utilities included.",
    },
    {
        id: "hsg-002",
        name: "Aurora Medical District 1BR",
        address: "1700 N Wheeling St",
        city: "Aurora",
        state: "CO",
        zipCode: "80045",
        monthlyRent: 2100,
        securityDeposit: 600,
        bedroomCount: 1,
        bathroomCount: 1,
        distanceMiles: 0.5,
        nearestHospital: "UCHealth University of Colorado Hospital",
        petPolicy: "allowed",
        amenities: ["WiFi", "In-unit laundry", "Pool", "Garage parking", "Furnished"],
        availableDate: "2026-04-01",
        minLeaseDays: 30,
        furnished: true,
        description:
            "Walking distance to Anschutz campus. Pet-friendly with dog park. Perfect for UCHealth or Children's assignments.",
    },
    {
        id: "hsg-003",
        name: "LoDo Loft — Downtown Denver",
        address: "1620 Market St",
        city: "Denver",
        state: "CO",
        zipCode: "80202",
        monthlyRent: 2600,
        securityDeposit: 800,
        bedroomCount: 1,
        bathroomCount: 1,
        distanceMiles: 2.5,
        nearestHospital: "Denver Health Medical Center",
        petPolicy: "allowed",
        amenities: ["WiFi", "In-unit laundry", "Gym", "Concierge", "Furnished", "Rooftop"],
        availableDate: "2026-04-15",
        minLeaseDays: 60,
        furnished: true,
        description:
            "Upscale loft in Lower Downtown. Walking distance to Union Station, restaurants, and nightlife.",
    },
    {
        id: "hsg-004",
        name: "Englewood 2BR near Swedish",
        address: "3500 S Broadway",
        city: "Englewood",
        state: "CO",
        zipCode: "80113",
        monthlyRent: 1950,
        securityDeposit: 500,
        bedroomCount: 2,
        bathroomCount: 1,
        distanceMiles: 0.8,
        nearestHospital: "Swedish Medical Center",
        petPolicy: "allowed",
        amenities: ["WiFi", "Shared laundry", "Parking", "Furnished", "Patio"],
        availableDate: "2026-05-01",
        minLeaseDays: 30,
        furnished: true,
        description:
            "Quiet 2BR duplex just blocks from Swedish Medical Center. Great for roommates splitting costs.",
    },
    {
        id: "hsg-005",
        name: "Wheat Ridge Cottage",
        address: "4200 Wadsworth Blvd",
        city: "Wheat Ridge",
        state: "CO",
        zipCode: "80033",
        monthlyRent: 1700,
        securityDeposit: 400,
        bedroomCount: 1,
        bathroomCount: 1,
        distanceMiles: 1.0,
        nearestHospital: "SCL Health Lutheran Medical Center",
        petPolicy: "allowed",
        amenities: ["WiFi", "In-unit laundry", "Yard", "Parking", "Furnished"],
        availableDate: "2026-04-01",
        minLeaseDays: 30,
        furnished: true,
        description:
            "Charming furnished cottage with fenced yard. Dog-friendly. 5-min drive to Lutheran Medical.",
    },
    {
        id: "hsg-006",
        name: "Highlands Ranch 1BR",
        address: "9200 S Broadway",
        city: "Highlands Ranch",
        state: "CO",
        zipCode: "80126",
        monthlyRent: 1800,
        securityDeposit: 500,
        bedroomCount: 1,
        bathroomCount: 1,
        distanceMiles: 5.0,
        nearestHospital: "Swedish Medical Center",
        petPolicy: "no_pets",
        amenities: ["WiFi", "In-unit laundry", "Pool", "Gym", "Furnished"],
        availableDate: "2026-04-15",
        minLeaseDays: 60,
        furnished: true,
        description:
            "Quiet suburban apartment in Highlands Ranch. 15-min drive to Swedish. Great trails nearby.",
    },
    // ── Austin Area ────────────────────────────
    {
        id: "hsg-007",
        name: "East Austin Modern Studio",
        address: "1100 E 6th St",
        city: "Austin",
        state: "TX",
        zipCode: "78702",
        monthlyRent: 1750,
        securityDeposit: 500,
        bedroomCount: 0,
        bathroomCount: 1,
        distanceMiles: 1.5,
        nearestHospital: "Dell Seton Medical Center at UT",
        petPolicy: "cats_only",
        amenities: ["WiFi", "In-unit laundry", "Pool", "Bike storage", "Furnished"],
        availableDate: "2026-04-01",
        minLeaseDays: 30,
        furnished: true,
        description:
            "Trendy East Austin studio. Walk to restaurants and live music. Quick commute to Dell Seton.",
    },
    {
        id: "hsg-008",
        name: "UT Campus Area 1BR",
        address: "2600 Salado St",
        city: "Austin",
        state: "TX",
        zipCode: "78705",
        monthlyRent: 1900,
        securityDeposit: 500,
        bedroomCount: 1,
        bathroomCount: 1,
        distanceMiles: 0.3,
        nearestHospital: "St. David's Medical Center",
        petPolicy: "allowed",
        amenities: ["WiFi", "In-unit laundry", "Pool", "Gym", "Furnished", "Garage"],
        availableDate: "2026-04-01",
        minLeaseDays: 30,
        furnished: true,
        description:
            "Steps from St. David's Medical Center and UT campus. All bills paid. Perfect location.",
    },
    {
        id: "hsg-009",
        name: "South Austin 2BR House",
        address: "4500 S 1st St",
        city: "Austin",
        state: "TX",
        zipCode: "78745",
        monthlyRent: 2200,
        securityDeposit: 600,
        bedroomCount: 2,
        bathroomCount: 2,
        distanceMiles: 4.0,
        nearestHospital: "Ascension Seton Medical Center",
        petPolicy: "allowed",
        amenities: ["WiFi", "In-unit laundry", "Yard", "Parking", "Furnished", "Porch"],
        availableDate: "2026-05-01",
        minLeaseDays: 30,
        furnished: true,
        description:
            "Cute bungalow in South Austin. Fenced yard, two bedrooms — great for splitting with another traveler.",
    },
    {
        id: "hsg-010",
        name: "Domain North Luxury 1BR",
        address: "11600 Domain Dr",
        city: "Austin",
        state: "TX",
        zipCode: "78758",
        monthlyRent: 2400,
        securityDeposit: 700,
        bedroomCount: 1,
        bathroomCount: 1,
        distanceMiles: 8.0,
        nearestHospital: "St. David's Medical Center",
        petPolicy: "allowed",
        amenities: ["WiFi", "In-unit laundry", "Pool", "Gym", "Concierge", "Furnished", "Spa"],
        availableDate: "2026-04-15",
        minLeaseDays: 60,
        furnished: true,
        description:
            "Luxury living at The Domain. Shopping and dining at your doorstep. 20-min commute to downtown hospitals.",
    },
    {
        id: "hsg-011",
        name: "Round Rock Family 3BR",
        address: "1200 Sam Bass Rd",
        city: "Round Rock",
        state: "TX",
        zipCode: "78665",
        monthlyRent: 2000,
        securityDeposit: 500,
        bedroomCount: 3,
        bathroomCount: 2,
        distanceMiles: 1.5,
        nearestHospital: "Baylor Scott & White - Round Rock",
        petPolicy: "allowed",
        amenities: ["WiFi", "In-unit laundry", "Yard", "Garage", "Furnished"],
        availableDate: "2026-04-01",
        minLeaseDays: 30,
        furnished: true,
        description:
            "Spacious 3BR home near Baylor Scott & White. Great for families or multiple travelers. Quiet neighborhood.",
    },
    {
        id: "hsg-012",
        name: "Cedar Park Studio Apt",
        address: "600 N Bell Blvd",
        city: "Cedar Park",
        state: "TX",
        zipCode: "78613",
        monthlyRent: 1500,
        securityDeposit: 400,
        bedroomCount: 0,
        bathroomCount: 1,
        distanceMiles: 0.5,
        nearestHospital: "Cedar Park Regional Medical Center",
        petPolicy: "no_pets",
        amenities: ["WiFi", "Shared laundry", "Pool", "Furnished"],
        availableDate: "2026-04-01",
        minLeaseDays: 30,
        furnished: true,
        description:
            "Budget-friendly studio walking distance to Cedar Park Regional. All utilities included. Lowest rent in the area.",
    },
];

// ─── Service ───────────────────────────────────────

export async function fetchHousing(): Promise<HousingDTO[]> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return MOCK_HOUSING;
}

export async function fetchHousingById(id: string): Promise<HousingDTO | null> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return MOCK_HOUSING.find((h) => h.id === id) ?? null;
}

export async function searchHousing(filters: {
    city?: string;
    maxRent?: number;
    petFriendly?: boolean;
}): Promise<HousingDTO[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return MOCK_HOUSING.filter((h) => {
        if (filters.city && !h.city.toLowerCase().includes(filters.city.toLowerCase()))
            return false;
        if (filters.maxRent && h.monthlyRent > filters.maxRent) return false;
        if (filters.petFriendly && h.petPolicy === "no_pets") return false;
        return true;
    });
}
