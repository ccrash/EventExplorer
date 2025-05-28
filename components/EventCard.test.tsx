import React from 'react'
import {render, fireEvent} from '@testing-library/react-native'
import {EventCard} from '../components/EventCard'
import {useThemeStore} from '../store/useThemeStore'
import {useEventStore} from '../store/useEventStore'

jest.mock('../store/useThemeStore')
jest.mock('../store/useEventStore')

const mockEvent = {
  id: '1',
  name: 'Test Event',
  date: '2024-06-01',
  location: 'Test City',
  thumbnail: 'https://example.com/image.jpg',
  image: 'https://example.com/large-image.jpg',
  description: 'A mock event for testing purposes.',
  organizer: 'Test Org'
}

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterAll(() => {
  jest.restoreAllMocks()
})

describe('EventCard', () => {
  const mockOnPress = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useThemeStore as unknown as jest.Mock).mockReturnValue({
      theme: {
        border: '#ccc',
        background: '#fff',
        text: '#000'
      }
    })
    ;(useEventStore as unknown as jest.Mock).mockReturnValue({
      interestingIds: new Set()
    })
  })

  it('renders event details correctly', () => {
    const {getByText} = render(<EventCard event={mockEvent} onPress={mockOnPress} />)

    expect(getByText('Test Event')).toBeTruthy()
    expect(getByText('01 Jun 24')).toBeTruthy()
    expect(getByText('Test City')).toBeTruthy()
  })

  it('calls onPress when pressed', () => {
    const {getByLabelText} = render(<EventCard event={mockEvent} onPress={mockOnPress} />)
    fireEvent.press(getByLabelText('View details for Test Event'))
    expect(mockOnPress).toHaveBeenCalled()
  })

  it('shows interest icon if event is marked as interesting', () => {
    ;(useThemeStore as unknown as jest.Mock).mockReturnValue({
      theme: {
        border: '#ccc',
        background: '#fff',
        text: '#000'
      }
    })
    ;(useEventStore as unknown as jest.Mock).mockReturnValue({
      interestingIds: new Set(['1'])
    })

    const {getByTestId} = render(<EventCard event={mockEvent} />)

    expect(getByTestId('interest-icon')).toBeTruthy()
  })
})
