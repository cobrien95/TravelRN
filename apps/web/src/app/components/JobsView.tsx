"use client";

import React, { useEffect, useState } from "react";
import JobCard, { type Job } from "./JobCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const SPECIALTIES = ["All", "ICU", "Med-Surg", "ER", "L&D", "PICU", "Telemetry"];
const STATES = ["All", "AZ", "CA", "CO", "TX"];
const SHIFTS = ["All", "DAY", "NIGHT", "SWING"];

export default function JobsView() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [specialty, setSpecialty] = useState("All");
    const [state, setState] = useState("All");
    const [shift, setShift] = useState("All");
    const [minPay, setMinPay] = useState("");

    useEffect(() => {
        const params = new URLSearchParams();
        if (specialty !== "All") params.set("specialty", specialty);
        if (state !== "All") params.set("state", state);
        if (shift !== "All") params.set("shiftType", shift);
        if (minPay) params.set("minWeeklyPay", minPay);

        const url = params.toString()
            ? `${API_URL}/api/v1/jobs/search?${params}`
            : `${API_URL}/api/v1/jobs`;

        setLoading(true);
        fetch(url)
            .then((r) => r.json())
            .then((data) => {
                setJobs(data.jobs || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [specialty, state, shift, minPay]);

    return (
        <div className="jobs-view">
            <div className="view-header">
                <h1 className="view-title">🏥 Job Contracts</h1>
                <p className="view-subtitle">
                    Browse and filter available travel nursing contracts
                </p>
            </div>

            {/* Filters */}
            <div className="filter-bar">
                <div className="filter-group">
                    <label className="filter-label">Specialty</label>
                    <select
                        className="filter-select"
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                    >
                        {SPECIALTIES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label className="filter-label">State</label>
                    <select
                        className="filter-select"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    >
                        {STATES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label className="filter-label">Shift</label>
                    <select
                        className="filter-select"
                        value={shift}
                        onChange={(e) => setShift(e.target.value)}
                    >
                        {SHIFTS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label className="filter-label">Min Pay ($/wk)</label>
                    <input
                        className="filter-input"
                        type="number"
                        placeholder="e.g. 2500"
                        value={minPay}
                        onChange={(e) => setMinPay(e.target.value)}
                    />
                </div>
            </div>

            {/* Results */}
            <div className="results-header">
                <span className="results-count">
                    {loading ? "Loading..." : `${jobs.length} contract${jobs.length !== 1 ? "s" : ""} found`}
                </span>
            </div>

            {loading ? (
                <div className="jobs-grid">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="loading-card animate-shimmer" />
                    ))}
                </div>
            ) : jobs.length === 0 ? (
                <div className="empty-state">
                    <span className="empty-state-icon">🔍</span>
                    <h3>No contracts found</h3>
                    <p>Try adjusting your filters to see more results.</p>
                </div>
            ) : (
                <div className="jobs-grid">
                    {jobs.map((job, i) => (
                        <JobCard key={job.externalId} job={job} index={i} />
                    ))}
                </div>
            )}
        </div>
    );
}
