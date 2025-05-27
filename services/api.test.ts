import { fetchEvents } from '../services/api'
import eventsData from '../data/events.json'

jest.useFakeTimers()

describe('fetchEvents', () => {
  it('resolves with the list of events after delay', async () => {
    const promise = fetchEvents()

    // Fast-forward the timer
    jest.runAllTimers()

    const data = await promise
    expect(data).toEqual(eventsData.events)
  })
})
