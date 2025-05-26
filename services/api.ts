import eventsData from '../data/events.json'

import { Event } from '../types/event'

export const fetchEvents = (): Promise<Event[]> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      resolve(eventsData.events)
    }, 1000)
  })
}

export const showInterest = (id: string, interested: boolean): Promise<void> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    console.log(`${interested ? 'Marking' : 'Removing'} interest for event ${id}`)
    setTimeout(() => {
      resolve()
    }, 500)
  })
}