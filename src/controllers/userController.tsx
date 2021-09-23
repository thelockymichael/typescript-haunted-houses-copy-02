import firebase from 'firebase/app'
import 'firebase/firestore'
import {firebaseConfig} from '../firebase/firebaseConfig'
import {UserModel} from '../redux'

// import {userConverter} from '../'

const userConverter = {
  toFirestore: (data: UserModel) => data,
  fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) =>
    snap.data() as UserModel,
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore()

export async function updateUser(user: UserModel) {
  try {
    // Add a new document in collection "users"
    let userRef = db.collection('users').doc(user.id)

    let usernameRef = db.collection('usernames').doc(user.userName)

    await userRef.withConverter(userConverter).set(user, {merge: true})

    await usernameRef.withConverter(userConverter).set(user, {merge: true})
  } catch (error) {
    console.error('Error writing document: ', error)
  }
}

export function userStream(userId: string) {
  try {
    // Add a new document in collection "users"
    let doc = db.collection('users').doc(userId).withConverter(userConverter)

    return doc
  } catch (error) {
    console.error('Error writing document: ', error)
    return
  }
}
