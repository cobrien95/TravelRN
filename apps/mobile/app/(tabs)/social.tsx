import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '@/constants/theme';
import { EventCard, SocialEvent } from '@/components/EventCard';
import { Ionicons } from '@expo/vector-icons';

// In a real app, this would use an env variable for backend URL
const API_URL = 'http://localhost:4000/api/v1';

export default function SocialScreen() {
  const [events, setEvents] = useState<SocialEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('Denver');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, [searchQuery]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      // Fallback to IP depending on how it's running: if on physical device might need network IP instead of localhost
      const response = await fetch(`${API_URL}/events?location=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data.data || []);
    } catch (err: any) {
      console.error('Error fetching events:', err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Explore Local</Text>
      <Text style={styles.subtitle}>Discover events near your assignment</Text>
      
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={Theme.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search location (e.g. Denver)"
          placeholderTextColor={Theme.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          onSubmitEditing={fetchEvents}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {loading && events.length === 0 ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={Theme.accentBlue} />
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Ionicons name="alert-circle-outline" size={48} color="#ef4444" />
            <Text style={styles.errorText}>Could not load events</Text>
            <Text style={styles.errorSub}>{error}</Text>
          </View>
        ) : (
          <FlatList
            data={events}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <EventCard event={item} />}
            contentContainerStyle={styles.listContent}
            ListHeaderComponent={renderHeader}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="calendar-outline" size={48} color={Theme.textMuted} />
                <Text style={styles.emptyText}>No events found in {searchQuery}</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.bgPrimary,
  },
  container: {
    flex: 1,
    backgroundColor: Theme.bgPrimary,
  },
  headerContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: Theme.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Theme.textMuted,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.bgSecondary,
    borderWidth: 1,
    borderColor: Theme.borderColor,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Theme.textPrimary,
    padding: 0,
  },
  listContent: {
    padding: 24,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: Theme.textPrimary,
    marginTop: 12,
  },
  errorSub: {
    fontSize: 14,
    color: Theme.textMuted,
    marginTop: 4,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Theme.textMuted,
    marginTop: 16,
    textAlign: 'center',
  },
});
