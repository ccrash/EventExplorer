import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import EventListScreen from './EventList'
import { useEventStore } from '../store/useEventStore'
import { useThemeStore } from '../store/useThemeStore'
import { useEventLoader } from '../hooks/useEventActions'
import { useHomeHeader } from '../hooks/useHomeHeader'
import { useNavigation } from '@react-navigation/native'

jest.mock('../store/useEventStore')
jest.mock('../store/useThemeStore')
jest.mock('../hooks/useEventActions')
jest.mock('../hooks/useHomeHeader')
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn()
}))
jest.mock('../components/EventCard', () => ({
  EventCard: ({ event, onPress }: any) => {
    const { Text, TouchableOpacity } = require('react-native')
    return (
      <TouchableOpacity onPress={onPress}>
        <Text>{event.name}</Text>
      </TouchableOpacity>
    )
  }
}))
jest.mock('../components/SearchInput', () => ({
  SearchInput: ({ value, onChange }: any) => {
    const { TextInput } = require('react-native')
    return (
      <TextInput
        value={value}
        onChangeText={onChange}
        testID="search-input"
        placeholder="Search"
      />
    )
  }
}))

describe('EventListScreen', () => {
  const mockLoadEvents = jest.fn()
  const mockNavigate = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    ;(useNavigation as never as jest.Mock).mockReturnValue({ navigate: mockNavigate })
    ;(useHomeHeader as never as jest.Mock).mockReturnValue(undefined)
    ;(useThemeStore as never as jest.Mock).mockReturnValue({
      theme: { text: '#000' }
    })
    ;(useEventLoader as jest.Mock).mockReturnValue({
      loadEvents: mockLoadEvents
    })
  })

  it('shows loading indicator when refreshing and no events', () => {
    ;(useEventStore as never as jest.Mock).mockReturnValue({
      events: [],
      isRefreshing: true
    })

    const { getByTestId } = render(<EventListScreen />)
    expect(getByTestId('ActivityIndicator')).toBeTruthy()
  })

  it('displays list of events', () => {
    ;(useEventStore as never as jest.Mock).mockReturnValue({
      events: [{ id: '1', name: 'Event A', date: '', location: '', image: '', thumbnail: '', description: '', organizer: '' }],
      isRefreshing: false
    })

    const { getByText } = render(<EventListScreen />)
    expect(getByText('Event A')).toBeTruthy()
  })

  it('navigates on event press', () => {
    ;(useEventStore as never as jest.Mock).mockReturnValue({
      events: [{ id: '1', name: 'Event A', date: '', location: '', image: '', thumbnail: '', description: '', organizer: '' }],
      isRefreshing: false
    })

    const { getByText } = render(<EventListScreen />)
    fireEvent.press(getByText('Event A'))
    expect(mockNavigate).toHaveBeenCalledWith('EventDetail', expect.objectContaining({ event: expect.any(Object) }))
  })

  it('filters events based on search', () => {
    ;(useEventStore as never as jest.Mock).mockReturnValue({
      events: [
        { id: '1', name: 'Music Festival', date: '', location: '', image: '', thumbnail: '', description: '', organizer: '' },
        { id: '2', name: 'Tech Conference', date: '', location: '', image: '', thumbnail: '', description: '', organizer: '' }
      ],
      isRefreshing: false
    })

    const { queryByText, getByTestId } = render(<EventListScreen />)
    fireEvent.changeText(getByTestId('search-input'), 'Tech')
    expect(queryByText('Tech Conference')).toBeTruthy()
    expect(queryByText('Music Festival')).toBeNull()
  })

  it('shows fallback when no results and not refreshing', () => {
    ;(useEventStore as never as jest.Mock).mockReturnValue({
      events: [],
      isRefreshing: false
    })

    const { getByText } = render(<EventListScreen />)
    expect(getByText('No events found.')).toBeTruthy()
  })
})
