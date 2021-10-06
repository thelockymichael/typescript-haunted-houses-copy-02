import React, {useState, useEffect, useContext} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native'
import {IconButton} from 'react-native-paper'
import firebase from 'firebase'

import {
  ErrorMessage,
  FormButton,
  FormInput,
  Header,
  Loading,
  MessageLabel,
} from '../../components'
import {color} from '../../constants'
import {UserContext} from '../../contexts/contexts'
import {updateUser} from '../../controllers/userController'

interface IProps {
  navigation: {
    openDrawer: Function
    navigate: Function
    goBack: Function
  }
}

// TODO Check that username is unique

interface MessageLabel {
  type: 'positive' | 'negative'
  message: string
}

const db = firebase.firestore()

const UsernameSetup: React.FC<IProps> = ({navigation}) => {
  const {user} = useContext(UserContext)

  const [username, setUsername] = useState<string>(user.userName)

  const [messageLabel, setMessageLabel] = useState<MessageLabel>()

  const [loading, setLoading] = useState(false)

  const isValidUsername = () => {
    const userNameRegex = /^[A-Za-z][A-Za-z0-9_]{7,29}$/

    console.log('WTF !=#', isValidUsername)

    if (!userNameRegex.test(username)) {
      console.log('Username must be a username type')
      setMessageLabel({
        type: 'negative',
        message:
          'Username must have numbers, letters and must be at least 7 chars long..',
      })

      return false
    }

    return true
  }

  const submitName = async () => {
    // if (!userNameRegex.test(username)) {
    //   console.log('Username must be username type')
    // } else {
    if (!isValidUsername()) return

    const isUserNameValid = await checkUsername()

    if (!isUserNameValid) {
      setMessageLabel({
        type: 'negative',
        message: 'Username already exists.',
      })
      return
    }

    try {
      await updateUser({...user, userName: username})

      await navigation.navigate('OptionalInfoSetup')
    } catch (err) {
      throw new Error(err)
    }
  }

  const checkUsername = async () => {
    if (!isValidUsername()) return

    if (typeof username === 'string' && username.length === 0) {
      // Does not check for name uniqueness
      // Input some text first
      return
    }
    try {
      setLoading(true)

      const response = await fetch(
        `https://us-central1-typescript-haunted-houses.cloudfunctions.net/app/checkUsername`,
        {
          method: 'POST',
          headers: {
            // "Access-Control-Allow-Origin": *,
            mode: 'cors', // no-cors, *cors, same-origin
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({username}),
        }
      )

      const isValid = await response.json()

      if (!isValid) {
        setMessageLabel({
          type: 'negative',
          message: 'Username is already in use.',
        })
        setLoading(false)

        return false
      }

      setMessageLabel({
        type: 'positive',
        message: 'Username is available.',
      })

      setLoading(false)

      return true
    } catch (err: any) {
      throw new Error(err)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.questionTextStyle}>What is your </Text>
        <FormInput
          testID="username"
          labelName="Username?"
          autoCapitalize="none"
          multiline={false}
          onTextChange={setUsername}
          onEndEditing={checkUsername}
          value={username}
        />

        <View>
          <MessageLabel
            type={messageLabel?.type}
            value={messageLabel?.message}
          />
        </View>

        <Loading isLoading={loading} />
        <FormButton
          testID="next"
          title="Next"
          modeValue="contained"
          labelStyle={styles.loginButtonLabel}
          onTap={submitName}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: color.bgColor},

  body: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  questionTextStyle: {
    fontFamily: 'open-sans-semi-bold',
    fontSize: 36,
  },

  loginButtonLabel: {
    fontSize: 22,
  },

  navButton: {
    marginTop: 10,
  },
})

export {UsernameSetup}
