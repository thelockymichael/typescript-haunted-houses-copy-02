import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator} from '@react-navigation/drawer'
import React from 'react'
import {OptionalInfoSetup, UsernameSetup} from '../screens'

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
      <SetupUserStack.Screen
        name="OptionalInfoSetup"
        component={OptionalInfoSetup}
      />
    </SetupUserStack.Navigator>
  )
}

export {SetupUserNavigator}
