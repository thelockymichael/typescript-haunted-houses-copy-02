import React from 'react'

import {StyleSheet, Dimensions, ViewStyle} from 'react-native'
import {TextInput} from 'react-native-paper'

const {width, height} = Dimensions.get('screen')

interface FormInputProps {
  labelName: string
  onTextChange: Function
  value: string
  testID?: string
  multiline?: boolean
  secureTextEntry?: boolean
  autoCapitalize?: 'none' | 'characters' | 'sentences' | 'none'
  extraStyle?: ViewStyle
  numberOfLines?: number
}

const FormInput: React.FC<FormInputProps> = ({
  labelName,
  onTextChange,
  testID,
  multiline,
  extraStyle,
  numberOfLines,
  ...rest
}) => {
  return (
    <TextInput
      testID={testID}
      multiline={multiline}
      label={labelName}
      style={{...styles.input, ...extraStyle}}
      numberOfLines={numberOfLines || 1}
      onChangeText={(text) => onTextChange(text)}
      maxLength={100}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 10,
    width: width / 1.5,
    height: height / 15,
  },
})

export {FormInput}
