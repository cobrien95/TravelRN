"use client";

import React, { useState } from "react";

export default function ContractReviewView() {
    const [file, setFile] = useState<File | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<typeof MOCK_RESULT | null>(null);
    const [dragOver, setDragOver] = useState(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const f = e.dataTransfer.files[0];
        if (f) setFile(f);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (f) setFile(f);
    };

    const analyzeContract = async () => {
        if (!file) return;
        setAnalyzing(true);
        // Simulate AI analysis delay
        await new Promise((resolve) => setTimeout(resolve, 2500));
        setResult(MOCK_RESULT);
        setAnalyzing(false);
    };

    return (
        <div className="view-container">
            <div className="view-header">
                <h1>📄 AI Contract Review</h1>
                <p className="view-subtitle">
                    Upload a travel nursing contract for AI-powered analysis
                </p>
            </div>

            {!result ? (
                <div className="upload-section">
                    <div
                        className={`upload-zone ${dragOver ? "upload-zone--active" : ""}`}
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={handleDrop}
                    >
                        <div className="upload-icon">📁</div>
                        <h3>Drop your contract here</h3>
                        <p>or click to browse files</p>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx,.txt"
                            onChange={handleFileSelect}
                            className="upload-input"
                        />
                        <p className="upload-formats">Supports: PDF, DOC, DOCX, TXT</p>
                    </div>

                    {file && (
                        <div className="file-preview">
                            <span className="file-icon">📎</span>
                            <span className="file-name">{file.name}</span>
                            <span className="file-size">
                                ({(file.size / 1024).toFixed(1)} KB)
                            </span>
                            <button className="btn-primary" onClick={analyzeContract} disabled={analyzing}>
                                {analyzing ? "🔍 Analyzing..." : "Analyze Contract"}
                            </button>
                        </div>
                    )}

                    {analyzing && (
                        <div className="analysis-progress">
                            <div className="progress-bar">
                                <div className="progress-fill" />
                            </div>
                            <p>AI is reviewing your contract...</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="analysis-results">
                    <div className="results-header">
                        <h2>📋 Contract Analysis</h2>
                        <button className="btn-secondary" onClick={() => { setResult(null); setFile(null); }}>
                            Upload New Contract
                        </button>
                    </div>

                    <div className="analysis-grid">
                        <div className="analysis-card">
                            <h3>💼 Contract Details</h3>
                            <div className="analysis-items">
                                {result.details.map((d, i) => (
                                    <div key={i} className="analysis-item">
                                        <span className="item-label">{d.label}</span>
                                        <span className="item-value">{d.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="analysis-card">
                            <h3>💰 Pay Breakdown</h3>
                            <div className="analysis-items">
                                {result.pay.map((p, i) => (
                                    <div key={i} className="analysis-item">
                                        <span className="item-label">{p.label}</span>
                                        <span className="item-value">{p.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="analysis-card analysis-card--full">
                            <h3>✅ Key Clauses</h3>
                            <div className="clause-list">
                                {result.clauses.map((c, i) => (
                                    <div key={i} className={`clause clause--${c.severity}`}>
                                        <span className="clause-icon">
                                            {c.severity === "good" ? "✅" : c.severity === "warning" ? "⚠️" : "🔴"}
                                        </span>
                                        <div>
                                            <strong>{c.title}</strong>
                                            <p>{c.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="disclaimer-banner">
                        <span className="disclaimer-icon">⚠️</span>
                        <p>
                            This AI analysis is for <strong>informational purposes only</strong> and does not
                            constitute legal advice. Contract terms may vary and should be reviewed by a qualified
                            attorney or your staffing agency representative before signing. TravelRN is not liable
                            for any decisions made based on this analysis.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

// Mock AI analysis response
const MOCK_RESULT = {
    details: [
        { label: "Facility", value: "Denver Health Medical Center" },
        { label: "Position", value: "ICU Registered Nurse" },
        { label: "Start Date", value: "April 14, 2026" },
        { label: "Duration", value: "13 weeks" },
        { label: "Shift", value: "Night Shift — 3x12s" },
        { label: "Hours/Week", value: "36 guaranteed" },
        { label: "Cancellation Policy", value: "2-week notice required" },
    ],
    pay: [
        { label: "Gross Weekly", value: "$2,850" },
        { label: "Taxable Hourly", value: "$22.00/hr" },
        { label: "Housing Stipend", value: "$1,400/mo" },
        { label: "M&IE Stipend", value: "$420/mo" },
        { label: "Travel Reimbursement", value: "$500 one-time" },
        { label: "Completion Bonus", value: "$1,000" },
        { label: "Overtime Rate", value: "1.5x after 40hrs" },
    ],
    clauses: [
        {
            severity: "good",
            title: "Guaranteed Hours",
            description: "36 hours/week guaranteed. If cancelled by facility, you still receive full pay for that shift.",
        },
        {
            severity: "good",
            title: "Completion Bonus",
            description: "$1,000 bonus paid upon completing the full 13-week contract.",
        },
        {
            severity: "warning",
            title: "Float Clause",
            description: "Contract allows floating to Med-Surg and ER within the facility. Consider negotiating to limit float to ICU step-down only.",
        },
        {
            severity: "warning",
            title: "Call Requirement",
            description: "Required to take 1 on-call shift per pay period. On-call pay is $5/hr; if called in, regular rate applies.",
        },
        {
            severity: "danger",
            title: "Early Termination Penalty",
            description: "If you leave before contract completion, you forfeit the completion bonus AND may owe up to $2,000 in housing stipend clawback.",
        },
        {
            severity: "good",
            title: "License & Certification Reimbursement",
            description: "Agency will reimburse up to $500 for state licensure and required certifications.",
        },
    ],
};
