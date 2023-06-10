import { Typography } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import { AUTH_HEADERS } from '../../api/endpoints';
import  './style/profile.css'
import FetchSecretPin from './FetchSecretPin';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchSecretPinData } from '../../redux/actions/secretPinAction';
import swal from 'sweetalert';
import { BASE } from '../../api/endpoints';
import { useNavigate } from 'react-router-dom';


const SecretPin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const AllsecretPins = useSelector((state) => state.allSecretPin.secretPin.data)
  console.log("Secret Pin:-", AllsecretPins )

  useEffect(() => {
    dispatch(fetchSecretPinData());
  },[])

const [emptyfieldError, setEmptyfieldError] = useState()
  const [secretPin, setSeretPin] = useState('')
  const [show, toggleShow] = useState(false)

  const handleSecretPin =(e) => {
  e.preventDefault();
  AllsecretPins && AllsecretPins.length !== 0 ? swal('You can create secret pin only once.') : sssss() 
  }

    const sssss =() => {
    if(secretPin.length !== 0){
      axios.post(BASE + "/UserProfile",
      {
        secretPin: secretPin,
        // userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6" //yeh pass nhi karna hai
      },
      { headers: { ...AUTH_HEADERS } }
      )
      .then((res) => {
        toggleShow(!show);
        setSeretPin('')
        dispatch(fetchSecretPinData())
        navigate('/profile')
        swal("Secret Pin Created Successfully.")
      })
    }else {
      setEmptyfieldError('Please fill the input field. Secret pin must be numeric 6 to 8 digits long.')
    }
    }


  return (
   <>
   {
    AllsecretPins && AllsecretPins.length === 0 ? 
     <Wrapper>  
     <span style={{fontSize:'2.0rem', fontWeight:'700'}}>Secret Pin</span>
     <form className='passWordChangeForm' onSubmit={handleSecretPin}>
       <div className='mb-3'>
         <label className='form-label'>Secret Pin</label>
         <input
           type='text'
           className='form-control'
           id='secretPin'
           placeholder='Secret pin'
           onChange={ (e) => setSeretPin(e.target.value) }
         />
       </div>
       <spam style={{fontSize:'10px', width:'100%', color:'red'}}>{emptyfieldError} </spam>
       <ActionButton type='submit' id='submit'>Create Secret Pin</ActionButton>
       <ActionButton1 type='reset' onClick={() => {
            navigate(-1)
          }} > Back </ActionButton1>
     </form>

     {/* <FetchSecretPin/> */}
    </Wrapper>  : " "
   }
   </>
  )
}

export default SecretPin;


const Wrapper = styled.div`
  position: absolute;
  left: 22.7vw;
  top: 0;
  width: 70%;
  /* height: auto; */
  height: calc(100vh - 3.75rem);
  /* height: calc(100vh - 3.75rem); */
  padding: 2.5rem;
  background-color: #f5f3f3;
  /* margin-top: 3rem; */
  overflow: auto;
  float: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: white;

  @media screen and (min-width: 768px) and (max-width: 992px) {
    font-size: 1rem ;
    font-weight: 400; 
    width: 100vw;
    left: 0;
  }

  @media screen and (min-width: 576px) and (max-width: 768px) {
    font-size: 10px ;
    font-weight: 400; 
    width: 100vw;
    left: 0;
  }
  @media screen and (min-width: 200px) and (max-width: 576px) {
    font-size: 10px ;
    font-weight: 400; 
    width: 100vw;
    left: 0;
  }
`;

const ActionButton = styled.button`
background-color: #002758;
color: white;
border-radius: 3px;
margin-right: 1rem;
outline: none;
border: none;
`

const ActionButton1 = styled.button`
background-color: #002758;
color: white;
border-radius: 3px;
margin-right: 1rem;
outline: none;
border: none;
`