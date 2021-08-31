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
  CountyMunicipalityPicker,
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

import Carousel from 'react-native-snap-carousel'

import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker'
import {updateAbandonedPlace} from '../../../controllers/abandonedPlacesController'
import {ScreenStackHeaderBackButtonImage} from 'react-native-screens'

import ProgressBar from 'react-native-progress/Bar'

import {scrollInterpolator, animatedStyles} from '../../../../utils/animations'
import {color} from '../../../constants'

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

interface AbandonedPlacesEdit {
  navigation: {popToTop: Function; goBack: Function; navigate: Function}
  route: {
    params: {
      editPlace: AbandonedPlaceModel
    }
  }
}

const AbandonedPlacesEdit: React.FC<AbandonedPlacesEdit> = ({
  navigation,
  route,
}) => {
  // const [name, setName] = useState('')

  const editPlace =
    route.params !== undefined ? route.params.editPlace : undefined

  // FORM states
  const [form, setForm] = useState<FormProps>({
    name: editPlace !== undefined ? editPlace.name : '',
    description: '',
  })

  const [selectedLocation, setSelectedLocation] =
    useState<SelectedLocationProps>({
      lat: 0,
      lng: 0,
    })

  // County & Municipality

  const [selectedCounty, setSelectedCounty] = useState<string>()
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>()

  // Storing image in Firebase
  const [images, setImages] = useState([])
  const [uploading, setUploading] = useState(false)
  const [transferred, setTransferred] = useState(0)
  // [END]

  const [imageUrls, setImageUrls] = useState([])

  // [END]
  const [submitDisabled, setSubmitDisabled] = useState(false)

  // ERROR MESSAGES
  const [nameError, setNameError] = useState()
  const [descError, setDescError] = useState()
  const [locationError, setLocationError] = useState()
  const [imageError, setImageError] = useState()

  const handleSubmit = async () => {
    let downloadUrls = []

    for (const image of images) {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.onload = function () {
          resolve(xhr.response)
        }

        xhr.onerror = function (e) {
          reject(new TypeError('Network request failed'))
        }

        xhr.responseType = 'blob'
        xhr.open('GET', image.uri, true)

        xhr.send(null)
      })

      try {
        const imageId = uuid.v4()

        const ref = firebase.storage().ref().child(`images/${imageId}`)

        const snapshot = ref.put(blob)

        setUploading(true)
        setTransferred(0)

        snapshot.on('state_changed', (snapshot) => {
          setTransferred(
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
          )
        })

        try {
          await snapshot
        } catch (e) {
          console.error('error-123', e)
        }

        const downloadUrl = await ref.getDownloadURL()

        downloadUrls.push(downloadUrl)

        blob.close()
      } catch (err) {}
    }

    setUploading(false)

    const place = {
      id: editPlace ? editPlace.id : undefined,
      name: form.name,
      description: form.description,
      address: {
        county: selectedCounty,
        municipality: selectedMunicipality,
      },
      location: new firebase.firestore.GeoPoint(
        selectedLocation.lat,
        selectedLocation.lng
      ),
      imageUrls: downloadUrls,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      rating: {
        likes: 0,
        dislikes: 0,
      },
    } as AbandonedPlaceModel

    await updateAbandonedPlace(place)

    Alert.alert(
      'New place uploaded to database!',
      'Your newly added place should appear in abandoned places view.'
    )

    navigation.popToTop()

    // [END]
  }

  const handleFormEdit = (text: string, name: string) => {
    setForm({
      ...form,
      [name]: text,
    })
  }

  const validateForm = () => {
    if (
      form.name.trim().length > 0 &&
      form.description.trim().length > 0 &&
      selectedLocation.lat !== 0 &&
      selectedLocation.lng !== 0 &&
      images.length !== 0
    ) {
      return false
    } else {
      return true
    }
  }

  const verifyImageLibraryPermissions = async () => {
    if (Platform.OS !== 'web') {
      const {status} = await requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert(
          'Insufficient permissions!',
          'You need to grant media library permissions to use this app.',
          [{text: 'Okay'}]
        )
        return false
      }

      return true
    }
  }

  const pickImage = async () => {
    const hasPermission = await verifyImageLibraryPermissions()

    if (!hasPermission) return

    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    })

    if (!result.cancelled) {
      setImages(images.concat(result))
    }
  }

  const locationPickedHandler = useCallback((location) => {
    setSelectedLocation(location)
  }, [])

  // County & Municipality

  const countyMunicipalityHandler = useCallback((county, municipality) => {
    setSelectedCounty(county)
    setSelectedMunicipality(municipality)
  }, [])

  const carouselRef = useRef()

  const renderItem = ({item, index}) => {
    return (
      <Image
        source={{
          uri: item.uri,
        }}
        style={{
          width: ITEM_WIDTH,
          height: ITEM_HEIGHT,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'dodgerblue',
        }}
      />
    )
  }

  return (
    <View style={styles.container}>
      <Header
        headerTitle={editPlace ? 'Edit Place' : 'Create New Place'}
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
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
          }}
        >
          <FormInput
            testID="nameInput"
            labelName="Name"
            inputName="name"
            autoCapitalize="none"
            onTextChange={handleFormEdit}
            value={form.name}
            extraStyle={styles.extraWidth}
          />
          <ErrorMessage value={nameError} />
          <FormInput
            testID="descInput"
            labelName="Description"
            inputName="description"
            autoCapitalize="none"
            multiline={true}
            onTextChange={handleFormEdit}
            value={form.description}
            extraStyle={styles.descInput}
            numberOfLines={3}
          />
          <LocationPicker
            onLocationPicked={locationPickedHandler}
            navigation={navigation}
            route={route}
          />

          <Carousel
            layout={'default'}
            ref={carouselRef}
            data={images}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            renderItem={(item) => renderItem(item)}
            scrollInterpolator={scrollInterpolator}
            slideInterpolatedStyle={animatedStyles}
          />

          <FormButton
            title="Pick image from camera roll"
            modeValue="contained"
            labelStyle={styles.submitBtn}
            onTap={pickImage}
            extraStyle={styles.extraWidth}
          />
          <CountyMunicipalityPicker
            onCountyMunicipalityPicked={countyMunicipalityHandler}
            navigation={navigation}
            route={route}
          />

          {uploading ? (
            <View style={styles.progressBarContainer}>
              <ProgressBar progress={transferred} width={300} />
            </View>
          ) : (
            <FormButton
              testID="submitNewAbandonedPlace"
              title={editPlace ? 'Save' : 'Create'}
              modeValue="contained"
              upperCase={false}
              labelStyle={styles.submitBtn}
              onTap={handleSubmit}
              disabled={validateForm()}
              extraStyle={styles.extraWidth}
            />
          )}
        </ScrollView>
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

export {AbandonedPlacesEdit}
