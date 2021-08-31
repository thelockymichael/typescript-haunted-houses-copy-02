import firebase from 'firebase/app'
import 'firebase/firestore'
import {firebaseConfig} from '../firebase/firebaseConfig'
import {CommentModel} from '../redux'
import {v4} from 'uuid/v4'
import {useEffect, useState} from 'react'
import {abandonedPlaceConverter, commentConverter} from './converters'

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore()

type AbandondedPlacesList = CommentModel[] | undefined

export const updateComment = async (
  abandonedPlaceID: string | undefined,
  comment: CommentModel
) => {
  if (comment.id === undefined) {
    comment.id = v4()
    comment.createdAt = firebase.firestore.Timestamp.fromDate(new Date())
    comment.likes = 0
    comment.dislikes = 0
    comment.replies = []
  }

  let commentRef = db
    .collection('abandonedPlaces')
    .doc(abandonedPlaceID)
    .collection('comments')
    .doc(comment.id)

  commentRef.withConverter(commentConverter).set(comment, {
    merge: true,
  })

  console.log('ab place id', abandonedPlaceID)

  console.log('first COMMENT !', comment)

  // let abandonedPlaceRef = db.collection('abandonedPlaces').doc(abandonedPlaceID)

  // abandonedPlaceRef.withConverter(abandonedPlaceConverter)
}

// export const getAbandonedPlaces = async () => {
//   try {
//     let placesRef = db.collection('abandonedPlaces')
//     let snapShot = await placesRef.withConverter(abandonedPlaceConverter).get()
//     const placesList: CommentModel[] = []
//     snapShot.forEach((doc) => {
//       const data = doc.data()

//       placesList.push(data)
//     })

//     return placesList
//   } catch (err) {
//     throw new Error(err)
//   }
// }

// export const updateAbandonedPlace = async (abandonedPlace: CommentModel) => {
//   try {
//     if (abandonedPlace.id === undefined) {
//       abandonedPlace.id = v4()
//     }

//     // Add a new document in collection "abandonedPlaces"
//     let abandonedPlaceRef = db
//       .collection('abandonedPlaces')
//       .doc(abandonedPlace.id)

//     await abandonedPlaceRef
//       .withConverter(abandonedPlaceConverter)
//       .set(abandonedPlace, {merge: true})
//   } catch (error) {
//     console.error('Error writing document: ', error)
//   }
// }
