import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import colors from "../../styles/colors";
import axios from "axios";
import "./CashDiary.css";
import { AUTH_HEADERS } from "../../api/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { fetchEachCashDairyData } from "../../redux/actions/eachCashDairyAction";
import GetEachCashDairyData from "./GetEachCashDairyData";
import { NavLink, useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import CashDairyPayment from "./CashDairyPayment";
import COLORS from "../../styles/colors";
import { AiFillCaretRight } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { fetchCashDairyPayments } from "../../redux/actions/cashDairyPaymentAction";
import swal from "sweetalert";
import { BASE } from "../../api/endpoints";

const EachCashDairies = ({ item }) => {
  const dispatch = useDispatch();
  // const { id } = useParams();

  const AllEachCashDairyData = useSelector(
    (state) => state.allEachCashDairyData.eachCashDairy.data
  );
  console.log("AllEachCashDairyData:-", AllEachCashDairyData);

  useEffect(() => {
    dispatch(fetchEachCashDairyData(item.id));
  }, [item.id]);

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
    return today;
    // document.getElementById("date").value = today;
  };
  const todayDate = getDate();

  const [value, setValue] = useState(todayDate);

  const [blankIdError, setBlankIdError] = useState("");
  const [activeButton, setActiveButton] = useState({});
  const [show, toggleShow] = useState(false);
  const [show1, toggleShow1] = useState(false);
  const [loanDate, setLoanDate] = useState(todayDate);

  const toPostLoanDate = loanDate && new Date(loanDate).toISOString();

  const [transactionType, setTransactionType] = useState(0);
  const [amount, setAmount] = useState(0);
  const [interestRate, setInterestrate] = useState(0);
  const [period, setPeriod] = useState(0);
  const [collateral, setCollateral] = useState("");
  const [dueAmount, setDueAmount] = useState(0);
  const [notes, setNotes] = useState("");
  const [errOnLoanAdd, setErrOnLoanAdd] = useState("");
  const [blankInputFieldErr, setBlankInputFieldErr] = useState("");
  const [dataToSend, setDataToSend] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const handleLoanetailSubmission = (e) => {
    e.preventDefault();

    item.id && item.id !== 0
      ? bbbbb()
      : swal(
          "Please Select one Cash Dairy Name from left side column to which you have to add Loan."
        );
  };

  const bbbbb = () => {
    if (
      loanDate !== 0 &&
      amount !== 0 &&
      interestRate !== 0 &&
      period !== 0 &&
      dueAmount !== 0 &&
      notes !== 0
    ) {
      axios
        .post(
          BASE + `/CashTrackingLoan`,
          {
            cashTrackingId: item.id,
            loanDate: toPostLoanDate,
            transactionType: transactionType,
            amount: amount,
            interestRate: Math.floor(interestRate),
            period: period,
            collateral: true,
            dueAmount: dueAmount,
            notes: notes
          },
          { headers: { ...AUTH_HEADERS } }
        )
        .then((resp) => {
          console.log("Response Each Cash Dairy:-", resp);
          swal({
            text: "Loan details added Successfully!..",
            icon: "success",
            button: "Close"
          });
          toggleShow(!show);
          dispatch(fetchEachCashDairyData(item.id));
          setAmount("");
          setInterestrate("");
          setPeriod("");
          setDueAmount("");
          setNotes("");
          setLoanDate(todayDate);
          setValue(todayDate);
          setSelectedOption("Select Transaction Type");
        })
        .catch((err) => {
          setBlankInputFieldErr("Invalid Input");
        });
    } else {
      setBlankInputFieldErr("Please fill the all input fields properly.");
    }
  };
  // handleLoanetailSubmission()

  const allPaymentsByIds = useSelector(
    (state) => state.allCashDairyPaymentById.allPaymentforeachId.data
  );
  console.log("allPaymentsByIds:-", allPaymentsByIds);

  // const filterdAllPaymentbyIds =
  //   allPaymentsByIds &&
  //   allPaymentsByIds.filter((item) => item.cashTrackingLoanId == id);
  // console.log("filterd AllPaymentbyIds", filterdAllPaymentbyIds);

  // const totalPayment_EachId = () => {
  //   const totalPaymentDone =
  //     filterdAllPaymentbyIds &&
  //     filterdAllPaymentbyIds.reduce((prev, curr) => prev + +curr.amount, 0);
  //   return totalPaymentDone;
  // };
  // const TotalPaymentDone = totalPayment_EachId();

  // const BalanceToBePaid = dueAmount - TotalPaymentDone;

  useEffect(() => {
    // Calculate the due amount whenever amount, interestRate, or timePeriod changes
    calculateDueAmount();
  }, [amount, interestRate, period]);

  const calculateDueAmount = () => {
    const principal = parseFloat(amount);
    const rate = parseFloat(interestRate);
    const time = parseFloat(period / 12);

    if (!isNaN(principal) && !isNaN(rate) && !isNaN(time)) {
      const interest = (principal * rate * time) / 100;
      const totalDue = principal + interest;
      setDueAmount(totalDue.toFixed(2));
    } else {
      setDueAmount("");
    }
  };

  const handleDropdownChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedOption(selectedOption);
    if (selectedOption === "loan") {
      setTransactionType(0);
    } else if (selectedOption === "borrow") {
      setTransactionType(1);
    }
  };

  useEffect(() => {
    dispatch(fetchCashDairyPayments(item.id));
    // transactiontype2displayfun();
  }, [item.id]);

  return (
    <EachCashDairiesContainer>
      <div className="headerDiv">
        <span style={{ fontSize: "1.25rem", fontWeight: "500" }}>
          {" "}
          {item.name}
        </span>
        {/* <span style={{color:'red', fontSize:'16px', width:'100%'}}>{blankIdError}</span> */}

        <AddnewButton
          onClick={() => [
            toggleShow(!show),
            setBlankInputFieldErr(""),
            setValue(todayDate),
            setDueAmount("0.00")
          ]}
        >
          {show ? " - " : " Add Loan "}
        </AddnewButton>
      </div>
      {show && (
        <div>
          <LoanInputForm
            className="cashDiaryForm"
            onSubmit={handleLoanetailSubmission}
          >
            <div>
              <label htmlFor="loanDate">Loan Date</label>
              <input
                style={{ border: "1px solid #002857", width: "200px" }}
                type="date"
                id="loanDate"
                name="loanDate"
                value={value}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => [
                  setLoanDate(e.target.value),
                  setValue(e.target.value),
                  setBlankInputFieldErr(" ")
                ]}
              ></input>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="select"> Transaction Type</label>
              <select
                style={{
                  border: "1px solid #002857",
                  width: "200px",
                  padding: "3px",
                  height: "31.33px"
                }}
                value={selectedOption}
                onChange={handleDropdownChange}
              >
                <option value="">Select Transaction Type</option>
                <option value="loan">Loan</option>
                <option value="borrow">Borrow</option>
              </select>
            </div>

            <div>
              <label htmlFor="amount">Amount</label>
              <input
                style={{ border: "1px solid #002857", width: "200px" }}
                type="number"
                id="amount"
                name="amount"
                step="any"
                onChange={(e) => [
                  setAmount(parseFloat(e.target.value)),
                  setBlankInputFieldErr(" ")
                ]}
              ></input>
            </div>

            <div>
              <label htmlFor="interestRate">APR%</label>
              <input
                style={{ border: "1px solid #002857", width: "200px" }}
                type="number"
                id="interestRate"
                name="interestRate"
                step="any"
                onChange={(e) => [
                  setInterestrate(e.target.value),
                  setBlankInputFieldErr("")
                ]}
              ></input>
            </div>

            <div style={{ position: "relative", width: "217.1px" }}>
              <label htmlFor="period">Period(Months)</label>
              <input
                style={{ border: "1px solid #002857", width: "200px" }}
                type="number"
                id="period"
                name="period"
                step="any"
                onChange={(e) => [
                  setPeriod(parseFloat(e.target.value)),
                  setBlankInputFieldErr(" ")
                ]}
              ></input>
              {/* <span style={{position:"relative", right:'-60%', top:'-40%' }}>(Months)</span> */}
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="dueAmount">Due Amount</label>
              <input
                style={{ border: "1px solid #002857", width: "200px" }}
                type="number"
                id="dueAmount"
                name="dueAmount"
                step="any"
                value={dueAmount}
                onChange={(e) => [
                  // setDueAmount(parseFloat(e.target.value)),
                  setBlankInputFieldErr(" "),
                  setErrOnLoanAdd(" ")
                ]}
              ></input>
              <span style={{ color: "red", fontSize: "10px" }}>
                {errOnLoanAdd}
              </span>
            </div>

            <div>
              <label htmlFor="notes">Notes</label>
              <textarea
                style={{ border: "1px solid #002857" }}
                type="text"
                id="notes"
                name="notes"
                maxLength="256"
                height="auto"
                width="auto"
                onChange={(e) => [
                  setNotes(e.target.value),
                  setBlankInputFieldErr(" ")
                ]}
              ></textarea>
            </div>
            <span style={{ color: "red", fontSize: "16px", width: "100%" }}>
              {blankInputFieldErr}
            </span>

            <button
              type="submit"
              name="submit"
              id="submitForm"
              onClick={() => {}}
            >
              Save
            </button>
          </LoanInputForm>
        </div>
      )}

      {AllEachCashDairyData &&
        AllEachCashDairyData.map((eachIDdata) => {
          const {
            id,
            amount,
            cashTrackingId,
            collateral,
            dueAmount,
            interestRate,
            loanDate,
            notes,
            period,
            transactionType
          } = eachIDdata;
          const dispalyDate = loanDate.substring(0, 10);
          let Datewa = new Date(loanDate);
          const yyyy = Datewa.toString().substring(11, 15);
          const dd = Datewa.toString().substring(8, 10);
          const MMM = Datewa.toString().substring(4, 7);
          const DisplayDatewa = `${dd}-${MMM}-${yyyy}`;

          // Amount comma manipulation
          const reversestring1 = String(amount).split("").reverse().join("");
          const chunks1 = reversestring1.match(/.{1,3}/g);
          const AmountTpDisplay = chunks1
            .join(",")
            .split("")
            .reverse()
            .join("");

          const reversestring2 = String(dueAmount).split("").reverse().join("");
          const chunks2 = reversestring2.match(/.{1,3}/g);
          const dueAmountTpDisplay = chunks2
            .join(",")
            .split("")
            .reverse()
            .join("");

          const transactiontype2displayfun = () => {
            if (transactionType === 0) {
              return "Loan";
            } else if (transactionType === 1) {
              return "Borrow";
            } else {
              return "";
            }
          };

          return (
            <>
              <StyledLink to={`loanPayment/${id}`}>
                <ActionButton
                  onClick={() => [
                    setActiveButton({ [id]: !activeButton[id] }),
                    setDataToSend(eachIDdata)
                  ]}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginRight: "1rem",
                      width: "100%",
                      alignItems: "center"
                    }}
                  >
                    {" "}
                    <span>{transactiontype2displayfun()}</span>{" "}
                    <span>{`${dueAmount.toLocaleString(undefined, {
                      maximumFractionDigits: 2
                    })}`}</span>{" "}
                  </div>{" "}
                  <span style={{ width: "17.59px", display: "flex" }}>
                    {show1 ? <AiOutlineMinus /> : <AiFillCaretDown />}
                  </span>
                </ActionButton>
              </StyledLink>
              {activeButton[id] && (
                <>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Transaction</th>
                        <th>Amount</th>
                        <th>APR%</th>
                        <th>Period(Months)</th>
                        {/* <th>Colletral</th> */}
                        <th>Due Amount </th>
                        <th>Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th> {DisplayDatewa} </th>
                        <th> {transactiontype2displayfun()} </th>
                        <td>{AmountTpDisplay} </td>
                        <td> {interestRate} </td>
                        <td> {period} </td>
                        {/* <td> {collateral} </td> */}
                        <td>
                          {" "}
                          {dueAmount.toLocaleString(undefined, {
                            maximumFractionDigits: 2
                          })}{" "}
                        </td>
                        <td> {notes} </td>
                      </tr>
                    </tbody>
                  </Table>

                  <CashDairyPayment getEachidData={dataToSend} />
                </>
              )}
            </>
          );
        })}

      <div>{/* <GetEachCashDairyData/> */}</div>
    </EachCashDairiesContainer>
  );
};

export default EachCashDairies;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  margin: 0;
  padding: 0;
  background-color: ${COLORS.PRIMARY};
  color: #ffffff;
  /* border: 1px solid #002857; */
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    margin: 0;
    padding: 0;
    background-color: ${COLORS.PRIMARY};
    color: #ffffff;
    /* border: 1px solid #002857; */
  }
`;

const EachCashDairiesContainer = styled.div`
  background-color: white;
  padding: 2px;
  height: 80vh;
`;
const ActionButton = styled.div`
  border: none;
  outline: none;
  /* width: 200px; */
  /* min-height: 3rem; */
  height: auto;
  /* padding: 2px; */
  padding: 5px 7px 5px 7px;
  margin: 1px;
  background-color: ${COLORS.PRIMARY};
  color: white;
  /* border-radius: 3px; */
  font-size: 1.1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const AddnewButton = styled.button`
  border: none;
  background-color: ${colors.PRIMARY};
  color: white;
  /* border-radius: 3px; */
  margin-bottom: 5px;
  float: right;
  padding: 2px 1rem;
  min-width: 30px;
  width: auto;
  height: 30px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoanInputForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  background-color: white;
  padding: 5px;
`;
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
