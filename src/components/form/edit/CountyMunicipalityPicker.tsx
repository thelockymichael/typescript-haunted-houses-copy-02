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

const CountyMunicipalityPicker: React.FC<LocationProps> = ({
  navigation,
  route,
  onCountyMunicipalityPicked,
}) => {
  const [pickedCounty, setPickedCounty] = useState<PickedLocationProps>()
  const [pickedMunicipality, setPickedMunicipality] =
    useState<PickedLocationProps>()

  const newPickedCounty = route.params?.pickedCounty

  const newPickedMunicipality = route.params?.pickedMunicipality

  useEffect(() => {
    if (newPickedCounty) {
      setPickedCounty(newPickedCounty)
      setPickedMunicipality(newPickedMunicipality)

      onCountyMunicipalityPicked(newPickedCounty, newPickedMunicipality)
    }
  }, [newPickedCounty, newPickedMunicipality, onCountyMunicipalityPicked])

  return (
    <FormButton
      title={
        newPickedCounty && newPickedMunicipality
          ? `${newPickedCounty}, ${newPickedMunicipality}`
          : 'Select county'
      }
      modeValue="contained"
      labelStyle={styles.submitBtn}
      onTap={() => navigation.navigate('CountiesEditPage')}
      extraStyle={styles.extraWidth}
    />
  )
}

export {CountyMunicipalityPicker}

const styles = StyleSheet.create({
  extraWidth: {
    width: '90%',
  },
  submitBtn: {
    fontSize: 22,
    fontFamily: 'open-sans-semi-bold',
  },
})
