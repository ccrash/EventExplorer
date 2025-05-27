import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Event } from '../types/event'
import { useThemeStore } from '../store/useThemeStore'
import { useEventStore } from '../store/useEventStore'
import Animated from 'react-native-reanimated'
import Ionicons from '@expo/vector-icons/Ionicons'
import { dateFormat } from '../utils/dates'

type Props = {
  event: Event
  onPress?: () => void
}

export default function EventCard({ event, onPress }: Props) {
  const { theme } = useThemeStore()
  const { interestingIds } = useEventStore()
  const isInterested = interestingIds.has(event.id)

  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityLabel={`View details for ${event.name}`}
      style={[styles.card, { borderColor: theme.border, backgroundColor: theme.background }]}
    >
      <View style={styles.imageContainer}>
        <Animated.Image
          source={event.thumbnail ? { uri: event.thumbnail } : require('../assets/icon.png')}
          style={styles.image}
          resizeMode="cover"
          sharedTransitionTag={`event-${event.id}`}
        />
      </View>
      <View style={styles.info}>
        <Text style={[styles.title, { color: theme.text }]}>{event.name}</Text>
        <Text style={[styles.subtext, { color: theme.text }]}>{dateFormat(event.date)}</Text>
        <Text style={[styles.location, { color: theme.text }]}>{event.location}</Text>
        {isInterested && (<Ionicons name="alert-circle" size={20} color="gray" style={styles.interestIcon}/> )}
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
  imageContainer: {
    width: 100,
    height: 100,
    position: 'relative'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  interestIcon: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: 'white',
    borderRadius: 10
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
