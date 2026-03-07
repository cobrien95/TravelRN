/**
 * Tax & Stipend Calculator Service
 * Uses simplified GSA per diem rates for travel nurse pay estimates.
 * DISCLAIMER: This is for informational/demo purposes only.
 */

export interface TaxCalculationRequest {
    state: string;
    hourlyRate: number;
    hoursPerWeek: number;
    contractWeeks: number;
}

export interface TaxCalculationResult {
    weeklyBreakdown: {
        grossWeeklyPay: number;
        taxableBase: number;
        housingStipend: number;
        mealsAndIncidentals: number;
        travelReimbursement: number;
        estimatedFederalTax: number;
        estimatedStateTax: number;
        estimatedWeeklyTakeHome: number;
    };
    contractTotal: {
        grossContractPay: number;
        totalTaxable: number;
        totalStipends: number;
        estimatedTotalTakeHome: number;
        contractWeeks: number;
    };
    disclaimer: string;
}

// GSA per diem rates (simplified — major metro areas)
const GSA_RATES: Record<string, { housing: number; mie: number }> = {
    CO: { housing: 1400, mie: 420 },
    TX: { housing: 1200, mie: 406 },
    CA: { housing: 1800, mie: 462 },
    AZ: { housing: 1100, mie: 406 },
    FL: { housing: 1300, mie: 420 },
    NY: { housing: 2200, mie: 490 },
    WA: { housing: 1500, mie: 434 },
    OR: { housing: 1400, mie: 420 },
    MA: { housing: 1700, mie: 462 },
    NC: { housing: 1100, mie: 392 },
    MI: { housing: 1000, mie: 378 },
    IL: { housing: 1500, mie: 434 },
    NV: { housing: 1300, mie: 420 },
    GA: { housing: 1200, mie: 406 },
    DEFAULT: { housing: 1200, mie: 400 },
};

// Simplified state income tax rates
const STATE_TAX_RATES: Record<string, number> = {
    CO: 0.044, TX: 0, CA: 0.093, AZ: 0.025, FL: 0,
    NY: 0.0685, WA: 0, OR: 0.09, MA: 0.05, NC: 0.0475,
    MI: 0.0425, IL: 0.0495, NV: 0, GA: 0.055, DEFAULT: 0.05,
};

const LEGAL_DISCLAIMER = `⚠️ LEGAL DISCLAIMER: This calculator provides ESTIMATES ONLY for informational and educational purposes. Actual tax liability depends on your individual circumstances including filing status, deductions, tax home qualification, and other factors. TravelRN is not a tax advisor, CPA, or financial planner. This tool does not constitute tax advice, and you should NOT rely on these estimates for tax planning or filing purposes. Consult a qualified tax professional familiar with travel nursing tax law before making financial decisions. By using this calculator, you acknowledge that TravelRN, its affiliates, and its developers are not liable for any financial decisions made based on these estimates. Use at your own risk.`;

export async function calculateTaxEstimate(
    req: TaxCalculationRequest
): Promise<TaxCalculationResult> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const state = req.state.toUpperCase();
    const gsa = GSA_RATES[state] || GSA_RATES.DEFAULT;
    const stateTaxRate = STATE_TAX_RATES[state] ?? STATE_TAX_RATES.DEFAULT;
    const federalTaxRate = 0.22; // Simplified flat 22%

    const grossWeekly = req.hourlyRate * req.hoursPerWeek;
    const housingStipend = Math.round(gsa.housing / 4.33); // monthly -> weekly
    const mie = Math.round(gsa.mie / 4.33);
    const travelReimb = 50; // flat weekly

    const taxableBase = grossWeekly - housingStipend - mie - travelReimb;
    const fedTax = Math.round(taxableBase * federalTaxRate);
    const stTax = Math.round(taxableBase * stateTaxRate);
    const weeklyTakeHome = grossWeekly - fedTax - stTax;

    return {
        weeklyBreakdown: {
            grossWeeklyPay: grossWeekly,
            taxableBase: Math.max(taxableBase, 0),
            housingStipend,
            mealsAndIncidentals: mie,
            travelReimbursement: travelReimb,
            estimatedFederalTax: fedTax,
            estimatedStateTax: stTax,
            estimatedWeeklyTakeHome: weeklyTakeHome,
        },
        contractTotal: {
            grossContractPay: grossWeekly * req.contractWeeks,
            totalTaxable: Math.max(taxableBase, 0) * req.contractWeeks,
            totalStipends: (housingStipend + mie + travelReimb) * req.contractWeeks,
            estimatedTotalTakeHome: weeklyTakeHome * req.contractWeeks,
            contractWeeks: req.contractWeeks,
        },
        disclaimer: LEGAL_DISCLAIMER,
    };
}
