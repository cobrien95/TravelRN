"use client";

import React from "react";

export interface Job {
    externalId: string;
    source: string;
    title: string;
    specialty: string;
    facilityName: string;
    facilityRating?: number;
    patientRatio?: string;
    magnetStatus?: boolean;
    emrSystem?: string;
    city: string;
    state: string;
    zipCode: string;
    shiftType: string;
    contractWeeks: number;
    grossWeeklyPay: number;
    hoursPerWeek: number;
    startDate: string | null;
    requirements: string[];
    description: string;
    isActive: boolean;
}

interface JobCardProps {
    job: Job;
    index?: number;
}

const SHIFT_COLORS: Record<string, string> = {
    DAY: "var(--accent-amber)",
    NIGHT: "var(--accent-purple)",
    SWING: "var(--accent-blue)",
};

export default function JobCard({ job, index = 0 }: JobCardProps) {
    const shiftColor = SHIFT_COLORS[job.shiftType] || "var(--accent-blue)";

    return (
        <div
            className="job-card animate-fade-in-up"
            style={{ animationDelay: `${index * 60}ms` }}
        >
            {/* Top accent bar */}
            <div
                className="job-card-accent"
                style={{ background: `linear-gradient(90deg, ${shiftColor}, transparent)` }}
            />

            <div className="job-card-header">
                <div>
                    <h3 className="job-card-title">{job.title}</h3>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap", marginTop: "4px", marginBottom: "8px" }}>
                        <span className="job-card-facility" style={{ margin: 0 }}>{job.facilityName}</span>
                        {job.facilityRating && (
                            <span className="rating-stars">★ {job.facilityRating}</span>
                        )}
                        {job.magnetStatus && (
                            <span className="magnet-badge">Magnet</span>
                        )}
                    </div>
                </div>
                <div className="job-card-pay">
                    <span className="job-card-pay-amount">
                        ${job.grossWeeklyPay.toLocaleString()}
                    </span>
                    <span className="job-card-pay-label">/week</span>
                </div>
            </div>

            <div className="job-card-meta">
                <span className="job-card-tag">
                    📍 {job.city}, {job.state}
                </span>
                <span
                    className="job-card-tag"
                    style={{ borderColor: shiftColor, color: shiftColor }}
                >
                    {job.shiftType === "DAY" ? "☀️" : job.shiftType === "NIGHT" ? "🌙" : "🔄"}{" "}
                    {job.shiftType}
                </span>
                <span className="job-card-tag">📅 {job.contractWeeks}wk</span>
                <span className="job-card-tag">⏱️ {job.hoursPerWeek}hr/wk</span>
                {job.patientRatio && <span className="job-card-tag">👥 {job.patientRatio}</span>}
                {job.emrSystem && <span className="job-card-tag">💻 {job.emrSystem}</span>}
            </div>

            <p className="job-card-description">{job.description}</p>

            <div className="job-card-requirements">
                {job.requirements.map((req, i) => (
                    <span key={i} className="job-card-req-badge">
                        {req}
                    </span>
                ))}
            </div>

            <div className="job-card-footer">
                {job.startDate && (
                    <span className="job-card-start">
                        Starts {new Date(job.startDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </span>
                )}
                <button className="job-card-apply-btn">View Details →</button>
            </div>
        </div>
    );
}
