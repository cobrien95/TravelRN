import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '@/constants/theme';

export default function HousingScreen() {
    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.content}>
                <Text style={styles.icon}>🏠</Text>
                <Text style={styles.title}>Housing Search</Text>
                <Text style={styles.subtitle}>
                    Coming soon — find furnished rentals near your contract.
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.bgPrimary,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    icon: {
        fontSize: 56,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: Theme.textPrimary,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: Theme.textSecondary,
        textAlign: 'center',
        lineHeight: 20,
    },
});
