// Packages:
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate, Link, unstable_HistoryRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@mui/material'
import { login } from '../../api/auth'
import hasTokenExpired from '../../utils/hasTokenExpired'
import './login.css'

// Constants:
import { LOCAL_STORAGE_KEYS } from '../../constants/localStorage'
import ROUTES from '../../routes'

// Redux:
import { _login } from '../../redux/actions/auth' 

// Styles:
import { FLEX } from '../../styles/snippets'
import { fetchCashDiaryData } from '../../redux/actions/cashDiaryAction'
import { fetchLockerData } from '../../redux/actions/lockerAction'
import { fetchMilageTrackingData } from '../../redux/actions/milageTrackingAction'
import { fetchRealEstateData } from '../../redux/actions/realEstateAction'
import { fetchUserSubscriptionData } from '../../redux/actions/userSubscriptionAction'
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";



// Functions:
const Login = () => {
  

const [showPassword, setShowPassword] = useState(false);
const toggleShowPassword = () => setShowPassword(!showPassword);
// const [isHidden, setIsHidden] = useState(true);
  // Constants:
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // State:
  const [ isLoading, setIsLoading ] = useState(false)
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ errorText, setErrorText ] = useState('')

  

  // Functions:
  const validate = () => {
    setErrorText('')
    if (username.length === 0) { setErrorText('Invalid email'); return false }
    if (password.length === 0) { setErrorText('Invalid password'); return false }
    return true
  }
  const refresh = () => window.location.reload(true)

  const handleLogin = async () => {
    if (isLoading) return
    setIsLoading(true)
    const validationResult = validate()
    if (!validationResult) { setIsLoading(false); return }
    const { result, payload } = await login({ username, password }, data => dispatch(_login(data)))
    setIsLoading(false)
    if (!result) setErrorText('Invalid credentials.') 
    else{
       navigate(ROUTES.INDEX)
       window.location.href = "/"
      //  refresh();
      }
  }

  // Effects:
  useEffect(() => {
    if (
      localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN) &&
      !hasTokenExpired(localStorage.getItem(LOCAL_STORAGE_KEYS.EXPIRATION))
    ) {
      navigate(ROUTES.HOME)
    }
  }, [ navigate ])


  // Return:
  return (
    <Wrapper>
     
      <LoginContainer>
        <Typography sx={{ typography: { md: 'h4', xs: 'h4' },fontWeight: 'bold'  }} className='text-center mb-4'>
         Log In
        </Typography>
        <FormField onSubmit={
          e => {
            e.preventDefault()
            handleLogin()
          }
        }>
          <div className='mb-3' style={{width:'300px' }}  >
            <label className='form-label'>Email</label>
            <input
            style={{border:'1px solid #002857', width:'275px', marginLeft:'0'}}
              type='text'
              className='form-control'
              id='username'
              placeholder='Email'
              value={ username }
              onChange={ e => setUsername(e.currentTarget.value) }
            />
          </div>

          <div className='mb-3' style={{position:'relative', width:'300px', height:'100px' }}>
            <label className='form-label'>Password</label>
            <input
             style={{border:'1px solid #002857', borderRadius:'0', width:'280px', height:'33.33px',  marginLeft:'0'}}
             type={showPassword ? 'text' : 'password'}
              className='form-control'
              id='password'
              placeholder='Password'
              value= {password}
              onChange={ e => setPassword(e.currentTarget.value) }
            />
               {/* {isHidden ? password.replace(/./g, '*') : password}  */}
             <HideShowButton onClick={toggleShowPassword}> 
              {showPassword ? <AiOutlineEye/>:  <AiOutlineEyeInvisible/>     }
            </HideShowButton>
            
            <Typography variant='body2' >
            <Link to={ ROUTES.FORGET_PASSWORD } style={{marginLeft:'0rem'}} >Forgot Password?</Link>
          </Typography>
          </div>
          { errorText.length > 0 && <ErrorText>Error: { errorText }</ErrorText> }
          <div className='d-grid gap-2' style={{width:'300px', marginLeft:'0'}}>
            <button className='btn ' type='submit'
              style={{
                marginLeft:'0',
                width:"280px",
                borderRadius:'0',
                filter: isLoading ? 'grayscale(1) blur(1px)' : '',
                cursor: isLoading ? 'default' : 'pointer'
              }}
            >
              Login
            </button>
          </div>
          <br/>
          <Typography variant='body2' className='text-center'>
            Don't have an account? <Link to={ ROUTES.REGISTER }>Sign Up</Link>
          </Typography>
        </FormField>
      </LoginContainer>
    </Wrapper>
  )
}


// Exports:
export default Login

const HideShowButton = styled.span`
  position: absolute;
  border: none;
  right: 9%;
  top: 33%;
  background-color: white;
`


const Wrapper = styled.div`
  ${ FLEX }
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: calc(100vh - 3.75rem);
  padding: 5rem 0rem;
  background-color: #f0f5f7;


`

const LoginContainer = styled.div`
  width: 40%;
  min-width: 350px;
  background-color: white;
  padding: 2%;
  box-shadow: 0px 1px 1px 1px rgba(0,0,0,.4);
  border-radius: 3px;

  @media only screen and (max-width: 381px)  {
    width: 90%;
    margin:  1rem;
  }

`

const ErrorText = styled.div`
  ${ FLEX }
  padding-bottom: 0.5rem;
  font-weight: 600;
  color: #841B1B;
`
const FormField = styled.form`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`