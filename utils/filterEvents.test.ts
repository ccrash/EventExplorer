import {filterEvents} from './filterEvents'
import {Event} from '../types/event'

const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Tech Conference',
    location: 'London',
    date: '2025-01-01',
    image: '',
    thumbnail: '',
    organizer: '',
    description: ''
  },
  {
    id: '2',
    name: 'Art Expo',
    location: 'Manchester',
    date: '2025-02-01',
    image: '',
    thumbnail: '',
    organizer: '',
    description: ''
  },
  {
    id: '3',
    name: 'Food Fest',
    location: 'Birmingham',
    date: '2025-03-01',
    image: '',
    thumbnail: '',
    organizer: '',
    description: ''
  }
]

describe('filterEvents', () => {
  it('returns all events if query is empty', () => {
    const result = filterEvents(mockEvents, '')
    expect(result).toEqual(mockEvents)
  })

  it('filters by name (case insensitive)', () => {
    const result = filterEvents(mockEvents, 'tech')
    expect(result).toEqual([mockEvents[0]])
  })

  it('filters by location (case insensitive)', () => {
    const result = filterEvents(mockEvents, 'manchester')
    expect(result).toEqual([mockEvents[1]])
  })

  it('trims and lowers query before filtering', () => {
    const result = filterEvents(mockEvents, '  FoOD  ')
    expect(result).toEqual([mockEvents[2]])
  })

  it('returns empty array if no match found', () => {
    const result = filterEvents(mockEvents, 'zoo')
    expect(result).toEqual([])
  })
})
