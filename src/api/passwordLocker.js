// Packages:
import axios from 'axios'


// Constants:
import { AUTH_HEADERS, PASSWORD_LOCKER } from './endpoints'


// Exports:
export const getAllPasswordLocker = async () => {
  try {
    const response = await axios.get(PASSWORD_LOCKER.ALL, { headers: { ...AUTH_HEADERS, 'Accept': '*/*' } })
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

export const addPasswordLocker = async ({
  id,
  name,
  url,
  loginId,
  password,
  lastUpdated
}) => {
  try {
    await axios.post(PASSWORD_LOCKER.ALL, {
      id,
      name,
      url,
      loginId,
      password,
      lastUpdated
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
