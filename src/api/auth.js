// Packages:
import axios from 'axios'


// Constants:
import { LOCAL_STORAGE_KEYS } from '../constants/localStorage'
import { AUTHENTICATE, HEADERS } from './endpoints'
import { useDispatch } from 'react-redux'
import { fetchCashDiaryData } from '../redux/actions/cashDiaryAction'
import { fetchEachTransactionData } from '../redux/actions/eachTransactionAction'
import { getAllMileageTracking } from './mileageTracking'
import { fetchMilageTrackingData } from '../redux/actions/milageTrackingAction'
import { fetchRealEstateData } from '../redux/actions/realEstateAction'
import { fetchLockerData } from '../redux/actions/lockerAction'
import { fetchUserSubscriptionData } from '../redux/actions/userSubscriptionAction'


// Exports:
export const register = async ({ username, email, phoneNumber, password }) => {
  try {
    if (!username || !email || !phoneNumber || !password) return { result: false, payload: 'Data missing' }
    await axios.post(AUTHENTICATE.REGISTER, {
      username:email,
      email,
      phoneNumber,
      password
    }, { headers: { ...HEADERS, 'Accept': '*/*' } })
  //  .then(() => {
  //    login({username:email, password})
  //    console.log('login call in register')
  //  })
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


// Login
export const login = async ({ username, password }, action) => {
  try {
    if (!username || !password) return { result: false, payload: 'Email or password missing' }
     const response = await axios.post(AUTHENTICATE.LOGIN, { username, password, }, { headers: { ...HEADERS } })
    console.log("Login Response on login:-", response.data.token)
    localStorage.setItem(LOCAL_STORAGE_KEYS.USERNAME, username) 
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, response.data.token)
    localStorage.setItem(LOCAL_STORAGE_KEYS.EXPIRATION, response.data.expiration)
    action(response.data)
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
        return { result: false, payload: data.title === 'Unauthorized' ? 'Invalid credentials!' : data.title }
      }
    }
    return { result: false, payload: e }
  }
} 

// Logout
export const logout = async (action) => { 
 try {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USERNAME)
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN)
    localStorage.removeItem(LOCAL_STORAGE_KEYS.EXPIRATION)
    action()
    return { result: true, payload: null }
  } catch(e) {
    return { result: false, payload: e }
  }
}

