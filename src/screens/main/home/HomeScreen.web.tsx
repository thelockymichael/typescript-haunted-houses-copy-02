import React, {useEffect, useState, useContext} from 'react'
import {StatusBar} from 'expo-status-bar'
import {StyleSheet, Button, Text, View, Alert} from 'react-native'
import {FormButton, Header} from '../../components'
import {logOut} from '../../redux'
import {FlatList, ScrollView} from 'react-native-gesture-handler'
import {PlaceCard} from '../../components/PlaceCard'

// Dummy data

import {places} from '../../dummy-data/PlaceData/places-dummy'
import {color} from '../../constants'
import {UserContext} from '../../contexts/contexts'

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  // TASK 1. GET USER ID

  const {user} = useContext(UserContext)

  // const testPushNotifications = async () => {
  //   console.log('testing push notifications')

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

  return (
    <View style={styles.container}>
      <Header headerLeftNavigation={() => navigation?.openDrawer()} />

      <View style={styles.welcomeBackContainer}>
        <Text style={styles.welcomeBack}>Welcome back {user.name}!</Text>
      </View>

      <View style={styles.body}>
        <ScrollView>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={places}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({item}) => (
              <PlaceCard
                item={item}
                onTap={() => {
                  alert('Town/district tapped')
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
