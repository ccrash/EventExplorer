import eventsData from '../data/events.json'

import {Event} from '../types/event'

export const fetchEvents = (): Promise<Event[]> => {
  return new Promise(resolve => {
    // Simulate API call delay
    setTimeout(() => {
      resolve(eventsData.events)
    }, 1000)
  })
}
