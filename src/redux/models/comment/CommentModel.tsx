import firebase from 'firebase'
import {Rating} from '../place/AbandonedPlaceModel'

export interface CommentModel {
  id?: string
  username: string
  commentText: string
  createdAt?: firebase.firestore.Timestamp
  rating?: Rating
}
