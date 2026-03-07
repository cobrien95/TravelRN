/**
 * TravelRN — API Client
 */

import { Platform } from 'react-native';
import type { Job } from './types';

// Android emulator uses 10.0.2.2 for host localhost
const getBaseUrl = () => {
    if (Platform.OS === 'android') {
        return 'http://10.0.2.2:4000';
    }
    return 'http://localhost:4000';
};

const API_URL = getBaseUrl();

export async function fetchJobs(): Promise<Job[]> {
    try {
        const res = await fetch(`${API_URL}/api/v1/jobs`);
        const data = await res.json();
        return data.jobs || [];
    } catch (error) {
        console.warn('[API] Failed to fetch jobs:', error);
        return [];
    }
}

export async function searchJobs(params: {
    specialty?: string;
    state?: string;
    shiftType?: string;
    minWeeklyPay?: number;
}): Promise<Job[]> {
    try {
        const query = new URLSearchParams();
        if (params.specialty && params.specialty !== 'All')
            query.set('specialty', params.specialty);
        if (params.state && params.state !== 'All')
            query.set('state', params.state);
        if (params.shiftType && params.shiftType !== 'All')
            query.set('shiftType', params.shiftType);
        if (params.minWeeklyPay)
            query.set('minWeeklyPay', params.minWeeklyPay.toString());

        const url = query.toString()
            ? `${API_URL}/api/v1/jobs/search?${query}`
            : `${API_URL}/api/v1/jobs`;

        const res = await fetch(url);
        const data = await res.json();
        return data.jobs || [];
    } catch (error) {
        console.warn('[API] Failed to search jobs:', error);
        return [];
    }
}
