import React from 'react'
import { render } from '@testing-library/react-native'
import EventDetailsScreen from './EventDetails'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useThemeStore } from '../store/useThemeStore'

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
  useNavigation: jest.fn()
}))

jest.mock('../store/useThemeStore', () => ({
  useThemeStore: jest.fn()
}))

jest.mock('../components/InterestButton', () => ({
  InterestButton: ({ eventId }: { eventId: string }) => {
    const { Text } = require('react-native')
    return <Text>InterestButton: {eventId}</Text>
  }
}))

describe('EventDetailsScreen', () => {
  const mockSetOptions = jest.fn()

  const mockEvent = {
    id: '1',
    name: 'Sample Event',
    date: '2024-06-01',
    location: 'Test City',
    image: 'https://example.com/image.jpg',
    description: 'A great event.',
    organizer: 'Test Org'
  }

  beforeEach(() => {
    jest.clearAllMocks()

    ;(useRoute as jest.Mock).mockReturnValue({
      params: { event: mockEvent }
    })

    ;(useNavigation as jest.Mock).mockReturnValue({
      setOptions: mockSetOptions
    })

    ;(useThemeStore as never as jest.Mock).mockReturnValue({
      theme: {
        text: '#000',
        border: '#ccc',
        background: '#fff'
      }
    })
  })

  it('renders event details', () => {
    const { getByText } = render(<EventDetailsScreen />)

    expect(getByText('Sample Event')).toBeTruthy()
    expect(getByText('01 Jun 24')).toBeTruthy()
    expect(getByText('Test City')).toBeTruthy()
    expect(getByText(/Organized by/)).toBeTruthy()
    expect(getByText('A great event.')).toBeTruthy()
    expect(getByText('InterestButton: 1')).toBeTruthy()
  })

  it('sets navigation title to event name', () => {
    render(<EventDetailsScreen />)
    expect(mockSetOptions).toHaveBeenCalledWith({ title: 'Sample Event' })
  })
})
