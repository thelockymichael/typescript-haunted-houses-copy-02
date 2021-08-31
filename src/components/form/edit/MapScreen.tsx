import React, {useState, useEffect, useCallback} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Dimensions,
  Alert,
  TouchableOpacity,
} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'

import MapView, {MapEvent, Marker} from 'react-native-maps'
import {Appbar} from 'react-native-paper'
import {verifyPermissions} from '../../../../utils'

import * as Location from 'expo-location'
import {color} from '../../../constants'
import {Header} from '../../Header'

interface SelectedLocationProps {
  lat: number
  lng: number
}

interface CurrentUserLocationProps {
  latitude: number
  longitude: number
  latitudeDelta: number
  longitudeDelta: number
}

interface MapScreenProps {
  navigation: {navigate: Function; goBack: Function; setOptions: Function}
}
const MapScreen: React.FC<MapScreenProps> = ({navigation}) => {
  const [selectedLocation, setSelectedLocation] =
    useState<SelectedLocationProps>()

  const [currentUserLocation, setCurrentUserLocation] =
    useState<CurrentUserLocationProps>()

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions()

    if (!hasPermission) {
      return
    }

    try {
      const location = await Location.getCurrentPositionAsync()

      setCurrentUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
    } catch (err) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map.',
        [{text: 'Okay'}]
      )
    }
  }

  useEffect(() => {
    ;(async () => {
      await getLocationHandler()
    })()
  }, [])

  const selectedLocationHandler = (event: MapEvent<{}>) => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    })
  }

  let markerCoordinates

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    }
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'Location was not picked',
        `Are you sure you don't want to pick a location?`,
        [
          {text: 'No', style: 'default'},
          {
            text: 'Yes',
            style: 'destructive',
            onPress: async () => {
              navigation.goBack()
            },
          },
        ]
      )

      return
    }
    navigation.navigate('AbandonedPlacesEditPage', {
      pickedLocation: selectedLocation,
    })
  }, [selectedLocation])

  useEffect(() => {
    // navigation.setOptions({
    //   header: ({scene, previous, navigation}) => (
    //     <Header
    //       headerRight={
    //         <Appbar.Action
    //           icon="content-save"
    //           onPress={savePickedLocationHandler}
    //         />
    //       }
    //       scene={scene}
    //       previous={previous}
    //       navigation={navigation}
    //     />
    //   ),
    // })
  }, [savePickedLocationHandler])

  return (
    <View style={styles.container}>
      <Header
        headerTitle={'Pick Location'}
        headerLeft={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name={'keyboard-backspace'}
              size={32}
              color={color.secondaryColor}
            />
          </TouchableOpacity>
        }
        headerRight={
          <TouchableOpacity onPress={() => savePickedLocationHandler()}>
            <MaterialCommunityIcons
              name={'content-save'}
              size={32}
              color={color.secondaryColor}
            />
          </TouchableOpacity>
        }
      />
      <View style={styles.body}>
        <MapView
          initialRegion={currentUserLocation}
          style={styles.map}
          onPress={selectedLocationHandler}
        >
          {markerCoordinates && (
            <Marker
              title="Picker Location"
              coordinate={markerCoordinates}
            ></Marker>
          )}
        </MapView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bgColor,
  },
  body: {
    flex: 10,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})

export {MapScreen}
