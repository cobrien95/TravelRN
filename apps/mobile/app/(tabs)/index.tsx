import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '@/constants/theme';
import { fetchJobs } from '@/src/api';
import type { Job } from '@/src/types';
import StatCard from '@/src/components/StatCard';
import JobCard from '@/src/components/JobCard';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const loadData = async () => {
    const data = await fetchJobs();
    setJobs(data);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const avgPay = jobs.length
    ? Math.round(jobs.reduce((a, j) => a + j.grossWeeklyPay, 0) / jobs.length)
    : 0;
  const states = new Set(jobs.map((j) => j.state));

  const stats = [
    { icon: '🏥', value: jobs.length.toString(), label: 'Active Contracts', color: Theme.accentBlue },
    { icon: '💰', value: `$${avgPay.toLocaleString()}`, label: 'Avg Weekly Pay', color: Theme.accentGreen },
    { icon: '🗺️', value: states.size.toString(), label: 'States Available', color: Theme.accentPurple },
    { icon: '📋', value: '2 Active', label: 'Credentials', color: Theme.accentAmber },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Theme.accentBlue}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoEmoji}>🩺</Text>
            </View>
            <View>
              <Text style={styles.appName}>TravelRN</Text>
              <Text style={styles.appSubtitle}>Career Dashboard</Text>
            </View>
          </View>
        </View>

        {/* Welcome */}
        <View style={styles.section}>
          <Text style={styles.welcomeTitle}>Welcome back 👋</Text>
          <Text style={styles.welcomeSubtitle}>Here's your travel nursing career overview</Text>
        </View>

        {/* Stats */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statsScroll}
        >
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </ScrollView>

        {/* Featured Jobs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🔥 Featured Contracts</Text>
            <Pressable onPress={() => router.push('/(tabs)/jobs')}>
              <Text style={styles.sectionLink}>View all →</Text>
            </Pressable>
          </View>

          {loading ? (
            <View style={styles.loadingBox}>
              <Text style={styles.loadingText}>Loading contracts...</Text>
            </View>
          ) : (
            jobs.slice(0, 3).map((job) => (
              <JobCard key={job.externalId} job={job} />
            ))
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚡ Quick Actions</Text>
          <View style={styles.quickActions}>
            <Pressable
              style={({ pressed }) => [styles.quickAction, pressed && styles.quickActionPressed]}
              onPress={() => router.push('/(tabs)/jobs')}
            >
              <Text style={styles.quickActionIcon}>🔍</Text>
              <Text style={styles.quickActionLabel}>Search Contracts</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.quickAction, pressed && styles.quickActionPressed]}
              onPress={() => router.push('/(tabs)/credentials')}
            >
              <Text style={styles.quickActionIcon}>✅</Text>
              <Text style={styles.quickActionLabel}>Check Credentials</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.quickAction, pressed && styles.quickActionPressed]}
              onPress={() => router.push('/(tabs)/housing')}
            >
              <Text style={styles.quickActionIcon}>🏠</Text>
              <Text style={styles.quickActionLabel}>Find Housing</Text>
            </Pressable>
          </View>
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
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Theme.borderColor,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logoEmoji: {
    fontSize: 24,
  },
  appName: {
    fontSize: 18,
    fontWeight: '800',
    color: Theme.accentBlue,
  },
  appSubtitle: {
    fontSize: 10,
    color: Theme.textMuted,
    marginTop: -2,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: Theme.textPrimary,
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: Theme.textSecondary,
  },
  statsScroll: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Theme.textPrimary,
    marginBottom: 14,
  },
  sectionLink: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.accentBlue,
    marginBottom: 14,
  },
  loadingBox: {
    height: 120,
    borderRadius: 16,
    backgroundColor: Theme.bgCard,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Theme.borderColor,
  },
  loadingText: {
    color: Theme.textMuted,
    fontSize: 13,
  },
  quickActions: {
    gap: 10,
  },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: Theme.bgCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Theme.borderColor,
  },
  quickActionPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  quickActionIcon: {
    fontSize: 20,
  },
  quickActionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.textPrimary,
  },
});
