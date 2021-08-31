import React from 'react'

import {StyleSheet, TextInput, Dimensions} from 'react-native'
// import {TextInput} from 'react-native-paper'

const {width, height} = Dimensions.get('screen')

interface FormInputProps {
  labelName: string
  onTextChange: Function
  value: string
  testID?: string
  secureTextEntry?: boolean
  autoCapitalize?: 'none' | 'characters' | 'sentences' | 'none'
}

const FormInput: React.FC<FormInputProps> = ({
  labelName,
  onTextChange,
  testID,
  ...rest
}) => {
  return (
    <TextInput
      placeholder={labelName}
      testID={testID}
      style={styles.input}
      numberOfLines={1}
      onChangeText={(text) => onTextChange(text)}
    />
    // <TextInput
    //   testID={testID}
    //   label={labelName}
    //   style={styles.input}
    //   numberOfLines={1}
    //   onChangeText={(text) => onTextChange(text)}
    //   {...rest}
    // />
  )
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 10,
    width: 200,
    height: 40,
  },
})

export {FormInput}
