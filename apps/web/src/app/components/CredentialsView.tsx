"use client";

import React, { useState, useEffect } from "react";

interface Credential {
    id: string;
    type: "license" | "certification";
    name: string;
    issuingBody: string;
    state: string | null;
    status: "active" | "expiring_soon" | "expired" | "pending";
    issueDate: string;
    expirationDate: string;
    isCompact: boolean;
    renewalUrl: string | null;
}

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function CredentialsView() {
    const [credentials, setCredentials] = useState<Credential[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCreds = async () => {
            try {
                const res = await fetch(`${API}/api/v1/credentials`);
                const data = await res.json();
                setCredentials(data);
            } catch (err) {
                console.error("Failed to fetch credentials:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCreds();
    }, []);

    const licenses = credentials.filter(c => c.type === "license");
    const certs = credentials.filter(c => c.type === "certification");

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active": return <span className="badge badge-green">Active</span>;
            case "expiring_soon": return <span className="badge badge-amber">⚠️ Expiring Soon</span>;
            case "expired": return <span className="badge badge-rose">❌ Expired</span>;
            case "pending": return <span className="badge">Pending</span>;
            default: return null;
        }
    };

    const StatusSummary = () => {
        const expiring = credentials.filter(c => c.status === "expiring_soon").length;
        const expired = credentials.filter(c => c.status === "expired").length;

        if (expiring === 0 && expired === 0) return null;

        return (
            <div className="disclaimer-banner" style={{ background: expired > 0 ? "var(--accent-rose-soft)" : "var(--accent-amber-soft)", marginBottom: "20px" }}>
                <span className="disclaimer-icon">{expired > 0 ? "❌" : "⚠️"}</span>
                <div>
                    <strong>Action Required:</strong>
                    <p>You have {expired} expired and {expiring} expiring credential(s). Please renew immediately to avoid contract assignment delays.</p>
                </div>
            </div>
        );
    };

    return (
        <div className="view-container">
            <div className="view-header">
                <h1>📋 Licenses & Certifications</h1>
                <p className="view-subtitle">Manage your professional credentials to stay compliant</p>
            </div>

            {loading ? (
                <div className="loading-state">Loading credentials...</div>
            ) : (
                <>
                    <StatusSummary />
                    <div className="card-grid">
                        <div className="card">
                            <div className="card-header">
                                <h3>Nursing Licenses</h3>
                            </div>
                            <div className="analysis-items">
                                {licenses.map(lic => (
                                    <div key={lic.id} className="credential-row" style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "12px", marginBottom: "12px" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                                            <strong>{lic.state} RN License {lic.isCompact && "(Compact)"}</strong>
                                            {getStatusBadge(lic.status)}
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">Board</span>
                                            <span className="detail-value">{lic.issuingBody}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">Expires</span>
                                            <span className="detail-value" style={{ color: lic.status === "expiring_soon" ? "var(--accent-amber)" : "inherit" }}>
                                                {lic.expirationDate}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h3>Certifications</h3>
                            </div>
                            <div className="analysis-items">
                                {certs.map(cert => (
                                    <div key={cert.id} className="credential-row" style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "12px", marginBottom: "12px" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                                            <strong>{cert.name}</strong>
                                            {getStatusBadge(cert.status)}
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">Expires</span>
                                            <span className="detail-value" style={{
                                                color: cert.status === "expired" ? "var(--accent-rose)" :
                                                    cert.status === "expiring_soon" ? "var(--accent-amber)" : "inherit",
                                                fontWeight: cert.status !== "active" ? "bold" : "normal"
                                            }}>
                                                {cert.expirationDate}
                                            </span>
                                        </div>
                                        {cert.status !== "active" && (
                                            <a href={cert.renewalUrl || "#"} target="_blank" rel="noreferrer" style={{ display: "block", marginTop: "8px", fontSize: "0.8rem", color: "var(--accent-blue)", textDecoration: "none" }}>
                                                Click to Renew ➔
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
