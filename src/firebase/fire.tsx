import firebase from 'firebase'
import {firebaseConfig} from './firebaseConfig'

import 'firebase/storage'

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase
