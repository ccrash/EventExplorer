import React from 'react'
import { ScrollView, View, StyleSheet, ViewStyle } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useThemeStore } from '../store/useThemeStore'

type Props = {
  children: React.ReactNode
  style?: ViewStyle
  scroll?: boolean
  centered?: boolean
  disablePadding?: boolean
}

export const Screen = ({children, style, scroll = false, centered = false,  disablePadding = false}: Props) => {
  const { theme } = useThemeStore()
  const Container = scroll ? ScrollView : View

  const layoutStyles = [
    !disablePadding && styles.content,
    centered && styles.centered,
    { backgroundColor: theme.background },
    style
  ]

  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right']}
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <Container style={layoutStyles}>
        {children}
      </Container>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  content: {
    flex: 1,
    padding: 16
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})
