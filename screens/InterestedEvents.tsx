import React from 'react'
import { FlatList, Text, StyleSheet } from 'react-native'
import { useEventStore } from '../store/useEventStore'
import { useThemeStore } from '../store/useThemeStore'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'
import EventCard from '../components/EventCard'
import { Screen } from '../components/Screen'

export default function InterestedEvents() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { events, interestingIds } = useEventStore()
  const { theme } = useThemeStore()

  const interestedEvents = events.filter(e => interestingIds.has(e.id))

  const renderEmptyState = () => (
    <Text style={[styles.emptyText, { color: theme.text }]}>
      No interested events
    </Text>
  )

  const renderEventList = () => (
    <FlatList
      data={interestedEvents}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <EventCard event={item} onPress={() => navigation.navigate('EventDetail', { event: item })} />}
      initialNumToRender={5}
      removeClippedSubviews
      maxToRenderPerBatch={10}
    />
  )

  return (
    <Screen style={interestedEvents.length === 0 ? styles.emptyContainer : undefined}>
      {interestedEvents.length === 0 ? renderEmptyState() : renderEventList()}
    </Screen>
  )
}

const styles = StyleSheet.create({
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center'
  }
})
