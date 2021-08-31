import React, {
  useEffect,
  useContext,
  useRef,
  useCallback,
  useState,
} from 'react'
import {StatusBar} from 'expo-status-bar'
import firebase from 'firebase'
import 'firebase/storage'
import {
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  Text,
  Image,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native'
import {
  AntDesign,
  Feather,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons'

import {
  ButtonWithIcon,
  CommentField,
  CommentItem,
  ErrorMessage,
  FormButton,
  FormInput,
  Header,
  LocationPicker,
} from '../../../components'
import {AbandonedPlaceModel, logOut} from '../../../redux'
import {PlaceCard} from '../../../components/PlaceCard'
import {List, Divider} from 'react-native-paper'

import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker'
import {
  likeAbandonedPlace,
  updateAbandonedPlace,
} from '../../../controllers/abandonedPlacesController'
import {ScreenStackHeaderBackButtonImage} from 'react-native-screens'

import {scrollInterpolator, animatedStyles} from '../../../../utils/animations'

import * as Location from 'expo-location'

import {GOOGLE_API} from '@env'
import {color} from '../../../constants'

import {UserContext} from '../../../contexts/contexts'

const dimensions = Dimensions.get('window')
const imageHeight = Math.round(((dimensions.width - 10) * 9) / 16)
const imageWidth = dimensions.width - 20

interface AbandondedPlaceDetailsProps {
  navigation: {
    popToTop: Function
    setOptions: Function
    goBack: Function
    navigate: Function
  }
  route: {params: {item: AbandonedPlaceModel}}
}
// const dummyData = {
//   name: 'Saviton talo',
//   description: 'Pelottava paikka',
//   location: [23.1231, 23.312512],
//   imageUrls: ['dasdjashd', 'dasdhsauhdusa'],
// }

import {CommentModel, Rating} from '../../../redux/models'

import {updateComment} from '../../../controllers/commentController'

const AbandondedPlaceDetails: React.FC<AbandondedPlaceDetailsProps> = ({
  navigation,
  route,
}) => {
  const {user} = useContext(UserContext)

  const [addresses, setAddresses] = useState()

  const {item} = route.params

  // 1. Rating: likes, dislikes
  const [rating, setRating] = useState<Rating>()
  const [likeIsToggled, toggleLike] = useState(false)
  const [dislikeIsToggled, toggleDislike] = useState(false)
  // END

  // 2. Commenting
  const [comment, setComment] = useState<string>('')
  const [comments, setComments] = useState<CommentModel[]>([])

  // console.log(moment(new Date()).fromNow(true))

  useEffect(() => {
    // reverseGeocodeAsync()

    const ratingListener = firebase
      .firestore()
      .collection('abandonedPlaces')
      .doc(item.id)
      .onSnapshot((querySnapshot) => {
        const firebaseData = querySnapshot.data() as AbandonedPlaceModel

        const hasLiked = firebaseData.rating.likes.some(
          (userId) => userId === user.id
        )
        const hasDisliked = firebaseData.rating.dislikes.some(
          (userId) => userId === user.id
        )

        if (hasLiked) toggleLike(true)

        if (hasDisliked) toggleDislike(true)

        setRating(firebaseData.rating)
      })

    return () => ratingListener()
  }, [])

  useEffect(() => {
    const commentsListener = firebase
      .firestore()
      .collection('abandonedPlaces')
      .doc(item.id)
      .collection('comments')
      .orderBy('createdAt', 'asc')
      .onSnapshot((querySnapshot) => {
        const comments = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
          }
        })

        setComments(comments)
        // const firebaseData = querySnapshot.data() as AbandonedPlaceModel
        // const hasLiked = firebaseData.rating.likes.some(
        //   (userId) => userId === user.id
        // )
        // const hasDisliked = firebaseData.rating.dislikes.some(
        //   (userId) => userId === user.id
        // )
        // if (hasLiked) toggleLike(true)
        // if (hasDisliked) toggleDislike(true)
        // setRating(firebaseData.rating)
      })

    return () => commentsListener()
  }, [])

  const reverseGeocodeAsync = async () => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${item.location.latitude},${item.location.longitude}&language=en&key=${GOOGLE_API}`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const firstAddress = responseJson.results[0].formatted_address
        const secondAddress = responseJson.results[1].formatted_address

        setAddresses([firstAddress, secondAddress])
      })
  }

  const likePost = async () => {
    item.rating.likes.push(user.id)

    await updateAbandonedPlace(item)

    toggleLike(true)
    toggleDislike(false)

    // If already disliked remove dislike and toggle like button instead
    if (dislikeIsToggled) {
      const newArr = item.rating.dislikes.filter((userId) => userId !== user.id)

      item.rating.dislikes = newArr

      await updateAbandonedPlace(item)
    }
  }

  const dislikePost = async () => {
    item.rating.dislikes.push(user.id)

    await updateAbandonedPlace(item)

    toggleDislike(true)
    toggleLike(false)

    // If already liked, remove like and toggle dislike button instead
    if (likeIsToggled) {
      const newArr = item.rating.likes.filter((userId) => userId !== user.id)

      item.rating.likes = newArr

      await updateAbandonedPlace(item)
    }
  }

  const submitComment = async () => {
    await updateComment(item.id, {
      username: 'MISKA', // TODO Change 'MISKA' to real username
      commentText: comment,
    } as CommentModel)

    setComment('')
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header
        headerTitle={item.name}
        headerLeft={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name={'keyboard-backspace'}
              size={32}
              color={color.secondaryColor}
            />
          </TouchableOpacity>
        }
        headerRight={
          item.userID === user.id && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AbandonedPlacesEditPage', {
                  editPlace: item,
                })
              }
            >
              <MaterialCommunityIcons
                name={'file-edit-outline'}
                size={32}
                color={color.secondaryColor}
              />
            </TouchableOpacity>
          )
        }
      />

      <ScrollView>
        <View style={styles.body}>
          <View style={styles.imageContainer}>
            <Image
              resizeMode={'cover'}
              style={styles.imageStyle}
              source={{
                uri: item.imageUrls[0],
              }}
            />
          </View>
          <View style={styles.bodyContent}>
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
                        color={
                          likeIsToggled
                            ? color.greyedOutColor
                            : color.secondaryColor
                        }
                      />
                    }
                    disabled={likeIsToggled}
                    iconText={rating?.likes.length}
                    onTap={likePost}
                  />
                </View>
                <ButtonWithIcon
                  icon={
                    <MaterialCommunityIcons
                      name={'arrow-down-thick'}
                      size={32}
                      color={
                        dislikeIsToggled
                          ? color.greyedOutColor
                          : color.secondaryColor
                      }
                    />
                  }
                  disabled={dislikeIsToggled}
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
                    // disabled={likeIsToggled}
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
                    <Fontisto
                      name={'share'}
                      size={26}
                      color={color.secondaryColor}
                    />
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
                shadowOpacity: 0.1, // IOS (?)
                shadowRadius: 1.84, // IOS
                elevation: 1, // ANDROID
              }}
            />

            {/* <Text style={styles.description}>{item.description}</Text> */}

            {addresses !== undefined &&
              addresses.map((address, index) => (
                <Text key={index} style={styles.location}>
                  {address}
                </Text>
              ))}

            <View style={{flex: 0}}>
              <FlatList
                data={comments}
                inverted={true}
                ItemSeparatorComponent={() => <Divider />}
                renderItem={({item}) => <CommentItem {...item} />}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.formControl}>
        <View style={{flex: 9}}>
          <CommentField
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={100}
            value={comment}
            onChangeText={(text) => setComment(text)}
            keyboardType="default"
            onEndEditing={() => console.log('onEndEditing')}
            onSubmitEditing={() => console.log('onSubmitEditing')}
            placeholder={'Enter some text...'}
          />
        </View>

        <View style={{flex: 1}}>
          <ButtonWithIcon
            icon={
              <MaterialCommunityIcons
                name={'send'}
                size={20}
                color={
                  color.bgColor
                  // likeIsToggled ? color.greyedOutColor : color.secondaryColor
                }
              />
            }
            // disabled={likeIsToggled}
            onTap={submitComment}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F323A',
  },
  customBtn: {
    backgroundColor: color.primaryColor,
  },

  body: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: 20,
    width: imageWidth,
    height: imageHeight,
  },
  bodyContent: {
    marginTop: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#FFF',
    width: '100%',
  },
  description: {fontSize: 20, fontFamily: 'open-sans-regular'},
  location: {fontSize: 18, fontFamily: 'open-sans-regular'},
  formControl: {
    height: 60,
    backgroundColor: color.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export {AbandondedPlaceDetails}
