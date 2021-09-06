import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
} from 'react-native'
import {color} from '../constants'

export interface CustomAlertProps {
  onPressNegativeButton: Function
  onPressPositiveButton: Function
  displayAlert: boolean
  displayAlertIcon?: boolean
  alertTitleText: string
  alertMessageText: string
  displayPositiveButton: boolean
  positiveButtonText: string
  displayNegativeButton: boolean
  negativeButtonText: string
}
const CustomAlert: React.FC<CustomAlertProps> = ({
  displayAlert,
  alertMessageText,
  alertTitleText,
  positiveButtonText,
  negativeButtonText,
  displayPositiveButton,
  displayNegativeButton,
  onPressPositiveButton,
  onPressNegativeButton,
}) => {
  const onNegativeButtonPress = () => {
    console.log('onNegativeButtonPress, CustomAlert')
    console.log('display alert', displayAlert)

    onPressNegativeButton()
  }

  const onPositiveButtonPress = () => {
    console.log('displayAlert', displayAlert)

    onPressPositiveButton()
  }

  return (
    <Modal visible={displayAlert} transparent={true} animationType={'fade'}>
      <View style={styles.mainOuterComponent}>
        <View style={styles.mainContainer}>
          {/* First ROw - Alert Icon and Title */}
          <View style={styles.topPart}>
            <Text style={styles.alertTitleTextStyle}>
              {`${alertTitleText}`}
            </Text>
          </View>
          {/* Second Row - Alert Message Text */}
          <View style={styles.middlePart}>
            <Text style={styles.alertMessageTextStyle}>
              {`${alertMessageText}`}
            </Text>
          </View>
          {/* Third Row - Positive and Negative Button */}
          <View style={styles.bottomPart}>
            {displayPositiveButton && (
              <TouchableOpacity
                onPress={onNegativeButtonPress}
                style={styles.alertMessageButtonStyle}
              >
                <Text style={styles.alertMessageButtonTextStyle}>
                  {negativeButtonText}
                </Text>
              </TouchableOpacity>
            )}
            {displayNegativeButton && (
              <TouchableOpacity
                onPress={onPositiveButtonPress}
                style={styles.alertMessageButtonStyle}
              >
                <Text style={styles.alertMessageButtonTextStyle}>
                  {positiveButtonText}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  mainOuterComponent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000088',
  },
  mainContainer: {
    // padding: 20,
    flexDirection: 'column',

    height: '25%',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    // borderWidth: 2,
    // borderColor: '#FF0000',
    borderRadius: 10,
    // padding: 4,
  },
  topPart: {
    // flex: 0.5,
    paddingTop: 18,
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    // paddingBottom: 8,
    marginBottom: 6,
    // borderWidth: 1,
    // borderColor: '#00FF00',
    // paddingHorizontal: 2,
    // paddingVertical: 4,
  },
  middlePart: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    // borderWidth: 1,
    // borderColor: '#FF6600',
    // padding: 4,
    color: '#FFFFFF',
    fontSize: 16,
    // marginVertical: 2,
  },
  bottomPart: {
    flex: 0.5,
    width: '100%',
    // borderWidth: 1,
    // borderColor: '#0066FF',
    flexDirection: 'row',
    // padding: 4,

    justifyContent: 'flex-end',
  },
  alertIconStyle: {
    // borderWidth: 1,
    // borderColor: '#cc00cc',
    height: 35,
    width: 35,
  },
  alertTitleTextStyle: {
    flex: 1,
    textAlign: 'justify',
    color: color.primaryColor,
    fontSize: 18,
    fontWeight: 'bold',
    // borderWidth: 1,
    borderColor: '#660066',
  },
  alertMessageTextStyle: {
    color: color.primaryColor,
    fontSize: 16,
    paddingVertical: 2,
  },
  alertMessageButtonStyle: {
    width: '30%',
    // paddingHorizontal: 6,
    borderRadius: 4,
    margin: 6,
    backgroundColor: '#00000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertMessageButtonTextStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: color.secondaryColor,
  },
})

export {CustomAlert}
