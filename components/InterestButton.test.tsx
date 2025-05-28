import React from 'react'
import {render, fireEvent} from '@testing-library/react-native'
import {InterestButton} from '../components/InterestButton'
import {useEventStore} from '../store/useEventStore'
import {useToggleInterest} from '../hooks/useEventActions'
import {useThemeStore} from '../store/useThemeStore'

jest.mock('../store/useEventStore')
jest.mock('../store/useThemeStore')
jest.mock('../hooks/useEventActions')

describe('InterestButton', () => {
  const mockToggle = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useThemeStore as never as jest.Mock).mockReturnValue({
      theme: {
        text: '#000',
        background: '#fff',
        border: '#ccc'
      }
    })
  })

  it('renders "Mark as Interested" when not interested', () => {
    ;(useEventStore as never as jest.Mock).mockReturnValue({
      interestingIds: new Set()
    })
    ;(useToggleInterest as jest.Mock).mockReturnValue({
      toggle: mockToggle
    })

    const {getByText} = render(<InterestButton eventId="1" />)
    expect(getByText('Mark as Interested')).toBeTruthy()
  })

  it('renders "Remove from Interested" when already interested', () => {
    ;(useEventStore as never as jest.Mock).mockReturnValue({
      interestingIds: new Set(['1'])
    })
    ;(useToggleInterest as jest.Mock).mockReturnValue({
      toggle: mockToggle
    })

    const {getByText} = render(<InterestButton eventId="1" />)
    expect(getByText('Remove from Interested')).toBeTruthy()
  })

  it('calls toggle function when pressed', () => {
    ;(useEventStore as never as jest.Mock).mockReturnValue({
      interestingIds: new Set()
    })
    ;(useToggleInterest as jest.Mock).mockReturnValue({
      toggle: mockToggle
    })

    const {getByLabelText} = render(<InterestButton eventId="1" />)
    fireEvent.press(getByLabelText('Mark as interested events'))

    expect(mockToggle).toHaveBeenCalled()
  })
})
