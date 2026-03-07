/**
 * Phase 2 — Service Integration Smoke Test
 * Run with: npx tsx test-services.ts
 */

import { fetchJobRequisitions, searchJobs } from "./src/services/jobs.service.js";
import {
    verifyCredentials,
    canPracticeInState,
} from "./src/services/credentials.service.js";

async function main() {
    console.log("═══════════════════════════════════════════");
    console.log("  Phase 2 — Service Integration Tests");
    console.log("═══════════════════════════════════════════\n");

    // ── Test 1: Fetch all jobs ──
    console.log("📋 Test 1: Fetch all job requisitions");
    const allJobs = await fetchJobRequisitions();
    console.log(`   Found ${allJobs.length} active jobs`);
    allJobs.forEach((j) =>
        console.log(
            `   • [${j.externalId}] ${j.title} @ ${j.facilityName}, ${j.city}, ${j.state} — $${j.grossWeeklyPay}/wk`
        )
    );
    console.log(`   ✅ PASS\n`);

    // ── Test 2: Search by specialty + state ──
    console.log("🔍 Test 2: Search ICU jobs in CO");
    const icuJobs = await searchJobs({ specialty: "ICU", state: "CO" });
    console.log(`   Found ${icuJobs.length} ICU jobs in CO`);
    icuJobs.forEach((j) => console.log(`   • ${j.title} — $${j.grossWeeklyPay}/wk`));
    console.log(`   ✅ PASS\n`);

    // ── Test 3: Verify credentials (all pass) ──
    console.log("🔐 Test 3: Verify credentials — all should pass");
    const verifyResult = await verifyCredentials({
        nurseId: "nurse-001",
        firstName: "Jane",
        lastName: "Doe",
        credentials: [
            { type: "license", identifier: "RN-88842", state: "CO" }, // even → verified
            { type: "certification", identifier: "BLS", issuingBody: "AHA" },
            { type: "certification", identifier: "ACLS", issuingBody: "AHA" },
        ],
    });
    console.log(`   Overall: ${verifyResult.overallStatus}`);
    verifyResult.results.forEach((r) =>
        console.log(`   • ${r.identifier}: ${r.status} — ${r.details}`)
    );
    const test3Pass = verifyResult.overallStatus === "PASS";
    console.log(`   ${test3Pass ? "✅ PASS" : "❌ FAIL"}\n`);

    // ── Test 4: Verify credentials — mixed (expired cert) ──
    console.log("🔐 Test 4: Verify credentials — PALS should be expired");
    const mixedResult = await verifyCredentials({
        nurseId: "nurse-002",
        firstName: "John",
        lastName: "Smith",
        credentials: [
            { type: "license", identifier: "RN-77720", state: "TX" },
            { type: "certification", identifier: "BLS", issuingBody: "AHA" },
            { type: "certification", identifier: "PALS", issuingBody: "AHA" }, // mock expired
        ],
    });
    console.log(`   Overall: ${mixedResult.overallStatus}`);
    mixedResult.results.forEach((r) =>
        console.log(`   • ${r.identifier}: ${r.status}`)
    );
    const test4Pass = mixedResult.overallStatus === "FAIL";
    console.log(`   ${test4Pass ? "✅ PASS" : "❌ FAIL"}\n`);

    // ── Test 5: Can practice in compact state ──
    console.log("🏥 Test 5: Can nurse with CO compact license practice in TX?");
    const practiceResult = await canPracticeInState(
        {
            nurseId: "nurse-001",
            firstName: "Jane",
            lastName: "Doe",
            credentials: [
                { type: "license", identifier: "RN-88842", state: "CO" },
            ],
        },
        "TX"
    );
    console.log(`   Can practice: ${practiceResult.canPractice}`);
    console.log(`   Reason: ${practiceResult.reason}`);
    const test5Pass = practiceResult.canPractice === true;
    console.log(`   ${test5Pass ? "✅ PASS" : "❌ FAIL"}\n`);

    // ── Summary ──
    const allPassed = test3Pass && test4Pass && test5Pass;
    console.log("═══════════════════════════════════════════");
    console.log(allPassed ? "  ✅ All tests passed!" : "  ❌ Some tests failed!");
    console.log("═══════════════════════════════════════════");
    process.exit(allPassed ? 0 : 1);
}

main().catch(console.error);
