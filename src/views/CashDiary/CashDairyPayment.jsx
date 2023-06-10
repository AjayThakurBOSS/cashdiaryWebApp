import React, { useState } from "react";
import styled from "styled-components";
import colors from "../../styles/colors";
import "./CashDiary.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { AUTH_HEADERS } from "../../api/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCashDairyPayments } from "../../redux/actions/cashDairyPaymentAction";
import { useNavigate, useParams } from "react-router-dom";
import COLORS from "../../styles/colors";
import swal from "sweetalert";
import { BASE } from "../../api/endpoints";
import { fetchEachCashDairyData } from "../../redux/actions/eachCashDairyAction";

const CashDairyPayment = ({ getEachidData }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  //Current date calculation
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
  };
  const todayDate = getDate();
  const [value, setValue] = useState(todayDate);
  // States

  const dispatch = useDispatch();
  const [show, toggleShow] = useState(false);
  const [paymentDate, setPaymentDate] = useState(todayDate);

  const toPostPaymentDate = paymentDate && new Date(paymentDate).toISOString();

  const [transaction, setTransaction] = useState("");
  const [amount, setAmount] = useState(0);
  const [comments, setComments] = useState("");
  const [errOnPayment, setErrOnPayment] = useState("");
  const [blankInputFieldErr, setBlankInputFieldErr] = useState("");

  const allPaymentsByIds = useSelector(
    (state) => state.allCashDairyPaymentById.allPaymentforeachId.data
  );
  console.log("allPaymentsByIds:-", allPaymentsByIds);

  const filterdAllPaymentbyIds =
    allPaymentsByIds &&
    allPaymentsByIds.filter((item) => item.cashTrackingLoanId == id);
  console.log("filterd AllPaymentbyIds", filterdAllPaymentbyIds);

  const totalPayment_EachId = () => {
    const totalPaymentDone =
      filterdAllPaymentbyIds &&
      filterdAllPaymentbyIds.reduce((prev, curr) => prev + +curr.amount, 0);
    return totalPaymentDone;
  };
  const TotalPaymentDone = totalPayment_EachId();
  console.log("TotalPaymentDone", TotalPaymentDone);
  const BalanceToBePaid = getEachidData.dueAmount;
  // Amount Manipulation
  const reversestring1 = String(BalanceToBePaid).split("").reverse().join("");
  const chunks1 = reversestring1.match(/.{1,3}/g);
  const BalanceToBePaidToShow = chunks1.join(",").split("").reverse().join("");

  const handleLoanPayment = (e) => {
    e.preventDefault();
    if (amount > BalanceToBePaid) {
      setErrOnPayment(
        `Please Pay  less than or equal to  ${BalanceToBePaid} .`
      );
    } else if (
      paymentDate.length !== 0 &&
      transaction.length !== 0 &&
      amount.length !== 0 &&
      comments.length !== 0
    ) {
      axios
        .post(
          BASE + `/CashTrackingPayment`,
          {
            cashTrackingId: getEachidData.cashTrackingId,
            cashTrackingLoanId: getEachidData.id,
            paymentDate: toPostPaymentDate,
            transaction: transaction,
            amount: amount,
            comments: comments
          },
          { headers: { ...AUTH_HEADERS } }
        )
        .then((res) => {
          toggleShow(!show);
          dispatch(fetchEachCashDairyData(getEachidData.cashTrackingId));
          dispatch(fetchCashDairyPayments(getEachidData.cashTrackingId));
          swal({
            text: " Payment done Successfully!..",
            icon: "success",
            button: "Close"
          });
          setTransaction("");
          setAmount("");
          setComments("");
          setPaymentDate(todayDate);
          setValue(todayDate);
        });
    } else {
      setBlankInputFieldErr("Please fill the all input fields properly.");
    }
  };

  return (
    <div>
      <div className="headerDiv">
        {/* <span style={{fontSize:'1.25rem', fontWeight: '500', }} > {item.id} {item.name}</span> */}
        <AddnewButton
          onClick={() => [
            toggleShow(!show),
            setBlankInputFieldErr(""),
            setValue(todayDate)
          ]}
        >
          {" "}
          {show ? " - " : " Make Payment "}{" "}
        </AddnewButton>
      </div>
      {show && (
        <div>
          <LoanPaymentForm
            className="cashDiaryForm"
            onSubmit={handleLoanPayment}
          >
            <div>
              <label htmlFor="paymentDate">Payment Date</label>
              <input
                style={{ border: "1px solid #002857" }}
                type="date"
                id="paymentDate"
                name="paymentDate"
                value={value}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => [
                  setPaymentDate(e.target.value),
                  setBlankInputFieldErr(""),
                  setValue(e.target.value)
                ]}
              ></input>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="amount">Amount</label>
              <input
                style={{ border: "1px solid #002857" }}
                type="number"
                id="amount"
                name="amount"
                onChange={(e) => [
                  setAmount(parseFloat(e.target.value)),
                  setErrOnPayment(" "),
                  setBlankInputFieldErr(" ")
                ]}
              ></input>
              <span style={{ color: "red", fontSize: "10px" }}>
                {errOnPayment}
              </span>
            </div>

            <div>
              <label htmlFor="transaction">Transaction</label>
              <input
                style={{ border: "1px solid #002857" }}
                type="text"
                id="transaction"
                name="transaction"
                onChange={(e) => [
                  setTransaction(e.target.value),
                  setBlankInputFieldErr(" ")
                ]}
              ></input>
            </div>

            <div style={{}}>
              <label htmlFor="comments">Notes</label>
              <textarea
                style={{
                  border: "1px solid #002857",
                  width: "280px",
                  borderRadius: "0"
                }}
                type="text"
                id="comments"
                name="comments"
                maxLength="256"
                height="auto"
                onChange={(e) => [
                  setComments(e.target.value),
                  setBlankInputFieldErr(" ")
                ]}
              ></textarea>
            </div>
            <div style={{ width: "100%" }}>
              <div style={{ color: "red", fontSize: "16px" }}>
                {blankInputFieldErr}
              </div>
              <button
                type="submit"
                name="submit"
                id="submitForm"
                onClick={() => {}}
              >
                {" "}
                Save
              </button>
            </div>
          </LoanPaymentForm>
        </div>
      )}

      <MakePaymentDiv>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Transaction</th>
              <th>Amount</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {filterdAllPaymentbyIds &&
              filterdAllPaymentbyIds.map((eachPayment) => {
                const {
                  id,
                  amount,
                  cashTrackingId,
                  cashTrackingLoanId,
                  comments,
                  paymentDate,
                  transaction
                } = eachPayment;

                // Date manipulation in required format
                const displayDate = paymentDate.substring(0, 10);
                let Datewa = new Date(paymentDate);
                const yyyy = Datewa.toString().substring(11, 15);
                const dd = Datewa.toString().substring(8, 10);
                const MMM = Datewa.toString().substring(4, 7);
                const DisplayDatewa = `${dd}-${MMM}-${yyyy}`;

                // Amount Manipulation
                const reversestring1 = String(amount)
                  .split("")
                  .reverse()
                  .join("");
                const chunks1 = reversestring1.match(/.{1,3}/g);
                const AmountToShow = chunks1
                  .join(",")
                  .split("")
                  .reverse()
                  .join("");

                return (
                  <tr key={id}>
                    <td> {DisplayDatewa} </td>
                    <td> {transaction} </td>
                    <td> {AmountToShow} </td>
                    <td> {comments} </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <CollapsibleData>
          <div>
            <Title>
              Balance:{" "}
              {` ${BalanceToBePaid.toLocaleString(undefined, {
                maximumFractionDigits: 2
              })}`}
            </Title>
            <span className="subtitle">
              <Subtitle>
                <label class="main">
                  <input type="checkbox" />
                  <span class="geekmark"></span>
                </label>
                Send Report by email to {}
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
          <SubmitButton onClick={() => {}}>Submit</SubmitButton>
        </CollapsibleData>
      </MakePaymentDiv>
    </div>
  );
};

export default CashDairyPayment;

const LoanPaymentForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  background-color: white;
  padding: 5px;
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

const MakePaymentDiv = styled.div``;

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
