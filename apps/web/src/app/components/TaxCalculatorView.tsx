"use client";

import React, { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const STATES = [
    "CO", "TX", "CA", "AZ", "FL", "NY", "WA", "OR", "MA", "NC",
    "MI", "IL", "NV", "GA",
];

interface TaxResult {
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

export default function TaxCalculatorView() {
    const [state, setState] = useState("CO");
    const [hourlyRate, setHourlyRate] = useState(50);
    const [hoursPerWeek, setHoursPerWeek] = useState(36);
    const [contractWeeks, setContractWeeks] = useState(13);
    const [result, setResult] = useState<TaxResult | null>(null);
    const [loading, setLoading] = useState(false);

    const calculate = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API}/api/v1/tax/calculate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ state, hourlyRate, hoursPerWeek, contractWeeks }),
            });
            const data = await res.json();
            setResult(data);
        } catch (err) {
            console.error("Tax calc failed:", err);
        } finally {
            setLoading(false);
        }
    };

    const fmt = (n: number) => `$${n.toLocaleString()}`;

    return (
        <div className="view-container">
            <div className="view-header">
                <h1>💰 Tax & Stipend Calculator</h1>
                <p className="view-subtitle">Estimate your weekly take-home pay and stipend breakdown</p>
            </div>

            <div className="calculator-form">
                <div className="form-row">
                    <div className="form-group">
                        <label>Contract State</label>
                        <select value={state} onChange={(e) => setState(e.target.value)}>
                            {STATES.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Hourly Rate ($)</label>
                        <input
                            type="number"
                            value={hourlyRate}
                            onChange={(e) => setHourlyRate(Number(e.target.value))}
                            min={20} max={150}
                        />
                    </div>
                    <div className="form-group">
                        <label>Hours/Week</label>
                        <input
                            type="number"
                            value={hoursPerWeek}
                            onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                            min={12} max={60}
                        />
                    </div>
                    <div className="form-group">
                        <label>Contract Weeks</label>
                        <input
                            type="number"
                            value={contractWeeks}
                            onChange={(e) => setContractWeeks(Number(e.target.value))}
                            min={4} max={26}
                        />
                    </div>
                </div>
                <button className="btn-primary btn-calculate" onClick={calculate} disabled={loading}>
                    {loading ? "Calculating..." : "Calculate Estimate"}
                </button>
            </div>

            {result && (
                <div className="tax-results">
                    <div className="results-grid">
                        <div className="result-card result-card--primary">
                            <h3>Weekly Take-Home</h3>
                            <span className="result-amount result-amount--big">
                                {fmt(result.weeklyBreakdown.estimatedWeeklyTakeHome)}
                            </span>
                        </div>
                        <div className="result-card result-card--secondary">
                            <h3>Contract Total</h3>
                            <span className="result-amount result-amount--big">
                                {fmt(result.contractTotal.estimatedTotalTakeHome)}
                            </span>
                            <span className="result-sub">{result.contractTotal.contractWeeks} weeks</span>
                        </div>
                    </div>

                    <div className="breakdown-section">
                        <h3>📊 Weekly Breakdown</h3>
                        <div className="breakdown-table">
                            <div className="breakdown-row">
                                <span>Gross Weekly Pay</span>
                                <span className="amount">{fmt(result.weeklyBreakdown.grossWeeklyPay)}</span>
                            </div>
                            <div className="breakdown-row breakdown-row--indent">
                                <span>Housing Stipend (non-taxed)</span>
                                <span className="amount amount--green">{fmt(result.weeklyBreakdown.housingStipend)}</span>
                            </div>
                            <div className="breakdown-row breakdown-row--indent">
                                <span>M&IE Stipend (non-taxed)</span>
                                <span className="amount amount--green">{fmt(result.weeklyBreakdown.mealsAndIncidentals)}</span>
                            </div>
                            <div className="breakdown-row breakdown-row--indent">
                                <span>Travel Reimbursement (non-taxed)</span>
                                <span className="amount amount--green">{fmt(result.weeklyBreakdown.travelReimbursement)}</span>
                            </div>
                            <div className="breakdown-row breakdown-row--highlight">
                                <span>Taxable Base</span>
                                <span className="amount">{fmt(result.weeklyBreakdown.taxableBase)}</span>
                            </div>
                            <div className="breakdown-row">
                                <span>Est. Federal Tax (22%)</span>
                                <span className="amount amount--red">-{fmt(result.weeklyBreakdown.estimatedFederalTax)}</span>
                            </div>
                            <div className="breakdown-row">
                                <span>Est. State Tax ({state})</span>
                                <span className="amount amount--red">-{fmt(result.weeklyBreakdown.estimatedStateTax)}</span>
                            </div>
                            <div className="breakdown-row breakdown-row--total">
                                <span>Estimated Weekly Take-Home</span>
                                <span className="amount amount--big">{fmt(result.weeklyBreakdown.estimatedWeeklyTakeHome)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="disclaimer-banner">
                        <span className="disclaimer-icon">⚠️</span>
                        <p>{result.disclaimer}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
