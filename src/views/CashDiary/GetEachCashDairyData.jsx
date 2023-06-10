import React from 'react'
import Collapsible from '../../components/global/Collapsible'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import colors from '../../styles/colors'
import CashDairyPayment from './CashDairyPayment'
import { useState } from 'react'
import Table from 'react-bootstrap/Table';
import { NavLink } from 'react-router-dom'
import { AiFillCaretRight } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";


const GetEachCashDairyData = ({item}) => {

  const [show1, toggleShow1] = useState(false);
  const [dataToSend, setDataToSend] = useState([])

    const AllEachCashDairyData = useSelector((state) => state.allEachCashDairyData.eachCashDairy.data)
    console.log("AllEachCashDairyData:-",AllEachCashDairyData)

  return (
    <div> {AllEachCashDairyData && AllEachCashDairyData.map((eachIDdata) => {
      const {id, amount, cashTrackingId,collateral,dueAmount, interestRate, loanDate, notes, period, transactionType  } = eachIDdata;
      const dispalyDate =loanDate.substring(0,10) ;
      return(
           <>
              <StyledLink to={`loanPayment/${id}`} > 
                  <ActionButton onClick={() => [toggleShow1(!show1), setDataToSend(eachIDdata)]}  style={{ display:'flex', }}> {'Loan 1'} <span style={{width:'17.59px', display:'flex'}} >{show1? <AiOutlineMinus/> : <AiFillCaretDown/>  }</span></ActionButton>  
              </StyledLink>
              {show1 && (
                <> 
                  <Table  striped bordered hover>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Transaction</th>
                      <th>Amount</th>
                      <th>ROI</th>
                      <th>Period</th>
                      <th>Collateral</th>
                      <th>Due Amount </th>
                      <th>Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th> {dispalyDate} </th>
                      <th> {transactionType} </th>
                      <td>{amount}</td>
                      <td> {interestRate} </td>
                      <td> {period} </td>
                      <td> {collateral} </td>
                      <td> {dueAmount} </td>
                      <td> {notes} </td>
                    </tr>
                  </tbody>
                  </Table>

                  <CashDairyPayment getEachidData={dataToSend} />

                  <CollapsibleData>
                    <div>
                      <Title>Balance: {}</Title>
                      <span className="subtitle">
                        <Subtitle>  
                        <label class="main">
                            <input type="checkbox" />
                            <span class="geekmark"></span>
                        </label>
                          Send Report by email to {}</Subtitle>
                      </span>
                      <span >
                        <Subtitle>    <label class="main">
                            <input type="checkbox" />
                            <span class="geekmark"></span>
                        </label> Send a copy to my email address</Subtitle>
                      </span>
                    </div>
                    <SubmitButton onClick={() => {}}>Submit</SubmitButton>
                  </CollapsibleData>
                  
                 </>
              )}
            </> 
        
      )
  })} </div>
  )
}

export default GetEachCashDairyData


const CollapsibleData = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  /* border: 1px solid ${colors.PRIMARY}; */
  background-color: white;
`;
const Title = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${colors.PRIMARY};
`;

const Subtitle = styled.div`
display: flex;
  font-size: 0.8rem;
  font-weight: 500;
  color: #333333;
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
const StyledLink = styled(NavLink)`
    text-decoration: none;
    margin: 0 ;
    padding: 0;
    background-color:  ${ colors.PRIMARY };
    color: #ffffff;
    /* border: 1px solid #002857; */
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        margin: 0  ;
        padding: 0;
        background-color:  ${ colors.PRIMARY };
        color: #ffffff;
        /* border: 1px solid #002857; */
    }
`;

const ActionButton = styled.div`
  border: none;
  outline: none;
  /* width: 200px; */
  /* min-height: 3rem; */
  height: auto;
  /* padding: 2px; */
  padding: 5px 7px 5px 7px  ;
  margin:1px;
  background-color:  ${ colors.PRIMARY };
  color: white;
  /* border-radius: 3px; */
  font-size: 1.1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`