import React from 'react'
import {
  StyleSheet,
  Dimensions,
  Text,
  TextStyle,
  StyleProp,
  ViewStyle,
} from 'react-native'
import {Button} from 'react-native-paper'

const {width, height} = Dimensions.get('screen')

interface FormButtonProps {
  title: string
  modeValue: 'text' | 'outlined' | 'contained'
  testID?: string
  upperCase?: boolean
  labelStyle?: StyleProp<TextStyle>
  onTap?: () => void
  disabled?: boolean
  extraStyle?: ViewStyle
}

const FormButton: React.FC<FormButtonProps> = ({
  title,
  testID,
  modeValue,
  onTap,
  disabled,
  extraStyle,
  ...rest
}) => {
  return (
    <Button
      testID={testID}
      mode={modeValue}
      style={{...styles.button, ...extraStyle}}
      contentStyle={styles.buttonContainer}
      onPress={onTap}
      disabled={disabled}
      {...rest}
    >
      {title}
    </Button>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
  buttonContainer: {
    width: '100%',
    height: height / 15,
  },
})

export {FormButton}
