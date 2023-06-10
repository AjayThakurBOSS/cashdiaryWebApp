import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";
import { updateSecretPinData } from "../../redux/actions/secretPinAction";

const EditSecretPin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { id } = useParams();
    const [updateSecretPin, setUpdateSecretPin] = useState([]);

    const secretPins = useSelector((state) => state.allSecretPin.secretPin.data)
    console.log("Secret Pins in Get Page," ,secretPins)

    useEffect(() => {
        if (id) {
          // console.log(id)
          const singlePin = secretPins.filter((ele) => {
            return ele.id == id;
          });
          setUpdateSecretPin(singlePin[0]);
        }
       
      },[id]);

      const handleUpdateSecretPin = (e) =>{
        e.preventDefault();
        dispatch(updateSecretPinData(id,updateSecretPin ))
      }

  return (
    <Wrapper> 
          <span style={{fontSize:'2.0rem', fontWeight:'700'}}>Secret Pin</span>

         <form className='passWordChangeForm' onSubmit={handleUpdateSecretPin}>
    <div className='mb-3'>
      <label className='form-label'>Secret Pin</label>
      <input
        type='text'
        className='form-control'
        id='secretPin'
        placeholder='Secret pin'
        value={ updateSecretPin && updateSecretPin.secretPin }
        onChange={ e => setUpdateSecretPin({...updateSecretPin, secretPin:  e.target.value}) }
      />
      {/* <spam style={{fontSize:'10px'}}>Secret pin must be alpha numeric & 8 character long. </spam> */}
    </div>

    <ActionButton type='submit' id='submit'>Update Secret Pin</ActionButton>
</form>

</Wrapper>
  )
}

export default EditSecretPin

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
`;

const ActionButton = styled.button`
background-color: #002758;
color: white;
border-radius: 3px;
margin-right: 1rem;
outline: none;
border: none;
`