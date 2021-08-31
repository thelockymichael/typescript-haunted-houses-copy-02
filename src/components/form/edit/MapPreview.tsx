import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleProp,
} from 'react-native'
import {getStaticMapUrl} from '../../../../utils'

interface PickedLocationProps {
  lat: number
  lng: number
}

interface MapPreviewProps {
  location: PickedLocationProps
}
const MapPreview: React.FC<MapPreviewProps> = (props) => {
  // getStaticMapUrl()
  let imagePreviewUrl

  if (props.location) {
    imagePreviewUrl = getStaticMapUrl(props)
  }

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{...styles.mapPreview, ...props.style}}
    >
      {props.location ? (
        <Image style={styles.mapImage} source={{uri: imagePreviewUrl}} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
})

export {MapPreview}
