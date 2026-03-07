import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Pressable,
    RefreshControl,
    TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '@/constants/theme';
import { searchJobs } from '@/src/api';
import type { Job } from '@/src/types';
import JobCard from '@/src/components/JobCard';

const SPECIALTIES = ['All', 'ICU', 'Med-Surg', 'ER', 'L&D', 'PICU', 'Telemetry'];
const STATES = ['All', 'AZ', 'CA', 'CO', 'TX'];
const SHIFTS = ['All', 'DAY', 'NIGHT', 'SWING'];

function FilterPill({
    label,
    active,
    onPress,
}: {
    label: string;
    active: boolean;
    onPress: () => void;
}) {
    return (
        <Pressable
            style={[styles.pill, active && styles.pillActive]}
            onPress={onPress}
        >
            <Text style={[styles.pillText, active && styles.pillTextActive]}>
                {label}
            </Text>
        </Pressable>
    );
}

export default function JobsScreen() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [specialty, setSpecialty] = useState('All');
    const [state, setState] = useState('All');
    const [shift, setShift] = useState('All');
    const [showFilters, setShowFilters] = useState(false);

    const loadJobs = useCallback(async () => {
        const data = await searchJobs({ specialty, state, shiftType: shift });
        setJobs(data);
        setLoading(false);
        setRefreshing(false);
    }, [specialty, state, shift]);

    useEffect(() => {
        setLoading(true);
        loadJobs();
    }, [loadJobs]);

    const onRefresh = () => {
        setRefreshing(true);
        loadJobs();
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>🏥 Job Contracts</Text>
                <Pressable
                    style={styles.filterToggle}
                    onPress={() => setShowFilters(!showFilters)}
                >
                    <Text style={styles.filterToggleText}>
                        {showFilters ? '✕ Hide' : '⚙️ Filters'}
                    </Text>
                </Pressable>
            </View>

            {/* Filters (collapsible) */}
            {showFilters && (
                <View style={styles.filterSection}>
                    <Text style={styles.filterLabel}>SPECIALTY</Text>
                    <FlatList
                        horizontal
                        data={SPECIALTIES}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.pillRow}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <FilterPill
                                label={item}
                                active={specialty === item}
                                onPress={() => setSpecialty(item)}
                            />
                        )}
                    />

                    <Text style={styles.filterLabel}>STATE</Text>
                    <FlatList
                        horizontal
                        data={STATES}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.pillRow}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <FilterPill
                                label={item}
                                active={state === item}
                                onPress={() => setState(item)}
                            />
                        )}
                    />

                    <Text style={styles.filterLabel}>SHIFT</Text>
                    <FlatList
                        horizontal
                        data={SHIFTS}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.pillRow}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <FilterPill
                                label={item}
                                active={shift === item}
                                onPress={() => setShift(item)}
                            />
                        )}
                    />
                </View>
            )}

            {/* Results count */}
            <View style={styles.resultsBar}>
                <Text style={styles.resultsCount}>
                    {loading ? 'Loading...' : `${jobs.length} contract${jobs.length !== 1 ? 's' : ''} found`}
                </Text>
            </View>

            {/* Job List */}
            <FlatList
                data={jobs}
                keyExtractor={(item) => item.externalId}
                renderItem={({ item }) => <JobCard job={item} />}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={Theme.accentBlue}
                    />
                }
                ListEmptyComponent={
                    !loading ? (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyIcon}>🔍</Text>
                            <Text style={styles.emptyTitle}>No contracts found</Text>
                            <Text style={styles.emptyText}>
                                Try adjusting your filters to see more results.
                            </Text>
                        </View>
                    ) : null
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.bgPrimary,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: Theme.borderColor,
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        color: Theme.textPrimary,
    },
    filterToggle: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: Theme.bgCard,
        borderWidth: 1,
        borderColor: Theme.borderColor,
    },
    filterToggleText: {
        fontSize: 12,
        fontWeight: '600',
        color: Theme.accentBlue,
    },
    filterSection: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Theme.borderColor,
        backgroundColor: Theme.bgSecondary,
    },
    filterLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: Theme.textMuted,
        letterSpacing: 0.5,
        marginBottom: 6,
        marginTop: 8,
    },
    pillRow: {
        gap: 8,
        paddingBottom: 4,
    },
    pill: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Theme.borderColor,
        backgroundColor: Theme.bgCard,
    },
    pillActive: {
        backgroundColor: Theme.accentBlue + '25',
        borderColor: Theme.accentBlue,
    },
    pillText: {
        fontSize: 12,
        fontWeight: '500',
        color: Theme.textSecondary,
    },
    pillTextActive: {
        color: Theme.accentBlue,
        fontWeight: '700',
    },
    resultsBar: {
        paddingHorizontal: 20,
        paddingVertical: 8,
    },
    resultsCount: {
        fontSize: 12,
        color: Theme.textMuted,
        fontWeight: '500',
    },
    list: {
        paddingHorizontal: 20,
        paddingBottom: 24,
    },
    emptyState: {
        alignItems: 'center',
        paddingTop: 60,
    },
    emptyIcon: {
        fontSize: 48,
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Theme.textPrimary,
        marginBottom: 6,
    },
    emptyText: {
        fontSize: 13,
        color: Theme.textMuted,
    },
});
