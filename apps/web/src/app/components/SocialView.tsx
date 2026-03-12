"use client";

import React, { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface SocialEvent {
    id: string;
    name: string;
    type: string;
    date: string;
    time: string;
    venue: string;
    city: string;
    imageUrl: string;
    ticketUrl?: string;
    priceRange?: string;
}

export default function SocialView() {
    const [events, setEvents] = useState<SocialEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("Denver");

    const fetchEvents = () => {
        setLoading(true);
        setError(null);
        fetch(`${API_URL}/api/v1/events?location=${encodeURIComponent(searchQuery)}`)
            .then((r) => {
                if (!r.ok) throw new Error("Failed to fetch events");
                return r.json();
            })
            .then((data) => {
                setEvents(data.data || []);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || "An error occurred");
                setLoading(false);
            });
    };

    // Fetch initial and when query is explicitly submitted
    useEffect(() => {
        fetchEvents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchEvents();
    };

    return (
        <div className="view-container">
            <div className="view-header">
                <h1 className="view-title">🥂 Social Events</h1>
                <p className="view-subtitle">
                    Discover local meetups, concerts, and events happening near your assignment.
                </p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="filter-bar" style={{ marginBottom: '2rem' }}>
                <div className="filter-group" style={{ flex: 1, maxWidth: '400px' }}>
                    <label className="filter-label">Location Search</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                            className="filter-input"
                            type="text"
                            placeholder="e.g. Denver, CO"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button 
                            type="submit" 
                            className="action-button"
                            style={{ padding: '0 16px', margin: 0 }}
                            disabled={loading}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </form>

            {/* Results Header */}
            <div className="results-header">
                <span className="results-count">
                    {loading ? "Loading..." : `${events.length} event${events.length !== 1 ? "s" : ""} found`}
                </span>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="jobs-grid">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="loading-card animate-shimmer" style={{ height: '320px' }} />
                    ))}
                </div>
            ) : error ? (
                <div className="empty-state">
                    <span className="empty-state-icon" style={{ color: '#ef4444' }}>⚠️</span>
                    <h3>Could not load events</h3>
                    <p>{error}</p>
                </div>
            ) : events.length === 0 ? (
                <div className="empty-state">
                    <span className="empty-state-icon">📅</span>
                    <h3>No events found in {searchQuery}</h3>
                    <p>Try searching for a different city.</p>
                </div>
            ) : (
                <div className="jobs-grid">
                    {events.map((event) => (
                        <div key={event.id} className="job-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
                            {/* Image Header */}
                            <div style={{ 
                                height: '160px', 
                                backgroundImage: `url(${event.imageUrl})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderBottom: '1px solid var(--border-color)'
                            }} />

                            {/* Content */}
                            <div className="job-card-content" style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div className="job-card-header" style={{ marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                                    <h3 className="job-card-title">{event.name}</h3>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                        <span className="job-card-match" style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>
                                            {event.type.toUpperCase()}
                                        </span>
                                        {event.priceRange && (
                                            <span style={{ color: 'var(--accent-green)', fontWeight: 'bold' }}>
                                                {event.priceRange}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="job-card-details" style={{ marginBottom: '16px' }}>
                                    <div className="job-detail-row">
                                        <span className="job-detail-icon">📅</span>
                                        <span className="job-detail-text">
                                            {new Date(event.date).toLocaleDateString(undefined, {
                                                weekday: 'short', month: 'short', day: 'numeric'
                                            })} • {event.time}
                                        </span>
                                    </div>
                                    <div className="job-detail-row">
                                        <span className="job-detail-icon">📍</span>
                                        <span className="job-detail-text">{event.venue}, {event.city}</span>
                                    </div>
                                </div>

                                {event.ticketUrl && (
                                    <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
                                        <a 
                                            href={event.ticketUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="action-button"
                                            style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
                                        >
                                            Get Tickets
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
