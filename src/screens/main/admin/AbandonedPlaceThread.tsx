import React, {useState, useEffect} from 'react'
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
import {CommentModel, UserModel} from '../../../redux'

interface IProps {
  navigation: {
    openDrawer: Function
    navigate: Function
    goBack: Function
  }
  route: {
    params: {
      commentItem: CommentModel
      abandonedPlaceID?: string
      onShowPopUp: (comment: CommentModel) => void
      user: UserModel
    }
  }
}
const AbandonedPlaceThread: React.FC<IProps> = ({navigation, route}) => {
  const {abandonedPlaceID, commentItem, user, onShowPopUp} = route.params

  console.log('commentItem Thread-423', commentItem)
  console.log('commentItem user-423', user)
  console.log('commentItem onShowpopup-423', onShowPopUp)
  console.log('commentItem navigation-423', navigation)

  return (
    <View style={styles.container}>
      <Header navigation={navigation} headerTitle="Thread" />
      <CommentItem
        user={user}
        abandonedPlaceID={abandonedPlaceID}
        commentItem={commentItem}
        onShowPopUp={onShowPopUp}
      />
      <Divider />
      {/* <CommentItem
        user={user}
        abandonedPlaceID={abandonedPlaceID}
        commentItem={item}
        onShowPopUp={onShowPopUp}
      /> */}
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
