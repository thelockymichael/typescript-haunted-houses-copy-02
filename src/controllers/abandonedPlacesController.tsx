import firebase from 'firebase/app'
import 'firebase/firestore'
import {firebaseConfig} from '../firebase/firebaseConfig'
import {AbandonedPlaceModel} from '../redux'
import {v4} from 'uuid/v4'
import {useEffect, useState} from 'react'

export const abandonedPlaceConverter = {
  toFirestore: (data: AbandonedPlaceModel) => data,
  fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) =>
    snap.data() as AbandonedPlaceModel,
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore()

type AbandondedPlacesList = AbandonedPlaceModel[] | undefined

export const usePlacesHooks = () => {
  const [places, setPlaces] = useState<AbandondedPlacesList>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = db
      .collection('abandonedPlaces')
      .withConverter(abandonedPlaceConverter)
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const abandonedPlaces = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
          }
        })

        setPlaces(abandonedPlaces)

        if (loading) {
          setLoading(false)
        }
      })
    return () => unsubscribe()
  }, [])

  return {
    places,
    loading,
  }
}

export const getAbandonedPlaces = async () => {
  try {
    let placesRef = db.collection('abandonedPlaces')
    let snapShot = await placesRef.withConverter(abandonedPlaceConverter).get()
    const placesList: AbandonedPlaceModel[] = []
    snapShot.forEach((doc) => {
      const data = doc.data()

      placesList.push(data)
    })

    return placesList
  } catch (err) {
    throw new Error(err)
  }
}

export const updateAbandonedPlace = async (
  abandonedPlace: AbandonedPlaceModel
) => {
  try {
    if (abandonedPlace.id === undefined) {
      abandonedPlace.id = v4()
    }

    // Add a new document in collection "abandonedPlaces"
    let abandonedPlaceRef = db
      .collection('abandonedPlaces')
      .doc(abandonedPlace.id)

    await abandonedPlaceRef
      .withConverter(abandonedPlaceConverter)
      .set(abandonedPlace, {merge: true})
  } catch (error) {
    console.error('Error writing document: ', error)
  }
}
