import React from 'react'
import { Text, StyleSheet, ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useThemeStore } from '../store/useThemeStore'
import { RootStackParamList } from '../types/navigation'
import { RouteProp } from '@react-navigation/native'
import { Screen } from '../components/Screen'
import Animated from 'react-native-reanimated'
import { InterestButton } from '../components/InterestButton'

export default function EventDetailsScreen() {
  const { params } = useRoute<RouteProp<RootStackParamList, 'EventDetail'>>()
  const { theme } = useThemeStore()

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <Animated.Image
          source={{ uri: params.event.image }}
          style={styles.image}
          resizeMode="cover"
          sharedTransitionTag={`event-${params.event.id}`}
        />
        <Text style={[styles.title, { color: theme.text }]}>{params.event.name}</Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>
          {params.event.date} | {params.event.location}
        </Text>
        <Text style={[styles.organizer, { color: theme.text }]}>
          Organized by {params.event.organizer}
        </Text>
        <Text style={[styles.description, { color: theme.text }]}>
          {params.event.description}
        </Text>
        <InterestButton eventId={params.event.id} />
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {},
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 4
  },
  organizer: {
    fontSize: 16,
    marginBottom: 12
  },
  description: {
    fontSize: 16,
    marginBottom: 24
  }
})
