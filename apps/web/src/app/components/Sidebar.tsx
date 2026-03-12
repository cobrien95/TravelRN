"use client";

import React from "react";

interface SidebarProps {
    activeView: string;
    onNavigate: (view: string) => void;
}

const NAV_ITEMS = [
    { id: "home", label: "Dashboard", icon: "📊" },
    { id: "jobs", label: "Jobs", icon: "🏥" },
    { id: "credentials", label: "Credentials", icon: "📋" },
    { id: "housing", label: "Housing", icon: "🏠" },
    { id: "tax", label: "Tax & Stipend", icon: "💰" },
    { id: "contracts", label: "Contract Review", icon: "📄" },
    { id: "social", label: "Social Events", icon: "🥂" },
];

export default function Sidebar({ activeView, onNavigate }: SidebarProps) {
    const [collapsed, setCollapsed] = React.useState(false);

    return (
        <>
            {/* Mobile toggle */}
            <button
                className="sidebar-mobile-toggle"
                onClick={() => setCollapsed(!collapsed)}
                aria-label="Toggle navigation"
            >
                {collapsed ? "☰" : "✕"}
            </button>

            <aside className={`sidebar ${collapsed ? "sidebar--collapsed" : ""}`}>
                {/* Logo */}
                <div className="sidebar-logo">
                    <div className="sidebar-logo-icon">🩺</div>
                    <div className="sidebar-logo-text">
                        <span className="sidebar-logo-title">TravelRN</span>
                        <span className="sidebar-logo-subtitle">Career Dashboard</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="sidebar-nav">
                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item.id}
                            className={`sidebar-nav-item ${activeView === item.id ? "sidebar-nav-item--active" : ""}`}
                            onClick={() => {
                                onNavigate(item.id);
                                setCollapsed(true);
                            }}
                        >
                            <span className="sidebar-nav-icon">{item.icon}</span>
                            <span className="sidebar-nav-label">{item.label}</span>
                        </button>
                    ))}
                </nav>

                {/* Footer */}
                <div className="sidebar-footer">
                    <div className="sidebar-status">
                        <div className="sidebar-status-dot" />
                        <span className="sidebar-status-text">API Connected</span>
                    </div>
                    <span className="sidebar-version">v0.1.0 beta</span>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {!collapsed && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setCollapsed(true)}
                />
            )}
        </>
    );
}
