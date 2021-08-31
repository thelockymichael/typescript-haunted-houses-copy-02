import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator} from '@react-navigation/drawer'
import React, {useState, useEffect, useCallback} from 'react'
import {View, Text} from 'react-native'
import {
  AbandondedPlaceDetails,
  AbandonedPlacesEdit,
  AbandonedPlacesScreen,
  HomeAbandonedPlacesScreen,
  HomeScreen,
} from '../screens'

// Drawer Content
import {DrawerContent} from './drawer/DrawerContent'
import {Header} from './header/Header'
import {useNavigation} from '../../utils'
import {MapScreen, ShowOnMapScreen} from '../components'
import {CountiesEdit} from '../screens/main/form/CountiesEdit'

const Drawer = createDrawerNavigator()

const HomeStack = createStackNavigator()

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      headerMode="screen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="HomePage" component={HomeScreen} />
      <HomeStack.Screen
        name="HomeAbandonedPlacesPage"
        component={HomeAbandonedPlacesScreen}
      />
      <HomeStack.Screen
        name="HomeAbandonedPlaceDetailsPage"
        component={AbandondedPlaceDetails}
      />
      <HomeStack.Screen
        name="AbandonedPlacesEditPage"
        component={AbandonedPlacesEdit}
      />
      <HomeStack.Screen name="CountiesEditPage" component={CountiesEdit} />
      <HomeStack.Screen name="MapPage" component={MapScreen} />
      <HomeStack.Screen
        name="ShowLocationPage"
        options={{
          title: 'Location',
        }}
        component={ShowOnMapScreen}
      />
    </HomeStack.Navigator>
  )
}

const AbandonedPlacesStack = createStackNavigator()

const AbandonedPlacesNavigator = () => {
  return (
    <AbandonedPlacesStack.Navigator
      headerMode="screen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <AbandonedPlacesStack.Screen
        name="AbandonedPlacesPage"
        component={AbandonedPlacesScreen}
      />
      <AbandonedPlacesStack.Screen
        name="AbandonedPlaceDetails"
        component={AbandondedPlaceDetails}
      />
      <AbandonedPlacesStack.Screen
        name="AbandonedPlacesEditPage"
        component={AbandonedPlacesEdit}
      />
      <AbandonedPlacesStack.Screen
        name="CountiesEditPage"
        component={CountiesEdit}
      />
      <AbandonedPlacesStack.Screen name="MapPage" component={MapScreen} />
      <AbandonedPlacesStack.Screen
        name="ShowLocationPage"
        options={{
          title: 'Location',
        }}
        component={ShowOnMapScreen}
      />
    </AbandonedPlacesStack.Navigator>
  )
}

interface HomeStackProps {}
const DrawerStackNavigator: React.FC<HomeStackProps> = ({}) => {
  return (
    <Drawer.Navigator
      drawerContent={({navigation}) => (
        <DrawerContent navigation={navigation} />
      )}
    >
      <Drawer.Screen name="Home" component={HomeStackNavigator} />
      <Drawer.Screen
        name="AbandonedPlacesPage"
        component={AbandonedPlacesNavigator}
      />
    </Drawer.Navigator>
  )
}

export {DrawerStackNavigator}
