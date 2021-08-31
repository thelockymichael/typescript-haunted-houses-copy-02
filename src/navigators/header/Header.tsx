import React from 'react'
import {Route, TouchableOpacity} from 'react-native'
import {Appbar, Avatar, IconButton, useTheme} from 'react-native-paper'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {NavigationProp, ParamListBase} from '@react-navigation/native'
import {DrawerNavigationProp} from '@react-navigation/drawer'
import {
  Scene,
  StackNavigationProp,
} from '@react-navigation/stack/lib/typescript/src/types'

interface HeaderProps {
  scene: Scene<Route>
  previous?:
    | Scene<
        Readonly<{
          key: string
          name: string
          params?: object | undefined
        }>
      >
    | undefined
  navigation?: {pop: Function; openDrawer: Function}
  stackNavigation?: StackNavigationProp<ParamListBase>
  drawerNavigation?: DrawerNavigationProp<{}>
  // navigation: {pop: {event: GestureResponderEvent => void; openDrawer: Function}
}
const Header: React.FC<HeaderProps> = ({
  scene,
  previous,
  navigation,
  headerRight,
  drawerNavigation,
  stackNavigation,
}) => {
  const theme = useTheme()
  const {options} = scene.descriptor
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name

  return (
    <Appbar.Header theme={{colors: {primary: theme.colors.surface}}}>
      {previous ? (
        <Appbar.BackAction
          onPress={() => {
            navigation?.pop()
          }}
          color={theme.colors.primary}
        />
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation?.openDrawer()
          }}
        >
          <IconButton icon="menu" size={30} color="#6646ee" />
          {/* <Avatar.Image
            size={40}
            source={{
              uri: 'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
            }}
          /> */}
        </TouchableOpacity>
      )}
      {/* <Appbar.Content
        title={
          previous ? title : <MaterialCommunityIcons name="twitter" size={40} />
        }
      /> */}
      <Appbar.Content title={title} />

      {headerRight}
      {/* {title === 'AbandonedPlacesPage' && (
        <Appbar.Action
          icon="edit"
          onPress={() => {
            alert('Create new abandoned place')
          }}
        />
      )} */}
    </Appbar.Header>
  )
}

export {Header}
