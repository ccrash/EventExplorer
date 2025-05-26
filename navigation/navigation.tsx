import React from 'react'
import { View, Image, StatusBar, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { WelcomeScreen } from '../screens/welcome_screen'
import ConsultationScreen from '../screens/consultation_screen/index'
import { EligibleScreen } from '../screens/eligible_screen'

export type RootStackParamList = {
  Welcome: undefined;
  Consultation: undefined;
  PrivateArea: undefined;
}

const Stack = createStackNavigator<RootStackParamList>()

// Custom interpolators
const forCustomHorizontal = ({ current, layouts } : any) => ({
  cardStyle: {
    transform: [
      {
        translateX: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [layouts.screen.width, 0]
        })
      }
    ]
  }
})
const forCustomHorizontalReverse = ({ current, layouts }: any) => ({
  cardStyle: {
    transform: [
      {
        translateX: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [-layouts.screen.width, 0]
        })
      }
    ]
  }
})

const CustomHeaderBackground = () => {
  const insets = useSafeAreaInsets()
  const statusBarHeight =
    Platform.OS === 'android' ? 0 : insets.top

  return (
    <View style={{ flex: 1 }}>
      {/* White area for the status bar */}
      <View style={{ height: statusBarHeight, backgroundColor: 'white' }} />
      {/* Blue header area */}
      <View style={{ flex: 1, backgroundColor: '#003f82' }} />
    </View>
  )
}

const Navigation = () => {
  const HeaaderBarHeight =
    Platform.OS === 'android' ? 60 : 100

  return (
    <>
    <StatusBar
        translucent={false}
        backgroundColor="white"
        barStyle="dark-content"
    />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={({ route }) => ({
            headerTransparent: false,
            headerBackground: () => <CustomHeaderBackground />,
            headerTitle: '',
            headerLeft: () => (
              <View style={{ marginLeft: 10, justifyContent: 'center' }}>
                <Image
                  source={require('../assets/medexpress_logo.png')}
                  style={{ width: 138, height: 30 }}
                />
              </View>
            ),
            // Set the overall header height including status bar safe area
            headerStyle: {
              height: HeaaderBarHeight
            },
            cardStyleInterpolator:
              route.name === 'Welcome'
                ? forCustomHorizontalReverse
                : forCustomHorizontal
          })}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Consultation" component={ConsultationScreen} />
          <Stack.Screen name="PrivateArea" component={EligibleScreen} options={{ headerBackTitleVisible: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default Navigation
