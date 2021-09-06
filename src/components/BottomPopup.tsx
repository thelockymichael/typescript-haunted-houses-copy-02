import React, {useState, useEffect, Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Modal,
  Dimensions,
  FlatList,
} from 'react-native'

const deviceHeight = Dimensions.get('window').height

interface BottomPopupProps {
  title?: string
  ref?: React.RefObject<unknown>
  onTouchOutside: Function
}

interface StateProps {
  show: boolean
}

export class BottomPopup extends Component {
  constructor(props: BottomPopupProps) {
    super(props)
    this.state = {
      show: false,
    }
  }

  show = () => {
    this.setState({show: true})
  }

  close = () => {
    this.setState({show: false})
  }

  renderOutsideTouchable(onTouch) {
    const view = <View style={{flex: 1, width: '100%'}} />

    if (!onTouch) return view

    return (
      <TouchableWithoutFeedback
        onPress={onTouch}
        style={{flex: 1, width: '100%'}}
      >
        {view}
      </TouchableWithoutFeedback>
    )
  }

  renderTitle = () => {
    const {title} = this.props
    return (
      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            color: '#182E44',
            fontSize: 20,
            fontWeight: '500',
            marginTop: 15,
            marginBottom: 30,
          }}
        >
          {title}
        </Text>
      </View>
    )
  }

  renderContent = () => {
    const {data} = this.props
    return (
      <View>
        <FlatList
          style={{
            marginBottom: 20,
          }}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={this.renderItem}
          extraData={data}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeperator}
          contentContainerStyle={{
            paddingBottom: 40,
          }}
        />
      </View>
    )
  }

  renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          item.onTap()

          // IMPORTANT !!! 02.09.2021
          this.close()
        }}
        style={{
          height: 50,
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'center',
          marginLeft: 20,
        }}
      >
        <Text style={{fontSize: 18, fontWeight: 'normal', color: '#182E44'}}>
          {item.name}
        </Text>
      </TouchableOpacity>
    )
  }

  renderSeperator = () => (
    <View
      style={{
        opacity: 0.1,
        backgroundColor: '#182E44',
        height: 1,
      }}
    />
  )

  render() {
    let {show} = this.state
    const {onTouchOutside, title} = this.props

    return (
      <Modal
        animationType={'none'}
        transparent={true}
        visible={show}
        onRequestClose={this.close}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#000000AA',
            justifyContent: 'flex-end',
          }}
        >
          {this.renderOutsideTouchable(onTouchOutside)}
          <View
            style={{
              backgroundColor: '#FFFFFF',
              width: '100%',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              paddingHorizontal: 10,
              maxHeight: deviceHeight * 0.4,
            }}
          >
            {this.renderTitle()}
            {this.renderContent()}
          </View>
        </View>
      </Modal>
    )
  }
}
