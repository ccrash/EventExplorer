import {Event} from '../types/event'

export type EventStore = {
  events: Event[]
  interestedIds: Set<string>
  setEvents: (events: Event[]) => void
  toggleInterested: (id: string) => void
  isInterested: (id: string) => boolean
}
