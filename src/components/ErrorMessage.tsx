import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native'

interface ErrorMessageProps {
  value?: string
}
const ErrorMessage: React.FC<ErrorMessageProps> = ({value}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {width: '90%'},
  errorText: {
    color: 'red',
    fontFamily: 'open-sans-regular',
  },
})

export {ErrorMessage}
