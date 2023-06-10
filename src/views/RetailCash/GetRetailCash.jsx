import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleDown } from "react-icons/fa";
import { BiMinus } from "react-icons/bi";
import { CheckBox } from '@mui/icons-material';
import './retailCash.css'
import styled from "styled-components";
import Collapsible from "../../components/global/Collapsible";
import GetEachRetailCash from "./GetEachRetailCash";
import axios from "axios";
import { AUTH_HEADERS } from "../../api/endpoints";
import { useEffect } from "react";
import { fetchEachTransactionData } from "../../redux/actions/eachTransactionAction";
import { Link, NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { AiFillCaretRight } from "react-icons/ai";
// import colors from "../../styles/colors";
import COLORS from "../../styles/colors";

const GetRetailCash = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {id} = useParams()
  const allRetailCashData = useSelector(
    (state) => state.allRetailCashData.retailsCases.data
  );
  // console.log("allRetailCashData:-",allRetailCashData)
 
 

 


  const [show, toggleShow] = useState(false)
  const [formVisible, setFormVisible] = useState(true);

  const handleEmailSend =() => {
   
  }
  // States for each Transactions
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState("");
  const [amount, setAmount] = useState(0);
  const [transactionDate, setTransactionDate] = useState("2023-04-19T04:55:36.425Z") 
  const [data, setData] = useState([]);
  console.log("Name Data:-",data)

  // const mappedData = allRetailCashData &&
  //   allRetailCashData.map((item) => (
  //   <div key={item.id} onClick={() => setData(item)}>
  //     {item.name}
  //   </div>
  // ));
 
  const allRCashData =
    allRetailCashData &&
    allRetailCashData.map((eachData) => {
      const { id, name } = eachData; 
      return (
        <>
        <StyledLink to={`transaction/${id}`} activeClassName="active"> 
          <ActionButton onClick={() => [dispatch(fetchEachTransactionData(id)), setData(eachData) ]}>{name}  <span style={{width:'17.59px', marginRight:'-10px'}} ><AiFillCaretRight/></span></ActionButton>  
        </StyledLink>
        </>
      );
    });

  return( 
  <RetailCashDiv>
    <AllRetailColl>
     {allRCashData}
    </AllRetailColl>


    <EachTransactionContainer >
      <GetEachRetailCash id={id}  item={data}/> 
    </EachTransactionContainer>
  </RetailCashDiv>
  )
};


export default GetRetailCash;

const StyledLink = styled(NavLink)`
    border: 1px solid #002857;
    text-decoration: none;
    margin: 0 20px 3px 0 ;
    background-color:  ${ COLORS.PRIMARY };
    color: white;
    &:focus, &:hover, &:visited, &:link, &:active {
      border: 1px solid #002857;
        text-decoration: none;
        margin: 0 20px 3px 0 ;
        background-color:  ${ COLORS.PRIMARY };
        color: white;
    }
`;


const AddnewButton = styled.button`
  border: none;
  background-color: ${ COLORS.PRIMARY };
  color: white;
  border-radius: 3px;
  margin-bottom: 10px;
  float: right;
  padding: 2px 1rem; 
  width: 50px;
  height: 50px;
  font-size: 30px;
`;

const CollapsableButton = styled.button`
  width: 100%;
  background-color: ${ COLORS.PRIMARY };
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Wrapper = styled.div`
  position: absolute;
  left: 20vw;
  top: 3.75rem;
  width: 78.71vw;
  /* height: auto; */
  height:calc(100vh - 3.75rem) ;
  /* height: calc(100vh - 3.75rem); */
  padding: 2.5rem;
  background-color: #f5f3f3;
  /* margin-top: 3rem; */
  overflow: auto;
  float: left;

`
const ActionButton = styled.div`
  border: none;
  outline: none;
  width: 200px;
  min-height: 3rem;
  height: auto;
  padding: 10px 0 10px 10px;
  margin:0 2px 0px 2px;
  /* background-color:  ${ COLORS.PRIMARY }; */
  /* color: white; */
  border-radius: 3px;
  font-size: 1.1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const RetailCashDiv= styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 5px;

  @media screen and (min-width: 576px) and (max-width: 992px) {
    font-size: 16px ;
    font-weight: 400; 
  }
  @media screen and (min-width: 200px) and (max-width: 576px) {
    font-size: 14px ;
    font-weight: 400; 
    flex-direction: column;
  }
`

const AllRetailColl = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 100%;
  flex-wrap: wrap;
  
 
 
`
const EachTransactionContainer = styled.div`
  width: calc(100% - 250px);
  height: auto;
  border: 1px solid ${ COLORS.PRIMARY };

  @media screen and (min-width: 200px) and (max-width: 576px) {
    font-size: 14px ;
    font-weight: 400; 
    width: 100%;
  }

`