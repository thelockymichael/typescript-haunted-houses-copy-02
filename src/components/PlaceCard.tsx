import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native'
import {getCountyImage} from '../../utils'
import {PlaceModel} from '../redux'

interface PlaceProps {
  item: PlaceModel
  onTap: Function
}
const PlaceCard: React.FC<PlaceProps> = ({item, onTap}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onTap(item)}>
      <Image
        // source={item.imageUri}
        // source={require(`../../asrc`)}
        // source={require(`../dummy-data/images/haksi_talo.jpeg`)}
        source={{
          uri: getCountyImage(item.county),
          // uri: 'https://firebasestorage.googleapis.com/v0/b/typescript-haunted-houses.appspot.com/o/images%2Fuusimaa_image.jpeg?alt=media&token=1c83c926-4f68-4bd2-a3af-6586b8391774',
        }}
        style={{
          width: 120,
          height: 120,
          borderRadius: 20,
          backgroundColor: '#EAEAEA',
        }}
      />
      <Text
        style={{
          fontFamily: 'open-sans-regular',
          fontSize: 14,
          marginTop: 10,
          color: '#858585',
        }}
      >
        {item.county}
      </Text>
    </TouchableOpacity>
  )
}

export {PlaceCard}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 140,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 5,
  },
})
