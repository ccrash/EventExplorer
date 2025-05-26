import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Event } from '../types/event'
import { useThemeStore } from '../store/useThemeStore'

import Animated from 'react-native-reanimated'

type Props = {
  event: Event
  onPress?: () => void
}

export default function EventCard({ event, onPress }: Props) {
  const { theme } = useThemeStore()

  return (
    <TouchableOpacity onPress={onPress} accessibilityLabel={`View details for ${event.name}`} style={[styles.card, { borderColor: theme.border }]}>
      <Animated.Image
        source={event.thumbnail ? { uri: event.thumbnail } : require('../assets/icon.png')}
        style={styles.image}
        resizeMode="cover"
        sharedTransitionTag={`event-${event.id}`}
      />
      <View style={styles.info}>
        <Text style={[styles.title, { color: theme.text }]}>{event.name}</Text>
        <Text style={[styles.subtext, { color: theme.text }]}>{event.date}</Text>
        <Text style={[styles.location, { color: theme.text }]}>{event.location}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden'
  },
  image: {
    width: 100,
    height: 100
  },
  info: {
    flex: 1,
    padding: 8,
    justifyContent: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  subtext: {
    marginTop: 6,
    fontSize: 14
  },
  location: {
    marginTop: 6,
    fontSize: 13
  }
})
