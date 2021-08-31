import {MaterialCommunityIcons} from '@expo/vector-icons'
import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native'
import {color} from '../constants'

interface HeaderProps {
  headerLeftNavigation: {openDrawer: Function; goBack: Function}
  headerRightNavigation?: {openDrawer: Function; navigate: Function}
  iconSize?: number
  headerLeft: string
  title?: string
  bgColor?: string
  headerRight?: string
}
const Header: React.FC<HeaderProps> = ({
  headerLeftNavigation,
  headerRightNavigation,
  iconSize,
  headerLeft,
  headerRight,
  title,
  bgColor,
}) => {
  // 1. Open Drawer Menu

  // 2. Forward Method =>

  // let setTitle = typeof title === 'string' && title !== undefined ? title : ''

  return (
    <View
      style={{
        backgroundColor: bgColor || color.bgColor,
        ...styles.headerLeftNavigation,
      }}
    >
      <View style={styles.headerLeft}>
        <TouchableOpacity onPress={headerLeftNavigation}>
          <View
            style={{
              height: 60,
              width: 60,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <MaterialCommunityIcons
              name={headerLeft || 'menu'}
              size={iconSize || 32}
              color={color.secondaryColor}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={styles.title}>{title}</Text>
      </View>

      {headerRight !== undefined && (
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={headerRightNavigation}>
            <View
              style={{
                height: 60,
                width: 60,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MaterialCommunityIcons
                name={headerRight || 'menu'}
                size={iconSize || 32}
                color={color.secondaryColor}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  headerLeftNavigation: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
  },
  title: {
    fontFamily: 'open-sans-regular',
    fontSize: 20,
  },
})

export {Header}
