// Constants:
import { LOCAL_STORAGE_KEYS } from '../constants/localStorage'


// Exports:
export const HEADERS = {
  'X-CASHDAIRY-HEADER': 'cashdairy',
  'x-api-version': '1.0',
  'Content-Type': 'application/json',
  
}

export const AUTH_HEADERS = {
  ...HEADERS,
  "Authorization": `Bearer ${ localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN) }`
}

export const BASE = 'http://103.150.136.244/api'

export const AUTHENTICATE = {
  LOGIN: BASE + '/1/Authenticate/login',
  REGISTER: BASE + '/1/Authenticate/register',
  CHANGE_PASSWORD: BASE + '/1/Authenticate/changepassword',
  GET_NEW_TOKEN: BASE + '/1/Authenticate/getnewtoken',
  RESET_PASSWORD: BASE + '/1/Authenticate/ResetPassword'
}

export const CASH_TRACKING = {
  ALL: BASE + '/CashTracking',
  ID: id => BASE + `/CashTracking/${ id } `
}

export const DAILY_CASH_TRANSACTIONS = {
  ALL: BASE + '/DailyCashTransactions',
  ID: id => BASE + `/DailyCashTransactions/${ id }`,
  DAILY_CASH_ID: (dailyCashID, id) => BASE + `/DailyCashTransactions/${ dailyCashID }/${ id }`
}

export const LOCKER = {
  ALL: BASE + '/Locker',
  ID: id => BASE + `/Locker/${ id }`
}

export const MILEAGE_TRACKING = {
  ALL: BASE + '/MileageTracking',
  RANGE: (fromDate, toDate) => BASE + `/MileageTracking/${ fromDate }/${ toDate }`,
  ID: id => BASE + `/MileageTracking/${ id }`,
  SEND_EMAIL: BASE + '/MileageTracking/SendEmail',
}

export const PASSWORD_LOCKER = {
  ALL: BASE + '/PasswordLocker',
  ID: id => BASE + `/PasswordLocker/${ id }`
}

export const PIN = {
  ALL: BASE + '/Pin',
  ID: id => BASE + `/Pin/${ id }`
}

export const REAL_ESTATE = {
  ALL: BASE + '/RealEstate',
  ID: id => BASE + `/RealEstate/${ id }`
}

export const USER_SUBSCRIPTION = {
  ALL: BASE + '/UserSubscription',
  ID: id => BASE + `/UserSubscription/${ id }`
}
