"use client";

import React, { useState, useEffect } from "react";

interface Housing {
    id: string;
    name: string;
    city: string;
    state: string;
    monthlyRent: number;
    bedroomCount: number;
    bathroomCount: number;
    distanceMiles: number;
    nearestHospital: string;
    petPolicy: "allowed" | "cats_only" | "no_pets";
    amenities: string[];
    availableDate: string;
    description: string;
}

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function HousingView() {
    const [housing, setHousing] = useState<Housing[]>([]);
    const [loading, setLoading] = useState(true);
    const [cityFilter, setCityFilter] = useState("");

    useEffect(() => {
        fetchHousing();
    }, []);

    const fetchHousing = async (city?: string) => {
        setLoading(true);
        try {
            const url = city
                ? `${API}/api/v1/housing?city=${encodeURIComponent(city)}`
                : `${API}/api/v1/housing`;
            const res = await fetch(url);
            const data = await res.json();
            setHousing(data);
        } catch (err) {
            console.error("Failed to fetch housing:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        fetchHousing(cityFilter || undefined);
    };

    const petIcon = (policy: string) => {
        switch (policy) {
            case "allowed": return "🐾 Pets OK";
            case "cats_only": return "🐱 Cats Only";
            case "no_pets": return "🚫 No Pets";
            default: return "";
        }
    };

    return (
        <div className="view-container">
            <div className="view-header">
                <h1>🏠 Furnished Housing</h1>
                <p className="view-subtitle">Find short-term furnished rentals near your contract</p>
            </div>

            <div className="filter-bar">
                <div className="filter-group">
                    <label>City</label>
                    <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
                        <option value="">All Cities</option>
                        <option value="Denver">Denver Area</option>
                        <option value="Austin">Austin Area</option>
                        <option value="Round Rock">Round Rock</option>
                        <option value="Cedar Park">Cedar Park</option>
                    </select>
                </div>
                <button className="btn-primary" onClick={handleSearch}>Search</button>
            </div>

            {loading ? (
                <div className="loading-state">Loading housing options...</div>
            ) : (
                <div className="card-grid">
                    {housing.map((h) => (
                        <div key={h.id} className="card housing-card">
                            <div className="card-header">
                                <h3>{h.name}</h3>
                                <span className="badge badge-accent">
                                    ${h.monthlyRent.toLocaleString()}/mo
                                </span>
                            </div>
                            <div className="card-meta">
                                <span>📍 {h.city}, {h.state}</span>
                                <span>🛏️ {h.bedroomCount === 0 ? "Studio" : `${h.bedroomCount} BR`} / {h.bathroomCount} BA</span>
                            </div>
                            <p className="card-description">{h.description}</p>
                            <div className="card-details">
                                <div className="detail-row">
                                    <span className="detail-label">Nearest Hospital</span>
                                    <span className="detail-value">{h.nearestHospital}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Distance</span>
                                    <span className="detail-value">{h.distanceMiles} mi</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Pets</span>
                                    <span className="detail-value">{petIcon(h.petPolicy)}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Available</span>
                                    <span className="detail-value">{h.availableDate}</span>
                                </div>
                            </div>
                            <div className="amenity-tags">
                                {h.amenities.map((a) => (
                                    <span key={a} className="tag">{a}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
