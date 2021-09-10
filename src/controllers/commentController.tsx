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
  try {
    if (comment.id === undefined) {
      comment.id = v4()
      comment.createdAt = firebase.firestore.Timestamp.fromDate(new Date())
    }

    let commentRef = db
      .collection('abandonedPlaces')
      .doc(abandonedPlaceID)
      .collection('comments')
      .doc(comment.id)

    commentRef.withConverter(commentConverter).set(comment, {
      merge: true,
    })
  } catch (error) {
    console.error('Error writing document: ', error)
    return
  }
}

export const updateCommentOfComment = async (
  abandonedPlaceID: string | undefined,
  comment: CommentModel,
  replyComment: CommentModel
) => {
  try {
    if (replyComment?.id === undefined) {
      replyComment.id = v4()
      replyComment.createdAt = firebase.firestore.Timestamp.fromDate(new Date())
      replyComment.rating = {
        likes: [],
        dislikes: [],
      }
    }

    let commentRef = db
      .collection('abandonedPlaces')
      .doc(abandonedPlaceID)
      .collection('comments')
      .doc(comment.id)
      .collection('replyComments')
      .doc(replyComment.id)

    commentRef.withConverter(commentConverter).set(replyComment, {
      merge: true,
    })
  } catch (error) {
    console.error('Error writing document: ', error)
    return
  }
}

export const getComment = async (
  abandonedPlaceID: string | undefined,
  commentId: string
) => {
  try {
    let doc = await db
      .collection('abandonedPlaces')
      .doc(abandonedPlaceID)
      .collection('comments')
      .doc(commentId)
      .withConverter(commentConverter)
      .get()

    return doc.data()
  } catch (error) {
    console.error('Error writing document: ', error)
    return
  }
}
