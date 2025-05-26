import React, { useMemo } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RootStackParamList } from './types/navigation'
import { DefaultTheme, DarkTheme, NavigationContainer } from '@react-navigation/native'
import { useThemeStore } from './store/useThemeStore'

import EventList from './screens/EventList'
import EventDetails from './screens/EventDetails'
import InterestedEvents from './screens/InterestedEvents'

const Stack = createNativeStackNavigator<RootStackParamList>()
const queryClient = new QueryClient()

export default function App() {
  const { isDark } = useThemeStore()
  const theme = useMemo(() => (isDark ? DarkTheme : DefaultTheme), [isDark])

  const RootNavigator = () => (
    <Stack.Navigator screenOptions={{headerBackButtonDisplayMode: "minimal", headerTintColor: theme.colors.text}}>
      <Stack.Screen name="EventList" component={EventList} options={{ title: 'Event Explorer' }} />
      <Stack.Screen name="EventDetail" component={EventDetails} options={{ title: 'Details' }} />
      <Stack.Screen name="InterestedEvents" component={InterestedEvents} options={{ title: 'Interested' }} />
    </Stack.Navigator>
  )

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer theme={theme} key={isDark ? 'dark' : 'light'}>
          <RootNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}
