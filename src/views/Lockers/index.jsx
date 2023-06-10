// Packages:
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { addLocker, getAllLocker } from "../../api/locker";
import "./lockerMain.css";
import axios from "axios";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useNavigate
} from "react-router-dom";

// Constants:
import COLORS from "../../styles/colors";

// Components:
import AuthTopbar from "../../components/global/AuthTopbar";
import Collapsible from "../../components/global/Collapsible";
import Table from "../../components/global/Table";

import LockerForm from "./LockerForm";
import ReadLocker from "./ReadLocker";
import UpdateLocker from "./UpdateLocker";
import { useDispatch, useSelector } from "react-redux";
import { fetchLockerData } from "../../redux/actions/lockerAction";
import { AUTH_HEADERS } from "../../api/endpoints";
import swal from "sweetalert";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorage";
import { BASE } from "../../api/endpoints";

// Functions:
const Lockers = () => {
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
  const [formVisible, setFormVisible] = useState(true);
  const [show, toggleShow] = useState(false);
  const [name, setName] = useState("");
  const [lackerNumber, setLockerNumber] = useState("");
  const [pin, setPin] = useState();
  const [comments, setComments] = useState("");
  const [lastUpdated, setLastUpdated] = useState(todayDate);

  const toPostLastUpdatedDate =
    lastUpdated && new Date(lastUpdated).toISOString();

  const navigate = useNavigate();
  const lockers = useSelector((state) => state.allLockers.lockers.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLockerData());
  }, []);

  var today = new Date();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let aajKaTime = `${lastUpdated}T${time}Z`;
  console.log(aajKaTime);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Button Clicked");
    if (
      name.length !== 0 &&
      lackerNumber.length !== 0 &&
      pin.length !== 0 &&
      comments.length !== 0 &&
      lastUpdated.length !== 0
    ) {
      axios
        .post(
          BASE + "/Locker",
          {
            name: name,
            lockerNumber: lackerNumber,
            pin: pin,
            lastUpdated: toPostLastUpdatedDate,
            comments: comments
          },
          { headers: { ...AUTH_HEADERS } }
        )
        .then(() => {
          toggleShow(!show);
          dispatch(fetchLockerData());
          swal({
            text: "Locker Data added Successfully!..",
            icon: "success",
            button: "Close"
          });
          setName("");
          setLockerNumber("");
          setPin();
          setComments("");
          setLastUpdated(todayDate);
          setValue(todayDate);
        })
        .catch((err) => {
          setEmptyFieldError("Input Field error");
        });
    } else {
      setEmptyFieldError("Please fill all the input field.");
    }
  };

  // Return:
  return (
    <>
      <Wrapper>
        <TopHeaderDiv>
          <span style={{ fontSize: "2.0rem", fontWeight: "700" }}>Lockers</span>
          <AddnewButton
            onClick={() => [
              toggleShow(!show),
              setEmptyFieldError(""),
              setValue(todayDate)
            ]}
          >
            {" "}
            {show ? " - " : " + "}{" "}
          </AddnewButton>
        </TopHeaderDiv>

        {formVisible && show && (
          <form className="lockerForm" onSubmit={handleSubmit}>
            <div className="formfields">
              <div className="form-control">
                <label htmlFor="name">Locker Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={(e) => [
                    setName(e.target.value),
                    setEmptyFieldError(" ")
                  ]}
                ></input>
              </div>

              <div className="form-control">
                <label htmlFor="lockerNumber">Locker Number</label>
                <input
                  type="text"
                  id="lockerNumber"
                  name="lockerNumber"
                  onChange={(e) => [
                    setLockerNumber(e.target.value),
                    setEmptyFieldError(" ")
                  ]}
                ></input>
              </div>

              <div className="form-control">
                <label htmlFor="pin">Pin</label>
                <input
                  style={{ width: "250px" }}
                  type="number"
                  id="pin"
                  name="pin"
                  onChange={(e) => [
                    setPin(e.target.value),
                    setEmptyFieldError(" ")
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
                    setLastUpdated(e.target.value),
                    setValue(e.target.value),
                    setEmptyFieldError(" ")
                  ]}
                ></input>
              </div>

              <div className="form-control">
                <label htmlFor="comments">Comments</label>
                <textarea
                  style={{ border: "1px solid #003857", borderRadius: "0" }}
                  type="text"
                  id="comments"
                  name="comments"
                  maxLength="256"
                  onChange={(e) => [
                    setComments(e.target.value),
                    setEmptyFieldError(" ")
                  ]}
                ></textarea>
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
        <div className="readLockerDisplay">
          {lockers && lockers.length !== 0 ? (
            <ReadLocker />
          ) : (
            <div style={{ fontSize: "20px", margin: "20px 0 0 0" }}>
              Add Locker by clicking on + sign.
            </div>
          )}
        </div>
      </Wrapper>
    </>
  );
};

// Exports:
export default Lockers;

// Styles:
const Wrapper = styled.div`
  position: absolute;
  left: 20vw;
  top: 3.75rem;
  width: 80vw;
  /* height: 100vh; */
  /* max-height:calc(98vh - 3.75rem) ; */
  height: calc(100vh - 3.75rem);
  padding: 1.5rem;
  background-color: #f5f3f3;
  /* margin-top: 3rem; */
  overflow: auto;
  float: left;

  @media screen and (min-width: 768px) and (max-width: 992px) {
    font-size: 1rem;
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
    font-size: 11px;
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
  /* margin-bottom: 10px; */
  float: right;
  padding: 2px 1rem;
  width: 50px;
  height: 50px;
  font-size: 30px;
`;

const TopHeaderDiv = styled.div`
  position: sticky;
  top: -1.8rem;
  background-color: white;
  z-index: 9;
  padding: 4px 5px;
`;
