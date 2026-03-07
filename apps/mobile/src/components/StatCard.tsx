import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '@/constants/theme';

interface StatCardProps {
    icon: string;
    value: string;
    label: string;
    color: string;
}

export default function StatCard({ icon, value, label, color }: StatCardProps) {
    return (
        <View style={styles.card}>
            <View style={[styles.iconBox, { backgroundColor: color + '20' }]}>
                <Text style={styles.icon}>{icon}</Text>
            </View>
            <Text style={[styles.value, { color }]}>{value}</Text>
            <Text style={styles.label}>{label}</Text>
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
        alignItems: 'center',
        width: 150,
        marginRight: 12,
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    icon: {
        fontSize: 22,
    },
    value: {
        fontSize: 22,
        fontWeight: '800',
        marginBottom: 2,
    },
    label: {
        fontSize: 11,
        color: Theme.textMuted,
        fontWeight: '500',
    },
});
