// Packages:
import axios from 'axios'


// Constants:
import { AUTH_HEADERS, LOCKER } from './endpoints'


// Exports:
export const getAllLocker = async () => {
  try {
    const response = await axios.get(LOCKER.ALL, { headers: { ...AUTH_HEADERS, 'Accept': '*/*' } })
    return { result: true, payload: response.data.data }
  } catch(e) {
    if (e.name === 'AxiosError') {
      const data = e.response.data
      if (data.errors) {
        const errorEntries = Object.entries(data.errors)[0]
        return { result: false, payload: `${ errorEntries[0] } - ${ errorEntries[1] }` }
      } else if (data.message) {
        return { result: false, payload: data.message }
      } else if (data.title) {
        return { result: false, payload: data.title }
      }
    }
    return { result: false, payload: e }
  }
}

export const addLocker = async ({
  name,
  lockerNumber,
  pin,
  lastUpdated,
  comments
}) => {
  try {
    await axios.post(LOCKER.ALL, {
      name,
      lockerNumber,
      pin,
      lastUpdated,
      comments
    }, { headers: { ...AUTH_HEADERS, 'Accept': '*/*' } })
    return { result: true, payload: null }
  } catch(e) {
    if (e.name === 'AxiosError') {
      const data = e.response.data
      if (data.errors) {
        const errorEntries = Object.entries(data.errors)[0]
        return { result: false, payload: `${ errorEntries[0] } - ${ errorEntries[1] }` }
      } else if (data.message) {
        return { result: false, payload: data.message }
      } else if (data.title) {
        return { result: false, payload: data.title }
      }
    }
    return { result: false, payload: e }
  }
}
