/**
 * RentCast API Service — Housing Ingestion
 *
 * Queries the RentCast API for active rental listings in a given area.
 * Endpoint: https://api.rentcast.io/v1/listings/rental/long-term
 *
 * Docs: https://developers.rentcast.io/reference/rental-listings
 */

// ─── Types ─────────────────────────────────────────

export interface HousingListing {
    id: string;
    title: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    latitude?: number;
    longitude?: number;
    propertyType: string;
    bedrooms: number | null;
    bathrooms: number | null;
    squareFootage: number | null;
    monthlyRent: number;
    weeklyRent: number; // Derived: monthlyRent / 4.33
    isFurnished: boolean;
    isPetFriendly: boolean;
    listingUrl: string | null;
    imageUrl: string | null;
    listedDate: string | null;
    daysOnMarket: number | null;
    source: "rentcast";
}

export interface HousingSearchParams {
    zipCode?: string;
    city?: string;
    state?: string;
    maxRent?: number; // Monthly max
    bedrooms?: number;
    limit?: number;
}

export interface HousingSearchResult {
    listings: HousingListing[];
    totalCount: number;
    searchParams: HousingSearchParams;
}

// ─── Raw API Response ──────────────────────────────

interface RentCastListing {
    id: string;
    formattedAddress: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
    latitude?: number;
    longitude?: number;
    propertyType: string;
    bedrooms?: number;
    bathrooms?: number;
    squareFootage?: number;
    price: number;
    listingType?: string;
    listedDate?: string;
    removedDate?: string;
    daysOnMarket?: number;
    status?: string;
    mlsName?: string;
    mlsNumber?: string;
}

// ─── Service ───────────────────────────────────────

const RENTCAST_BASE_URL = "https://api.rentcast.io/v1/listings/rental/long-term";

function getRentCastApiKey(): string {
    const key = process.env.RENTCAST_API_KEY;
    if (!key) {
        throw new Error("RENTCAST_API_KEY environment variable is required.");
    }
    return key;
}

/**
 * Search for rental listings using the RentCast API.
 *
 * @param params - Search parameters (zipCode, city, state, maxRent, etc.)
 * @returns Parsed listing results
 */
export async function searchRentalListings(
    params: HousingSearchParams
): Promise<HousingSearchResult> {
    const queryParams = new URLSearchParams();

    if (params.zipCode) queryParams.set("zipCode", params.zipCode);
    if (params.city) queryParams.set("city", params.city);
    if (params.state) queryParams.set("state", params.state);
    if (params.bedrooms) queryParams.set("bedrooms", params.bedrooms.toString());
    if (params.limit) queryParams.set("limit", params.limit.toString());

    queryParams.set("status", "Active");

    const url = `${RENTCAST_BASE_URL}?${queryParams.toString()}`;

    const response = await fetch(url, {
        headers: {
            "X-Api-Key": getRentCastApiKey(),
            Accept: "application/json",
        },
    });

    if (!response.ok) {
        console.error(
            `[RentCast API] Error ${response.status}: ${response.statusText}`
        );
        return { listings: [], totalCount: 0, searchParams: params };
    }

    const rawListings = (await response.json()) as RentCastListing[];

    let listings: HousingListing[] = rawListings.map((raw) =>
        transformListing(raw)
    );

    // Client-side max rent filter (API may not support exact price filtering)
    if (params.maxRent) {
        listings = listings.filter((l) => l.monthlyRent <= params.maxRent!);
    }

    return {
        listings,
        totalCount: listings.length,
        searchParams: params,
    };
}

/**
 * Search for housing that fits within a given weekly stipend budget.
 * Used by the Housing Agent.
 *
 * @param zipCode - Hospital area zip code
 * @param weeklyStipend - Max weekly housing stipend from GSA data
 * @param limit - Max results to return (default 3)
 */
export async function searchHousingByStipend(
    zipCode: string,
    weeklyStipend: number,
    limit: number = 3
): Promise<HousingListing[]> {
    // Convert weekly stipend to monthly max
    const monthlyMax = weeklyStipend * 4.33;

    const result = await searchRentalListings({
        zipCode,
        maxRent: monthlyMax,
        limit: limit * 3, // Fetch extra to filter
    });

    // Sort by rent ascending, return top N
    return result.listings
        .sort((a, b) => a.monthlyRent - b.monthlyRent)
        .slice(0, limit);
}

// ─── Helpers ───────────────────────────────────────

function transformListing(raw: RentCastListing): HousingListing {
    const monthlyRent = raw.price || 0;

    return {
        id: raw.id,
        title: `${raw.propertyType || "Rental"} in ${raw.city}`,
        address: raw.formattedAddress || raw.addressLine1,
        city: raw.city,
        state: raw.state,
        zipCode: raw.zipCode,
        latitude: raw.latitude,
        longitude: raw.longitude,
        propertyType: raw.propertyType || "Unknown",
        bedrooms: raw.bedrooms ?? null,
        bathrooms: raw.bathrooms ?? null,
        squareFootage: raw.squareFootage ?? null,
        monthlyRent,
        weeklyRent: Math.round((monthlyRent / 4.33) * 100) / 100,
        isFurnished: false, // RentCast doesn't have a furnished flag—default false
        isPetFriendly: false, // Would need listing description NLP or filter
        listingUrl: null, // RentCast doesn't provide direct URLs in basic plan
        imageUrl: null,
        listedDate: raw.listedDate ?? null,
        daysOnMarket: raw.daysOnMarket ?? null,
        source: "rentcast",
    };
}
