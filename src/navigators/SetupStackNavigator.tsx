import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator} from '@react-navigation/drawer'
import React from 'react'
import {UsernameSetup} from '../screens'

const SetupUserStack = createStackNavigator()

const SetupUserNavigator = () => {
  return (
    <SetupUserStack.Navigator
      headerMode="screen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <SetupUserStack.Screen name="UsernameSetup" component={UsernameSetup} />
    </SetupUserStack.Navigator>
  )
}

export {SetupUserNavigator}
