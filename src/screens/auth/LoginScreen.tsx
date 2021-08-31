import React, {useState, useContext, useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import {Title} from 'react-native-paper'
import {FormButton, FormInput} from '../../components'
import {
  ApplicationState,
  onUserLogin,
  onUserErrorClear,
  UserState,
} from '../../redux'

// useNavigation
import {useNavigation} from '../../../utils/useNavigation'
import {connect} from 'react-redux'

// React Native
import {Text} from 'react-native'

interface LoginScreenProps {
  navigation: {goBack: Function}
  onUserLogin: Function
  onUserErrorClear: Function
  userReducer: UserState
}

const _LoginScreen: React.FC<LoginScreenProps> = (props) => {
  const {onUserLogin, onUserErrorClear} = props
  const {error} = props.userReducer

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {navigate} = useNavigation()

  const login = () => {
    onUserLogin(email, password)
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
      <Title style={styles.titleText}>Welcome to Urbanex</Title>

      <FormInput
        testID="loginEmailInput"
        labelName="Email"
        autoCapitalize="none"
        onTextChange={setEmail}
        value={email}
      />

      <FormInput
        testID="loginPasswordInput"
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
        testID="loginBtn"
        title="Login"
        modeValue="contained"
        labelStyle={styles.loginButtonLabel}
        onTap={login}
      />
      <FormButton
        testID="navigateToRegisterBtn"
        title="New user? Join here"
        modeValue="text"
        upperCase={false}
        labelStyle={styles.navButtonText}
        onTap={() => navigate('RegisterPage')}
      />
    </View>
  )
}
const mapStateToProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
})

const LoginScreen = connect(mapStateToProps, {
  onUserLogin,
  onUserErrorClear,
})(_LoginScreen)

export {LoginScreen}

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
})
