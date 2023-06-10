import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styled from "styled-components";
import './CashDiary.css';
import { FaAngleDown } from "react-icons/fa";
import { BiMinus } from "react-icons/bi";
import { CheckBox } from '@mui/icons-material';
import Collapsible from '../../components/global/Collapsible';
import COLORS from '../../styles/colors';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { AiFillCaretRight } from "react-icons/ai";

import EachCashDairies from './EachCashDairies';
import GetEachCashDairyData from './GetEachCashDairyData';
import { fetchEachCashDairyData } from '../../redux/actions/eachCashDairyAction';
import { useEffect } from 'react';
import colors from '../../styles/colors';
import { deleteCashDiaryData } from '../../redux/actions/cashDiaryAction';



const ReadCashDiary = () => {


const {id} =useParams()
    const [show, toggleShow] = useState(false)
    const [formVisible, setFormVisible] = useState(true);
    const [clicked, setClicked] = useState(false);
    const [data, setData] = useState([]);
    console.log("Name Data:-",data)

    const handleEmailSend =() => {

    }

    const dispatch = useDispatch(); 

      const changeButtonColor = (id) => {
      setClicked(true);
    };

    const handleDoubleClick =()=> {
      deleteCashDiaryData(id)
    }

    const cashDiaries = useSelector((state) => state.allCashDiaries.cashDiaries.data)
    console.log('Cash Diaries- ',cashDiaries);

    const AllCashDiaries = cashDiaries && cashDiaries.map((eachCashDiaries) => {
        const {id, name} = eachCashDiaries;
        const isActive = clicked === id; // Check if the NavLink is active 
     
        return(
          <div style={{backgroundColor:'#002758',}} >
            <StyledLink to={`eachdairy/${id}`}  
            activeClassName="active"
            onDoubleClick={handleDoubleClick}
            onClick={() => {
              dispatch(fetchEachCashDairyData(id));
              setData(eachCashDiaries);
              setClicked(id); // Update the clicked state
            }}
            isActive={isActive} // Pass the isActive prop
            > 
              <ActionButton 
                //  onClick={() => [ dispatch(fetchEachCashDairyData(id)), setData(eachCashDiaries) ]} 
                className={isActive ? 'active' : ''}
                >{name}  <span style={{width:'17.59px', display:'flex'}} ><AiFillCaretRight/></span>
              </ActionButton>  
            </StyledLink>
          </div>
        )
    })

  return (

    <ReadCashDiaryContainer>
      <ReadCashDiaryDiv>
        {AllCashDiaries}
      </ReadCashDiaryDiv>

      <ReadEachCashDairyDiv>
        <EachCashDairies  item ={data} /> 
      </ReadEachCashDairyDiv>

    </ReadCashDiaryContainer>
 
  )
}

export default ReadCashDiary;

const ReadCashDiaryContainer  = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%; 
  margin-top: 1px;

  @media screen and (min-width: 576px) and (max-width: 992px) {
    font-weight: 400; 
  }
  @media screen and (min-width: 200px) and (max-width: 576px) {
    font-size: 10px ;
    font-weight: 400; 
    flex-direction: column;
  }
`

const ReadCashDiaryDiv = styled.div`
  width: 200px;
  margin-right: 5px;
margin-bottom: 1rem;

`

const ReadEachCashDairyDiv = styled.div`
   width: calc(100% - 200px);
   overflow: auto;
  float: left;
  height: 75vh;
  @media screen and (min-width: 200px) and (max-width: 576px) {
    font-size: 14px ;
    font-weight: 400; 
    width: 100%;
  }
`



const StyledLink = styled(NavLink)`
    text-decoration: none;
    margin: 0 ;
    padding: 0;
    background-color: ${props => (props.isActive ? "#fff" : '#002758')};
    color: ${props => (props.isActive ? '#002758' : 'white')};

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        margin: 0  ;
        padding: 0;
        background-color: ${props => (props.isActive ? "#fff" : '#002758')};
        color: ${props => (props.isActive ? '#002758' : 'white')};
    }
`;

const ActionButton = styled.div`

border: 1px solid #002857;
  outline: none; 
  height: auto;
  padding: 10px  ;
  margin:0 0 3px 0; 
  font-size: 1.1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
`


const CollapsibleData = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  /* border: 1px solid ${COLORS.PRIMARY}; */
  background-color: white;
`;
const Title = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${COLORS.PRIMARY};
`;

const Subtitle = styled.div`
display: flex;
  font-size: 0.8rem;
  font-weight: 500;
  color: #333333;
`;
const AddnewButton = styled.button`
  border: none;
  font-size: 1.1rem;
  background-color: ${COLORS.PRIMARY};
  color: white;
  border-radius: 3px;
  margin-bottom: 10px;
  float: right;
  padding: 2px 1rem;
  
`;