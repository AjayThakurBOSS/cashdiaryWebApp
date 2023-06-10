// Packages:
import { CheckBox } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import './CashDiary.css'

// Components:
import AuthTopbar from "../../components/global/AuthTopbar";
import Collapsible from "../../components/global/Collapsible";
import Table from "../../components/global/Table";
import { AUTH_HEADERS } from "../../api/endpoints";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCashDiaryData } from "../../redux/actions/cashDiaryAction";
import ReadCashDiary from "./ReadCashDiary";
import { Checkbox } from "@mui/material";
import colors from "../../styles/colors";
import swal from "sweetalert";
import { BASE } from "../../api/endpoints";


// Functions:
const CashDiary = () => {
  // states 
  const [emptyFieldError, setEmptyFieldError] = useState('')
  const [show, toggleShow] = useState(false);
  const [name, setName] = useState("");
  const [formVisible, setFormVisible] = useState(true);
  const navigate = useNavigate();
  // const cashDiaries = useSelector((state) => state)

  const dispatch = useDispatch();

  const cashDiaries = useSelector((state) => state.allCashDiaries.cashDiaries.data)
    console.log('Cash Diaries- ',cashDiaries);

  useEffect(() => {
    dispatch(fetchCashDiaryData())
  },[])


const handleSubmitCashDiary =(e) => {
  e.preventDefault();
  if(name.length !== 0 ){
  axios.post(BASE + '/CashTracking', {
  name: name,
},
{headers: { ...AUTH_HEADERS} },
  )
  .then((res)=>{
    toggleShow(!show)
    dispatch(fetchCashDiaryData())
    swal({
      text: " Data added Successfully!..",
      icon: "success",
      button: "Close",
    })
  })
}else {
  setEmptyFieldError("Please fill the input field.")
}
}
const handleEmailSend =() => {
}

  // Return:
  return (
    <Wrapper>
     <TopHeaderDiv>
      <span style={{fontSize:'2.0rem', fontWeight: '700', }} >Lender/Borrower</span>
      <AddnewButton onClick={() => [toggleShow(!show),setEmptyFieldError('')]}>
        {" "}
        {show ? " - " : " + "}{" "}
      </AddnewButton>
     </TopHeaderDiv>
      { show && (
        <div>
          <form className="cashDiaryForm"  >
            <div>
              <label htmlFor="name">Lender/Borrower Name</label>
              <input
                type="text"
                id="text"
                name="text"
                onChange={(e) => [setName(e.target.value), setEmptyFieldError('')]}
              ></input>
            </div>
            <div style={{width:"100%", fontSize:'16px', color:'red'}}> {emptyFieldError}</div>
            <button type="submit" name="submit" id="submitForm" onClick={handleSubmitCashDiary}>
              {" "}
              Save
            </button>
          </form>
        </div>
      )} 

      { cashDiaries && cashDiaries.length !== 0 ? <ReadCashDiary/> : <div style={{fontSize:'20px', margin:"20px 0 0 0"}}>Add Cash Diary by clicking on + sign.</div>}
    </Wrapper>
  );
};

// Exports:
export default CashDiary;


// Styles:
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

const CollapsibleData = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  padding-right: 10px;
`;

const Title = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${colors.PRIMARY};
  margin-bottom: 10px;
`;

const Subtitle = styled.div`
  display: flex;
  font-size: 0.8rem;
  font-weight: 500;
  color: #333333;
`;
const AddnewButton = styled.button`
  border: none;
  background-color: ${colors.PRIMARY};
  color: white;
  border-radius: 3px;
  margin-bottom: 5px;
  float: right;
  padding: 2px 1rem;
  min-width: 50px;
  width: auto;
  height: 50px;
  font-size: 30px;
`;
const SubmitButton = styled.button`
  border: none;
  font-size: 1.1rem;
  background-color: ${colors.PRIMARY};
  color: white;
  border-radius: 3px;
  margin-bottom: 10px;
  float: right;
  padding: 2px 1rem;
  
`;
const TopHeaderDiv = styled.div`
  position: sticky;
  top: -1.8rem;
  background-color: white;
  z-index: 9;
  padding: 4px 5px;
`