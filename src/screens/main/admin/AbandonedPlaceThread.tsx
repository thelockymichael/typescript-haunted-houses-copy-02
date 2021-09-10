import React, {useState, useEffect, useContext} from 'react'
import firebase from 'firebase'

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import {Divider} from 'react-native-paper'
import {
  AbandonedPlaceCommentInput,
  BottomPopup,
  CommentItem,
  CustomAlert,
  Header,
} from '../../../components'
import {color} from '../../../constants'
import {UserContext} from '../../../contexts/contexts'
import {
  getComment,
  updateComment,
  updateCommentOfComment,
} from '../../../controllers/commentController'
import {CommentModel, UserModel} from '../../../redux'
import {FlatList, ScrollView} from 'react-native-gesture-handler'
import {createRef} from 'react'

interface IProps {
  navigation: {
    openDrawer: Function
    navigate: Function
    goBack: Function
  }
  route: {
    params: {
      abandonedPlaceID?: string
      mainComment: CommentModel
      // onShowPopUp: (comment: CommentModel) => void
      // user: UserModel
    }
  }
}
const AbandonedPlaceThread: React.FC<IProps> = ({navigation, route}) => {
  const {abandonedPlaceID, mainComment} = route.params

  const {user} = useContext(UserContext)

  const [comment, setComment] = useState<CommentModel>(mainComment)

  const [replies, setReplyComments] = useState<CommentModel[]>()

  // 2. Commenting
  const [inputComment, setInputComment] = useState<string>('')
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

  useEffect(() => {
    const commentListener = firebase
      .firestore()
      .collection('abandonedPlaces')
      .doc(abandonedPlaceID)
      .collection('comments')
      .doc(comment.id)
      .collection('replyComments')
      .orderBy('createdAt', 'asc')
      .onSnapshot((querySnapshot) => {
        const replies = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
          }
        })

        setReplyComments(replies)
      })

    return () => commentListener()
  }, [])

  useEffect(() => {
    const commentListener = firebase
      .firestore()
      .collection('abandonedPlaces')
      .doc(abandonedPlaceID)
      .collection('comments')
      .doc(mainComment.id)
      .onSnapshot((querySnapshot) => {
        const comment = querySnapshot.data()

        setComment(comment)
      })

    return () => commentListener()
  }, [])

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

    setInputComment(text)
  }

  const submitComment = async (): Promise<void> => {
    await updateCommentOfComment(abandonedPlaceID, comment, {
      username: 'MISKA',
      commentText: inputComment,
    })

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
      <Header navigation={navigation} headerTitle="Thread" />

      <ScrollView>
        <View style={styles.bodyContent}>
          <CommentItem
            isThreadPage={true}
            user={user}
            abandonedPlaceID={abandonedPlaceID}
            mainComment={mainComment}
            // onShowPopUp={onShowPopUp}
          />
          <FlatList
            data={replies}
            inverted={true}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({item}) => (
              <CommentItem
                user={user}
                abandonedPlaceID={abandonedPlaceID}
                mainComment={mainComment}
                replyComment={item}
                onShowPopUp={onShowPopUp}
                isReply={true}
              />
            )}
          />
          <Divider />
        </View>
      </ScrollView>
      <AbandonedPlaceCommentInput
        comment={inputComment}
        setComment={setInputComment}
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
    flex: 10,
    backgroundColor: color.bgColor,
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

export {AbandonedPlaceThread}
