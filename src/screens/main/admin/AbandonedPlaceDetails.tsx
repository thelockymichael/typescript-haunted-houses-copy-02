import React, {useEffect, useContext, useState, createRef} from 'react'
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
  KeyboardAvoidingView,
} from 'react-native'
import {Fontisto, MaterialCommunityIcons} from '@expo/vector-icons'

import {
  AbandondedPlaceBar,
  AbandonedPlaceCommentInput,
  AbandonedPlaceComments,
  BottomPopup,
  ButtonWithIcon,
  CommentField,
  CommentItem,
  CustomAlert,
  CustomAlertProps,
  FormButton,
  Header,
} from '../../../components'
import {AbandonedPlaceModel, logOut} from '../../../redux'
import {PlaceCard} from '../../../components/PlaceCard'
import {List, Divider} from 'react-native-paper'

import {updateAbandonedPlace} from '../../../controllers/abandonedPlacesController'

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

import {CommentModel, Rating} from '../../../redux/models'

import {
  deleteComment,
  updateComment,
} from '../../../controllers/commentController'

const AbandondedPlaceDetails: React.FC<AbandondedPlaceDetailsProps> = ({
  navigation,
  route,
}) => {
  const {user} = useContext(UserContext)

  const [addresses, setAddresses] = useState()

  const {item} = route.params

  // 1. Rating: likes, dislikes

  // END

  // 2. Commenting
  const [comment, setComment] = useState<string>('')
  const [submitToggle, setSubmitToggle] = useState<boolean>(true)

  // 3. Popup list
  const [popUpList, setPopUpList] = useState([])

  /// 4. Alert Modal Visibility
  const [modal, setModal] = useState<CustomAlertProps>({
    onPressNegativeButton: () => onPressAlertNegativeButton(),
    onPressPositiveButton: () => onPressAlertPositiveButton(),
    displayAlert: false,
    alertTitleText: '',
    alertMessageText: '',
    displayPositiveButton: false,
    positiveButtonText: '',
    displayNegativeButton: false,
    negativeButtonText: '',
  })

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

  // 1. Rating: likes & dislikes ENDS HERE //

  let popUpRef = createRef()

  // Popup menu
  const onShowPopUp = (comment: CommentModel): void => {
    setPopUpList([
      {
        id: 1,
        name: 'Delete comment',
        onTap: () => onDeleteComment(comment),
      },
    ])
    popUpRef.show()
  }

  // Delete alert dialog
  const onDeleteComment = (comment: CommentModel) => {
    // setModalVisible(true)

    console.log('modalVisible 1', modal)

    setModal({
      onPressNegativeButton: () => onPressAlertNegativeButton(),
      onPressPositiveButton: async () => {
        deleteComment(item.id, comment)
        onPressAlertPositiveButton()
      },
      displayAlert: true,
      alertTitleText: 'Delete',
      alertMessageText: 'Are you sure you want to delete this message?',
      displayPositiveButton: true,
      positiveButtonText: 'OK',
      displayNegativeButton: true,
      negativeButtonText: 'CANCEL',
    })
  }

  const validateCommentText = (text: string) => {
    console.log('text', text)
    console.log('is text empty? ""', text.length)

    if (text.length > 0) {
      setSubmitToggle(false)
    } else if (text.length === 0) {
      setSubmitToggle(true)
    }

    setComment(text)
  }

  const submitComment = async (): Promise<void> => {
    await updateComment(item.id, {
      username: 'MISKA', // TODO Change 'MISKA' to real username
      commentText: comment,
      rating: {
        likes: [],
        dislikes: [],
      },
    } as CommentModel)

    validateCommentText('')
  }

  const onClosePopup = () => {
    popUpRef.close()
  }

  const onPressAlertPositiveButton = () => {
    // alert('Positive Button Clicked')
    setModal({...modal, displayAlert: false})
  }

  const onPressAlertNegativeButton = () => {
    // alert('Negative Button Clicked')
    setModal({...modal, displayAlert: false})
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 40}
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
            <AbandondedPlaceBar
              navigation={navigation}
              item={route.params.item}
              user={user}
            />
            <AbandonedPlaceComments
              user={user}
              abandonedPlaceID={item.id}
              onShowPopUp={onShowPopUp}
            />
          </View>
        </View>
      </ScrollView>
      <AbandonedPlaceCommentInput
        comment={comment}
        setComment={setComment}
        submitComment={submitComment}
        submitToggle={submitToggle}
        validateCommentText={validateCommentText}
      />
      <BottomPopup
        title="Demo Popup"
        ref={(target) => (popUpRef = target)}
        onTouchOutside={onClosePopup}
        data={popUpList}
      />
      <CustomAlert {...modal} />
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
})

export {AbandondedPlaceDetails}
