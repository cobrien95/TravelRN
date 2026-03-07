/**
 * LangChain Tool Definitions
 *
 * Wraps our Phase 2 services as LangChain tools so agents can call them.
 */

import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { calculateStipendBreakdown } from "../services/gsa-perdiem.service.js";
import { searchHousingByStipend } from "../services/rentcast.service.js";
import { searchJobs, fetchJobById } from "../services/jobs.service.js";
import {
    verifyCredentials,
    canPracticeInState,
} from "../services/credentials.service.js";

// ─── GSA Stipend Tool ──────────────────────────────

export const gsaStipendTool = tool(
    async ({ city, state, year }) => {
        const result = await calculateStipendBreakdown(city, state, year);
        if (!result) {
            return JSON.stringify({
                error: `No per diem rates found for ${city}, ${state}`,
            });
        }
        return JSON.stringify(result, null, 2);
    },
    {
        name: "get_gsa_stipend",
        description:
            "Fetch the GSA per diem rates for a city and state. Returns the max tax-free lodging rate per night/week/month, the M&IE (meals & incidental expenses) rate, and the total weekly stipend amount. Use this to calculate tax-free pay components.",
        schema: z.object({
            city: z.string().describe("City name, e.g. 'Denver'"),
            state: z
                .string()
                .length(2)
                .describe("Two-letter state code, e.g. 'CO'"),
            year: z
                .number()
                .optional()
                .describe("Fiscal year (defaults to current year)"),
        }),
    }
);

// ─── Housing Search Tool ───────────────────────────

export const housingSearchTool = tool(
    async ({ zipCode, weeklyBudget, limit }) => {
        const listings = await searchHousingByStipend(
            zipCode,
            weeklyBudget,
            limit
        );
        if (listings.length === 0) {
            return JSON.stringify({
                message: `No rentals found under $${weeklyBudget}/week in zip ${zipCode}`,
                listings: [],
            });
        }
        return JSON.stringify(
            {
                count: listings.length,
                weeklyBudget,
                listings: listings.map((l) => ({
                    title: l.title,
                    address: l.address,
                    monthlyRent: l.monthlyRent,
                    weeklyRent: l.weeklyRent,
                    bedrooms: l.bedrooms,
                    bathrooms: l.bathrooms,
                    isFurnished: l.isFurnished,
                    isPetFriendly: l.isPetFriendly,
                    listingUrl: l.listingUrl,
                })),
            },
            null,
            2
        );
    },
    {
        name: "search_housing",
        description:
            "Search for rental housing near a hospital zip code that fits within a weekly stipend budget. Returns up to N affordable rentals sorted by price ascending.",
        schema: z.object({
            zipCode: z.string().length(5).describe("5-digit zip code near the hospital"),
            weeklyBudget: z
                .number()
                .describe("Maximum weekly housing budget in dollars"),
            limit: z
                .number()
                .default(3)
                .describe("Number of results to return (default 3)"),
        }),
    }
);

// ─── Job Search Tool ───────────────────────────────

export const jobSearchTool = tool(
    async ({ specialty, state, shiftType, minWeeklyPay }) => {
        const jobs = await searchJobs({
            specialty: specialty || undefined,
            state: state || undefined,
            shiftType: (shiftType as "DAY" | "NIGHT" | "SWING") || undefined,
            minWeeklyPay: minWeeklyPay || undefined,
        });
        return JSON.stringify(
            {
                count: jobs.length,
                jobs: jobs.map((j) => ({
                    externalId: j.externalId,
                    title: j.title,
                    specialty: j.specialty,
                    facility: j.facilityName,
                    location: `${j.city}, ${j.state} ${j.zipCode}`,
                    city: j.city,
                    state: j.state,
                    zipCode: j.zipCode,
                    shiftType: j.shiftType,
                    contractWeeks: j.contractWeeks,
                    grossWeeklyPay: j.grossWeeklyPay,
                    hoursPerWeek: j.hoursPerWeek,
                    startDate: j.startDate,
                    requirements: j.requirements,
                    description: j.description,
                })),
            },
            null,
            2
        );
    },
    {
        name: "search_jobs",
        description:
            "Search for travel nurse job requisitions. Can filter by specialty (ICU, Med-Surg, ER, L&D, PICU, Telemetry), state (2-letter code), shift type (DAY/NIGHT/SWING), and minimum weekly gross pay.",
        schema: z.object({
            specialty: z.string().optional().describe("Nursing specialty, e.g. 'ICU'"),
            state: z.string().optional().describe("Two-letter state code, e.g. 'CO'"),
            shiftType: z
                .enum(["DAY", "NIGHT", "SWING"])
                .optional()
                .describe("Shift preference"),
            minWeeklyPay: z
                .number()
                .optional()
                .describe("Minimum gross weekly pay in dollars"),
        }),
    }
);

