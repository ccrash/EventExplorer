import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Event} from '../types/event'

type State = {
  events: Event[]
  interestingIds: Set<string>
  setEvents: (events: Event[]) => void
  toggleInterest: (id: string) => void
  isRefreshing: boolean
  setIsRefreshing: (b: boolean) => void
}

export const useEventStore = create<State>()(
  persist(
    (set, get) => ({
      events: [],
      interestingIds: new Set(),
      setEvents: events => set({events}),
      toggleInterest: id => {
        const ids = new Set(get().interestingIds)
        ids.has(id) ? ids.delete(id) : ids.add(id)
        set({interestingIds: ids})
      },
      isRefreshing: false,
      setIsRefreshing: b => set({isRefreshing: b})
    }),
    {
      name: 'event-storage',
      storage: {
        getItem: async (name: string) => {
          const value = await AsyncStorage.getItem(name)
          return value ? JSON.parse(value) : null
        },
        setItem: async (name: string, value: any) => {
          await AsyncStorage.setItem(name, JSON.stringify(value))
        },
        removeItem: AsyncStorage.removeItem
      },
      partialize: ({events, interestingIds}) => ({
        events,
        interestingIds: Array.from(interestingIds)
      }),
      merge: (persisted, current) => ({
        ...current,
        ...(persisted && typeof persisted === 'object' ? persisted : {}),
        interestingIds: new Set((persisted as any)?.interestingIds ?? [])
      })
    }
  )
)
