import React, {useEffect, useState} from 'react'
import {StatusBar} from 'expo-status-bar'
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  LogBox,
  Text,
  View,
} from 'react-native'

import firebase from './src/firebase/fire'

// Loading & Fonts setuo
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
// [END]

// Redux
import {Provider} from 'react-redux'
import {store, subscribeToAuth, UserModel} from './src/redux'
// [END]

// Navigation
import {NavigationContainer} from '@react-navigation/native'

// [END]

import {Loading} from './src/components'
import {DrawerStackNavigator} from './src/navigators/HomeStackNavigator'
import {AuthStackNavigator} from './src/navigators/AuthStackNavigator'

// [END]

import * as Notifications from 'expo-notifications'

// GlobalStyles

import {SafeViewAndroid} from './src/constants'
import {userStream} from './src/controllers/userController'

// FirebaseHooks
import {useDocumentData} from 'react-firebase-hooks/firestore'
import {UserContext} from './src/contexts/contexts'

// Expo updates
import * as Updates from 'expo-updates'
import {UsernameSetup} from './src/screens'
import {SetupUserNavigator} from './src/navigators/SetupStackNavigator'

interface AppNavigatorProps {
  userId: string | null
  isLoading: boolean
}
const AppNavigator: React.FC<AppNavigatorProps> = ({userId, isLoading}) => {
  if (isLoading) {
    return <Loading />
  }

  if (userId == null) {
    return <AuthStackNavigator />
  } else {
    let userRef = userStream(userId)

    const [user] = useDocumentData<UserModel>(userRef)

    if (user !== undefined) {
      // If setup is not completed

      if (
        user.expoToken === undefined ||
        user.id === undefined ||
        user.userName === undefined ||
        user.optionalInfo?.firstName === undefined ||
        user.optionalInfo?.lastName === undefined ||
        user.optionalInfo?.homeMunicipality === undefined ||
        user.optionalInfo?.postCode === undefined ||
        user.optionalInfo?.address === undefined ||
        user.optionalInfo?.phoneNum === undefined
      ) {
        return (
          <UserContext.Provider value={{user}}>
            <SetupUserNavigator />
          </UserContext.Provider>
        )
      } else {
        // checkForNewUpdate(user)

        return (
          <UserContext.Provider value={{user}}>
            <DrawerStackNavigator />
          </UserContext.Provider>
        )
      }
    } else {
      return <Loading />
    }
  }
}

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
// Web build crashes if LogBox is used
if (Platform.OS !== 'web') {
  LogBox.ignoreLogs([`Setting a timer for a long period`])
}

// Notifications showAlert
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {shouldShowAlert: true, shouldPlaySound: true, shouldSetBadge: true}
  },
})

export default function App() {
  // Create Navigation for auth and home
  // & using TypeScript
  // login and register validation
  const [userId, setUserId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const [fontReady, setFontReady] = useState(false)

  const loadFonts = async () => {
    await Font.loadAsync({
      'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-semi-bold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    })
    setFontReady(true)
  }

  useEffect(() => {
    subscribeToAuth(authStateChanged)

    loadFonts()
  }, [])

  const authStateChanged = (user: any) => {
    setIsLoading(true)
    if (user !== null) {
      setTimeout(() => {
        setUserId(user.uid)

        setIsLoading(false)
      }, 1000)
    } else {
      setUserId(null)
      setIsLoading(false)
    }
  }

  if (!fontReady) {
    return <AppLoading />
  }

  return (
    <Provider store={store}>
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        <NavigationContainer>
          <AppNavigator userId={userId} isLoading={isLoading} />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  )
}

// const mapStateToProps = (state: ApplicationState) => ({
//   userReducer: state.userReducer,
// })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
