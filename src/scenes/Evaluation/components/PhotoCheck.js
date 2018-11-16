import React, { Component} from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { faceScan } from '../../../services/evaluation/lib/api/google_vision'

class PhotoCheck extends Component {
  constructor (props) {
    super(props)
    this.state = {
      evaluation: undefined,
      tags: 'processing...'
    }
  }

  componentWillMount () {
      setTimeout(async () => {
          const base64 = await faceScan(this.props.uri)
          this.setState({...this.state, tags: base64})
      }, 2000)
    
  }

  renderSendBtn () {
    if (this.state.evaluation !== undefined) {
      return (<TouchableOpacity style={styles.btn}>
        <Text>Send</Text>
      </TouchableOpacity>)
    }

    return (<View style={styles.btnDisable}>
      <Text>Send</Text>
    </View>)
  }

  render () {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 300, height: 400}}
          source={{uri: 'file://' + this.props.uri}}/>
        <Text>
            {this.state.tags}
        </Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn}
            onPress={() => this.props.onSend()}>
            <Text>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}
            onPress={() => this.props.onCancel()}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>)
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#FFFF'
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  btn: {
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 16,
    fontWeight: 300,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  btnDisable: {
    margin: 10,
    opacity: 0.1,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 16,
    fontWeight: 300,
    paddingHorizontal: 10,
    paddingVertical: 5
  }
}

export default PhotoCheck