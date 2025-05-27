import React, { useMemo } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './types/navigation'
import { DefaultTheme, DarkTheme, NavigationContainer } from '@react-navigation/native'
import { useThemeStore } from './store/useThemeStore'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

import EventList from './screens/EventList'
import EventDetails from './screens/EventDetails'
import InterestingEvents from './screens/InterestingEvents'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  const { isDark } = useThemeStore()
  const theme = useMemo(() => (isDark ? DarkTheme : DefaultTheme), [isDark])

  const RootNavigator = () => (
    <Stack.Navigator screenOptions={{headerBackButtonDisplayMode: "minimal", headerTintColor: theme.colors.text}}>
      <Stack.Screen name="EventList" component={EventList} options={{ title: 'Event Explorer' }} />
      <Stack.Screen name="EventDetail" component={EventDetails} options={{ title: 'Details' }} />
      <Stack.Screen name="InterestedEvents" component={InterestingEvents} options={{ title: 'Interesting Events' }} />
    </Stack.Navigator>
  )

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <NavigationContainer theme={theme} key={isDark ? 'dark' : 'light'}>
          <RootNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}
