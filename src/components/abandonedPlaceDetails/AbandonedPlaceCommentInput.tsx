import {MaterialCommunityIcons} from '@expo/vector-icons'
import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native'
import {color} from '../../constants'
import {ButtonWithIcon} from '../ButtonWithIcon'
import {CommentField} from '../index'

interface IProps {
  comment: string
  setComment: React.Dispatch<React.SetStateAction<string>>
  submitComment: () => Promise<void>
  submitToggle: boolean
  validateCommentText: (text: string) => void
}
const AbandonedPlaceCommentInput: React.FC<IProps> = ({
  comment,
  setComment,
  submitComment,
  submitToggle,
  validateCommentText,
}) => {
  return (
    <View style={styles.formControl}>
      <View style={{flex: 9}}>
        <CommentField
          blurOnSubmit
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={100}
          value={comment}
          onChangeText={(text) => validateCommentText(text)}
          keyboardType="default"
          onEndEditing={() => console.log('onEndEditing', comment)}
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
                submitToggle ? color.greyedOutColor : color.bgColor

                // likeIsToggled ? color.greyedOutColor : color.secondaryColor
              }
            />
          }
          disabled={submitToggle}
          // disabled={likeIsToggled}
          onTap={submitComment}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  formControl: {
    height: 60,
    backgroundColor: color.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export {AbandonedPlaceCommentInput}
