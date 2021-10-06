import React from 'react'
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native'

interface IProps {
  isLoading: boolean
}

const Loading: React.FC<IProps> = ({isLoading}) => {
  return (
    <>
      {isLoading ? <ActivityIndicator size="large" color="#6646ee" /> : <></>}
    </>
  )
}

export {Loading}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
