import firebase from 'firebase'
import {ImageSourcePropType} from 'react-native'
import {AbandonedPlaceModel} from './AbandonedPlaceModel'

export interface PlaceModel {
  id: string
  name: string
  imageUri: ImageSourcePropType
  location: firebase.firestore.GeoPoint
  abandonedPlaces: AbandonedPlaceModel[]
}
