import axios from 'axios'
import RNFS from 'react-native-fs'

import config from '../../config'

export const faceScan = async (file) => {
    const base64 = await RNFS.readFile(file, 'base64')
    const request = require('./vision_request.json')
    request.requests[0].image.content = base64

    const url = `${config.GOOGLE_VISION_URL}?key=${config.GOOGLE_API_KEY}`
    const response = await axios.post(url, request)
    
    return  await faceProcess(response.data.responses[0])
}

const faceProcess = async (faceResult) => {
    if (faceResult.faceAnnotations === undefined)
        return 'We could not detect your beautiful face in this pic. Please, try again with, maybe, a better illumination =)'

    if (faceResult.faceAnnotations[0].joyLikelihood === 'VERY_LIKELY')
        return 'We are so happy that you enjoy our services.'
    
    return "We are very sorry to hear that. But don't worry because you will be compensated. The next round will be on us."
}