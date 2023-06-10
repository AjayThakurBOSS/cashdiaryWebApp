import React from 'react'
import * as Yup from 'yup';
import TextError from './TextError';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import "./lockerForm.css"
import axios from 'axios';
import { useState } from 'react';
import { AUTH_HEADERS } from '../../api/endpoints';
import { LOCKER } from '../../api/endpoints'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';





const postURl = "https://103.150.136.244/api/Locker";



const LockerForm = (props) => {

  const [name, setName] = useState('');
  const [lackerNumber, setLockerNumber] = useState("");
  const [pin, setPin] = useState("");
  const [comments, setComments] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit =  (e) =>{
    e.preventDefault();
    console.log("Button Clicked")
    axios.post("http://103.150.136.244/api/Locker", {
      name:name,
      lockerNumber:lackerNumber,
      pin: pin,
     lastUpdated: (new Date).toISOString(),
     comments: comments,
       },
       { headers: { ...AUTH_HEADERS} }
       )
       .then(() => {
        navigate("read");
       })
  } 

  console.log("Auth Heeader", AUTH_HEADERS)

  return (
   <>

    <form className='lockerForm'>
     <div className='formfields'>
        <div className='form-control'>
            <label htmlFor='name'>Locker Name</label>
            <input type='text' id='name' name='name' onChange={(e) => setName(e.target.value)} ></input>
        </div >

        <div className='form-control'>
            <label htmlFor='lockerNumber'>lockerNumber</label>
            <input type="text"  id='lockerNumber' name='lockerNumber' onChange={(e) => setLockerNumber(e.target.value)}></input>
        </div>

        <div className='form-control'>
            <label htmlFor='pin'>Pin</label>
            <input type="text"  id='pin' name='pin' onChange={(e) => setPin(e.target.value)} ></input>
        </div>

        <div className='form-control'>
            <label htmlFor='lastUpdarted'>Last Updated </label>
            <input type="date"  id='lastUpdarted' name='lastUpdarted' ></input>
        </div>

        <div className='form-control'>
            <label htmlFor='comments'>Comments</label>
            <input type="text"  id='comments' name='comments' onChange={(e) => setComments(e.target.value)} ></input>
        </div>

        <div>
        <button type='submit' className='submitButton' onClick={handleSubmit}>Submit</button> 
        </div>
    </div>
        
  </form>

  </>
 
  )
}

export default LockerForm