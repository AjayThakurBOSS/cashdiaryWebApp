// Packages:
import axios from 'axios'


// Constants:
import { AUTH_HEADERS, CASH_TRACKING } from './endpoints'


// Exports:
export const getAllCashTracking = async () => {
  try {
    const response = await axios.get(CASH_TRACKING.ALL, { headers: { ...AUTH_HEADERS, 'Accept': '*/*' } })
    return { result: true, payload: response }
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
