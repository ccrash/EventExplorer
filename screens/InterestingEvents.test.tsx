import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import InterestingEvents from '../screens/InterestingEvents'
import { useEventStore } from '../store/useEventStore'
import { useThemeStore } from '../store/useThemeStore'
import { useNavigation } from '@react-navigation/native'

jest.mock('../store/useEventStore')
jest.mock('../store/useThemeStore')
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

describe('InterestingEvents', () => {
  const mockNavigate = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    ;(useNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate
    })

    ;(useThemeStore as never as jest.Mock).mockReturnValue({
      theme: { text: '#000' }
    })
  })

  it('renders empty state when no interested events', () => {
    ;(useEventStore as never as jest.Mock).mockReturnValue({
      events: [],
      interestingIds: new Set()
    })

    const { getByText } = render(<InterestingEvents />)
    expect(getByText('No interested events')).toBeTruthy()
  })

  it('renders list of interested events', () => {
    const mockEvent = {
      id: '1',
      name: 'Saved Event',
      date: '', location: '', image: '', thumbnail: '', description: '', organizer: ''
    }

    ;(useEventStore as never as jest.Mock).mockReturnValue({
      events: [mockEvent],
      interestingIds: new Set(['1'])
    })

    const { getByText } = render(<InterestingEvents />)
    expect(getByText('Saved Event')).toBeTruthy()
  })

  it('navigates on card press', () => {
    const mockEvent = {
      id: '1',
      name: 'Saved Event',
      date: '', location: '', image: '', thumbnail: '', description: '', organizer: ''
    }

    ;(useEventStore as never as jest.Mock).mockReturnValue({
      events: [mockEvent],
      interestingIds: new Set(['1'])
    })

    const { getByText } = render(<InterestingEvents />)
    fireEvent.press(getByText('Saved Event'))

    expect(mockNavigate).toHaveBeenCalledWith('EventDetail', { event: mockEvent })
  })
})
