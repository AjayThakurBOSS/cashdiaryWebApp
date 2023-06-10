 // Packages:
import { combineReducers } from 'redux'


// Redux:
import authReducer from './authReducer'
import passwordReducer from './passwordReducer'
import lockerReducer from './lockerReducer'
import pinReducer from './pinReducer'
import realEstateReducer from './realEstateReducer'
import retailCashReducer from './retailCashReducer'
import cashDiaryReducer from './cashDiaryReducer'
import milagetrackingReducer from './milageTrackingReducer'
import vaultreceiptReducer from './vaultReceiptReducer'
import secretPinReducer from './secretPinReducer'
import eachTransactionReducer from './eachTransectionReducer'
import userSubscriptionReducer from './userSubscriptionReducer'
import vaultReceiptReducer from './vaultReceiptReducer'
import eachCashDairyReducer from './eachCashDairyReducer'
import eachCashDairyPaymentReducer from './cashDairyPaymentReducer'
import LocationReducer from './locationReducer'
import vaultBusinessReducer from './vaultBusinessReducer'

// Functions:
const reducers = combineReducers({
  auth: authReducer, 
  allPasswords: passwordReducer,
  allLockers : lockerReducer,
  allPins : pinReducer,
  AllRealStatesData : realEstateReducer,
  allRetailCashData : retailCashReducer,
  allCashDiaries: cashDiaryReducer,
  allMilageTrackings: milagetrackingReducer,
  allVaultReceipts : vaultreceiptReducer,
  allSecretPin : secretPinReducer,
  allTeansactions : eachTransactionReducer,
  userSubscriptionData : userSubscriptionReducer,
  allfilesDatas : vaultReceiptReducer,
  allEachCashDairyData : eachCashDairyReducer,
  allCashDairyPaymentById : eachCashDairyPaymentReducer,
  allLocationsData: LocationReducer,
  allClientsData: vaultBusinessReducer,
})


// Exports:
export default reducers
