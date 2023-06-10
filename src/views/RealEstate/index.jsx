// Packages:
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { addRealEstate, getAllRealEstate } from "../../api/realEstate";

// Constants:
import COLORS from "../../styles/colors";
import "./realEstate.css";

// Components:
import AuthTopbar from "../../components/global/AuthTopbar";
import Collapsible from "../../components/global/Collapsible";
import Table from "../../components/global/Table";
import axios from "axios";
import { AUTH_HEADERS } from "../../api/endpoints";
import GetRealEstate from "./GetRealEstate";
import { useDispatch, useSelector } from "react-redux";
import { fetchRealEstateData } from "../../redux/actions/realEstateAction";
import UpdateRealEstate from "./UpdateRealEstate";
import { Outlet } from "react-router-dom";
import swal from "sweetalert";
import { BASE } from "../../api/endpoints";
// import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";

// Functions:
const RealEstate = ({ google }) => {
  const realEstates = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRealEstateData());
  }, []);

  // RealEstate
  const AllRealEstateDatas = useSelector(
    (state) => state.AllRealStatesData.realEstate.data
  );
  const totalNetWorth = () => {
    const totalNworth =
      AllRealEstateDatas &&
      AllRealEstateDatas.reduce((prev, curr) => prev + +curr.netWorth, 0);
    return totalNworth;
  };
  const totalNetworts = totalNetWorth();
  const reversestring1 = String(totalNetworts).split("").reverse().join("");
  const chunks1 = reversestring1.match(/.{1,3}/g);
  const formattedNumber1 = chunks1.join(",").split("").reverse().join("");

  // states
  const [emptyFieldError, setEmptyFieldError] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [show, toggleShow] = useState(false);
  const [name, setName] = useState("");
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [yearOfPurchase, setYearOfPurchase] = useState(0);
  const [percentOwn, setPercentOwn] = useState(0);
  const [url, setUrl] = useState("");
  const [netWorth, setNetWorth] = useState(0);
  const [formVisible, setFormVisible] = useState(true);

  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [coordinates, setCoordinates] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

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
  console.log(lat, lng);
  useEffect(() => {
    // dispatch(fetchLocationData());
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

  const handleSubmitRealState = (e) => {
    e.preventDefault();
    console.log("Button Clicked");
    if (
      name.length !== 0 &&
      purchasePrice.length !== 0 &&
      yearOfPurchase.length !== 0 &&
      percentOwn.length !== 0 &&
      netWorth.length !== 0
    ) {
      axios
        .post(
          BASE + "/RealEstate",
          {
            name: name,
            purchasePrice: purchasePrice,
            yearOfPurchase: yearOfPurchase,
            percentOwn: Math.floor(percentOwn),
            url: `${lat}, ${lng}`,
            netWorth: netWorth
          },
          { headers: { ...AUTH_HEADERS } }
        )
        .then((res) => {
          // console.log(res.data)
          toggleShow(!show);
          swal({
            text: "Real Estate Data added Successfully!..",
            icon: "success",
            button: "Close"
          });
          dispatch(fetchRealEstateData());
          setName(" ");
          setPurchasePrice(0);
          setYearOfPurchase(0);
          setPercentOwn(0);
          setUrl("");
          setNetWorth(0);
        });
    } else {
      setEmptyFieldError("Please fill all the input field.");
    }
  };

  // Effects:
  useEffect(() => {}, []);

  const openMapAction = () => {
    const locationUrl = `https://maps.google.com/?q=26.00,86.00`;
    window.open(locationUrl, "_blank");
  };

  // Return:
  return (
    <Wrapper>
      <TopHeaderDiv>
        <span style={{ fontSize: "2.0rem", fontWeight: "700" }}>
          Real Estate
        </span>
        <AddnewButton onClick={() => [toggleShow(!show), setEmptyFieldError()]}>
          {" "}
          {show ? " - " : " + "}{" "}
        </AddnewButton>
      </TopHeaderDiv>

      {formVisible && show && (
        <FormDiv>
          <MyLocationFormm
            className="realEstateForm"
            onSubmit={handleSubmitRealState}
          >
            <div className="realEstatediv">
              <div>
                <label htmlFor="name ">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={(e) => [
                    setName(e.target.value),
                    setEmptyFieldError()
                  ]}
                ></input>
              </div>

              <div>
                <label htmlFor="purchasePrice">Purchase Price</label>
                <input
                  type="text"
                  id="purchasePrice"
                  name="purchasePrice"
                  onChange={(e) => [
                    setPurchasePrice(e.target.value),
                    setEmptyFieldError()
                  ]}
                ></input>
              </div>

              <div>
                <label htmlFor="yearOfPurchase">Year Of Purchase</label>
                <input
                  type="text"
                  id="yearOfPurchase"
                  name="yearOfPurchase"
                  onChange={(e) => [
                    setYearOfPurchase(e.target.value),
                    setEmptyFieldError()
                  ]}
                ></input>
              </div>

              <div>
                <label htmlFor="percentOwn"> % Own </label>
                <input
                  type="text"
                  id="percentOwn"
                  name="percentOwn"
                  onChange={(e) => [
                    setPercentOwn(e.target.value),
                    setEmptyFieldError()
                  ]}
                ></input>
              </div>

              <div style={{ position: "relative" }}>
                <label htmlFor="url">Location URL</label>
                <input
                  style={{ border: "1px solid #002758", borderRadius: 0 }}
                  name="url"
                  id="url"
                  type="text"
                  placeholder="Latitude, Longitude"
                  value={`${coordinates.lat || ""}, ${coordinates.lng || ""}`}
                  onChange={() => [
                    setEmptyFieldError(""),
                    setUrl(e.target.value)
                  ]}
                />

                {/*  <input
                  type="text"
                  id="url"
                  name="url"
                  onChange={(e) => [
                    setUrl(e.target.value),
                    setEmptyFieldError()
                  ]}
                ></input> */}

                {/* <LocationButton type="button" onClick={openMapAction}>
                  {" "}
                  Open map
                </LocationButton> */}
              </div>

              <div>
                <label htmlFor="netWorth">Net-Worth</label>
                <input
                  type="text"
                  id="netWorth"
                  name="netWorth"
                  onChange={(e) => [
                    setNetWorth(e.target.value),
                    setEmptyFieldError()
                  ]}
                ></input>
              </div>
            </div>

            <div style={{ width: "100%", fontSize: "16px", color: "red" }}>
              {" "}
              {emptyFieldError}
            </div>
            <button type="submit" name="submit" id="submitForm">
              {" "}
              Save
            </button>
          </MyLocationFormm>
          <MapDiv>
            <Map
              google={google}
              zoom={6}
              onClick={handleMapClick}
              initialCenter={{ lat: 17.5000845, lng: 78.4719427 }}
              style={{ width: "520px", height: "310px" }}
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
      {/* <UpdateRealEstate/> */}

      <Outlet />

      {AllRealEstateDatas && AllRealEstateDatas.length !== 0 ? (
        <GetRealEstate />
      ) : (
        <div style={{ fontSize: "20px", margin: "20px 0 0 0" }}>
          Add Real Estate by clicking on + sign.
        </div>
      )}
      <DispTotalNetWorth>
        <span
          style={{ fontSize: "1.25rem", fontWeight: "500" }}
        >{`Total Net Worth: ${formattedNumber1}.00`}</span>
      </DispTotalNetWorth>
    </Wrapper>
  );
};

// Exports:
export default GoogleApiWrapper({
  apiKey: "AIzaSyDuFWwCnaGtKoJIsak6epMLOm4Jyt1homU"
})(RealEstate);

// export default RealEstate;

// Styles:
const Wrapper = styled.div`
  position: absolute;
  left: 20vw;
  top: 3.75rem;
  width: 80vw;
  /* height: 100vh; */
  height: calc(100vh - 3.75rem);
  /* height: calc(100vh - 3.75rem); */
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
    font-size: 16px;
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

const RealEstateHeading = styled.div`
  height: 3rem;
  width: 100%;
  display: flex;
  background-color: #002857;
  margin-bottom: 3px;
  color: white;
  font-size: 22px;
  font-weight: 600;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  padding: 0 10rem 0 2rem;
`;

const DispTotalNetWorth = styled.div`
  display: flex;
  align-self: right;
  align-items: center;
  justify-content: right;
  margin-top: 2rem;
`;

const TopHeaderDiv = styled.div`
  position: sticky;
  top: -1.8rem;
  background-color: white;
  z-index: 9;
  padding: 4px 5px;
`;

const LocationButton = styled.button`
  position: absolute;
  top: 46%;
  left: 60%;
  font-size: 10px;
  padding: 0;
  margin: 0;
`;

const FormDiv = styled.div`
  display: flex;
  flex-direction: row;

  padding: 2px;
  /* align-items: space-between; 
  justify-content: space-between;*/
  @media screen and (min-width: 200px) and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
`;

const MyLocationFormm = styled.form`
  display: flex;
  flex-direction: column;
  width: 620px;
  background-color: white;
  align-items: center;
  justify-content: center;
`;

const MapDiv = styled.form`
  margin-top: 5px;
  height: 315px;
  border: 1px solid #002758;
`;
