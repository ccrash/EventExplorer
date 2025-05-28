import {renderHook, act} from '@testing-library/react-hooks'
import {useEventStore} from './useEventStore'
import {Event} from '../types/event'

describe('useEventStore', () => {
  beforeEach(() => {
    useEventStore.setState({
      events: [],
      interestingIds: new Set(),
      isRefreshing: false
    })
  })

  const mockEvents: Event[] = [
    {
      id: '1',
      name: 'Mock Event',
      date: '2025-01-01',
      location: 'London',
      image: '',
      thumbnail: '',
      organizer: '',
      description: ''
    }
  ]

  it('should start with empty state', () => {
    const {result} = renderHook(() => useEventStore())
    expect(result.current.events).toEqual([])
    expect(result.current.interestingIds).toEqual(new Set())
    expect(result.current.isRefreshing).toBe(false)
  })

  it('should set events', () => {
    const {result} = renderHook(() => useEventStore())
    act(() => {
      result.current.setEvents(mockEvents)
    })
    expect(result.current.events).toEqual(mockEvents)
  })

  it('should toggle interest correctly', () => {
    const {result} = renderHook(() => useEventStore())

    act(() => {
      result.current.toggleInterest('1')
    })
    expect(result.current.interestingIds.has('1')).toBe(true)

    act(() => {
      result.current.toggleInterest('1')
    })
    expect(result.current.interestingIds.has('1')).toBe(false)
  })

  it('should set isRefreshing', () => {
    const {result} = renderHook(() => useEventStore())
    act(() => {
      result.current.setIsRefreshing(true)
    })
    expect(result.current.isRefreshing).toBe(true)
  })
})
