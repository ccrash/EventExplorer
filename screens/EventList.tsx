import React, { useEffect, useMemo, useState } from 'react'
import { Text, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'
import EventCard from '../components/EventCard'
import { SearchInput } from '../components/SearchInput'
import { filterEvents } from '../utils/filterEvents'
import { useEventStore } from '../store/useEventStore'
import { useThemeStore } from '../store/useThemeStore'
import { useEventLoader } from '../hooks/useEventActions'
import { useHomeHeader } from '../hooks/useHomeHeader'
import { Screen } from '../components/Screen'

type Navigation = NativeStackNavigationProp<RootStackParamList>

export default function EventListScreen() {
  const navigation = useNavigation<Navigation>()
  const { theme } = useThemeStore()
  const { events, isRefreshing } = useEventStore()
  const { loadEvents } = useEventLoader()
  const [query, setQuery] = useState('')

  useHomeHeader() // handles navigation header setup + theme toggling

  useEffect(() => {
    if (events.length === 0) loadEvents()
  }, [events.length, loadEvents])

  const filteredEvents = useMemo(() => filterEvents(events, query), [events, query])

  if (isRefreshing && events.length === 0) {
    return <ActivityIndicator style={{ marginTop: 40 }} color={theme.text} />
  }

  return (
    <Screen>
      <SearchInput value={query} onChange={setQuery} placeholder="Search by name or location" />
      <FlatList
        data={filteredEvents}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onPress={() => navigation.navigate('EventDetail', { event: item })}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={loadEvents}
            tintColor={theme.text}
          />
        }
        ListEmptyComponent={
          !isRefreshing ? (
            <Text style={{ textAlign: 'center', marginTop: 40, color: theme.text }}>
              No events found.
            </Text>
          ) : null
        }
      />
    </Screen>
  )
}
