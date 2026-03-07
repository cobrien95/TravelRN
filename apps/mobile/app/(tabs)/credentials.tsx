import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '@/constants/theme';
import CredentialCard from '@/src/components/CredentialCard';

// Mock data matching the web dashboard
const LICENSES = [
    {
        id: '1',
        title: 'CO — COMPACT',
        subtitle: 'RN-88842',
        expiresAt: '2027-12-31',
        verified: true,
        isCompact: true,
        compactNote: 'Practice authorized in 36+ compact states',
    },
    {
        id: '2',
        title: 'CA — RN',
        subtitle: 'RN-442201',
        expiresAt: '2026-06-15',
        verified: true,
        isCompact: false,
    },
];

const CERTS = [
    { id: '1', title: 'BLS', subtitle: 'American Heart Association', expiresAt: '2028-06-30', verified: true },
    { id: '2', title: 'ACLS', subtitle: 'American Heart Association', expiresAt: '2028-06-30', verified: true },
    { id: '3', title: 'PALS', subtitle: 'American Heart Association', expiresAt: '2025-03-01', verified: false },
];

function SummaryCard({
    icon,
    value,
    label,
    accent,
}: {
    icon: string;
    value: string;
    label: string;
    accent: string;
}) {
    return (
        <View style={[styles.summaryCard, { borderLeftColor: accent }]}>
            <Text style={styles.summaryIcon}>{icon}</Text>
            <View>
                <Text style={[styles.summaryValue, { color: accent }]}>{value}</Text>
                <Text style={styles.summaryLabel}>{label}</Text>
            </View>
        </View>
    );
}

export default function CredentialsScreen() {
    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>📋 Credentials</Text>
                    <Text style={styles.subtitle}>Your licenses and certifications at a glance</Text>
                </View>

                {/* Summary */}
                <View style={styles.summaryRow}>
                    <SummaryCard icon="✅" value="2" label="Active Licenses" accent={Theme.accentGreen} />
                    <SummaryCard icon="🎓" value="2" label="Active Certs" accent={Theme.accentGreen} />
                    <SummaryCard icon="⚠️" value="1" label="Needs Attention" accent={Theme.accentAmber} />
                </View>

                {/* Licenses */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>🪪 Nursing Licenses</Text>
                    {LICENSES.map((lic) => (
                        <CredentialCard
                            key={lic.id}
                            title={lic.title}
                            subtitle={lic.subtitle}
                            expiresAt={lic.expiresAt}
                            verified={lic.verified}
                            isCompact={lic.isCompact}
                            compactNote={lic.compactNote}
                        />
                    ))}
                </View>

                {/* Certifications */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>🎓 Certifications</Text>
                    {CERTS.map((cert) => (
                        <CredentialCard
                            key={cert.id}
                            title={cert.title}
                            subtitle={cert.subtitle}
                            expiresAt={cert.expiresAt}
                            verified={cert.verified}
                        />
                    ))}
                </View>

                <View style={{ height: 32 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.bgPrimary,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: Theme.borderColor,
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        color: Theme.textPrimary,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 13,
        color: Theme.textSecondary,
    },
    summaryRow: {
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    summaryCard: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        padding: 12,
        backgroundColor: Theme.bgCard,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Theme.borderColor,
        borderLeftWidth: 3,
    },
    summaryIcon: {
        fontSize: 18,
    },
    summaryValue: {
        fontSize: 18,
        fontWeight: '800',
    },
    summaryLabel: {
        fontSize: 9,
        color: Theme.textMuted,
        fontWeight: '500',
    },
    section: {
        paddingHorizontal: 20,
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Theme.textPrimary,
        marginBottom: 14,
    },
});
