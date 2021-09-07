import {Fontisto, MaterialCommunityIcons} from '@expo/vector-icons'
import React, {useState, useEffect} from 'react'
import firebase from 'firebase'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native'
import {ButtonWithIcon} from '../ButtonWithIcon'
import {AbandonedPlaceModel, Rating, UserModel} from '../../redux'
import {updateAbandonedPlace} from '../../controllers/abandonedPlacesController'
import {color} from '../../constants'

interface IProps {
  item: AbandonedPlaceModel
  user: UserModel
  navigation: {
    popToTop: Function
    setOptions: Function
    goBack: Function
    navigate: Function
  }
}

const AbandondedPlaceBar: React.FC<IProps> = ({item, user, navigation}) => {
  const [rating, setRating] = useState<Rating>()
  const [likeIsToggled, toggleLike] = useState<boolean>(false)
  const [dislikeIsToggled, toggleDislike] = useState<boolean>(false)

  const isLiked = rating?.likes.some((userId) => userId === user.id)

  const isDisliked = rating?.dislikes.some((userId) => userId === user.id)

  useEffect(() => {
    // reverseGeocodeAsync()

    const ratingListener = firebase
      .firestore()
      .collection('abandonedPlaces')
      .doc(item.id)
      .onSnapshot((querySnapshot) => {
        const firebaseData = querySnapshot.data() as AbandonedPlaceModel

        // const hasLiked = firebaseData.rating.likes.some(
        //   (userId) => userId === user.id
        // )
        // const hasDisliked = firebaseData.rating.dislikes.some(
        //   (userId) => userId === user.id
        // )

        // if (hasLiked) toggleLike(true)

        // if (hasDisliked) toggleDislike(true)

        setRating(firebaseData.rating)
      })

    return () => ratingListener()
  }, [])

  const likePost = async () => {
    item.rating.likes.push(user.id)
    const newArr = item.rating.dislikes.filter((userId) => userId !== user.id)
    item.rating.dislikes = newArr

    await updateAbandonedPlace(item)
  }

  const dislikePost = async () => {
    item.rating.dislikes.push(user.id)
    const newArr = item.rating.likes.filter((userId) => userId !== user.id)
    item.rating.likes = newArr

    await updateAbandonedPlace(item)
  }

  return (
    <>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          height: 50,
          marginHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'flex-start',
          }}
        >
          <View
            style={{
              paddingRight: 20,
            }}
          >
            <ButtonWithIcon
              icon={
                <MaterialCommunityIcons
                  name={'arrow-up-thick'}
                  size={32}
                  color={isLiked ? color.greyedOutColor : color.secondaryColor}
                />
              }
              disabled={isLiked}
              iconText={rating?.likes.length}
              onTap={likePost}
            />
          </View>
          <ButtonWithIcon
            icon={
              <MaterialCommunityIcons
                name={'arrow-down-thick'}
                size={32}
                color={isDisliked ? color.greyedOutColor : color.secondaryColor}
              />
            }
            disabled={isDisliked}
            iconText={rating?.dislikes.length}
            onTap={dislikePost}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              paddingRight: 10,
            }}
          >
            <ButtonWithIcon
              icon={
                <MaterialCommunityIcons
                  name={'comment'}
                  size={26}
                  color={color.secondaryColor}
                />
              }
              iconText={200}
              onTap={() => {}}
            />
          </View>

          <View
            style={{
              paddingRight: 10,
            }}
          >
            <ButtonWithIcon
              icon={
                <MaterialCommunityIcons
                  name={'map-marker-radius'}
                  size={26}
                  color={color.secondaryColor}
                />
              }
              onTap={() =>
                navigation.navigate('ShowLocationPage', {
                  placeCoordinates: item.location,
                  name: item.name,
                })
              }
            />
          </View>
          <ButtonWithIcon
            icon={
              <Fontisto name={'share'} size={26} color={color.secondaryColor} />
            }
            iconText={'SHARE'}
            onTap={() => {}}
          />
        </View>
      </View>
      <View
        style={{
          height: 1,
          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 2, // IOS (?)
          shadowRadius: 0.2, // IOS
          elevation: 1, // ANDROID
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'green'},
  navigation: {flex: 2, backgroundColor: 'red'},
  body: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
  footer: {flex: 1, backgroundColor: 'cyan'},
})

export {AbandondedPlaceBar}
