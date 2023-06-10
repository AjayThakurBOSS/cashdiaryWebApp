import axios from 'axios';
import React, { useEffect, useState } from 'react' 
import styled from 'styled-components'
import { AUTH_HEADERS } from '../../api/endpoints';
import GetRetailCash from './GetRetailCash';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRetailCashdata } from '../../redux/actions/retailCashAction';
import './retailCash.css'
import { Outlet, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { BASE } from '../../api/endpoints';

const RetailsCash = () => {
  const allRetailCashData = useSelector(
    (state) => state.allRetailCashData.retailsCases.data
  );
    console.log('Retail Cashes-', allRetailCashData)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchRetailCashdata())
    },[])

// states 
  const [emptyFieldError, setEmptyFieldError] = useState('')
    const [show, toggleShow] = useState(false);
    const [name, setName] = useState("");
    const [formVisible, setFormVisible] = useState(true);


    const handleSubmitRetailCash = (e) =>{
        e.preventDefault()
        if(name.length !== 0){
        axios.post(BASE + '/DailyCash', {
            name: name,
        },
        {headers: { ...AUTH_HEADERS} },
        )
        .then((res) => {
            // console.log(res.data)
            toggleShow(!show)
            dispatch(fetchRetailCashdata())
            swal({
              text: " Data added Successfully!..",
              icon: "success",
              button: "Close",
            })
        })
      } 
      else{
        setEmptyFieldError("Please fill the input field.")
      }
    }

 
 
  return (
    <Wrapper>
      {/* <HeaderDiv> */}
      <TopHeaderDiv>
        <span style={{fontSize:'2.0rem',fontWeight:'700'}}>Retail Cash</span>
      <AddnewButton onClick={() => [toggleShow(!show), setEmptyFieldError('')]}>
        {" "}
        {show ? " - " : " Add business "}{" "}
      </AddnewButton>
      </TopHeaderDiv>
         { show && (
        <div>
          <form className="RetailCashForm" onSubmit={handleSubmitRetailCash} >
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="text"
                name="text"
                onChange={(e) =>[ setName(e.target.value),setEmptyFieldError(' ')]}
              ></input>
            </div>
                    
            <div style={{width:"100%", fontSize:'16px', color:'red'}}> {emptyFieldError}</div>
            <button type="submit" name="submit" id="submitForm"  >
              {" "}
              Save
            </button>
          </form>
        </div>
      )}
    {allRetailCashData && allRetailCashData.length !== 0 ? <GetRetailCash/>  : <div style={{fontSize:'20px', margin:"20px 0 0 0"}}>Add Retail Cash by clicking on 'Add business' sign.</div>}
    
     
 
    </Wrapper>
  )
}

export default RetailsCash

const AddnewButton = styled.button`
  border: none;
  background-color: #002857;
  color: white;
  border-radius: 3px;
  margin-bottom: 6px;
  float: right;
  padding: 2px 1rem;
  width: auto;
  min-width: 50px;
  height: 50px;
  font-size: 20px;
`;
const Wrapper = styled.div`
  position: absolute;
  left: 20vw;
  top: 3.75rem;
  width: 80vw;
  /* height: 100vh; */
  height:calc(100vh - 3.75rem) ;
  /* height: calc(100vh - 3.75rem); */
  padding: 1.5rem;
  background-color: #f5f3f3;
  /* margin-top: 3rem; */
  overflow: auto;
  float: left;

  @media screen and (min-width: 768px) and (max-width: 992px) {
    font-size: 1rem ;
    font-weight: 400; 
    width: 100vw;
    left: 0;
  }

  @media screen and (min-width: 576px) and (max-width: 768px) {
    font-size: 16px ;
    font-weight: 400; 
    width: 100vw;
    left: 0;
  }
  @media screen and (min-width: 200px) and (max-width: 576px) {
    font-size: 14px ;
    font-weight: 400; 
    width: 100vw;
    left: 0;
  }
`

const HeaderDiv = styled.div`
  margin-bottom: 10px;
`

const RetailCashDiv= styled.div`
  display: flex;
  flex-direction: row;
`

const AllRetailColl = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 100%;
  flex-wrap: wrap;
`
const EachTransactionContainer = styled.div`
  width: 700px;
  height: auto;

`

const TopHeaderDiv = styled.div`
  position: sticky;
  top: -1.8rem;
  background-color: white;
  z-index: 9;
  padding: 4px 5px;
`