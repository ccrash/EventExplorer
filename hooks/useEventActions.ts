import {useCallback} from 'react'
import {fetchEvents} from '../services/api'
import {useEventStore} from '../store/useEventStore'

// Hook to load event list into the global store
export const useEventLoader = () => {
  const {setEvents, setIsRefreshing} = useEventStore()

  const loadEvents = useCallback(async () => {
    try {
      setIsRefreshing(true)
      const data = await fetchEvents()
      setEvents(data)
    } catch (e) {
      console.error('Failed to load events', e)
    } finally {
      setIsRefreshing(false)
    }
  }, [setEvents, setIsRefreshing])

  return {loadEvents}
}

//  Hook to toggle "interest" state for a given event
export const useToggleInterest = (eventId: string, isCurrentlyInterested: boolean) => {
  const {toggleInterest} = useEventStore()

  const toggle = async () => {
    toggleInterest(eventId)
  }

  return {toggle}
}
