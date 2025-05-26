import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Text, Switch, View, FlatList, Button, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'
import EventCard from '../components/EventCard'
import { SearchInput } from '../components/SearchInput'
import { filterEvents } from '../utils/filterEvents'
import { useEventStore } from '../store/useEventStore'
import { useThemeStore } from '../store/useThemeStore'
import { useEventActions } from '../hooks/useEventActions'
import { Screen } from '../components/Screen'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function EventListScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const { theme, isDark, toggleTheme } = useThemeStore()
  const { events, isRefreshing } = useEventStore()
  const { refreshEvents } = useEventActions()
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (events.length === 0) refreshEvents()
  }, [])

  useLayoutEffect(() => {
    const headerLeft = () => (
      <View style={{ paddingLeft: 16 }}>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          thumbColor={theme.text}
          trackColor={{ false: '#ccc', true: '#666' }}
        />
      </View>
    )

    const headerRight = () => {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('InterestedEvents')}>
          <Ionicons name="heart" size={24} color={theme.text} style={{ paddingRight: 16 }} />
        </TouchableOpacity>
      )
    }

    navigation.setOptions({
      headerLeft,
      headerRight,
    })
  }, [navigation, theme.text, isDark])

  if (isRefreshing && events.length === 0) {
    return <ActivityIndicator style={{ marginTop: 40 }} color={theme.text} />
  }

  const filtered = filterEvents(events, query)

  const renderEventList = () => {
    if (filtered.length === 0 && !isRefreshing) {
      return (
        <Text style={{ textAlign: 'center', marginTop: 40, color: theme.text }}>
          No events found.
        </Text>
      )
    }

    return (
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <EventCard event={item} onPress={() => navigation.navigate('EventDetail', { event: item })} />}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshEvents}
            tintColor={theme.text}
          />
        }
      />
    )
  }

  return (
    <Screen>
      <SearchInput value={query} onChange={setQuery} placeholder="Search by name or location" />
      { renderEventList() }
    </Screen>
  )
}
