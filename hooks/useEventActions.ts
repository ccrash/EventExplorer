import { useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchEvents, showInterest } from '../services/api'
import { useEventStore } from '../store/useEventStore'
import { Alert } from 'react-native'

export const useEventActions = () => {
  const { setEvents, setIsRefreshing } = useEventStore()

  const refreshEvents = async () => {
    try {
      setIsRefreshing(true)
      const data = await fetchEvents()
      setEvents(data)
    } catch (e) {
      console.error('Failed to fetch events', e)
    } finally {
      setIsRefreshing(false)
    }
  }

  return { refreshEvents }
}


export const useInterestMutation = (eventId: string, initialState: boolean) => {
  const { toggleInterest } = useEventStore()

  return useMutation({
    mutationFn: () => showInterest(eventId, !initialState),
    onSuccess: () => toggleInterest(eventId),
    onError: () => Alert.alert('Failed to update interest')
  })
} 