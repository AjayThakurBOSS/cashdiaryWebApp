// import { Link } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRealEstateAction,
  fetchRealEstateData
} from "../../redux/actions/realEstateAction";
import { FaShareSquare } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Collapsible from "../../components/global/Collapsible";
import styled from "styled-components";
import { MdLocationOn } from "react-icons/md";
const GetRealEstate = () => {
  const dispatch = useDispatch();
  const [firmatedPrice1, setFirmatedPrice1] = useState("");
  const [firmatedPrice2, setFirmatedPrice2] = useState("");
  const AllRealEstateDatas = useSelector(
    (state) => state.AllRealStatesData.realEstate.data
  );

  return (
    <div>
      {" "}
      {AllRealEstateDatas &&
        AllRealEstateDatas.map((eachREdata) => {
          const {
            id,
            name,
            netWorth,
            percentOwn,
            purchasePrice,
            url,
            yearOfPurchase
          } = eachREdata;

          const [lattitude, longitude] = url.split(", ");
          console.log(lattitude, longitude);
          const openLocation = () => {
            const mapUri = `https://www.google.com/maps/search/?api=1&query=${lattitude},${longitude}`;
            window.open(mapUri, "_blank");
            // const uri = `geo:${lat},${lng}?z=15&q=${lat},${lng}`;
          };

          const handleShareClick = () => {
            if (url) {
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

          const handleDelete = () => {
            swal({
              title: "Are you sure? ",
              text: "You want to delete this Real Estate Details !",
              icon: "warning",
              buttons: true,
              dangerMode: true
            })
              .then((willDelete) => {
                if (willDelete) {
                  dispatch(deleteRealEstateAction(id));
                  swal(" Your data has been deleted!", {
                    icon: "success"
                  });
                  dispatch(fetchRealEstateData());
                }
              })
              .then(() => {
                dispatch(fetchRealEstateData());
              });
          };

          const reversestring1 = String(purchasePrice)
            .split("")
            .reverse()
            .join("");
          const reversestring2 = String(netWorth).split("").reverse().join("");

          // Split the reversed string into chunks of three characters
          const chunks1 = reversestring1.match(/.{1,3}/g);
          const chunks2 = reversestring2.match(/.{1,3}/g);

          // Join the chunks with commas and reverse the result
          const formattedNumber1 = chunks1
            .join(",")
            .split("")
            .reverse()
            .join("");
          const formattedNumber2 = chunks2
            .join(",")
            .split("")
            .reverse()
            .join("");

          return (
            <>
              <Collapsible title={name} title1={formattedNumber2}>
                <div className="" style={{ padding: "0" }}>
                  <EachDisplayDiv>
                    <RowContainer>
                      <RowDiv>
                        {" "}
                        <p
                          style={{
                            fontWeight: "500",
                            marginRight: "10px",
                            width: "135px",
                            marginBottom: "0"
                          }}
                        >
                          {" "}
                          Property Name{" "}
                        </p>
                        <p style={{ marginBottom: "0" }}>: {name}</p>{" "}
                      </RowDiv>
                      <RowDiv>
                        {" "}
                        <p
                          style={{
                            fontWeight: "500",
                            marginRight: "10px",
                            width: "135px",
                            marginBottom: "0"
                          }}
                        >
                          Purchase Price{" "}
                        </p>
                        <p style={{ marginBottom: "0" }}>
                          : {formattedNumber1}{" "}
                        </p>{" "}
                      </RowDiv>
                      <RowDiv>
                        {" "}
                        <p
                          style={{
                            fontWeight: "500",
                            marginRight: "10px",
                            width: "135px",
                            marginBottom: "0"
                          }}
                        >
                          Year of Purchase{" "}
                        </p>
                        <p style={{ marginBottom: "0" }}>: {yearOfPurchase} </p>{" "}
                      </RowDiv>
                      <RowDiv>
                        {" "}
                        <p
                          style={{
                            fontWeight: "500",
                            marginRight: "10px",
                            width: "135px",
                            marginBottom: "0"
                          }}
                        >
                          Percent Own{" "}
                        </p>{" "}
                        <p style={{ marginBottom: "0" }}>: {percentOwn} </p>{" "}
                      </RowDiv>
                      <RowDiv>
                        {" "}
                        <p
                          style={{
                            fontWeight: "500",
                            marginRight: "10px",
                            width: "135px",
                            marginBottom: "0"
                          }}
                        >
                          Location{" "}
                        </p>
                        <p style={{ marginBottom: "0" }}>: {url} </p>{" "}
                      </RowDiv>
                      <RowDiv>
                        {" "}
                        <p
                          style={{
                            fontWeight: "500",
                            marginRight: "10px",
                            width: "135px",
                            marginBottom: "0"
                          }}
                        >
                          Net-Worth{" "}
                        </p>
                        <p style={{ marginBottom: "0" }}>
                          : {formattedNumber2}{" "}
                        </p>{" "}
                      </RowDiv>
                    </RowContainer>
                    <CollDiv1>
                      <Link to={`update/${id}`}>
                        <ActionButton className="editBut">
                          {" "}
                          <AiFillEdit />{" "}
                        </ActionButton>
                      </Link>
                      <ActionButton
                        className="delButt"
                        onClick={() => [handleDelete()]}
                      >
                        {" "}
                        <AiFillDelete />{" "}
                      </ActionButton>
                      <ActionButton onClick={openLocation}>
                        {" "}
                        <MdLocationOn />{" "}
                      </ActionButton>

                      {/* <ActionButton onClick={handleShareClick}>
                        {" "}
                        <FaShareSquare />{" "}
                      </ActionButton> */}
                    </CollDiv1>
                  </EachDisplayDiv>
                </div>
              </Collapsible>
            </>
          );
        })}{" "}
    </div>
  );
};

export default GetRealEstate;

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
  padding: 5px;
  margin: 5px 0;
  width: 100%;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
const CollDiv = styled.div`
  font-size: 1rem;
  margin-left: 0rem;
`;
const CollDiv1 = styled.div`
  max-width: 180px;
  width: auto;
  max-height: 80px;
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
  min-width: 80%;
  width: auto;
`;

const ActionButton = styled.button`
  border: 1px solid #002758;
  outline: none;
  background-color: #002758;
  color: white;
  border-radius: 2px;
  margin-left: 1rem;
  height: 2rem;
  width: 2rem;
  font-size: 1rem;
  &:hover {
    background-color: white;
    color: #002758;
    border: 1px solid #002758;
    height: 2rem;
    width: 2rem;
  }
`;
