import React, { Component} from 'react'
import { Text, View, TouchableOpacity, PermissionsAndroid } from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

import CameraScreen from './components/Camera/lib/CameraScreen'
import PhotoCheck from './components/PhotoCheck'

class Evaluation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      camera: undefined,
      uri: undefined
    }
  }

  async requestCameraPermission () {
    try {
      return await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA) === PermissionsAndroid.RESULTS.GRANTED &&
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE) === PermissionsAndroid.RESULTS.GRANTED
    } catch (err) {
      console.warn(err)
    }
  }

  async showCamera () {
    await this.requestCameraPermission()
    this.setState({ camera: CameraScreen })
  }

  onCapture (images) {
    this.setState({ uri: images[0].uri, camera: undefined})
  }

  onEvent () {
    this.setState({
      camera: undefined,
      uri: undefined
    })
  }

  render () {
    if (this.state.uri) {
      return <PhotoCheck uri={this.state.uri}
        onCancel={() => this.onEvent()}
        onSend={() => this.onEvent()}/>
    }
    if (this.state.camera) {
      const Camera = this.state.camera
      return <Camera 
        onCancel={() => this.setState({camera: undefined})}
        onCapture={(images) => this.onCapture(images)}/>
    }
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>
          What face did you do when you saw the job?
        </Text>
        <TouchableOpacity onPress={() => this.showCamera()}>
          <SimpleLineIcons name="camera" size={60} />
          <Text>click here...</Text>
        </TouchableOpacity>
        <Text style={styles.descText}>
          We want to see exactly what face you did, because we think the most fair and direct way of evaluating the game. Show it!
        </Text>
      </View>
    )
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
  headerText: {
    color: 'black',
    fontSize: 24
  },
  descText: {
    color: 'black',
    fontSize: 16
  }
}

export default Evaluation
