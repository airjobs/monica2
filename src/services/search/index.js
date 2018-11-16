import axios from 'axios'
import config from '../API/config'

export const serachJobs = (cityName, page, size) => {
  return new Promise((resolve, reject) => {
    const query = `?Page=${page}&Size=${size}&CityName=${cityName}`
    axios.get(config.API_URL + query)
      .then(({data}) => resolve(data))
      .catch((e) => reject(e))
  })
}

export {axios}
