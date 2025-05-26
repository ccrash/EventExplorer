import { renderHook } from '@testing-library/react-hooks'
import { useHomeHeader } from '../hooks/useHomeHeader'
import { useThemeStore } from '../store/useThemeStore'
import { useNavigation } from '@react-navigation/native'

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn()
}))

jest.mock('../store/useThemeStore', () => ({
  useThemeStore: jest.fn()
}))

describe('useHomeHeader', () => {
  const setOptions = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    ;(useNavigation as jest.Mock).mockReturnValue({ setOptions, navigate: jest.fn() })

    ;(useThemeStore as unknown as jest.Mock).mockReturnValue({
      theme: { text: 'black' },
      isDark: true,
      toggleTheme: jest.fn()
    })
  })

  it('sets header left and right buttons correctly', () => {
    renderHook(() => useHomeHeader())

    expect(setOptions).toHaveBeenCalledWith({
      headerLeft: expect.any(Function),
      headerRight: expect.any(Function)
    })
  })
})
