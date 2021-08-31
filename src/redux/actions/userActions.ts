import {Dispatch} from 'react'
import {updateUser} from '../../controllers/userController'

// Firebase
import firebase from '../../firebase/fire'
import {firebaseConfig} from '../../firebase/firebaseConfig'
import {AuthData, UserModel, UserState} from '../models'
// [END]
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'

export interface UserErrorAction {
  readonly type: 'ON_USER_ERROR'
  payload: string
}

export interface UserErrorClear {
  readonly type: 'ON_USER_ERROR_CLEAR'
  payload: string
}

export interface UserLoginAction {
  readonly type: 'ON_USER_AUHENTICATE'
  payload: string
}

export type UserAction = UserErrorAction | UserLoginAction | UserErrorClear

export const onUserErrorClear = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: 'ON_USER_ERROR_CLEAR',
      payload: '',
    })
  }
}

export const onUserLogin = (email: string, password: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)

      registerForPushNotificationsAsync(response.user)
      const idTokenResult = await response.user?.getIdTokenResult()

      const authData = {
        refreshToken: response.user?.refreshToken,
        localId: response.user?.tenantId,
        idToken: idTokenResult?.token,
      }

      if (!response) {
        dispatch({
          type: 'ON_USER_ERROR',
          payload: 'Login Error',
        })
      } else {
        dispatch({
          type: 'ON_USER_AUHENTICATE',
          payload: 'Successfully logged in!',
        })
      }
    } catch (error) {
      dispatch({
        type: 'ON_USER_ERROR',
        payload: error.message,
      })
    }
  }
}

const registerForPushNotificationsAsync = async (user: firebase.User) => {
  let token
  if (Constants.isDevice) {
    const {status: existingStatus} = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const {status} = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!')
      return
    }
    token = (await Notifications.getExpoPushTokenAsync()).data

    await updateUser({id: user.uid, expoToken: token} as UserModel)
  } else {
    alert('Must use physical device for Push Notifications')
  }
}

export const onUserSignup = (
  email: string,
  // phone: string,
  password: string
) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)

      const idTokenResult = await response.user?.getIdTokenResult()

      const authData = {
        refreshToken: response.user?.refreshToken,
        localId: response.user?.tenantId,
        idToken: idTokenResult?.token,
      }

      try {
        if (!response) {
          dispatch({
            type: 'ON_USER_ERROR',
            payload: 'User Login error',
          })
        } else {
          dispatch({
            type: 'ON_USER_AUHENTICATE',
            payload: 'Successfully logged in!',
          })
        }
      } catch (error) {
        dispatch({
          type: 'ON_USER_ERROR',
          payload: error,
        })
      }
    } catch (error) {
      dispatch({
        type: 'ON_USER_ERROR',
        payload: error.message,
      })
    }
  }
}

export const subscribeToAuth = async (
  authStateChanged: (user: firebase.User | null) => void
) => {
  if (!firebase.apps.length) {
    await firebase.initializeApp(firebaseConfig)
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      update(user.uid)
      //  await
      // TODO :
      //await updateUser(new User({id: user.uid}))
    }

    authStateChanged(user)
  })
}

const update = async (id: string) => {
  await updateUser({
    id: id,
  } as UserModel)
}

export const logOut = async () => {
  try {
    await firebase.auth().signOut()
  } catch (e) {}
}
