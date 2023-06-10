import React from 'react'
import axios from "axios";
import  { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_HEADERS } from "../../api/endpoints";
import styled from 'styled-components';
import { BASE } from '../../api/endpoints';


const PostEachTransations = () => {


    const [show, toggleShow] = useState(false)
    const allRetailCashData = useSelector(
        (state) => state.allRetailCashData.retailsCases.data
      );
      console.log("allRetailCashData:-",allRetailCashData)
    
      // States for each Transactions
      const [description, setDescription] = useState('');
      const [notes, setNotes] = useState("");
      const [amount, setAmount] = useState(0);
      const [transactionDate, setTransactionDate] = useState("2023-04-19T04:55:36.425Z")
    

  return (
    <div>
      <AddnewButton onClick={() => toggleShow(!show)}>
              {" "}
              {show ? " - " : " + "}{" "}
            </AddnewButton>  
            { show && (
        <div>
          <form className="realEstateForm"  onSubmit={ (e, id) => {
             e.preventDefault();
             console.log(e, id)
             axios.post(BASE + `/DailyCashTransactions/`,
             {
               description: description,
               notes: notes,
               amount: amount,
               transactionDate: "2023-04-19T04:55:36.425Z" ,
               dailyCashId: id,
             },
             {headers: { ...AUTH_HEADERS} },
             ).then((response) => {
               toggleShow(!show);
             })
           }
          } >
          
            <div className="realEstatediv">
            <div>
              <label htmlFor="description ">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
              ></input>
            </div>
          
            <div>
              <label htmlFor="notes">Notes</label>
              <input
                type="text"
                id="notes"
                name="notes"
                onChange={(e) => setNotes(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                name="amount"
                onChange={(e) => setAmount(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="transactionDate"> Transaction Date </label>
              <input
                type="date"
                id="transactionDate"
                name="transactionDate"
                onChange={(e) => setTransactionDate(e.target.value)}
              ></input>
            </div>

            </div>
            <button type="submit" name="submit" id="submitForm" onClick={ () => {} }>
              {" "}
              Save
            </button>
          </form>
        </div>
      )}

    </div>
  )
}

export default PostEachTransations


const AddnewButton = styled.button`
  border: none;
  background-color: #002857;
  color: white;
  border-radius: 3px;
  margin-bottom: 10px;
  float: right;
  padding: 2px 1rem;
  width: 50px;
  height: 50px;
  font-size: 30px;
`;