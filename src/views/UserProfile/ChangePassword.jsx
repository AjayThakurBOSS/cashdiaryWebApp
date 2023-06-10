import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import  './style/profile.css'
import axios from 'axios';
import { AUTH_HEADERS } from '../../api/endpoints';
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { BASE } from '../../api/endpoints';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {

  const navigate = useNavigate()

    const [errMsg, setErrMsg] = useState();
    const [errMsg1, setErrMsg1] = useState();
    const [oldPass, setOldPass] = useState();
    const [newPass, setNewPass] = useState();
    const [confirmPass, setConfirmPass] = useState();

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);

    const toggleShowPassword = () => setShowPassword(!showPassword);
    const toggleShowPassword1 = () => setShowPassword1(!showPassword1);

    const handleChangePassword = (e) => {
      e.preventDefault();
        if(oldPass === newPass){
          setErrMsg('New Password cannot be old password.')
        }else if (newPass !== confirmPass ){
          setErrMsg1('Password and Confirm Password is not same.')
        } else if(oldPass !== newPass && newPass === confirmPass){
          axios.post(BASE + `/1/Authenticate/changepassword?password=${newPass}`, 
          {
            password: newPass,
          },
          { headers: { ...AUTH_HEADERS } }
          )
          .then((res) => {
            swal('Password Changed Successfully.')
            setOldPass('')
            setNewPass('')
            setConfirmPass('')
            navigate("/profile")
          })
         }
        }

  return (
    <Wrapper>
     <span style={{fontSize:'2.0rem', fontWeight:'700'}}>Change Password?</span>

        <form className='passWordChangeForm' onSubmit={handleChangePassword } >
          <div className='mb-3'>
            <label className='form-label'>Old Password</label>
            <InputDiv>
            <InputField
              type={showPassword1 ? 'text' : 'password'}
              className='form-control'
              id='oldPass'
              placeholder='Old Password'
              onChange={ e => {
                setOldPass(e.target.value)
                setErrMsg('')
                setErrMsg1('')
              } }
            />
             <HideShowspan onClick={toggleShowPassword1}> 
              {showPassword1 ? <AiOutlineEye/>  : <AiOutlineEyeInvisible/> }
            </HideShowspan>
              </InputDiv>
          </div>


          <div className='mb-3'>
            <label className='form-label'>New Password</label>
            <InputDiv>
            <InputField
              type={showPassword ? 'text' : 'password'}
              className='form-control'
              id='newPass'
              placeholder='New Password'
              onChange={ e => {
                setNewPass(e.target.value)
                setErrMsg('')
                setErrMsg1('')
              } }
            />
             <HideShowspan1 onClick={toggleShowPassword}> 
              {showPassword ? <AiOutlineEye/>  : <AiOutlineEyeInvisible/>}
            </HideShowspan1>
              </InputDiv>
              <span style={{color:'red'}}>{errMsg}</span>
          </div>
          


          <div className='mb-3'>
            <label className='form-label'>Confirm New Password</label>
              <InputField
              type={showPassword ? 'text' : 'password'}
              className='form-control'
              id='confirmName'
              placeholder='Confirm New Password'
              onChange={ e => {
                setConfirmPass(e.target.value)
                setErrMsg('')
                setErrMsg1('')
              }
              }
            />
            <span style={{color:'red'}}>{errMsg1}</span>
          </div>
          

         <div>
         <ActionButton type='submit' id='submit' >Change Password</ActionButton>
          <ActionButton1 type='reset' onClick={() => {
            navigate(-1)
          }} > Back </ActionButton1>
        </div> 

         
        </form>

    </Wrapper>
  )
}


export default ChangePassword;

const Wrapper = styled.div`
  position: absolute;
  left: 22.7vw;
  top: 0;
  width: 70%;
  /* height: auto; */
  height: calc(100vh);
  /* height: calc(100vh - 3.75rem); */
  padding: 2.5rem;
  /* background-color: #f5f3f3; */
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

const InputField = styled.input`
  outline: none;
  border: none;
 
`

const InputDiv = styled.div`
  /* border: 1px solid #cccccc; */
  display: flex;
  flex-direction: row;
  position: relative;
`
const HideShowspan = styled.span`
  position: absolute;
  border: none;
  right: 17%;
  top: 3%;
  background-color: white;
`
const HideShowspan1 = styled.span`
  position: absolute;
  border: none;
  right: 17%;
  top: 3%;
  background-color: white;
`