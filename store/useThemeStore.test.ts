import { act } from 'react-test-renderer'
import { useThemeStore } from '../store/useThemeStore'
import { lightTheme, darkTheme } from '../theme/theme'

describe('useThemeStore', () => {
  beforeEach(() => {
    useThemeStore.setState(state => ({
      ...state,
      isDark: false,
      theme: lightTheme
    }))
  })

  it('initializes with light theme', () => {
    const { isDark, theme } = useThemeStore.getState()
    expect(isDark).toBe(false)
    expect(theme).toEqual(lightTheme)
  })

  it('toggles to dark theme', () => {
    act(() => {
      useThemeStore.getState().toggleTheme()
    })

    const { isDark, theme } = useThemeStore.getState()
    expect(isDark).toBe(true)
    expect(theme).toEqual(darkTheme)
  })

  it('toggles back to light theme', () => {
    act(() => {
      useThemeStore.getState().toggleTheme()
    })
    act(() => {
      useThemeStore.getState().toggleTheme()
    })

    const { isDark, theme } = useThemeStore.getState()
    expect(isDark).toBe(false)
    expect(theme).toEqual(lightTheme)
  })
})
