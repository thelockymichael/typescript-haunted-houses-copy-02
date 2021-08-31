import React, {useState, useEffect, SetStateAction} from 'react'
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native'
import {FormButton} from '../FormButton'

import * as Location from 'expo-location'
import {MapPreview} from './MapPreview'
import {verifyPermissions} from '../../../../utils'

interface LocationProps {
  navigation: {
    navigate: Function
  }
  route: any
}

interface PickedLocationProps {
  lat: number
  lng: number
}

const LocationPicker: React.FC<LocationProps> = ({
  navigation,
  route,
  onLocationPicked,
}) => {
  const [isFetching, setIsFetching] = useState(false)
  const [pickedLocation, setPickedLocation] = useState<PickedLocationProps>()

  const mapPickedLocation = route.params?.pickedLocation

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation)
      onLocationPicked(mapPickedLocation)
    }
  }, [mapPickedLocation, onLocationPicked])

  // const verifyPermissions = async () => {
  //   const {status} = await Location.requestForegroundPermissionsAsync()

  //   if (status !== 'granted') {
  //     Alert.alert(
  //       'Insufficient permissions!',
  //       'You need to grant location permissions to use this app.',
  //       [{text: 'Okay'}]
  //     )

  //     return false
  //   }

  //   return true
  // }

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions()

    if (!hasPermission) {
      return
    }

    try {
      setIsFetching(true)
      const location = await Location.getCurrentPositionAsync()

      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      })

      onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      })
    } catch (err) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map.',
        [{text: 'Okay'}]
      )
    }

    setIsFetching(false)
  }

  const pickOnMapHandler = () => {
    navigation.navigate('MapPage')
  }

  return (
    <View style={styles.locationPicker}>
      <MapPreview style={styles.mapPreview} location={pickedLocation}>
        {isFetching ? (
          <ActivityIndicator size="large" />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <View style={{flex: 1}}>
          <FormButton
            modeValue={'contained'}
            title="Get User Location"
            onTap={getLocationHandler}
          />
        </View>
        <View style={{flex: 1}}>
          <FormButton
            modeValue={'text'}
            title="Pick on Map"
            onTap={pickOnMapHandler}
          />
        </View>
      </View>
    </View>
  )
}

export {LocationPicker}

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
    width: '90%',
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  actions: {
    flexDirection: 'row',
  },
})
