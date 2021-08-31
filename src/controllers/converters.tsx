import {CommentModel, AbandonedPlaceModel} from '../redux'
import firebase from 'firebase/app'

export const abandonedPlaceConverter = {
  toFirestore: (data: AbandonedPlaceModel) => data,
  fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) =>
    snap.data() as AbandonedPlaceModel,
}

export const commentConverter = {
  toFirestore: (data: CommentModel) => data,
  fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) =>
    snap.data() as CommentModel,
}
