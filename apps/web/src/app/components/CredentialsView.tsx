"use client";

import React from "react";

interface License {
    id: string;
    state: string;
    licenseNumber: string;
    licenseType: string;
    expiresAt: string;
    verified: boolean;
    isCompact: boolean;
}

interface Certification {
    id: string;
    name: string;
    issuingBody: string;
    expiresAt: string;
    verified: boolean;
}

// Mock data for demo purposes
const MOCK_LICENSES: License[] = [
    {
        id: "1",
        state: "CO",
        licenseNumber: "RN-88842",
        licenseType: "COMPACT",
        expiresAt: "2027-12-31",
        verified: true,
        isCompact: true,
    },
    {
        id: "2",
        state: "CA",
        licenseNumber: "RN-442201",
        licenseType: "RN",
        expiresAt: "2026-06-15",
        verified: true,
        isCompact: false,
    },
];

const MOCK_CERTS: Certification[] = [
    {
        id: "1",
        name: "BLS",
        issuingBody: "American Heart Association",
        expiresAt: "2028-06-30",
        verified: true,
    },
    {
        id: "2",
        name: "ACLS",
        issuingBody: "American Heart Association",
        expiresAt: "2028-06-30",
        verified: true,
    },
    {
        id: "3",
        name: "PALS",
        issuingBody: "American Heart Association",
        expiresAt: "2025-03-01",
        verified: false,
    },
];

function getStatusBadge(expiresAt: string, verified: boolean) {
    const now = new Date();
    const exp = new Date(expiresAt);
    const daysUntil = Math.floor((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntil < 0) {
        return { label: "Expired", className: "badge--expired" };
    }
    if (daysUntil < 90) {
        return { label: `Expires in ${daysUntil}d`, className: "badge--warning" };
    }
    if (verified) {
        return { label: "Verified", className: "badge--verified" };
    }
    return { label: "Pending", className: "badge--pending" };
}

export default function CredentialsView() {
    return (
        <div className="credentials-view">
            <div className="view-header">
                <h1 className="view-title">📋 Credentials</h1>
                <p className="view-subtitle">
                    Your licenses and certifications at a glance
                </p>
            </div>

            {/* Overall status */}
            <div className="credentials-summary">
                <div className="cred-summary-card cred-summary--good">
                    <span className="cred-summary-icon">✅</span>
                    <div>
                        <span className="cred-summary-value">2</span>
                        <span className="cred-summary-label">Active Licenses</span>
                    </div>
                </div>
                <div className="cred-summary-card cred-summary--good">
                    <span className="cred-summary-icon">🎓</span>
                    <div>
                        <span className="cred-summary-value">2</span>
                        <span className="cred-summary-label">Active Certs</span>
                    </div>
                </div>
                <div className="cred-summary-card cred-summary--alert">
                    <span className="cred-summary-icon">⚠️</span>
                    <div>
                        <span className="cred-summary-value">1</span>
                        <span className="cred-summary-label">Needs Attention</span>
                    </div>
                </div>
            </div>

            {/* Licenses */}
            <div className="dashboard-section">
                <h2 className="dashboard-section-title">🪪 Nursing Licenses</h2>
                <div className="credentials-grid">
                    {MOCK_LICENSES.map((lic, i) => {
                        const status = getStatusBadge(lic.expiresAt, lic.verified);
                        return (
                            <div
                                key={lic.id}
                                className="credential-card animate-fade-in-up"
                                style={{ animationDelay: `${i * 80}ms` }}
                            >
                                <div className="credential-card-header">
                                    <div>
                                        <h3 className="credential-card-title">
                                            {lic.state} — {lic.licenseType}
                                        </h3>
                                        <p className="credential-card-number">{lic.licenseNumber}</p>
                                    </div>
                                    <span className={`credential-badge ${status.className}`}>
                                        {status.label}
                                    </span>
                                </div>
                                <div className="credential-card-meta">
                                    <span>
                                        Expires:{" "}
                                        {new Date(lic.expiresAt).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </span>
                                    {lic.isCompact && (
                                        <span className="compact-badge">⭐ Compact (eNLC)</span>
                                    )}
                                </div>
                                {lic.isCompact && (
                                    <p className="credential-card-note">
                                        Practice authorized in 36+ compact states
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Certifications */}
            <div className="dashboard-section">
                <h2 className="dashboard-section-title">🎓 Certifications</h2>
                <div className="credentials-grid">
                    {MOCK_CERTS.map((cert, i) => {
                        const status = getStatusBadge(cert.expiresAt, cert.verified);
                        return (
                            <div
                                key={cert.id}
                                className="credential-card animate-fade-in-up"
                                style={{ animationDelay: `${i * 80}ms` }}
                            >
                                <div className="credential-card-header">
                                    <div>
                                        <h3 className="credential-card-title">{cert.name}</h3>
                                        <p className="credential-card-number">{cert.issuingBody}</p>
                                    </div>
                                    <span className={`credential-badge ${status.className}`}>
                                        {status.label}
                                    </span>
                                </div>
                                <div className="credential-card-meta">
                                    <span>
                                        Expires:{" "}
                                        {new Date(cert.expiresAt).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
