import {MaterialCommunityIcons} from '@expo/vector-icons'
import React, {useState, useEffect, ReactNode} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native'
import {color} from '../constants'
import {ButtonWithIcon} from './ButtonWithIcon'

interface HeaderProps {
  headerLeft: JSX.Element
  headerTitle?: string
  backgroundColor?: string
  headerRight?: JSX.Element
}
const Header: React.FC<HeaderProps> = ({
  headerLeft,
  headerTitle,
  headerRight,
  backgroundColor,
}) => {
  // 1. Open Drawer Menu

  // 2. Forward Method =>

  // let setTitle = typeof title === 'string' && title !== undefined ? title : ''

  return (
    <View style={styles.navigation}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          {headerLeft}
        </View>

        <View
          style={{
            flex: 1,
            marginLeft: 10,
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'open-sans-semi-bold',
              fontSize: 18,
            }}
          >
            {headerTitle}
          </Text>
        </View>

        {!headerRight ? (
          <View
            style={{
              width: 32,
              height: 32.7,
            }}
          />
        ) : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {headerRight}
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: color.bgColor,
    paddingVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,

    // SHADOW FOREGROUND DROP
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1, // IOS (?)
    shadowRadius: 1.84, // IOS
    elevation: 5, // ANDROID
  },
})

export {Header}
