import { renderHook, act } from '@testing-library/react-hooks'
import * as api from '../services/api'
import { useEventStore } from '../store/useEventStore'
import { useEventLoader, useToggleInterest } from '../hooks/useEventActions'

jest.mock('../services/api')
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn()
}))

const mockEvents = [
  { id: '1', name: 'Event 1', location: 'City', date: '2024-01-01', thumbnail: '', image: '', description: '', organizer: '' }
]

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterAll(() => {
  jest.restoreAllMocks()
})

describe('useEventLoader', () => {
  beforeEach(() => {
    useEventStore.setState({
      events: [],
      isRefreshing: false,
      setEvents: jest.fn(),
      setIsRefreshing: jest.fn()
    })
  })

  it('loads events and updates store', async () => {
    jest.spyOn(api, 'fetchEvents').mockResolvedValueOnce(mockEvents)

    const { result } = renderHook(() => useEventLoader())

    await act(async () => {
      await result.current.loadEvents()
    })

    const state = useEventStore.getState()
    expect(state.setIsRefreshing).toHaveBeenCalledWith(true)
    expect(state.setEvents).toHaveBeenCalledWith(mockEvents)
    expect(state.setIsRefreshing).toHaveBeenCalledWith(false)
  })

  it('handles fetch failure', async () => {
    const error = new Error('Network error')
    jest.spyOn(api, 'fetchEvents').mockRejectedValueOnce(error)

    const { result } = renderHook(() => useEventLoader())

    await act(async () => {
      await result.current.loadEvents()
    })

    const state = useEventStore.getState()
    expect(state.setIsRefreshing).toHaveBeenCalledWith(true)
    expect(state.setIsRefreshing).toHaveBeenCalledWith(false)
  })
})

describe('useToggleInterest', () => {
  beforeEach(() => {
    useEventStore.setState({
      toggleInterest: jest.fn()
    })
  })

  it('toggles interest successfully', async () => {
    const spy = jest.spyOn(api, 'showInterest').mockResolvedValueOnce(undefined)

    const { result } = renderHook(() =>
      useToggleInterest('1', false)
    )

    await act(async () => {
      await result.current.toggle()
    })

    expect(spy).toHaveBeenCalledWith('1', true)
    expect(useEventStore.getState().toggleInterest).toHaveBeenCalledWith('1')
  })

  it('handles toggle failure', async () => {
    jest.spyOn(api, 'showInterest').mockRejectedValueOnce(new Error('fail'))

    const { result } = renderHook(() =>
      useToggleInterest('2', true)
    )

    await act(async () => {
      await result.current.toggle()
    })

    // Ensure toggleInterest was not called
    expect(useEventStore.getState().toggleInterest).not.toHaveBeenCalled()
  })
})
