"use client";

import React, { useEffect, useState } from "react";
import JobCard, { type Job } from "./JobCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface StatCard {
    label: string;
    value: string;
    icon: string;
    color: string;
}

export default function DashboardHome({ onNavigate }: { onNavigate: (view: string) => void }) {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/api/v1/jobs`)
            .then((r) => r.json())
            .then((data) => {
                setJobs(data.jobs || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const avgPay = jobs.length
        ? Math.round(jobs.reduce((a, j) => a + j.grossWeeklyPay, 0) / jobs.length)
        : 0;

    const states = new Set(jobs.map((j) => j.state));

    const stats: StatCard[] = [
        {
            label: "Active Contracts",
            value: jobs.length.toString(),
            icon: "🏥",
            color: "var(--accent-blue)",
        },
        {
            label: "Avg Weekly Pay",
            value: `$${avgPay.toLocaleString()}`,
            icon: "💰",
            color: "var(--accent-green)",
        },
        {
            label: "States Available",
            value: states.size.toString(),
            icon: "🗺️",
            color: "var(--accent-purple)",
        },
        {
            label: "Credentials",
            value: "2 Active",
            icon: "📋",
            color: "var(--accent-amber)",
        },
    ];

    return (
        <div className="dashboard-home">
            {/* Welcome */}
            <div className="dashboard-welcome">
                <h1 className="dashboard-welcome-title">
                    Welcome back 👋
                </h1>
                <p className="dashboard-welcome-subtitle">
                    Here&apos;s your travel nursing career overview
                </p>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        className="stat-card animate-fade-in-up"
                        style={{ animationDelay: `${i * 80}ms` }}
                    >
                        <div className="stat-card-icon" style={{ background: `${stat.color}20` }}>
                            <span>{stat.icon}</span>
                        </div>
                        <div className="stat-card-info">
                            <span className="stat-card-value" style={{ color: stat.color }}>
                                {loading ? "—" : stat.value}
                            </span>
                            <span className="stat-card-label">{stat.label}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Featured Jobs */}
            <div className="dashboard-section">
                <div className="dashboard-section-header">
                    <h2 className="dashboard-section-title">🔥 Featured Contracts</h2>
                    <button
                        className="dashboard-section-link"
                        onClick={() => onNavigate("jobs")}
                    >
                        View all →
                    </button>
                </div>

                {loading ? (
                    <div className="loading-grid">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="loading-card animate-shimmer" />
                        ))}
                    </div>
                ) : (
                    <div className="jobs-grid">
                        {jobs.slice(0, 3).map((job, i) => (
                            <JobCard key={job.externalId} job={job} index={i} />
                        ))}
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            <div className="dashboard-section">
                <h2 className="dashboard-section-title">⚡ Quick Actions</h2>
                <div className="quick-actions">
                    <button className="quick-action-btn" onClick={() => onNavigate("jobs")}>
                        <span className="quick-action-icon">🔍</span>
                        <span>Search Contracts</span>
                    </button>
                    <button className="quick-action-btn" onClick={() => onNavigate("credentials")}>
                        <span className="quick-action-icon">✅</span>
                        <span>Check Credentials</span>
                    </button>
                    <button className="quick-action-btn" onClick={() => onNavigate("housing")}>
                        <span className="quick-action-icon">🏠</span>
                        <span>Find Housing</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
