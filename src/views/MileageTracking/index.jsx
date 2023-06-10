// Packages:
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getAllMileageTracking } from "../../api/mileageTracking";
import axios from "axios";
import { AUTH_HEADERS } from "../../api/endpoints";
import "./milagetracking.css";

// Imports:
import { CheckBox } from "@mui/icons-material";

// Components:
import Collapsible from "../../components/global/Collapsible";
import Table from "../../components/global/Table";
import GetMilageTracking from "./GetMilageTracking";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMilageDataBetweenDates,
  fetchMilageTrackingData,
} from "../../redux/actions/milageTrackingAction";
import swal from "sweetalert";
import Moment from "react-moment";
import { BASE } from "../../api/endpoints";

// Functions:
const MileageTracking = () => {
  const dispatch = useDispatch();
  const milageDatas = useSelector((state) => state);
  console.log("MilageDatas:- ", milageDatas);

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
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [purpose, setPurpose] = useState("");
  const [kiloMeters, setKiloMeters] = useState(0);
  const [dateOfDrive, setDateOfDrive] = useState(todayDate);

  const toPostDateOfDrive =dateOfDrive &&  (new Date(dateOfDrive)).toISOString();

  console.log(name, from, to, purpose, kiloMeters, dateOfDrive);

  // Search Date
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  var today = new Date();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let abhi = `${dateOfDrive}T${time}Z`;
  console.log(abhi);

  useEffect(() => {
    dispatch(fetchMilageTrackingData());
    dispatch(fetchMilageDataBetweenDates(startDate, endDate));
  }, []);

  const handleEmailSend = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Button Clicked");
    if (
      name.length !== 0 &&
      from.length !== 0 &&
      to.length !== 0 &&
      purpose.length !== 0 &&
      kiloMeters.length !== 0 &&
      dateOfDrive.length !== 0
    ) {
      axios
        .post( BASE +  `/MileageTracking`,
          {
            name: name,
            from: from,
            to: to,
            purpose: purpose,
            kiloMeters: kiloMeters,
            dateOfDrive: toPostDateOfDrive,
          },
          { headers: { ...AUTH_HEADERS } }
        )
        .then((res) => {
          toggleShow(!show);
          dispatch(fetchMilageTrackingData());
          swal({
            text: " Data saved Successfully!..",
            icon: "success",
            button: "Close",
          });
          setName("");
          setFrom("");
          setTo("");
          setPurpose("");
          setKiloMeters("");
          setDateOfDrive(todayDate);
          setValue(todayDate)
        });
    } else {
      setEmptyFieldError("Please fill all the input field.");
    }
  };

  const handleMilageSearch = (e) => {
    e.preventDefault();
    dispatch(fetchMilageDataBetweenDates(startDate, endDate));
  };

  const [data, setData] = useState({
    balance: 0,
    sendReportByEmail: {
      toName: false,
      toMe: false,
    },
    rows: [
      {
        dateOfDrive: "",
        from: "",
        id: "",
        kiloMeters: 0,
        name: "",
        purpose: "",
      },
    ],
  });

  // Return:
  return (
    <Wrapper>
      <TopHeaderDiv>
        <HeaderInIndex>
          <span style={{ fontSize: "2.0rem", fontWeight: "700" }}>
            Mileage Tracking
          </span>
          <SearchForm onSubmit={handleMilageSearch}>
           <div>
           From
            <input
              type="date"
              style={{ width: "120px", marginRight: "5px", marginLeft: "3px", marginBottom:'0' }}
              name="startDate"
              id="startDate"
              onChange={(e) => setStartDate(e.target.value)}
            />
           </div>
           <div>
           To
            <input
              type="date"
              style={{ width: "120px", marginLeft: "5px", marginRight: "5px", marginBottom:'0'  }}
              name="endDate"
              id="endDate"
              onChange={(e) => setEndDate(e.target.value)}
            />
           </div>
            <div>
            <SearchButton onClick={handleMilageSearch}>Apply</SearchButton>
            <SearchButton onClick={() => [dispatch(fetchMilageTrackingData()), document.getElementById("startDate").value = "", document.getElementById("endDate").value = "", setStartDate(''),  setEndDate('')]}>
              Cancel
            </SearchButton>
            </div>
          </SearchForm>
          <AddnewButton
            onClick={() => [toggleShow(!show),setEmptyFieldError(''), setValue(todayDate)]}
            className="addNewIcon"
          >
            {show ? " - " : " + "}
          </AddnewButton>
        </HeaderInIndex>
      </TopHeaderDiv>
      {show && (
        <div>
          <form className="milageTrackingForm" onSubmit={handleSubmit}>
            <div className="milageTrackingDiv">
              <div>
                <label htmlFor="name">Business Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={(e) => [
                    setName(e.target.value),
                    setEmptyFieldError(''),
                  ]}
                ></input>
              </div>

              <div>
                <label htmlFor="from">From</label>
                <input
                  type="text"
                  id="from"
                  name="from"
                  onChange={(e) => [
                    setFrom(e.target.value),
                    setEmptyFieldError(''),
                  ]}
                ></input>
              </div>

              <div>
                <label htmlFor="to">To</label>
                <input
                  type="text"
                  id="to"
                  name="to"
                  onChange={(e) => [
                    setTo(e.target.value),
                    setEmptyFieldError(''),
                  ]}
                ></input>
              </div>
              <div>
                <label htmlFor="purpose">Purpose</label>
                <input
                  type="text"
                  id="purpose"
                  name="purpose"
                  onChange={(e) => [
                    setPurpose(e.target.value),
                    setEmptyFieldError(''),
                  ]}
                ></input>
              </div>

              <div>
                <label htmlFor="kiloMeters">Distance Driven</label>
                <input
                  type="number"
                  id="kiloMeters"
                  name="kiloMeters"
                  onChange={(e) => [
                    setKiloMeters(e.target.value),
                    setEmptyFieldError(''),
                  ]}
                ></input>
              </div>

              <div>
                <label htmlFor="dateOfDrive">Date of Travel</label>
                <input
                  type="date"
                  id="dateOfDrive"
                  name="dateOfDrive"
                  value={value}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => [
                    setDateOfDrive(e.target.value),
                    setValue(e.target.value),
                    setEmptyFieldError(''),
                  ]}
                ></input>
              </div>
            </div>
            <div style={{ width: "100%", fontSize: "16px", color: "red" }}>
              {emptyFieldError}
            </div>

            <AddnewButtons type="submit" name="submit" id="submit">
              save
            </AddnewButtons>
          </form>
        </div>
      )}

      <Outlet />
      <GetMilageTracking />
    </Wrapper>
  );
};

// Exports:
export default MileageTracking;

// Styles:
const Wrapper = styled.div`
  position: absolute;
  left: 20vw;
  top: 3.75rem;
  width: 80vw;
  /* height: 100vh; */
  /* max-height:calc(100vh - 3.75rem) ; */
  height: calc(100vh - 3.75rem);
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
    font-size: 10px ;
    font-weight: 400; 
    width: 100vw;
    left: 0;
  }
  @media screen and (min-width: 200px) and (max-width: 576px) {
    font-size: 10px ;
    font-weight: 400; 
    width: 100vw;
    left: 0;
  }
`;

const CollapsibleData = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const Title = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #007700;
`;

const Subtitle = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  color: #333333;
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
  font-size: 30px;
  width: 50px;
  height: 50px;
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

const HeaderInIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SearchButton = styled.button`
  background-color: #002758;
  color: white;
  margin: 0 0.5rem 0 0;
  border: none;
  outline: none;
  border-radius: 2px;
  padding: 3.3px 5px;
`;

const TopHeaderDiv = styled.div`
  position: sticky;
  top: -1.8rem;
  background-color: white;
  z-index: 9;
  padding: 4px 5px;
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: flex-end;
`
