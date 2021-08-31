import React, {useState, useEffect, SetStateAction} from 'react'
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native'

import * as Location from 'expo-location'

const verifyPermissions = async () => {
  const {status} = await Location.requestForegroundPermissionsAsync()

  if (status !== 'granted') {
    Alert.alert(
      'Insufficient permissions!',
      'You need to grant location permissions to use this app.',
      [{text: 'Okay'}]
    )

    return false
  }

  return true
}

export {verifyPermissions}
