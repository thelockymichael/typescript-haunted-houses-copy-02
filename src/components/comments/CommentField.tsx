import {props} from 'cypress/types/bluebird'
import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputEndEditingEventData,
  TextInputSubmitEditingEventData,
} from 'react-native'

interface CommentFieldProps {
  style: ViewStyle
  input?: ViewStyle
  onChangeText: (text: string) => void
  value: string
  blurOnSubmit: boolean
  keyboardType:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
  autoCapitalize: 'none' | 'sentences' | 'words' | 'characters' | undefined
  autoCorrect: boolean
  maxLength: number
  onEndEditing?:
    | ((e: NativeSyntheticEvent<TextInputEndEditingEventData>) => void)
    | undefined
  onSubmitEditing?:
    | ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void)
    | undefined

  placeholder: string
}
const CommentField: React.FC<CommentFieldProps> = (props) => {
  return <TextInput {...props} style={{...styles.input, ...props.style}} />
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 10,
    height: 40,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    fontFamily: 'open-sans-regular',
  },
})

export {CommentField}
