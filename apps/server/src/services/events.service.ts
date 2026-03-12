/**
 * Mock Events Service
 * Simulates fetching data from Ticketmaster Discovery API for the social tab.
 * Clear TS error
 */

export interface SocialEvent {
    id: string;
    name: string;
    type: "music" | "sports" | "arts" | "community";
    date: string;
    time: string;
    venue: string;
    city: string;
    imageUrl: string;
    ticketUrl?: string;
    priceRange?: string;
}

const mockEvents: SocialEvent[] = [
    {
        id: "evt-001",
        name: "Denver Nurses Meetup",
        type: "community",
        date: "2026-03-15",
        time: "18:30",
        venue: "Union Station Brewhouse",
        city: "Denver",
        imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=80",
        priceRange: "Free",
    },
    {
        id: "evt-002",
        name: "Colorado Avalanche vs. Golden Knights",
        type: "sports",
        date: "2026-03-18",
        time: "19:00",
        venue: "Ball Arena",
        city: "Denver",
        imageUrl: "https://images.unsplash.com/photo-1542654344-932fceb05d1c?w=800&auto=format&fit=crop&q=80",
        ticketUrl: "https://ticketmaster.com",
        priceRange: "$45 - $250",
    },
    {
        id: "evt-003",
        name: "Red Rocks Amphitheatre Concert",
        type: "music",
        date: "2026-03-22",
        time: "19:30",
        venue: "Red Rocks Park & Amphitheatre",
        city: "Denver",
        imageUrl: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&auto=format&fit=crop&q=80",
        ticketUrl: "https://ticketmaster.com",
        priceRange: "$65 - $120",
    },
    {
        id: "evt-004",
        name: "Austin City Limits Showcase",
        type: "music",
        date: "2026-03-16",
        time: "20:00",
        venue: "Moody Theater",
        city: "Austin",
        imageUrl: "https://images.unsplash.com/photo-1540039155732-61198edcc545?w=800&auto=format&fit=crop&q=80",
        ticketUrl: "https://ticketmaster.com",
        priceRange: "$35 - $80",
    },
    {
        id: "evt-005",
        name: "Texas Healthcare Mix & Mingle",
        type: "community",
        date: "2026-03-20",
        time: "17:30",
        venue: "The Domain Plaza",
        city: "Austin",
        imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop&q=80",
        priceRange: "Free",
    },
];

/**
 * Fetches local events for a given city.
 * Currently uses mock data. Future implementation will call Ticketmaster / Google Places.
 * 
 * @param city The city to search for events in
 * @returns Array of localized social events
 */
export const getLocalEvents = async (city: string): Promise<SocialEvent[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Filter events by city (case-insensitive substring match)
    // If city is heavily unmatched, we can just return a subset or all as fallback
    const filtered = mockEvents.filter((e) => 
        e.city.toLowerCase().includes(city.toLowerCase())
    );

    return filtered.length > 0 ? filtered : mockEvents.slice(0, 3);
};