// ─── Job Detail Tool ───────────────────────────────

export const jobDetailTool = tool(
    async ({ externalId }) => {
        const job = await fetchJobById(externalId);
        if (!job) {
            return JSON.stringify({ error: `Job ${externalId} not found` });
        }
        return JSON.stringify(job, null, 2);
    },
    {
        name: "get_job_details",
        description:
            "Get full details for a specific job requisition by its external ID.",
        schema: z.object({
            externalId: z.string().describe("The job's external ID, e.g. 'MRG-2026-001'"),
        }),
    }
);

// ─── Credential Verification Tool ──────────────────

export const credentialVerifyTool = tool(
    async ({ nurseId, firstName, lastName, licenseNumber, licenseState, certifications }) => {
        const credentials = [];

        if (licenseNumber && licenseState) {
            credentials.push({
                type: "license" as const,
                identifier: licenseNumber,
                state: licenseState,
            });
        }

        for (const cert of certifications || []) {
            credentials.push({
                type: "certification" as const,
                identifier: cert,
                issuingBody: "AHA",
            });
        }

        const result = await verifyCredentials({
            nurseId,
            firstName,
            lastName,
            credentials,
        });

        return JSON.stringify(result, null, 2);
    },
    {
        name: "verify_credentials",
        description:
            "Verify a nurse's licenses and certifications via Primary Source Verification. Checks if licenses are active (including compact/eNLC status) and if certifications (BLS, ACLS, PALS, etc.) are current.",
        schema: z.object({
            nurseId: z.string().describe("The nurse's ID"),
            firstName: z.string().describe("Nurse first name"),
            lastName: z.string().describe("Nurse last name"),
            licenseNumber: z.string().optional().describe("RN license number"),
            licenseState: z
                .string()
                .optional()
                .describe("State the license was issued in"),
            certifications: z
                .array(z.string())
                .optional()
                .describe('Array of cert names, e.g. ["BLS", "ACLS"]'),
        }),
    }
);

// ─── State Practice Check Tool ─────────────────────

export const statePracticeCheckTool = tool(
    async ({ nurseId, firstName, lastName, licenseNumber, licenseState, targetState }) => {
        const result = await canPracticeInState(
            {
                nurseId,
                firstName,
                lastName,
                credentials: [
                    {
                        type: "license",
                        identifier: licenseNumber,
                        state: licenseState,
                    },
                ],
            },
            targetState
        );
        return JSON.stringify(result, null, 2);
    },
    {
        name: "check_state_practice",
        description:
            "Check if a nurse can legally practice in a target state based on their license (including compact/eNLC privilege).",
        schema: z.object({
            nurseId: z.string(),
            firstName: z.string(),
            lastName: z.string(),
            licenseNumber: z.string().describe("Nurse's RN license number"),
            licenseState: z
                .string()
                .describe("State the license was issued in"),
            targetState: z
                .string()
                .describe("The state the nurse wants to work in"),
        }),
    }
);

/** All tools available to the supervisor agent */
export const allTools = [
    gsaStipendTool,
    housingSearchTool,
    jobSearchTool,
    jobDetailTool,
    credentialVerifyTool,
    statePracticeCheckTool,
];
