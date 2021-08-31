import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  View,
  Dimensions,
  Alert,
  TouchableOpacity,
} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'

import {Header} from '../../../components/Header'

import MapView, {Marker} from 'react-native-maps'
import {verifyPermissions} from '../../../../utils'

import {color} from '../../../constants'

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

interface ShowOnMapScreenProps {
  navigation: {navigate: Function; goBack: Function; setOptions: Function}
  route: {
    params: {
      placeCoordinates: {latitude: number; longitude: number}
      name: string
    }
  }
}
const ShowOnMapScreen: React.FC<ShowOnMapScreenProps> = ({
  navigation,
  route,
}) => {
  const {placeCoordinates, name} = route.params

  const [selectedLocation, setSelectedLocation] =
    useState<SelectedLocationProps>()

  const [placeLocation, setPlaceLocation] = useState<CurrentUserLocationProps>()

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions()

    if (!hasPermission) {
      return
    }

    try {
      setPlaceLocation({
        latitude: placeCoordinates.latitude,
        longitude: placeCoordinates.longitude,
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

  return (
    <View style={styles.container}>
      <Header
        headerTitle={'Location'}
        headerLeft={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name={'keyboard-backspace'}
              size={32}
              color={color.secondaryColor}
            />
          </TouchableOpacity>
        }
      />

      <View style={styles.body}>
        <MapView initialRegion={placeLocation} style={styles.map}>
          {placeLocation && (
            <Marker title={name} coordinate={placeLocation}></Marker>
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

export {ShowOnMapScreen}
