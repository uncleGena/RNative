import React from 'react'
import {
  StyleSheet,
  Animated,
  Text,
  View,
  PanResponder,
  Dimensions
} from 'react-native'
import {Card, Button} from 'react-native-elements'


const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_THRESHHOLD = 0.25 * SCREEN_WIDTH
const SWIPE_OUT_DURATION = 333

export default class MyCard extends React.Component {
  constructor(props) {
    super(props)

    const position = new Animated.ValueXY()

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({x: gesture.dx, y: gesture.dy})
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHHOLD) {
          // console.log('swipe RIGHT');
          this.forceSwipe('right')
        } else if (gesture.dx < -SWIPE_THRESHHOLD) {
          // console.log('swipe LEFT');
          this.forceSwipe('left')
        } else {
          this.resetPosition()
        }
      }
    })

    this.state = {panResponder, position, index: this.props.id}
  }

  forceSwipe(direction) {
    let x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH
    Animated.timing(this.state.position, {
      toValue: {x, y:0},
      duration: SWIPE_OUT_DURATION
    }).start(() => {
      this.onSwipeComplete(direction)
    })
  }

  onSwipeComplete(direction) {
    const {onSwipeLeft, onSwipeRight, data, item} = this.props

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item)
  }

  resetPosition() {
    Animated.timing(this.state.position, {
      toValue: {x: 0, y: 0}
    }).start()
  }

  getCardStyle() {
    const {position} = this.state
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2.5, 0, SCREEN_WIDTH * 2.5],
      outputRange: ['-120deg', '0deg', '120deg']
    })

    return {
      ...position.getLayout(),
      transform: [{rotate}]
    }
  }

  render() {
    return (
      <Animated.View style={this.getCardStyle()} {...this.state.panResponder.panHandlers}>
        <Card title={this.props.item.text} image={{uri: this.props.item.uri}}>
          <Text stye={{marginBottom: 10}}>
            Bla bla blaRR
          </Text>
          <Button icon={{name: 'code'}} backgroundColor='#eed423' title='View Now!' />
        </Card>
      </Animated.View>
    )
  }
}
