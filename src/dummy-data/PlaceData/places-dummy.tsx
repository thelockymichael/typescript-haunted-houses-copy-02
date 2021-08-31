import {PlaceModel} from '../../redux/models'

import firebase from 'firebase'

const places: PlaceModel[] = [
  {
    id: '1',
    name: 'Korso',
    imageUri: require(`../images/haksi_talo.jpeg`),
    location: new firebase.firestore.GeoPoint(
      60.17660947681155,
      24.71635262460784
    ),
    abandonedPlaces: [
      {
        id: '1',
        name: 'Korso',
        description: 'Suomen PELOTTAVIN paikka asua :O',
        imageUri: [require(`../images/haksi_talo.jpeg`)],
        location: new firebase.firestore.GeoPoint(
          60.17660947681155,
          24.71635262460784
        ),
      },
    ],
  },
  {
    id: '2',
    name: 'Kera',
    imageUri: require(`../images/kera_talo.jpeg`),
    location: new firebase.firestore.GeoPoint(
      60.17660947681155,
      24.71635262460784
    ),
    abandonedPlaces: [
      {
        id: '1',
        name: 'Korso',
        description: 'Suomen PELOTTAVIN paikka asua :O',
        imageUri: [require(`../images/haksi_talo.jpeg`)],
        location: new firebase.firestore.GeoPoint(
          60.17660947681155,
          24.71635262460784
        ),
      },
    ],
  },
  {
    id: '3',
    name: 'Savio',
    imageUri: require(`../images/savio_talo.jpeg`),
    location: new firebase.firestore.GeoPoint(
      60.17660947681155,
      24.71635262460784
    ),
    abandonedPlaces: [
      {
        id: '1',
        name: 'Korso',
        description: 'Suomen PELOTTAVIN paikka asua :O',
        imageUri: [require(`../images/haksi_talo.jpeg`)],
        location: new firebase.firestore.GeoPoint(
          60.17660947681155,
          24.71635262460784
        ),
      },
    ],
  },
]

export {places}
