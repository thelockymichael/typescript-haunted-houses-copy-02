import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native'

interface IProps {
  value?: string
  type: 'positive' | 'negative'
}
const MessageLabel: React.FC<IProps> = ({value, type}) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          ...styles.errorText,
          color: type === 'positive' ? 'green' : 'red',
        }}
      >
        {value}
      </Text>
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

export {MessageLabel}
