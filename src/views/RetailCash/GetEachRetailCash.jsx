import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  fetchEachTransactionData,
  fetchEachTransactionDataBWDates
} from "../../redux/actions/eachTransactionAction";
import { useEffect, useState } from "react";
import axios from "axios";
import { AUTH_HEADERS } from "../../api/endpoints";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import { min } from "moment";
import COLORS from "../../styles/colors";
import colors from "../../styles/colors";
import Table from "react-bootstrap/Table";
import { BASE } from "../../api/endpoints";

const GetEachRetailCash = ({ id, item }) => {
  // const {id} = props;
  console.log(id);
  console.log("Name", item.name);

  const getDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    today = yyyy + "-" + mm + "-" + dd;
    console.log(today);
    return today;
    // document.getElementById("date").value = today;
  };
  const todayDate = getDate();
  console.log(todayDate);

  const [value, setValue] = useState(todayDate);
  const [show, toggleShow] = useState(false);

  var [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [amount, setAmount] = useState(0);
  const [transactionDate, setTransactionDate] = useState(todayDate);

  const toPostTransactionDate =
    transactionDate && new Date(transactionDate).toISOString();

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [dailyCashId, setDailyCashId] = useState(item.id);
  const [blankInputFieldErr, setBlankInputFieldErr] = useState("");
  const [inputType, setInputType] = useState("text");
  const [inputValue, setInputValue] = useState("");
  const [activeButton, setActiveButton] = useState(null);
  const dispatch = useDispatch();
  const allRetailCashData = useSelector(
    (state) => state.allRetailCashData.retailsCases.data
  );

  // Each transactions
  const eachtransactionsData = useSelector(
    (state) => state.allTeansactions.transactions.data
  );
  console.log(eachtransactionsData);

  const sortedEachtransactionsDataByDate =
    eachtransactionsData &&
    eachtransactionsData.sort((a, b) => {
      return new Date(a.transactionDate) - new Date(b.transactionDate);
    });
  console.log(
    " sorted Each transactions Data By Date",
    sortedEachtransactionsDataByDate
  );

  const totalBalance = () => {
    const TotBalances =
      eachtransactionsData &&
      eachtransactionsData.reduce((prev, curr) => prev + curr.amount, 0);
    return TotBalances;
  };

  const submitEachRetailCash = (e) => {
    e.preventDefault();
    item.id && item.id !== 0
      ? bbbbb()
      : swal(
          "Please Select one Retail Cash  Name from left side column to which you have to add Loan."
        );
  };

  console.log("Amount", amount);

  const bbbbb = () => {
    if (
      description.length !== 0 &&
      notes.length !== 0 &&
      amount.length !== 0 &&
      transactionDate.length !== 0
    ) {
      axios
        .post(
          BASE + `/DailyCashTransactions/`,
          {
            description: description,
            notes: notes,
            amount: amount,
            transactionDate: toPostTransactionDate,
            dailyCashId: item.id
          },
          { headers: { ...AUTH_HEADERS } }
        )
        .then((response) => {
          toggleShow(!show);
          swal({
            text: "Retail Cash Data added Successfully!..",
            icon: "success",
            button: "Close"
          });
          dispatch(fetchEachTransactionData(item.id));
          setDescription("");
          setNotes("");
          setAmount("");
          setTransactionDate(todayDate);
        })
        .catch((err) => {
          console.log(err.toJSON());
          setBlankInputFieldErr(err.toJSON());
        });
    } else {
      setBlankInputFieldErr("Please fill the all input fields properly.");
    }
  };

  const buttonStyle = {
    border: "1px solid #002758",
    color: " #002758",
    borderRadius: "3px",
    padding: "3px 10px",
    marginRight: "5px",
    cursor: "pointer",
    backgroundColor: "white"
  };

  const activeStyle = {
    backgroundColor: "#002758",
    color: "#fff"
  };

  const buttons = [
    { id: 1, label: "Cash In" },
    { id: 2, label: "Cash Out" }
  ];

  const handleClick = (buttonId, buttonLabel) => {
    setActiveButton(buttonId);
    // setInputValue(buttonLabel)
    setDescription(buttonLabel);
    if (buttonLabel === "Cash In") {
      // let minus = `${amount}`;
      let minus = Math.abs(amount);
      let intValue = +minus;
      setAmount(intValue);
      console.log("description Cash Out:- ", amount, minus, intValue);
    } else if (buttonLabel === "Cash Out") {
      let minus = `-${amount}`;
      let intValue = +minus;
      setAmount(intValue);
      console.log("Cash in ", amount);
    }
  };
  console.log("description: ", description);

  const handleQueryBWDates = (e) => {
    e.preventDefault();
    console.log(fromDate, toDate, id);
    dispatch(fetchEachTransactionDataBWDates(fromDate, toDate, id));
  };

  return (
    <div>
      <HeaderDivContainer>
        <AddnewButton
          onClick={() => [
            toggleShow(!show),
            setBlankInputFieldErr(""),
            getDate()
          ]}
        >
          {show ? " - " : " + "}
        </AddnewButton>
        <IdP>
          {" "}
          <NameDivInHeader>{item.name} </NameDivInHeader>
          <SearchForm onSubmit={handleQueryBWDates}>
            <div>
              From
              <input
                type="date"
                name="startDate"
                id="startDate"
                onChange={(e) => setFromDate(e.target.value)}
                style={{
                  width: "115px",

                  paddingTop: "0px",
                  paddingBottom: "0px",
                  marginBottom: "0",
                  marginLeft: "3px"
                }}
              />
            </div>
            <div style={{ marginLeft: "10px" }}>
              To
              <input
                type="date"
                name="endDate"
                id="endDate"
                onChange={(e) => setToDate(e.target.value)}
                style={{
                  width: "115px",
                  paddingTop: "0px",
                  paddingBottom: "0px",
                  marginBottom: "0",
                  marginLeft: "4px"
                  // marginRight:'8px'
                }}
              />
            </div>
            <div>
              <ActionButtonInLineForm type="submit">
                Apply
              </ActionButtonInLineForm>
              <ActionButtonInLineForm
                onClick={() => {
                  dispatch(fetchEachTransactionData(id));
                  document.getElementById("startDate").value = "";
                  document.getElementById("endDate").value = "";
                  setFromDate("");
                  setToDate("");
                }}
              >
                Cancel
              </ActionButtonInLineForm>
            </div>
          </SearchForm>
        </IdP>

        {show && (
          <div>
            <form className="realEstateForm" onSubmit={submitEachRetailCash}>
              <div className="realEstatediv">
                <div>
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    step="any"
                    onChange={(e) => [
                      setAmount(e.target.value),
                      setBlankInputFieldErr("")
                    ]}
                  ></input>
                </div>
                <SelectinputDiv>
                  <label htmlFor="description ">Description</label>
                  <SelectInputButtonDiv>
                    {buttons.map((button) => (
                      <button
                        type="button"
                        key={button.id}
                        onClick={() => handleClick(button.id, button.label)}
                        style={{
                          ...buttonStyle,
                          ...(activeButton === button.id && activeStyle)
                        }}
                      >
                        {button.label}
                      </button>
                    ))}
                  </SelectInputButtonDiv>
                </SelectinputDiv>

                <div>
                  <label htmlFor="transactionDate"> Transaction Date </label>
                  <input
                    type="date"
                    id="date"
                    name="transactionDate"
                    value={value}
                    // onLoad={getDate()}
                    max={new Date().toISOString().split("T")[0]}
                    // onChange={(e) => [
                    //   setTransactionDate({...transactionDate, transactionDate:e.target.value}),
                    //   setBlankInputFieldErr(""),
                    // ]}
                    onChange={(e) => [
                      setTransactionDate(e.target.value),
                      setValue(e.target.value),
                      setBlankInputFieldErr("")
                    ]}
                  ></input>
                </div>

                <div style={{ width: "250px" }}>
                  <label htmlFor="notes">Notes</label>
                  <textarea
                    style={{
                      width: "250px",
                      border: "1px solid #002758",
                      marginBottom: "10px",
                      marginRight: "0"
                    }}
                    type="text"
                    id="notes"
                    name="notes"
                    maxLength="256"
                    onChange={(e) => [
                      setNotes(e.target.value),
                      setBlankInputFieldErr(" ")
                    ]}
                  ></textarea>
                </div>
              </div>
              <span style={{ color: "red", fontSize: "16px", width: "100%" }}>
                {blankInputFieldErr}
              </span>

              <button type="submit" name="submit" id="submitForm">
                Save
              </button>
            </form>
          </div>
        )}
      </HeaderDivContainer>
      <TableContainer>
        <Table striped bordered hover>
          <thead
            style={{ position: "sticky", top: 0, backgroundColor: "white" }}
          >
            <tr>
              <th>
                <b>Date</b>
              </th>
              <th>
                {" "}
                <b>Description </b>
              </th>
              <th>
                <b>Notes</b>
              </th>
              <th>
                <b>Amount</b>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedEachtransactionsDataByDate &&
              sortedEachtransactionsDataByDate.map((eachtransaction) => {
                const {
                  amount,
                  dailyCashId,
                  id,
                  notes,
                  description,
                  transactionDate
                } = eachtransaction;
                let displayDate = transactionDate.toString().substring(0, 10);
                let Datewa = new Date(transactionDate);
                const yyyy = Datewa.toString().substring(11, 15);
                const dd = Datewa.toString().substring(8, 10);
                const MMM = Datewa.toString().substring(4, 7);
                console.log("Datewa: ", Datewa, dd, MMM, yyyy);
                const DisplayDatewa = `${dd}-${MMM}-${yyyy}`;

                // Amount Manipulation
                const reversestring1 = String(amount)
                  .split("")
                  .reverse()
                  .join("");
                const chunks1 = reversestring1.match(/.{1,3}/g);
                const amountToShow = chunks1
                  .join(",")
                  .split("")
                  .reverse()
                  .join("");

                return (
                  <tr key={id}>
                    <td> {DisplayDatewa} </td>
                    <td> {description} </td>
                    <td> {notes} </td>
                    <td>
                      {" "}
                      {amount.toLocaleString(undefined, {
                        maximumFractionDigits: 2
                      })}{" "}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>

        <CollapsibleData>
          <div>
            <Title>Total Balance:{totalBalance()}</Title>
            <span>
              <Subtitle>
                {" "}
                <label class="main">
                  <input type="checkbox" />
                  <span class="geekmark"></span>
                </label>{" "}
                Send Report by email to business
              </Subtitle>
            </span>
            <span>
              <Subtitle>
                {" "}
                <label class="main">
                  <input type="checkbox" />
                  <span class="geekmark"></span>
                </label>{" "}
                Send a copy to my email address
              </Subtitle>
            </span>
          </div>
          <AddnewButtons onClick={() => {}}>Submit</AddnewButtons>
        </CollapsibleData>
      </TableContainer>
    </div>
  );
};

export default GetEachRetailCash;

const HeaderDivContainer = styled.div`
  background-color: ${COLORS.PRIMARY};
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
  font-size: 1.1rem;
  background-color: #002857;
  color: white;
  /* border-radius: 3px; */
  margin-bottom: 10px;
  float: right;
  /* padding: 2px 1rem; */
  font-size: 25px;
  width: 40px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddnewButtons = styled.button`
  border: none;
  font-size: 1.1rem;
  background-color: #002857;
  color: white;
  border-radius: 3px;
  margin-bottom: 10px;
  float: right;
  padding: 2px 1rem;
`;

const TableContainer = styled.div`
  background-color: white;
  width: 100%;
  overflow: auto;
  float: left;
  height: 70vh;
`;
const InputFormContainer = styled.div`
  background-color: white;
  width: 100%;
  margin-top: 3px;
`;
const IdP = styled.div`
  background-color: #002758;
  color: white;
  min-height: 35px;
  height: auto;
  padding-left: 5px;
  /* padding-top: 1px; */
  padding-right: 10px;
  /* padding: 2px 0;  */
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const SearchForm = styled.form`
  width: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: flex-end;
`;

const ActionButtonInLineForm = styled.button`
  background-color: white;
  color: #002758;
  border: none;
  outline: none;
  border-radius: 2px;
  margin: 0 0 0 10px;
`;

const SelectinputDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;
const SelectInputButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const SelectInputField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: baseline;
`;
const SelectButton = styled.div`
  border: 1px solid #002758;
  color: #002758;
  border-radius: 3px;
  padding: 3px 10px;
  margin-right: 5px;
`;

const NameDivInHeader = styled.div`
  min-width: 100px;
  max-width: 180px;
  overflow-x: hidden;
  display: flex;
  flex-wrap: nowrap;
  height: auto;
  /* height: 32px; */
  /* overflow-x: hidden; */
`;
