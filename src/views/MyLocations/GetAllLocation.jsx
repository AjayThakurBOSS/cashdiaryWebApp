import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { MdLocationOn } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { FaShareSquare } from "react-icons/fa";
import swal from "sweetalert";
import {
  deleteLocationAction,
  fetchLocationData
} from "../../redux/actions/locationAction";

const GetAllLocation = () => {
  const dispatch = useDispatch();
  // console.log("lattitude", props.latt)
  const AllLocations = useSelector(
    (state) => state.allLocationsData.allLocation.data
  );
  console.log("All Locations : ", AllLocations);

  const Sorted_Date_AllLocations =
    AllLocations &&
    AllLocations.sort((a, b) => {
      return new Date(a.dateAdded) - new Date(b.dateAdded);
    });

  // const baseUrl = 'https://www.google.com/maps/search/?api=1&query=';
  // const encodedCoordinates = encodeURIComponent(`${},${}`);
  // const mapUrl = `${baseUrl}${encodedCoordinates}`;

  const handleDelete = (id) => {
    swal({
      title: "Are you sure? ",
      text: "You want to delete this Location Data!..",
      icon: "warning",
      buttons: true,
      dangerMode: true
    })
      .then((willDelete) => {
        if (willDelete) {
          dispatch(deleteLocationAction(id));

          swal(" Your data has been deleted!", {
            icon: "success"
          });
          dispatch(fetchLocationData());
        }
        dispatch(fetchLocationData());
      })
      .then((willDelete) => {
        dispatch(fetchLocationData());
      });
  };

  return (
    <div>
      {Sorted_Date_AllLocations &&
        Sorted_Date_AllLocations.map((eachLocation) => {
          const { id, dateAdded, locationCoordinates, name } = eachLocation;
          const displaydate = dateAdded.substring(0, 10);
          const [lattitude, longitude] = locationCoordinates.split(", ");
          console.log(lattitude, longitude);
          const openLocation = () => {
            const mapUri = `https://www.google.com/maps/search/?api=1&query=${lattitude},${longitude}`;
            window.open(mapUri, "_blank");
            // const uri = `geo:${lat},${lng}?z=15&q=${lat},${lng}`;
          };

          const handleShareClick = () => {
            if (locationCoordinates) {
              const locationUrl = `https://maps.google.com/?q=${lattitude},${longitude}`;
              if (navigator.share) {
                navigator
                  .share({
                    title: "Share Location",
                    url: locationUrl
                  })
                  .then(() => console.log("Location shared successfully."))
                  .catch((error) =>
                    console.log("Error sharing location:", error)
                  );
              } else {
                window.open(locationUrl, "_blank");
              }
            } else {
              console.log("Geolocation is not supported by this browser.");
            }
          };

          let Datewa = new Date(dateAdded);
          const yyyy = Datewa.toString().substring(11, 15);
          const dd = Datewa.toString().substring(8, 10);
          const MMM = Datewa.toString().substring(4, 7);
          console.log("Datewa: ", Datewa, dd, MMM, yyyy);
          const DisplayDatewa = `${dd}-${MMM}-${yyyy}`;

          return (
            <MapDisplayer>
              <EachDisplayDiv>
                <RowContainer>
                  <RowDiv>
                    {" "}
                    <p
                      style={{
                        fontWeight: "500",
                        marginRight: "10px",
                        width: "100px",
                        marginBottom: "0"
                      }}
                    >
                      {" "}
                      Name{" "}
                    </p>
                    <p style={{ marginBottom: "0" }}>: {name}</p>{" "}
                  </RowDiv>
                  <RowDiv>
                    <p
                      style={{
                        fontWeight: "500",
                        marginRight: "10px",
                        width: "100px",
                        marginBottom: "0"
                      }}
                    >
                      Location
                    </p>
                    <p style={{ marginBottom: "0", width: "auto" }}>
                      : {locationCoordinates}
                    </p>
                  </RowDiv>
                  <RowDiv>
                    <p
                      style={{
                        fontWeight: "500",
                        marginRight: "10px",
                        width: "100px",
                        marginBottom: "0"
                      }}
                    >
                      Added On{" "}
                    </p>
                    <p style={{ marginBottom: "0" }}>: {DisplayDatewa} </p>{" "}
                  </RowDiv>
                </RowContainer>
                <CollDiv1>
                  {/* <LocationButton onClick={handleShareClick}>
                  {" "}
                  <FaShareSquare />{" "}
                </LocationButton> */}
                  <LocationButton onClick={openLocation}>
                    {" "}
                    <MdLocationOn />{" "}
                  </LocationButton>
                  <LocationButton onClick={() => handleDelete(id)}>
                    {" "}
                    <AiFillDelete />{" "}
                  </LocationButton>
                </CollDiv1>
              </EachDisplayDiv>
            </MapDisplayer>
          );
        })}
    </div>
  );
};

export default GetAllLocation;

const MapDisplayer = styled.div`
  background-color: white;
  padding: 5px;
  margin: 5px 0 0 0;
  width: 100%;
`;

const LocationButton = styled.button`
  outline: none;
  border: none;
  background-color: white;
  color: #002758;
  font-size: 18px;
  margin: 0 10px 0 0;
  padding: 0;
  float: right;
`;

const EachDisplayDiv = styled.div`
  display: flex;
  background-color: white;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 5px;
  margin: 5px 0;
  width: 100%;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
`;
const CollDiv = styled.div`
  font-size: 1rem;
  margin-left: 0rem;
`;
const CollDiv1 = styled.div`
  max-width: 180px;
  max-height: 70px;
  margin-right: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: flex-start;
`;
const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 90%;
  width: auto;
`;
