import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { SearchInput } from './SearchInput'

// Mock the theme store
jest.mock('../store/useThemeStore', () => ({
  useThemeStore: () => ({
    theme: {
      text: '#000',
      border: '#ccc',
      background: '#fff',
    }
  })
}))

describe('SearchInput', () => {
  it('renders correctly with placeholder and value', () => {
    const { getByPlaceholderText } = render(
      <SearchInput value="Hello" onChange={() => {}} />
    )
    expect(getByPlaceholderText('Search...')).toBeTruthy()
  })

  it('calls onChange when text is typed', () => {
    const handleChange = jest.fn()
    const { getByPlaceholderText } = render(
      <SearchInput value="" onChange={handleChange} />
    )
    fireEvent.changeText(getByPlaceholderText('Search...'), 'test')
    expect(handleChange).toHaveBeenCalledWith('test')
  })

  it('renders a static filter icon', () => {
    const { getByTestId } = render(
      <SearchInput value="" onChange={() => {}} />
    )
    expect(getByTestId('filter-icon')).toBeTruthy()
  })
})
