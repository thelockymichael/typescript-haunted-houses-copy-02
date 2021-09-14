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

import {FormButton, FormInput, Header} from '../../components'
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
const UsernameSetup: React.FC<IProps> = ({navigation}) => {
  const {user} = useContext(UserContext)

  const [username, setUsername] = useState('')

  const submitName = async () => {
    const userNameRegex = /^[A-Za-z][A-Za-z0-9_]{7,29}$/

    if (!userNameRegex.test(username)) {
      console.log('Username must be username type')
    } else {
      try {
        await updateUser({...user, userName: username})
      } catch (err) {
        throw new Error(err)
      }
    }
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.body}>
        <Text style={styles.questionTextStyle}>What is your </Text>
        <FormInput
          testID="username"
          labelName="Username?"
          autoCapitalize="none"
          multiline={false}
          onTextChange={setUsername}
          value={username}
        />
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
