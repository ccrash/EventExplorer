import { Event } from '../types/event'

export const filterEvents = (events: Event[], query: string): Event[] => {
  const q = query.trim().toLowerCase()
  if (!q) return events

  return events.filter(e =>
    e.name.toLowerCase().includes(q) ||
    e.location.toLowerCase().includes(q)
  )
}
