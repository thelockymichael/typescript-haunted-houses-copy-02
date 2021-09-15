import React, {useState, useEffect, useContext} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native'
import {IconButton} from 'react-native-paper'

import {ErrorMessage, FormButton, FormInput, Header} from '../../components'
import {color} from '../../constants'
import {UserContext} from '../../contexts/contexts'
import {updateUser} from '../../controllers/userController'
import {Homeinfo, OptionalInfo} from '../../redux'

interface IProps {
  navigation: {
    openDrawer: Function
    navigate: Function
    goBack: Function
  }
}

const OptionalInfoSetup: React.FC<IProps> = ({navigation}) => {
  const {user} = useContext(UserContext)

  const [optionalInfo, seOptionalInfo] = useState<OptionalInfo>({
    firstName: user.optionalInfo?.firstName || '',
    lastName: user.optionalInfo?.lastName || '',
    postCode: user.optionalInfo?.postCode || '',
    homeMunicipality: user.optionalInfo?.homeMunicipality || '',
    address: user.optionalInfo?.address || '',
    phoneNum: user.optionalInfo?.phoneNum || '',
  })
  // Error texts
  const [firstNameError, setFirstNameError] = useState<string>()
  const [lastNameError, setLastNameError] = useState<string>()
  const [postCodeError, setPostCodeError] = useState<string>()
  const [homeMunicipalityError, setHomeMunicipalityError] = useState<string>()
  const [addressError, setAddressError] = useState<string>()
  const [phoneNumError, setPhoneNumError] = useState<string>()

  const validateInput = async (value: string, name: string) => {
    // const userNameRegex = /^[A-Za-z][A-Za-z0-9_]{6,29}$/

    seOptionalInfo((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })

    switch (name) {
      case 'firstName':
        if (value.length < 1) {
          setFirstNameError('First name must be longer than 1 character.')
        } else {
          setFirstNameError('')
        }
        break
      case 'lastName':
        if (value.length < 1) {
          setLastNameError('Last name must be longer than 1 character.')
        } else {
          setLastNameError('')
        }
        break
      case 'homeMunicipality':
        if (value.length < 1) {
          setHomeMunicipalityError('City name must be longer than 1 character.')
        } else {
          setHomeMunicipalityError('')
        }
        break
      case 'postCode':
        if (value.length < 1) {
          setPostCodeError('Post code must be longer than 1 character.')
        } else {
          setPostCodeError('')
        }
        break
      case 'address':
        if (value.length < 1) {
          setAddressError('Address must be longer than 1 character.')
        } else {
          setAddressError('')
        }
        break
      case 'phoneNum':
        if (value.length < 1) {
          setPhoneNumError('Phone num must be longer than 1 character.')
        } else {
          setPhoneNumError('')
        }
        break
    }

    console.log(value, name)
    console.log('optionalInfo', optionalInfo)
  }

  const submitForm = async () => {
    try {
      await updateUser({...user, optionalInfo: optionalInfo})

      // await navigation.navigate('OptionalInfoSetup')
    } catch (err) {
      throw new Error(err)
    }
  }

  // TODO User inputs address, looks up city of address
  //      User does not need to input city at all

  // First name
  // Last name
  // Post code | Home Municipality
  // Address
  // Phone number, +358
  //

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView>
        <View style={styles.body}>
          <Text style={styles.questionTextStyle}>Optional info </Text>
          <FormInput
            testID="firstName"
            labelName="First name"
            autoCapitalize="sentences"
            multiline={false}
            onTextChange={(value: string) => validateInput(value, 'firstName')}
            value={optionalInfo.firstName}
          />

          <ErrorMessage value={firstNameError} />

          <FormInput
            testID="lastName"
            labelName="Last name"
            autoCapitalize="sentences"
            multiline={false}
            onTextChange={(value: string) => validateInput(value, 'lastName')}
            value={optionalInfo.lastName}
          />

          <ErrorMessage value={lastNameError} />

          <FormInput
            testID="postCode"
            labelName="Post code"
            autoCapitalize="sentences"
            multiline={false}
            onTextChange={(value: string) => validateInput(value, 'postCode')}
            value={optionalInfo.postCode}
          />

          <ErrorMessage value={postCodeError} />

          <FormInput
            testID="homeMunicipality"
            labelName="City"
            autoCapitalize="sentences"
            multiline={false}
            onTextChange={(value: string) =>
              validateInput(value, 'homeMunicipality')
            }
            value={optionalInfo.homeMunicipality}
          />

          <ErrorMessage value={homeMunicipalityError} />

          <FormInput
            testID="address"
            labelName="Address"
            autoCapitalize="sentences"
            multiline={false}
            onTextChange={(value: string) => validateInput(value, 'address')}
            value={optionalInfo.address}
          />

          <ErrorMessage value={addressError} />

          <FormInput
            testID="phoneNum"
            labelName="Phone num"
            autoCapitalize="sentences"
            multiline={false}
            onTextChange={(value: string) => validateInput(value, 'phoneNum')}
            value={optionalInfo.phoneNum}
          />

          <ErrorMessage value={phoneNumError} />

          <FormButton
            testID="submitForm"
            title="SUBMIT"
            modeValue="contained"
            labelStyle={styles.loginButtonLabel}
            onTap={submitForm}
          />
        </View>
      </ScrollView>
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

export {OptionalInfoSetup}
