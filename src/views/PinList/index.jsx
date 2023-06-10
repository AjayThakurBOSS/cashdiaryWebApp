// Packages:
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { addPin, getAllPin } from "../../api/pin";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
// import Collapsible from 'react-collapsible'
import "./pinlist.css";
import axios from "axios";

// Constants:
import COLORS from "../../styles/colors";

// Components:
import AuthTopbar from "../../components/global/AuthTopbar";
import Collapsible from "../../components/global/Collapsible";
import Table from "../../components/global/Table";
import { AUTH_HEADERS } from "../../api/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { fetchPindata } from "../../redux/actions/pinAction";
import ReadPin from "./ReadPin";
import swal from "sweetalert";
import { BASE } from "../../api/endpoints";
// import UpdatePin from "./UpdatePin";

// Functions:
const PinList = () => {
  const pins = useSelector((state) => state.allPins.pins.data);
  console.log("pin:- ", pins);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPindata());
  }, []);

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

  // states
  const [value, setValue] = useState(todayDate);
  const [emptyFieldError, setEmptyFieldError] = useState("");
  const [show, toggleShow] = useState(false);
  const [formVisible, setFormVisible] = useState(true);

  const [cardName, setCardName] = useState("");
  const [code, setCode] = useState(" ");
  const [lastUpdated, setLastUpdate] = useState(todayDate);
  const toPostlastupdatedDate =
    lastUpdated && new Date(lastUpdated).toISOString();

  const navigate = useNavigate();

  const [components, setComponents] = useState([]);

  function addComponent() {
    setComponents([components]);
  }

  let today = new Date();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let aajKaTime = `${lastUpdated}T${time}Z`;
  console.log(aajKaTime);
  // let isoDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Button Clicked");
    if (
      cardName.length !== 0 &&
      code.length !== 0 &&
      lastUpdated.length !== 0
    ) {
      axios
        .post(
          BASE + "/Pin",
          {
            cardName: cardName,
            code: code,
            lastUpdated: toPostlastupdatedDate,
          },
          { headers: { ...AUTH_HEADERS } }
        )
        .then((res) => {
          toggleShow(!show);
          dispatch(fetchPindata());
          setCardName("");
          setCode("");
          setLastUpdate(todayDate);
          setValue(todayDate)
        });
    } else {
      setEmptyFieldError("Please fill all the input field.");
    }
  };

  return (
    <Wrapper>
      <TopHeaderDiv>
        <span style={{ fontSize: "2.0rem", fontWeight: "700" }}>
          PIN List
        </span>
        <AddnewButton onClick={() => [toggleShow(!show), setEmptyFieldError(), setValue(todayDate)]}>
          {show ? " - " : " + "}
        </AddnewButton>
      </TopHeaderDiv>
      {formVisible && show && (
        <form className="lockerForm" onSubmit={handleSubmit}>
          <div className="formfields">
            <div className="form-control">
              <label htmlFor="cardName">Card Name</label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                onChange={(e) => [
                  setCardName(e.target.value),
                  setEmptyFieldError(),
                ]}
              ></input>
            </div>

            <div className="form-control">
              <label htmlFor="code">Code</label>
              <input
                style={{ marginRight: "1rem", width: "250px" }}
                type="number"
                id="code"
                name="code"
                onChange={(e) => [
                  setCode(e.target.value),
                  setEmptyFieldError(),
                ]}
              ></input>
            </div>

            <div className="form-control">
              <label htmlFor="lastUpdarted">Last Updated </label>
              <input
                type="date"
                id="lastUpdarted"
                name="lastUpdarted"
                value={value}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => [
                  setLastUpdate(e.target.value),
                  setValue(e.target.value),
                  setEmptyFieldError(),
                ]}
              ></input>
            </div>
          </div>
          <div style={{ width: "100%", fontSize: "16px", color: "red" }}>
            {" "}
            {emptyFieldError}
          </div>
          <button type="submit" className="submitButton">
            Submit
          </button>
        </form>
      )}

      <Outlet />
      {/* <EditPin/>  */}
      {/* <UpdatePin/> */}
      {pins && pins.length !== 0 ? (
        <ReadPin />
      ) : (
        <div style={{ fontSize: "20px", margin: "20px 0 0 0" }}>
          Add Pin by clicking on + sign.
        </div>
      )}
    </Wrapper>
  );
};

// Exports:
export default PinList;

// Styles:
const Wrapper = styled.div`
  position: absolute;
  left: 20vw;
  top: 3.75rem;
  width: 80vw;
  height: 100vh;
  max-height: calc(100vh - 3.75rem);
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
    font-size: 1rem;
    font-weight: 400; 
    width: 100vw;
    left: 0;
  }
  @media screen and (min-width: 200px) and (max-width: 576px) {
    font-size: 11px ;
    font-weight: 400; 
    width: 100vw;
    left: 0;
  }
`;

const EditButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const EditButton = styled.div`
  padding: 0.25rem 1.5rem;
  font-weight: 500;
  color: #ffffff;
  background-color: ${COLORS.PRIMARY};
  user-select: none;
  cursor: pointer;
`;
const AddnewButton = styled.button`
  border: none;
  font-size: 1.1rem;
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

const TopHeaderDiv = styled.div`
  position: sticky;
  top: -3rem;
  background-color: white;
  z-index: 9;
  padding: 4px 5px;
`;
