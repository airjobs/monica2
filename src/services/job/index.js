import axios from 'axios'
import config from '../API/config'

export const requestJobData = (jobId) => {
  return new Promise((resolve, reject) => {
    axios.get(config.API_URL + `/${jobId}`)
      .then(({data}) => {
        resolve(data)
      })
      .catch((e) => reject(e))
  })
}

export const favoriteJob = (jobId, userId) => {
  return new Promise((resolve, reject) => {
    axios.get(config.API_URL + `/${jobId}/favorite?userId=${userId}`)
      .then(({data}) => {
        resolve(data)
      })
      .catch((e) => reject(e))
  })
}

export {
  axios
}