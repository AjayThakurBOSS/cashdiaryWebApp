// Packages:
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Link, Outlet, useNavigate } from "react-router-dom";
import GoogleMapReact from "google-map-react";
// Constants:
import COLORS from "../../styles/colors";
import { LoadScript } from "@googlemaps/js-api-loader";

// Components:
import AuthTopbar from "../../components/global/AuthTopbar";
import Collapsible from "../../components/global/Collapsible";
import { useDispatch, useSelector } from "react-redux";
import { fetchPasswordData } from "../../redux/actions/passwordActtion";
import { AUTH_HEADERS } from "../../api/endpoints";
import axios from "axios";
import swal from "sweetalert";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorage";
import { useMemo } from "react";
import GetAllLocation from "./GetAllLocation";
import { fetchLocationData } from "../../redux/actions/locationAction";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { BASE } from "../../api/endpoints";

// Functions:
const MyLocations = ({ google }) => {
  const dispatch = useDispatch();
  const AllLocations = useSelector(
    (state) => state.allLocationsData.allLocation.data
  );

  const [show, toggleShow] = useState(false);
  const navigate = useNavigate();

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
  const [emptyFieldError, setEmptyFieldError] = useState("");
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [coordinates, setCoordinates] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [dateAdded, setDateAdded] = useState(todayDate);
  const toPostAddedDate = dateAdded && new Date(dateAdded).toISOString();

  const handleMapClick = (_, map, clickEvent) => {
    const { latLng } = clickEvent;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setCoordinates({ lat, lng });
    setLat(lat);
    setLng(lng);
    setCoordinates({ lat, lng });
    return { lat, lng };
  };
  useEffect(() => {
    dispatch(fetchLocationData());
    // Get user's current position using geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ lat: latitude, lng: longitude });
        setCenter({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error getting current position:", error);
      }
    );
  }, []); // Run the effect only once, on component mount

  const handleLocationPost = (e) => {
    e.preventDefault();
    if (
      name.length !== 0 &&
      coordinates.length !== 0 &&
      dateAdded.length !== 0
    ) {
      axios
        .post(
          BASE + `/Location`,
          {
            name: name,
            locationCoordinates: `${lat}, ${lng}`,
            dateAdded: toPostAddedDate,
          },
          { headers: { ...AUTH_HEADERS } }
        )
        .then((resp) => {
          console.log("Response of location:-", resp);
          toggleShow(!show);
          dispatch(fetchLocationData());
          swal({
            text: " Data saved Successfully!..",
            icon: "success",
            button: "Close",
          });
          setName("");
          setDateAdded(todayDate);
          setValue(todayDate);
        });
    } else {
      setEmptyFieldError("Please fill all the input field.");
    }
  };

  // useEffect(()=> {
  //   dispatch(fetchLocationData())
  // },[])

  // Return:
  return (
    <Wrapper>
      <TopHeaderDiv>
        <span style={{ fontSize: "2.0rem", fontWeight: "700" }}>
          My Locations
        </span>
        <AddnewButton
          onClick={() => [
            toggleShow(!show),
            setEmptyFieldError(""),
            setValue(todayDate),
          ]}
        >
          {show ? " - " : " + "}
        </AddnewButton>
      </TopHeaderDiv>
      {show && (
        <FormDiv>
          <MyLocationFormm onSubmit={handleLocationPost}>
            <div className="form-control">
              <label htmlFor="name"> Name</label>
              <input
                style={{ border: "1px solid #002758", borderRadius: 0 }}
                type="text"
                id="name"
                name="name"
                onChange={(e) => [
                  setName(e.target.value),
                  setEmptyFieldError(""),
                ]}
              ></input>
            </div>

            <div className="form-control">
              <label htmlFor="locationCoordinates">Coordinates:</label>
              <input
                style={{ border: "1px solid #002758", borderRadius: 0 }}
                name="locationCoordinates"
                id="locationCoordinates"
                type="text"
                placeholder="Latitude, Longitude"
                value={`${coordinates.lat || ""}, ${coordinates.lng || ""}`}
                onChange={() => setEmptyFieldError("")}
              />
            </div>

            <div className="form-control">
              <label htmlFor="dateAdded">Last Updated </label>
              <input
                style={{ border: "1px solid #002758" }}
                type="date"
                id="dateAdded"
                name="dateAdded"
                value={value}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => [
                  setDateAdded(e.target.value),
                  setEmptyFieldError(""),
                  setValue(e.target.value)
                ]}
              ></input>
            </div>
            <div style={{ width: "100%", fontSize: "16px", color: "red" }}>
              {" "}
              {emptyFieldError}
            </div>

            <button type="submit" className="submitButton">
              Save
            </button>
          </MyLocationFormm>

          <MapDiv>
            <Map
              google={google}
              zoom={6}
              onClick={handleMapClick}
              initialCenter={{ lat: 17.5000845, lng: 78.4719427 }}
              style={{ width: "626px", height: "315px" }}
              // initialCenter={{ lat: 37.7749, lng: -122.4194 }}
              center={coordinates}
            >
              {coordinates.lat && coordinates.lng && (
                <Marker position={coordinates} />
              )}
            </Map>
          </MapDiv>
        </FormDiv>
      )}

      {AllLocations && AllLocations.length !== 0 ? (
        <GetAllLocation />
      ) : (
        <div style={{ fontSize: "20px", margin: "20px 0 0 0" }}>
          Add your Location by clicking on + sign.
        </div>
      )}
    </Wrapper>
  );
};

// Exports:
export default GoogleApiWrapper({
  apiKey: "AIzaSyDuFWwCnaGtKoJIsak6epMLOm4Jyt1homU",
})(MyLocations);
// export default MyLocations;

// Styles:
const Wrapper = styled.div`
  position: absolute;
  left: 20vw;
  top: 3.75rem;
  width: 80vw;
  /* height: 100vh; */
  /* max-height: calc(100vh - 3.75rem); */
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
const FormDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: calc(100% - 580px);
  padding: 2px;
  /* align-items: space-between; */
  justify-content: space-between;

`;

const MyLocationFormm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  background-color: white;
  align-items: center;
  justify-content: center;
`;
const MapDiv = styled.form`
  width: calc(75vw - 300px);
  /* width:625px; */
  height: 315px;
  border: 1px solid #002758;

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
