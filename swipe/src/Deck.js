import React, {Component} from 'react'
import {View, Animated, PanResponder} from 'react-native'
import MyCard from './MyCard'

export default class Deck extends Component {

  render() {
    return (
      <View>

        {this.props.data.map(item => {
          return <MyCard item={item} key={item.id} />
        })}

      </View>
    )
  }
}
