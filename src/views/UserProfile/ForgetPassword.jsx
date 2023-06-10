import React from 'react'
import styled from 'styled-components';
import { FLEX } from '../../styles/snippets';
import { useState } from 'react';
import swal from 'sweetalert';
import { Typography } from '@mui/material';
import axios from 'axios';
import { AUTH_HEADERS } from '../../api/endpoints';
import { BASE } from '../../api/endpoints';

const ForgetPassword = () => {
    const [ isLoading, setIsLoading ] = useState(false)
    const [ errorText, setErrorText ] = useState('')
    const [email, setEmail] = useState('')
    
    const handlePasswordReset= (e) => {
      e.preventDefault();
      axios.get(BASE + `/1/Authenticate/ResetPassword?email=${email}`,
      { headers: { ...AUTH_HEADERS } }
      ).then((response) => {
        setEmail('')
        console.log(response)
        swal('Password Reset link has been sent on your registered  Email.')
        
      })
    }

  return (
    <Wrapper>
       
        <LoginContainer>
        <Typography sx={{ typography: { md: 'h4', xs: 'h4' },fontWeight: 'bold'  }} className='text-center mb-4'>
          Reset your Password!
        </Typography>
            <form onSubmit={handlePasswordReset} >
            <div className='mb-3'>
            <label htmlFor='email' className='form-label'> Email </label>
            <input
              type='text'
              className='form-control'
              id='email'
              placeholder='Enter your registered Email .'
              name='email'
              onChange={ e => setEmail(e.target.value) }
            />
          </div>
          { errorText.length > 0 && <ErrorText>Error: { errorText }</ErrorText> }
          <div className='d-grid gap-2'>
            <button className='btn btn-outline-primary' type='submit'
              style={{
                borderRadius:'0',
                filter: isLoading ? 'grayscale(1) blur(1px)' : '',
                cursor: isLoading ? 'default' : 'pointer'
              }}
              
            >
              Reset Password
            </button>
          </div>
        </form>
        </LoginContainer>

    </Wrapper>
  )
}

export default ForgetPassword;


// style


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
  min-width: 380px;
  background-color: white;
  padding: 2%;
  box-shadow: 0px 1px 1px 1px rgba(0,0,0,.4);
  border-radius: 3px;
`

const ErrorText = styled.div`
  ${ FLEX }
  padding-bottom: 0.5rem;
  font-weight: 600;
  color: #841B1B;
`