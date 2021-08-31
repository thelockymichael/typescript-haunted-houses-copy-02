import React, {useEffect, useState} from 'react'
import {StyleSheet, TouchableOpacity, FlatList, Text, View} from 'react-native'

import {GOOGLE_API} from '@env'

interface ConfigProps {
  location: {
    lat: number
    lng: number
  }
}

const getStaticMapUrl = (props: ConfigProps) => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${GOOGLE_API}`
}

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371 // Radius of the earth in km
  const dLat = degreesToRadius(lat2 - lat1) // deg2rad below
  const dLon = degreesToRadius(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadius(lat1)) *
      Math.cos(degreesToRadius(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c // Distance in km
  return d
}

const degreesToRadius = (deg: number) => {
  return deg * (Math.PI / 180)
}

const getCountyImage = (countyName: string) => {
  let cardImage
  switch (countyName) {
    case 'Uusimaa':
      cardImage =
        'https://firebasestorage.googleapis.com/v0/b/typescript-haunted-houses.appspot.com/o/images%2Fuusimaa_image.jpeg?alt=media&token=1c83c926-4f68-4bd2-a3af-6586b8391774'
      break
    case 'Etelä-Savo':
      cardImage =
        'https://firebasestorage.googleapis.com/v0/b/typescript-haunted-houses.appspot.com/o/images%2Fetela%CC%88-savo_image.jpeg?alt=media&token=306cbad1-6676-4a8b-adff-1b16081827d4'
      break
    case 'Ahvenanmaa':
      cardImage =
        'https://firebasestorage.googleapis.com/v0/b/typescript-haunted-houses.appspot.com/o/images%2Fahvenanmaa_image.jpeg?alt=media&token=d069cd47-4bd8-44e7-b21c-fd23f17476eb'
      break

    case 'Lappi':
      cardImage =
        'https://firebasestorage.googleapis.com/v0/b/typescript-haunted-houses.appspot.com/o/images%2Flappi_image.png?alt=media&token=d93bf865-3620-4fab-b85c-dc287627eb07'
      break

    default:
      cardImage =
        'https://firebasestorage.googleapis.com/v0/b/typescript-haunted-houses.appspot.com/o/images%2Fuusimaa_image.jpeg?alt=media&token=1c83c926-4f68-4bd2-a3af-6586b8391774'

      break
  }

  return cardImage
}

// Calculate time difference

const calculateTimeDifference = (createdAt: number) => {}

export {
  getStaticMapUrl,
  calculateDistance,
  getCountyImage,
  calculateTimeDifference,
}
