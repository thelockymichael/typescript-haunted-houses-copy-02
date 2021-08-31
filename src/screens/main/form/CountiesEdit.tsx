import React, {useEffect, useRef, useCallback, useState} from 'react'
import {StatusBar} from 'expo-status-bar'
import firebase from 'firebase'
import 'firebase/storage'
import {
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  Text,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'

import {
  ErrorMessage,
  FormButton,
  FormInput,
  Header,
  LocationPicker,
} from '../../../components'
import {AbandonedPlaceModel, logOut} from '../../../redux'
import {PlaceCard} from '../../../components/PlaceCard'
import {List, Divider} from 'react-native-paper'

import uuid from 'uuid'

import {Picker as SelectedPicker} from '@react-native-picker/picker'

import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker'
import {updateAbandonedPlace} from '../../../controllers/abandonedPlacesController'
import {ScreenStackHeaderBackButtonImage} from 'react-native-screens'

import ProgressBar from 'react-native-progress/Bar'

import {scrollInterpolator, animatedStyles} from '../../../../utils/animations'
import {color, counties} from '../../../constants'

interface FormProps {
  name: string
  description: string
}

interface SelectedLocationProps {
  lat: number
  lng: number
}

// Image
interface ImageProps {
  cancelled: boolean
  height: number
  width: number
  type: string
  uri: string
}

type ImageAction = ImageProps | null
// [END]
const SLIDER_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4)

interface CountiesEditProps {
  navigation: {popToTop: Function; goBack: Function; navigate: Function}
  route: {params: object}
}

const CountiesEdit: React.FC<CountiesEditProps> = ({navigation, route}) => {
  // const [name, setName] = useState('')

  // County
  const [selectedCounty, setSelectedCounty] = useState()

  // Counties municipalities
  const [selectedMunicipalities, setSelectedMunicipalities] = useState()
  // Municipality
  const [selectedMunicipality, setSelectedMunicipality] = useState()

  // const jotain = Object.entries(counties).forEach(([key, value]) =>
  //
  // )

  //

  const saveCountyMunicipality = useCallback(() => {
    navigation.navigate('AbandonedPlacesEditPage', {
      pickedCounty: selectedCounty,
      pickedMunicipality: selectedMunicipality,
    })
  }, [selectedCounty, selectedMunicipality])

  return (
    <View style={styles.container}>
      {/* <Header
        headerLeft="keyboard-backspace"
        title="Select County"
        headerLeftNavigation={() => saveCountyMunicipality()}
      /> */}
      <Header
        headerTitle="Select County"
        headerLeft={
          <TouchableOpacity onPress={() => saveCountyMunicipality()}>
            <MaterialCommunityIcons
              name={'keyboard-backspace'}
              size={32}
              color={color.secondaryColor}
            />
          </TouchableOpacity>
        }
      />
      <View style={styles.body}>
        <SelectedPicker
          style={{
            marginHorizontal: 15,
            height: 50,
          }}
          selectedValue={selectedCounty}
          onValueChange={(itemValue, itemIndex) => {
            const newCounty = counties[itemIndex].county.name

            if (newCounty !== '«Select county»') {
              setSelectedCounty(newCounty)

              setSelectedMunicipalities(
                counties[itemIndex].county.municipalities
              )
            }
          }}
        >
          {/* Object.entries(counties).forEach(([key, value]) =>
    
  ) */}

          {/* {Object.entries(counties).map(([key, value]) => (
            <SelectedPicker.Item label={key} value={value} />
          ))} */}

          {counties.map((item, index) => (
            <SelectedPicker.Item
              key={index}
              label={item.county.name}
              value={item.county.municipalities}
            />
          ))}
        </SelectedPicker>

        <SelectedPicker
          style={{
            marginHorizontal: 15,
            height: 50,
          }}
          selectedValue={selectedMunicipality}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedMunicipality(itemValue)
          }}
        >
          {selectedCounty !== undefined &&
            selectedMunicipalities.map((item, index) => (
              <SelectedPicker.Item key={index} label={item} value={item} />
            ))}
        </SelectedPicker>
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
  extraWidth: {
    width: '90%',
  },
  descInput: {
    maxHeight: '100%',
    height: 130,
    width: '90%',
    alignContent: 'flex-end',
  },
  submitBtn: {
    fontSize: 22,
    fontFamily: 'open-sans-semi-bold',
  },
  listTitle: {
    fontSize: 22,
  },
  listDescription: {
    fontSize: 16,
  },
  progressBarContainer: {
    marginTop: 20,
  },
})

export {CountiesEdit}
