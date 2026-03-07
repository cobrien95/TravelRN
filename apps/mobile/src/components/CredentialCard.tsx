import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '@/constants/theme';

interface CredentialCardProps {
    title: string;
    subtitle: string;
    expiresAt: string;
    verified: boolean;
    isCompact?: boolean;
    compactNote?: string;
}

function getStatusBadge(expiresAt: string, verified: boolean) {
    const now = new Date();
    const exp = new Date(expiresAt);
    const daysUntil = Math.floor((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntil < 0) {
        return { label: 'Expired', color: Theme.accentRose, bg: Theme.accentRoseSoft };
    }
    if (daysUntil < 90) {
        return { label: `${daysUntil}d left`, color: Theme.accentAmber, bg: Theme.accentAmberSoft };
    }
    if (verified) {
        return { label: 'Verified', color: Theme.accentGreen, bg: Theme.accentGreenSoft };
    }
    return { label: 'Pending', color: Theme.textSecondary, bg: Theme.borderColor + '40' };
}

export default function CredentialCard({
    title,
    subtitle,
    expiresAt,
    verified,
    isCompact,
    compactNote,
}: CredentialCardProps) {
    const status = getStatusBadge(expiresAt, verified);

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                </View>
                <View style={[styles.badge, { backgroundColor: status.bg }]}>
                    <Text style={[styles.badgeText, { color: status.color }]}>{status.label}</Text>
                </View>
            </View>

            <View style={styles.meta}>
                <Text style={styles.metaText}>
                    Expires: {new Date(expiresAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                    })}
                </Text>
                {isCompact && (
                    <Text style={styles.compactBadge}>⭐ Compact (eNLC)</Text>
                )}
            </View>

            {compactNote && (
                <Text style={styles.note}>{compactNote}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Theme.bgCard,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Theme.borderColor,
        padding: 16,
        marginBottom: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
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
    subtitle: {
        fontSize: 12,
        color: Theme.textMuted,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '600',
    },
    meta: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        alignItems: 'center',
    },
    metaText: {
        fontSize: 12,
        color: Theme.textSecondary,
    },
    compactBadge: {
        fontSize: 12,
        fontWeight: '600',
        color: Theme.accentAmber,
    },
    note: {
        fontSize: 11,
        color: Theme.textMuted,
        fontStyle: 'italic',
        marginTop: 8,
    },
});
