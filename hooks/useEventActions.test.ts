import { renderHook, act } from '@testing-library/react-hooks'
import { useEventLoader, useToggleInterest } from '../hooks/useEventActions'
import { useEventStore } from '../store/useEventStore'
import * as api from '../services/api'

jest.mock('../store/useEventStore')
jest.mock('../services/api')

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterAll(() => {
  jest.restoreAllMocks()
})

describe('useEventLoader', () => {
  const setEvents = jest.fn()
  const setIsRefreshing = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks();

    (useEventStore as unknown as jest.Mock).mockReturnValue({
      setEvents,
      setIsRefreshing
    })
  })

  it('loads events and updates the store', async () => {
    const mockData = [{ id: '1', name: 'Test Event' }];
    (api.fetchEvents as jest.Mock).mockResolvedValue(mockData)

    const { result } = renderHook(() => useEventLoader())

    await act(async () => {
      await result.current.loadEvents()
    })

    expect(setIsRefreshing).toHaveBeenCalledWith(true)
    expect(api.fetchEvents).toHaveBeenCalled()
    expect(setEvents).toHaveBeenCalledWith(mockData)
    expect(setIsRefreshing).toHaveBeenCalledWith(false)
  })

  it('handles fetch failure', async () => {
    (api.fetchEvents as jest.Mock).mockRejectedValue(new Error('fail'))

    const { result } = renderHook(() => useEventLoader())

    await act(async () => {
      await result.current.loadEvents()
    })

    expect(setIsRefreshing).toHaveBeenCalledWith(true)
    expect(setIsRefreshing).toHaveBeenCalledWith(false)
  })
})

describe('useToggleInterest', () => {
  const toggleInterest = jest.fn()

  beforeEach(() => {
    (useEventStore as unknown as jest.Mock).mockReturnValue({ toggleInterest })
  })

  it('toggles interest state', async () => {
    const { result } = renderHook(() => useToggleInterest('123', true))

    await act(async () => {
      await result.current.toggle()
    })

    expect(toggleInterest).toHaveBeenCalledWith('123')
  })
})
