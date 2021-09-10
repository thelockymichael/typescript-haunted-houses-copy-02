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
import {FlatList} from 'react-native-gesture-handler'
import {Divider} from 'react-native-paper'
import {AbandonedPlaceModel, CommentModel, UserModel} from '../../redux'
import {CommentItem} from '../comments/CommentItem'
import {updateComment} from '../../controllers/commentController'

interface IProps {
  abandonedPlaceID?: string
  user: UserModel
  onShowPopUp: (comment: CommentModel) => void
}
const AbandonedPlaceComments: React.FC<IProps> = ({
  abandonedPlaceID,
  onShowPopUp,
  user,
}) => {
  const [comments, setComments] = useState<CommentModel[]>([])
  const [submitToggle, setSubmitToggle] = useState<boolean>(true)

  useEffect(() => {
    const commentsListener = firebase
      .firestore()
      .collection('abandonedPlaces')
      .doc(abandonedPlaceID)
      .collection('comments')
      .orderBy('createdAt', 'asc')
      .onSnapshot((querySnapshot) => {
        const comments = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
          }
        })

        setComments(comments)
      })

    return () => commentsListener()
  }, [])

  return (
    <FlatList
      data={comments}
      inverted={true}
      ItemSeparatorComponent={() => <Divider />}
      renderItem={({item}) => (
        <CommentItem
          user={user}
          abandonedPlaceID={abandonedPlaceID}
          mainComment={item}
          onShowPopUp={onShowPopUp}
        />
      )}
    />
  )
}

export {AbandonedPlaceComments}
