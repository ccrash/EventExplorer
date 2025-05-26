import { useCallback } from 'react'
import { Alert } from 'react-native'
import { fetchEvents, showInterest } from '../services/api'
import { useEventStore } from '../store/useEventStore'

// Hook to load event list into the global store
export const useEventLoader = () => {
  const { setEvents, setIsRefreshing } = useEventStore()

  const loadEvents = useCallback(async () => {
    try {
      setIsRefreshing(true)
      const data = await fetchEvents()
      setEvents(data)
    } catch (e) {
      console.error('Failed to load events', e)
      Alert.alert('Error', 'Unable to load events')
    } finally {
      setIsRefreshing(false)
    }
  }, [setEvents, setIsRefreshing])

  return { loadEvents }
}

//  Hook to toggle "interested" state for a given event
export const useToggleInterest = (eventId: string, isCurrentlyInterested: boolean) => {
  const { toggleInterest } = useEventStore()

  const toggle = async () => {
    try {
      await showInterest(eventId, !isCurrentlyInterested)
      toggleInterest(eventId)
    } catch (e) {
      console.error('Failed to update interest', e)
      Alert.alert('Failed to update interest')
    }
  }

  return {
    toggle
  }
}
