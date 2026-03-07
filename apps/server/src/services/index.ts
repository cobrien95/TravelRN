/**
 * Service barrel exports
 */

export {
    fetchPerDiemRates,
    calculateStipendBreakdown,
    type GsaPerDiemRate,
    type GsaStipendBreakdown,
    type GsaMonthlyRate,
} from "./gsa-perdiem.service.js";

export {
    searchRentalListings,
    searchHousingByStipend,
    type HousingListing,
    type HousingSearchParams,
    type HousingSearchResult,
} from "./rentcast.service.js";

export {
    fetchJobRequisitions,
    fetchJobById,
    searchJobs,
    type JobRequisitionDTO,
} from "./jobs.service.js";

export {
    verifyCredentials,
    canPracticeInState,
    type CredentialVerificationRequest,
    type CredentialVerificationResult,
    type SingleCredentialResult,
    type CredentialToVerify,
} from "./credentials.service.js";
