import {MaterialCommunityIcons} from '@expo/vector-icons'
import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, ViewStyle} from 'react-native'
import {color} from '../constants'

interface ButtonProps {
  onTap: Function
  icon: JSX.Element
  iconText?: string | number
  disabled?: boolean
  otherStyle?: ViewStyle
}
const ButtonWithIcon: React.FC<ButtonProps> = ({
  onTap,
  icon,
  iconText,
  disabled,
  otherStyle,
}) => {
  let iconTextContainer = null

  // Create empty space if iconText and iconText are defined
  if (iconText !== undefined && iconText !== null) {
    iconTextContainer = (
      <View style={styles.iconTextContainer}>
        <Text style={styles.iconText}>{iconText}</Text>
      </View>
    )
  }
  return (
    <TouchableOpacity
      disabled={disabled || false}
      onPress={() => onTap()}
      style={[styles.btn, otherStyle]}
    >
      {icon}

      {iconTextContainer}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    flexDirection: 'row',
  },
  iconTextContainer: {
    paddingLeft: 4,
  },
  iconText: {
    alignContent: 'center',
    fontSize: 14,
    fontFamily: 'open-sans-regular',
  },
})

export {ButtonWithIcon}
