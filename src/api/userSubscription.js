// Packages:
import axios from 'axios'


// Constants:
import { AUTH_HEADERS, USER_SUBSCRIPTION } from './endpoints'


// Exports:
export const getAllUserSubscription = async () => {
  try {
    const response = await axios.get(USER_SUBSCRIPTION.ALL, { headers: { ...AUTH_HEADERS, 'Accept': '*/*' } })
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

export const addUserSubscription = async ({
  startDate,
  endDate,
  userId
}) => {
  try {
    await axios.post(USER_SUBSCRIPTION.ALL, {
      startDate,
      endDate,
      userId
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
