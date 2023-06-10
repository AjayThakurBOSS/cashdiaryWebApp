// Packages:
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  addPasswordLocker,
  getAllPasswordLocker
} from "../../api/passwordLocker";
import { Link, Outlet, useNavigate } from "react-router-dom";

// Constants:
import COLORS from "../../styles/colors";
import "./password.css";

// Components:
import AuthTopbar from "../../components/global/AuthTopbar";
import Collapsible from "../../components/global/Collapsible";
import Table from "../../components/global/Table";
import ReadPassword from "./ReadPassword";
import { useDispatch, useSelector } from "react-redux";
import { fetchPasswordData } from "../../redux/actions/passwordActtion";
import { AUTH_HEADERS } from "../../api/endpoints";
import axios from "axios";
import swal from "sweetalert";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorage";
import { BASE } from "../../api/endpoints";

// Functions:
const Passwords = () => {
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

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [lastUpdated, setLastUpdated] = useState(todayDate);

  const toPostTransactionDate =
    lastUpdated && new Date(lastUpdated).toISOString();

  const navigate = useNavigate();

  const passwords = useSelector((state) => state.allPasswords.passwords.data);
  console.log("Passwords:- ", passwords);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPasswordData());
  }, []);

  const [components, setComponents] = useState([]);
  function addComponent() {
    setComponents([components]);
  }

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
      url.length !== 0 &&
      loginId.length !== 0 &&
      password.length !== 0 &&
      lastUpdated.length !== 0
    ) {
      axios
        .post(
          BASE + "/PasswordLocker",
          {
            name: name,
            url: url,
            loginId: loginId,
            password: password,
            lastUpdated: toPostTransactionDate
            // lastUpdated: new Date(lastUpdated).toISOString(),
            // lastUpdate:new Date(lastUpdated).toISOString() ,
          },
          { headers: { ...AUTH_HEADERS } }
        )
        .then(() => {
          toggleShow(!show);
          dispatch(fetchPasswordData());
          swal({
            text: "Password Data added Successfully!..",
            icon: "success",
            button: "Close"
          });
          // navigate("/read");
          setName("");
          setUrl("");
          setLoginId("");
          setPassword("");
          setLastUpdated(todayDate);
          setValue(todayDate);
        });
    } else {
      setEmptyFieldError("Please fill all the input field.");
    }
  };

  const secretPins = useSelector((state) => state.allSecretPin.secretPin.data);
  console.log("Secret Pins in Get Page,", secretPins);

  const checkForSecretPin = () => {
    if (secretPins.length === 0) {
      swal({
        title: "Secret Pin Not Set.",
        text: "First set secret pin.",
        type: "success",
        button: "Close"
      }).then(() => {
        toggleShow(show);
      });
    } else {
      toggleShow(!show);
    }
  };

  // Return:
  return (
    <Wrapper>
      <TopHeaderDiv>
        <span style={{ fontSize: "2.0rem", fontWeight: "700" }}>
          Password List
        </span>
        <AddnewButton
          onClick={() => [
            setEmptyFieldError(""),
            setValue(todayDate),
            checkForSecretPin()
          ]}
        >
          {" "}
          {show ? " - " : " + "}{" "}
        </AddnewButton>
      </TopHeaderDiv>
      {formVisible && show && (
        <>
          <form className="passwordForm" onSubmit={handleSubmit}>
            <div className="formfields">
              <div className="form-control">
                <label htmlFor="name">Description</label>
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
                <label htmlFor="lockerNumber">URL</label>
                <input
                  type="text"
                  id="lockerNumber"
                  name="lockerNumber"
                  onChange={(e) => [
                    setUrl(e.target.value),
                    setEmptyFieldError(" ")
                  ]}
                ></input>
              </div>

              <div className="form-control">
                <label htmlFor="pin">Login Id</label>
                <input
                  type="text"
                  id="pin"
                  name="pin"
                  onChange={(e) => [
                    setLoginId(e.target.value),
                    setEmptyFieldError(" ")
                  ]}
                ></input>
              </div>

              <div className="form-control">
                <label htmlFor="comments">Password</label>
                <input
                  type="text"
                  id="comments"
                  name="comments"
                  onChange={(e) => [
                    setPassword(e.target.value),
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
                    setEmptyFieldError(""),
                    setValue(e.target.value)
                  ]}
                ></input>
              </div>
            </div>
            <div style={{ width: "100%", fontSize: "16px", color: "red" }}>
              {" "}
              {emptyFieldError}
            </div>

            <button
              type="submit"
              className="submitButton"
              // onClick={showSaveAlert}
            >
              Save
            </button>
          </form>
        </>
      )}

      <Outlet />

      {passwords && passwords.length !== 0 ? (
        <ReadPassword />
      ) : (
        <div style={{ fontSize: "20px", margin: "20px 0 0 0" }}>
          Add Password by clicking on + sign.
        </div>
      )}
    </Wrapper>
  );
};

// Exports:
export default Passwords;

// Styles:
const Wrapper = styled.div`
  position: absolute;
  left: 20vw;
  top: 3.75rem;
  width: 80vw;
  /* height: 100vh; */
  height: calc(100vh - 3.75rem);
  padding: 1.5rem;
  background-color: #f5f3f3;

  overflow: auto;
  float: left;

  @media screen and (min-width: 768px) and (max-width: 992px) {
    font-size: 1rem;
    font-weight: 400;
    width: 100vw;
    left: 0;
  }

  @media screen and (min-width: 576px) and (max-width: 768px) {
    font-size: 16px;
    font-weight: 400;
    width: 100vw;
    left: 0;
  }
  @media screen and (min-width: 200px) and (max-width: 576px) {
    font-size: 10px;
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
  font-size: 30px;
  width: 50px;
  height: 50px;
`;

const TopHeaderDiv = styled.div`
  position: sticky;
  top: -1.8rem;
  background-color: white;
  z-index: 9;
  padding: 4px 5px;
`;
