import React, {useState, useEffect, useContext} from 'react'
import firebase from 'firebase'

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native'
import {Divider} from 'react-native-paper'
import {CommentItem, Header} from '../../../components'
import {color} from '../../../constants'
import {UserContext} from '../../../contexts/contexts'
import {getComment} from '../../../controllers/commentController'
import {CommentModel, UserModel} from '../../../redux'

interface IProps {
  navigation: {
    openDrawer: Function
    navigate: Function
    goBack: Function
  }
  route: {
    params: {
      abandonedPlaceID?: string
      commentItem: CommentModel
      // onShowPopUp: (comment: CommentModel) => void
      // user: UserModel
    }
  }
}
const AbandonedPlaceThread: React.FC<IProps> = ({navigation, route}) => {
  const {abandonedPlaceID, commentItem} = route.params

  const {user} = useContext(UserContext)

  const [comment, setComment] = useState<CommentModel>(commentItem)

  console.log('commentItem Thread-423', commentItem)
  console.log('commentItem user-423', user)
  // console.log('commentItem onShowpopup-423', onShowPopUp)
  // console.log('commentItem navigation-423', navigation)

  useEffect(() => {
    const commentsListener = firebase
      .firestore()
      .collection('abandonedPlaces')
      .doc(abandonedPlaceID)
      .collection('comments')
      .doc(commentItem.id)
      .onSnapshot((querySnapshot) => {
        const comment = querySnapshot.data()

        setComment(comment)
      })

    return () => commentsListener()
  }, [])

  return (
    <View style={styles.container}>
      <Header navigation={navigation} headerTitle="Thread" />
      <CommentItem
        user={user}
        abandonedPlaceID={abandonedPlaceID}
        commentItem={commentItem}
        // onShowPopUp={onShowPopUp}
      />
      <Divider />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: color.bgColor},
  body: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
})

export {AbandonedPlaceThread}
