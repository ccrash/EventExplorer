import React from 'react'
import { View, FlatList, Text, StyleSheet } from 'react-native'
import { useEventStore } from '../store/useEventStore'
import { useThemeStore } from '../store/useThemeStore'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'
import EventCard from '../components/EventCard'

export default function InterestingEvents() {
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
    <View style={interestedEvents.length === 0 ? styles.emptyContainer : styles.container}>
      {interestedEvents.length === 0 ? renderEmptyState() : renderEventList()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
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
