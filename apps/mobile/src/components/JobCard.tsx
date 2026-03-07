import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Theme } from '@/constants/theme';
import type { Job } from '../types';

interface JobCardProps {
    job: Job;
}

const SHIFT_COLORS: Record<string, string> = {
    DAY: Theme.accentAmber,
    NIGHT: Theme.accentPurple,
    SWING: Theme.accentBlue,
};

const SHIFT_ICONS: Record<string, string> = {
    DAY: '☀️',
    NIGHT: '🌙',
    SWING: '🔄',
};

export default function JobCard({ job }: JobCardProps) {
    const shiftColor = SHIFT_COLORS[job.shiftType] || Theme.accentBlue;

    return (
        <Pressable style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
            {/* Accent strip */}
            <View style={[styles.accent, { backgroundColor: shiftColor }]} />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.title} numberOfLines={1}>{job.title}</Text>
                    <Text style={styles.facility} numberOfLines={1}>{job.facilityName}</Text>
                </View>
                <View style={styles.payBox}>
                    <Text style={styles.payAmount}>${job.grossWeeklyPay.toLocaleString()}</Text>
                    <Text style={styles.payLabel}>/week</Text>
                </View>
            </View>

            {/* Tags */}
            <View style={styles.tags}>
                <View style={styles.tag}>
                    <Text style={styles.tagText}>📍 {job.city}, {job.state}</Text>
                </View>
                <View style={[styles.tag, { borderColor: shiftColor }]}>
                    <Text style={[styles.tagText, { color: shiftColor }]}>
                        {SHIFT_ICONS[job.shiftType]} {job.shiftType}
                    </Text>
                </View>
                <View style={styles.tag}>
                    <Text style={styles.tagText}>📅 {job.contractWeeks}wk</Text>
                </View>
            </View>

            {/* Description */}
            <Text style={styles.description} numberOfLines={2}>{job.description}</Text>

            {/* Requirements */}
            <View style={styles.requirements}>
                {job.requirements.slice(0, 4).map((req, i) => (
                    <View key={i} style={styles.reqBadge}>
                        <Text style={styles.reqText}>{req}</Text>
                    </View>
                ))}
                {job.requirements.length > 4 && (
                    <View style={styles.reqBadge}>
                        <Text style={styles.reqText}>+{job.requirements.length - 4}</Text>
                    </View>
                )}
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                {job.startDate && (
                    <Text style={styles.startDate}>
                        Starts {new Date(job.startDate).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric',
                        })}
                    </Text>
                )}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Theme.bgCard,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Theme.borderColor,
        padding: 16,
        marginBottom: 14,
        overflow: 'hidden',
    },
    cardPressed: {
        opacity: 0.85,
        transform: [{ scale: 0.98 }],
    },
    accent: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
        marginTop: 4,
    },
    headerLeft: {
        flex: 1,
        marginRight: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: Theme.textPrimary,
        marginBottom: 2,
    },
    facility: {
        fontSize: 12,
        color: Theme.textSecondary,
    },
    payBox: {
        alignItems: 'flex-end',
    },
    payAmount: {
        fontSize: 20,
        fontWeight: '800',
        color: Theme.accentGreen,
    },
    payLabel: {
        fontSize: 10,
        color: Theme.textMuted,
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 10,
    },
    tag: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Theme.borderColor,
    },
    tagText: {
        fontSize: 11,
        color: Theme.textSecondary,
    },
    description: {
        fontSize: 12,
        color: Theme.textMuted,
        lineHeight: 18,
        marginBottom: 10,
    },
    requirements: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        marginBottom: 12,
    },
    reqBadge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        backgroundColor: Theme.accentBlue + '20',
    },
    reqText: {
        fontSize: 10,
        fontWeight: '600',
        color: Theme.accentBlue,
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: Theme.borderColor,
        paddingTop: 10,
    },
    startDate: {
        fontSize: 11,
        color: Theme.textMuted,
    },
});
