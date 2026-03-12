import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Linking } from 'react-native';
import { Theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export interface SocialEvent {
  id: string;
  name: string;
  type: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  imageUrl: string;
  ticketUrl?: string;
  priceRange?: string;
}

interface EventCardProps {
  event: SocialEvent;
}

export const EventCard = ({ event }: EventCardProps) => {
  const handlePress = () => {
    if (event.ticketUrl) {
      Linking.openURL(event.ticketUrl);
    }
  };

  const formattedDate = new Date(event.date).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed
      ]}
      onPress={handlePress}
    >
      <Image source={{ uri: event.imageUrl }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.typeTag}>{event.type.toUpperCase()}</Text>
          {event.priceRange && (
            <Text style={styles.price}>{event.priceRange}</Text>
          )}
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {event.name}
        </Text>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={16} color={Theme.textMuted} />
            <Text style={styles.detailText}>{formattedDate} • {event.time}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={16} color={Theme.textMuted} />
            <Text style={styles.detailText} numberOfLines={1}>{event.venue}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.bgSecondary,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Theme.borderColor,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: Theme.borderColor,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeTag: {
    fontSize: 12,
    fontWeight: '700',
    color: Theme.accentBlue,
    letterSpacing: 0.5,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.accentGreen || '#10b981',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Theme.textPrimary,
    marginBottom: 12,
    lineHeight: 24,
  },
  details: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: Theme.textMuted,
    flex: 1,
  },
});
