import React, { Component } from 'react';
import {
  Alert
} from 'react-native';
import { CameraKitCameraScreen } from '../';


export default class CameraScreen extends Component {


  onBottomButtonPressed(event) {
    switch (event.type) {
      case 'left':
        if (this.props.onCancel) this.props.onCancel()
        break;
      case 'capture':
        if (this.props.onCapture) this.props.onCapture(event.captureImages)
        break;
    }
  }

  render() {
    return (
      <CameraKitCameraScreen
        actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
        onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}
        flashImages={{
          on: require('./../images/flashOn.png'),
          off: require('./../images/flashOff.png'),
          auto: require('./../images/flashAuto.png')
        }}
        cameraFlipImage={require('./../images/cameraFlipIcon.png')}
        captureButtonImage={require('./../images/cameraButton.png')}
      />
    );
  }
}



