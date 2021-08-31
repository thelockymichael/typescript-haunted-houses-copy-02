import React, {useState, useContext, useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import {Title, IconButton} from 'react-native-paper'
import {FormButton, FormInput} from '../../components'
import {
  ApplicationState,
  onUserLogin,
  onUserSignup,
  onUserErrorClear,
  UserState,
} from '../../redux'

import {Text} from 'react-native'
// useNavigation
import {connect} from 'react-redux'

interface RegisterScreenProps {
  navigation: {goBack: Function}
  onUserSignup: Function
  onUserErrorClear: Function
  userReducer: UserState
}

const _RegisterScreen: React.FC<RegisterScreenProps> = (props) => {
  const {onUserSignup, onUserErrorClear} = props
  const {error} = props.userReducer

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Check for sign up screen

  // Go back
  const {goBack} = props.navigation

  // Authentication

  const register = () => {
    onUserSignup(email, password)
  }

  useEffect(() => {
    let timeout = setTimeout(() => {
      onUserErrorClear()
    }, 5000)

    return function cleanUp() {
      clearTimeout(timeout)
    }
  }, [error])

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Register new user</Title>

      <FormInput
        testID="registerEmailInput"
        labelName="Email"
        autoCapitalize="none"
        onTextChange={setEmail}
        value={email}
      />

      <FormInput
        testID="registerPassword"
        labelName="Password"
        autoCapitalize="none"
        onTextChange={setPassword}
        secureTextEntry={true}
        value={password}
      />

      <Text
        style={{
          fontFamily: 'open-sans-semi-bold',
          color: 'red',
        }}
      >
        {error}
      </Text>

      <FormButton
        testID="registerBtn"
        title="Register"
        modeValue="contained"
        labelStyle={styles.loginButtonLabel}
        onTap={register}
      />
      <IconButton
        testID="goBackToLoginBtn"
        icon="keyboard-backspace"
        size={30}
        style={styles.navButton}
        color="#6646ee"
        onPress={() => goBack()}
      />
      {/* <FormButton
        title="New user? Join here"
        modeValue="text"
        uppserCase={false}
        labelStyle={styles.navButtonText}
        onTap={() => navigate('RegisterPage')}
      /> */}
    </View>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
})

const RegisterScreen = connect(mapStateToProps, {
  onUserSignup,
  onUserErrorClear,
})(_RegisterScreen)

export {RegisterScreen}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10,
  },
  loginButtonLabel: {
    fontSize: 22,
  },
  navButtonText: {
    fontSize: 16,
  },
  navButton: {
    marginTop: 10,
  },
})
