import firebase from 'firebase'
import {UserModel} from '../user/User'

interface Address {
  county: string
  municipality: string
  address?: string
  postCode?: string
}

export interface Rating {
  likes: string[]
  dislikes: string[]
}

export interface AbandonedPlaceModel {
  id?: string
  name: string
  description: string
  address: Address
  location?: firebase.firestore.GeoPoint
  imageUrls?: string[] | []
  createdAt: firebase.firestore.Timestamp
  userID: string
  rating: Rating
}
