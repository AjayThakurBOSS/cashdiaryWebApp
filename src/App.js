// Packages:
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import hasTokenExpired from './utils/hasTokenExpired'
import { logout } from './api/auth'
import { useNavigate } from 'react-router-dom'

// Constants:
import ROUTES from './routes'
import { LOCAL_STORAGE_KEYS } from './constants/localStorage'


// Components:
import ErrorBoundary from './utils/ErrorBoundary'
import Topbar from './components/global/Topbar'
import Sidebar from './components/global/Sidebar'
import PrivateRoute from './utils/PrivateRoute'
import Login from './views/Login'
import Register from './views/Register'
import Home from './views/Home'
import CashDiary from './views/CashDiary'
import Passwords from './views/Passwords'
import PinList from './views/PinList'
import MileageTracking from './views/MileageTracking'
import Lockers from './views/Lockers'
import RealEstate from './views/RealEstate'

import { _login, _logout } from './redux/actions/auth'
import LockerForm from './views/Lockers/LockerForm'
import ReadLocker from './views/Lockers/ReadLocker'
import UpdateLocker from './views/Lockers/UpdateLocker'
import CreatePassword from './views/Passwords/CreatePassword'
import ReadPassword from './views/Passwords/ReadPassword'
import UpdatePassword from './views/Passwords/UpdatePassword'
import ReadPin from './views/PinList/ReadPin'
import RetailsCash from './views/RetailCash'
import UpdateRealEstate from './views/RealEstate/UpdateRealEstate'
import UpdatePin from './views/PinList/UpdatePin'
import ChangePassword from './views/UserProfile/ChangePassword'
// import ViewProfile from './views/UserProfile/ViewProfile'
import ForgetPassword from './views/UserProfile/ForgetPassword'
import SecretPin from './views/UserProfile/SecretPin'
import VaultReceipt from './views/VaultReceipt'
import EditSecretPin from './views/UserProfile/EditSecretPin'
import GetEachRetailCash from './views/RetailCash/GetEachRetailCash'
import UserProfile from './views/UserProfile'
import EachCashDairies from './views/CashDiary/EachCashDairies'
import CashDairyPayment from './views/CashDiary/CashDairyPayment'
import MyLocations from './views/MyLocations'
import ThankYouForRegistering from './views/Register/ThankYouForRegistering'
import OpenAndDownload from './views/VaultReceipt/OpenAndDownload'
import GetFiles from './views/VaultReceipt/GetFiles'
import EachBusiness from './views/VaultReceipt/EachBusiness'
import UpdateMilage from './views/MileageTracking/UpdateMilage'


// Styles:
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`
// Functions:
const App = () => {
  // Constants:
  const dispatch = useDispatch()


  // State:
  const authToken = useSelector(state => state.auth.token)
  const authExpiraton = useSelector( state => state.auth.expiration)
  const [ auth, setAuth ] = useState(false)
  
  // Effects:
  useEffect(() => {
    const LS = {
      username: localStorage.getItem(LOCAL_STORAGE_KEYS.USERNAME),
      token: localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN),
      expiration: localStorage.getItem(LOCAL_STORAGE_KEYS.EXPIRATION)
    }
    if (LS.expiration && !hasTokenExpired(LS.expiration) && LS.token) dispatch(_login(LS))
    if (LS.expiration && hasTokenExpired(LS.expiration)) {
      logout(dispatch(_logout()))
      window.location.href = "/login";
     }
    if (authToken !== undefined && authToken !== '' ) setAuth(true)
    else setAuth(false)
  }, [ authToken, authExpiraton ])

  // Return:
  return (
    <BrowserRouter>  
      <ErrorBoundary>
        <Wrapper>
          <Topbar isAuth={ !!auth } />
          { !!auth && <Sidebar /> }
          <Routes>
            <Route element={ <PrivateRoute /> }>
              <Route path={ ROUTES.INDEX } element={ <Login /> } />
              <Route path={ ROUTES.HOME } element={ <Home /> }  />    
              <Route path={ ROUTES.CASH_DIARY } element={ <CashDiary /> } >
                <Route path='eachdairy/:id' element={ <EachCashDairies/>  }/>
                <Route path = 'loanPayment/:id' element={ <CashDairyPayment/> }/>
              </Route>
              <Route path={ ROUTES.RETAILS_CASH } element={ <RetailsCash /> }> 
                <Route path='transaction/:id' element={ <GetEachRetailCash/> }/>
              </Route>
              <Route path={ ROUTES.PASSWORDS } element={ <Passwords /> } > 
                <Route path='create' element= { <CreatePassword/>}> 
                </Route>
                <Route path='read' element= { <ReadPassword/>}/>
                <Route path='update/:id' element={<UpdatePassword/>}/>
              </Route>
              <Route path={ ROUTES.PIN_LIST } element={ <PinList /> }> 
                <Route path='read' element ={<ReadPin />  }/>
                <Route path='update/:id' element ={<UpdatePin/>}/>
              </Route>
              <Route path={ ROUTES.MILEAGE_TRACKING } element={ <MileageTracking /> }>
                  <Route path='updateMilage/:id' element= { <UpdateMilage/> }/>
              </Route>

              <Route path={ ROUTES.LOCKERS } element={ <Lockers /> } >
                <Route path='update/:id' element ={<UpdateLocker/>}/>
              </Route>
              <Route path={ ROUTES.REAL_ESTATE } element={ <RealEstate /> }> 
                <Route path='update/:id'  element={<UpdateRealEstate/>}/> 
              </Route>
            </Route>
            <Route path={ROUTES.VIEW_PROFILE} element={<UserProfile/>}>
              <Route path='update-password' element={<ChangePassword/>}/>
              <Route path='secret-pin' element={<SecretPin/>}/>
              <Route path='update-secretpin/:id' element={ <EditSecretPin/> }/>
            </Route>
            <Route path={ROUTES.FORGET_PASSWORD} element={<ForgetPassword/>}/>
            <Route path={ROUTES.MY_LOCATIONS} element={ <MyLocations/> } />
            <Route path={ROUTES.VAULT_RECEIPT} element={<VaultReceipt/>}>  </Route>
              <Route path='business/:id/:name' element = { <EachBusiness/> }/>
          
            <Route path={ ROUTES.THANKYOUFORREGISTRATION } element={ <ThankYouForRegistering /> } />
            <Route path={ ROUTES.LOGIN } exact element={ <Login /> } />
            <Route path={ ROUTES.REGISTER } element={ <Register /> } />
            <Route path= {ROUTES.OPENDOWNLOADIMAGE} element={<OpenAndDownload/>} />
          </Routes>
        </Wrapper>
      </ErrorBoundary>
    </BrowserRouter>
  )
}


// Exports:
export default App
