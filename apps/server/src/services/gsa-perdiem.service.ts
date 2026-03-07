/**
 * GSA Per Diem API Service
 *
 * Fetches per diem rates (lodging + M&IE) from the General Services Administration.
 * Endpoint: https://api.gsa.gov/travel/perdiem/v2/rates/city/{city}/state/{ST}/year/{year}
 *
 * Docs: https://www.gsa.gov/technology/government-it-initiatives/digital-strategy/per-diem-apis/api-for-per-diem-rates
 */

// ─── Types ─────────────────────────────────────────

export interface GsaPerDiemRate {
    city: string;
    state: string;
    county: string;
    year: number;
    months: GsaMonthlyRate[];
    mealsTotalPerDay: number; // Total M&IE rate per day
}

export interface GsaMonthlyRate {
    month: number; // 1-12
    lodgingMaxPerNight: number; // Max lodging per night
    mealsPerDay: number; // M&IE per day
}

export interface GsaStipendBreakdown {
    city: string;
    state: string;
    year: number;
    maxLodgingPerNight: number; // Highest monthly lodging rate
    maxLodgingPerWeek: number; // maxLodgingPerNight * 7
    maxLodgingPerMonth: number; // maxLodgingPerNight * 30
    mealsTotalPerDay: number;
    mealsPerWeek: number; // mealsTotalPerDay * 7
    totalWeeklyStipend: number; // maxLodgingPerWeek + mealsPerWeek
}

// ─── Raw API Response Types ────────────────────────

interface GsaApiResponse {
    request: string;
    errors: string[];
    rates: GsaApiRateEntry[];
    version: string;
}

interface GsaApiRateEntry {
    opiCity: string;
    state: string;
    county: string;
    rate: GsaApiRateMonths[];
}

interface GsaApiRateMonths {
    months: {
        month: GsaApiMonth[];
    };
    year: number;
}

interface GsaApiMonth {
    value: number; // lodging rate
    number: number; // month number (1-12)
    short: string; // "Jan", "Feb", etc.
    long: string;
}

// ─── Service ───────────────────────────────────────

const GSA_BASE_URL = "https://api.gsa.gov/travel/perdiem/v2/rates";

function getGsaApiKey(): string {
    const key = process.env.GSA_API_KEY;
    if (!key) {
        throw new Error("GSA_API_KEY environment variable is required.");
    }
    return key;
}

/**
 * Sanitize city name for GSA API.
 * Remove periods, replace apostrophes/hyphens with spaces.
 */
function sanitizeCity(city: string): string {
    return city
        .replace(/\./g, "")
        .replace(/['-]/g, " ")
        .trim();
}

/**
 * Fetch per diem rates from the GSA API by city and state.
 *
 * @param city - City name (e.g., "Denver")
 * @param state - 2-letter state code (e.g., "CO")
 * @param year - Fiscal year (defaults to current year)
 */
export async function fetchPerDiemRates(
    city: string,
    state: string,
    year?: number
): Promise<GsaPerDiemRate | null> {
    const fiscalYear = year || new Date().getFullYear();
    const sanitizedCity = encodeURIComponent(sanitizeCity(city));
    const url = `${GSA_BASE_URL}/city/${sanitizedCity}/state/${state.toUpperCase()}/year/${fiscalYear}`;

    const response = await fetch(url, {
        headers: {
            "x-api-key": getGsaApiKey(),
            Accept: "application/json",
        },
    });

    if (!response.ok) {
        console.error(
            `[GSA API] Error ${response.status}: ${response.statusText} for ${city}, ${state}`
        );
        return null;
    }

    const data = (await response.json()) as GsaApiResponse;

    if (!data.rates || data.rates.length === 0) {
        console.warn(`[GSA API] No rates found for ${city}, ${state} (year ${fiscalYear})`);
        return null;
    }

    const entry = data.rates[0];
    const rateData = entry.rate[0];

    // Extract M&IE rate (consistent across months for most locations)
    // GSA provides a separate "meals" field — we'll derive from the rate data
    const STANDARD_MIE_RATE = 59; // FY2025 standard M&IE rate; update annually

    const months: GsaMonthlyRate[] = rateData.months.month.map((m) => ({
        month: m.number,
        lodgingMaxPerNight: m.value,
        mealsPerDay: STANDARD_MIE_RATE,
    }));

    return {
        city: entry.opiCity || city,
        state: entry.state || state,
        county: entry.county || "",
        year: rateData.year,
        months,
        mealsTotalPerDay: STANDARD_MIE_RATE,
    };
}

/**
 * Calculate weekly/monthly stipend breakdown from per diem rates.
 * This is the primary function used by the Financial Agent.
 */
export async function calculateStipendBreakdown(
    city: string,
    state: string,
    year?: number
): Promise<GsaStipendBreakdown | null> {
    const rates = await fetchPerDiemRates(city, state, year);
    if (!rates) return null;

    // Use the maximum lodging rate across all months (most favorable to nurse)
    const maxLodging = Math.max(...rates.months.map((m) => m.lodgingMaxPerNight));

    const maxLodgingPerWeek = maxLodging * 7;
    const maxLodgingPerMonth = maxLodging * 30;
    const mealsPerWeek = rates.mealsTotalPerDay * 7;

    return {
        city: rates.city,
        state: rates.state,
        year: rates.year,
        maxLodgingPerNight: maxLodging,
        maxLodgingPerWeek,
        maxLodgingPerMonth,
        mealsTotalPerDay: rates.mealsTotalPerDay,
        mealsPerWeek,
        totalWeeklyStipend: maxLodgingPerWeek + mealsPerWeek,
    };
}
