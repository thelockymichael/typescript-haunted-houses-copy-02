import {createStackNavigator} from '@react-navigation/stack'
import React, {useState, useEffect} from 'react'
import {LoginScreen} from '../screens'
import {RegisterScreen} from '../screens'

// Create instance
const AuthStack = createStackNavigator()

interface AuthStackProps {}
const AuthStackNavigator: React.FC<AuthStackProps> = ({}) => {
  return (
    <AuthStack.Navigator initialRouteName="Login" headerMode="none">
      <AuthStack.Screen name="LoginPage" component={LoginScreen} />
      <AuthStack.Screen name="RegisterPage" component={RegisterScreen} />
    </AuthStack.Navigator>
  )
}

export {AuthStackNavigator}
