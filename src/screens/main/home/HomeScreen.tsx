import React, {useEffect, useState, useContext} from 'react'
import {StatusBar} from 'expo-status-bar'
import {MaterialCommunityIcons} from '@expo/vector-icons'

import {
  StyleSheet,
  TouchableOpacity,
  Button,
  Text,
  View,
  Alert,
} from 'react-native'
import {FormButton, Header} from '../../../components'
import {AbandonedPlaceModel, logOut} from '../../../redux'
import {FlatList, ScrollView} from 'react-native-gesture-handler'
import {PlaceCard} from '../../../components/PlaceCard'

// Dummy data
import uuid from 'uuid'

import {places} from '../../../dummy-data/PlaceData/places-dummy'
import {color} from '../../../constants'
import {UserContext} from '../../../contexts/contexts'

import * as Updates from 'expo-updates'
import {getAbandonedPlaces} from '../../../controllers/abandonedPlacesController'

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  // TASK 1. GET USER ID

  const {user} = useContext(UserContext)

  // const testPushNotifications = async () => {
  //

  //   await fetch('https://exp.host/--/api/v2/push/send', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Accept-Encoding': 'gzip, deflate',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       to: 'ExponentPushToken[EZkTuiCoBOJw-3CWmX5rwH]',
  //       title: 'Testing 123',
  //       body: 'Testing body 123',
  //     }),
  //   })
  // }

  // useEffect(() => {
  //   testPushNotifications()
  // }, [])

  const [placeCategories, setPlaceCategories] = useState([])

  const checkForNewUpdate = async (user) => {
    try {
      const update = await Updates.checkForUpdateAsync()

      if (update.isAvailable) {
        Alert.alert(
          'New update found.',
          'Would you like download and install new updates?',
          [
            {text: 'No', style: 'default'},
            {
              text: 'Yes',
              style: 'destructive',
              onPress: async () => {
                await Updates.fetchUpdateAsync()

                await Updates.reloadAsync()
              },
            },
          ]
        )
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  function groupArrayOfObjects(list: AbandonedPlaceModel[]) {
    const result = list.reduce(function (r, a) {
      r[a.address.county] = r[a.address.county] || []
      r[a.address.county].push(a)
      return r
    }, Object.create(null))

    return result
  }

  useEffect(() => {
    ;(async () => {
      const result = await getAbandonedPlaces()

      const groupArr = groupArrayOfObjects(result)

      let newPlaceCategories = []

      for (const item in groupArr) {
        newPlaceCategories.push({
          id: uuid.v4(),
          county: item,
          itemArr: groupArr[item],
        })
      }

      setPlaceCategories(newPlaceCategories)
    })()

    // console.log('jotain', jotain[0])

    if (!__DEV__) checkForNewUpdate(user)
  }, [])

  return (
    <View style={styles.container}>
      <Header
        headerLeft={
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <MaterialCommunityIcons
              name={'menu'}
              size={32}
              color={color.secondaryColor}
            />
          </TouchableOpacity>
        }
      />

      <View style={styles.welcomeBackContainer}>
        <Text style={styles.welcomeBack}>Welcome back {user.name}!</Text>
      </View>

      <View style={styles.body}>
        <ScrollView>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={placeCategories}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({item}) => (
              <PlaceCard
                item={item}
                onTap={() => {
                  navigation.navigate('HomeAbandonedPlacesPage', {
                    places: item.itemArr,
                  })
                }}
              />
            )}
          />
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  navButtonText: {
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: color.bgColor,
  },
  body: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeBack: {
    fontFamily: 'open-sans-regular',
    fontSize: 20,
    textAlign: 'center',
  },
  welcomeBackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export {HomeScreen}
