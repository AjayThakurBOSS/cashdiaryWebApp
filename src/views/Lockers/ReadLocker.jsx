import React from "react";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { AUTH_HEADERS } from "../../api/endpoints";
import "./readData.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLockerAction,
  fetchLockerData
} from "../../redux/actions/lockerAction";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import swal from "sweetalert";
import styled from "styled-components";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

// Function
const ReadLocker = () => {
  const dispatch = useDispatch();
  const lockers = useSelector((state) => state.allLockers.lockers.data);
  console.log(lockers);
  const [secretPinErr, setSecretPinErr] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => [setShow(false), setSecretPinErr("")];
  const handleShow = () => setShow(true);
  const secretPins = useSelector((state) => state.allSecretPin.secretPin.data);
  console.log("Secret Pins in Get Page,", secretPins);

  const secretPinForCompare = secretPins && secretPins[0].secretPin;
  console.log(secretPinForCompare);

  const [inputSecretPin, setInputSecretPin] = useState("");
  const [clicked, setClicked] = useState(false);

  const handleClick = (name) => {
    if (inputSecretPin === secretPinForCompare) {
      setIsHidden(!isHidden);
      handleClose();
      setSecretPinErr("");
    } else {
      setSecretPinErr("Invalid Secret Pin.");
    }
  };

  const Alllockers =
    lockers &&
    lockers.map((eachLocker) => {
      const { id, name, lockerNumber, lastUpdated, comments, pin } = eachLocker;
      let displayDate = lastUpdated.toString().substring(0, 10);
      let Datewa = new Date(lastUpdated);
      const yyyy = Datewa.toString().substring(11, 15);
      const dd = Datewa.toString().substring(8, 10);
      const MMM = Datewa.toString().substring(4, 7);
      console.log("Datewa: ", Datewa, dd, MMM, yyyy);
      const DisplayDatewa = `${dd}-${MMM}-${yyyy}`;

      const handleDelete = () => {
        swal({
          title: "Are you sure? ",
          text: "You want to delete this Locker Data !",
          icon: "warning",
          buttons: true,
          dangerMode: true
        })
          .then((willDelete) => {
            if (willDelete) {
              dispatch(deleteLockerAction(id));
              swal(" Your data has been deleted!", {
                icon: "success"
              });
              dispatch(fetchLockerData());
            }
          })
          .then(() => {
            dispatch(fetchLockerData());
          });
      };

      return (
        <>
          <div className="readData" key={id}>
            <EachDisplayDiv>
              <RowContainer>
                <RowDiv>
                  {" "}
                  <p
                    style={{
                      fontWeight: "500",
                      marginRight: "10px",
                      width: "120px",
                      marginBottom: "0"
                    }}
                  >
                    {" "}
                    Name{" "}
                  </p>
                  <p style={{ marginBottom: "0" }}>: {name}</p>{" "}
                </RowDiv>
                <RowDiv>
                  {" "}
                  <p
                    style={{
                      fontWeight: "500",
                      marginRight: "10px",
                      width: "120px",
                      marginBottom: "0"
                    }}
                  >
                    Locker Number{" "}
                  </p>
                  <p style={{ marginBottom: "0" }}>: {lockerNumber} </p>{" "}
                </RowDiv>
                <RowDiv>
                  {" "}
                  <p
                    style={{
                      f: "500",
                      marginRight: "10px",
                      width: "120px",
                      marginBottom: "0"
                    }}
                  >
                    PIN{" "}
                  </p>
                  <p style={{ marginBottom: "0" }}>
                    :{isHidden ? pin.replace(/./g, "*") : pin}
                    <Button
                      style={{
                        backgroundColor: "white",
                        border: "none",
                        padding: "0 20px"
                      }}
                      onClick={() => [setClicked(name), handleShow()]}
                    >
                      {isHidden ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </Button>
                  </p>{" "}
                </RowDiv>
                <RowDiv>
                  {" "}
                  <p
                    style={{
                      fontWeight: "500",
                      marginRight: "10px",
                      width: "120px",
                      marginBottom: "0"
                    }}
                  >
                    Comments{" "}
                  </p>{" "}
                  <p style={{ marginBottom: "0" }}>: {comments} </p>{" "}
                </RowDiv>
                <RowDiv>
                  {" "}
                  <p
                    style={{
                      fontWeight: "500",
                      marginRight: "10px",
                      width: "120px",
                      marginBottom: "0"
                    }}
                  >
                    Last Updated{" "}
                  </p>
                  <p style={{ marginBottom: "0" }}>: {DisplayDatewa} </p>{" "}
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
              </CollDiv1>
            </EachDisplayDiv>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Enter Secret Pin</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Secret Pin</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Secret Pin"
                      onChange={(e) => [
                        setInputSecretPin(e.target.value),
                        setSecretPinErr("")
                      ]}
                      autoFocus
                    />
                  </Form.Group>
                  <span
                    style={{ width: "100%", color: "red", fontSize: "12px" }}
                  >
                    {" "}
                    {secretPinErr}{" "}
                  </span>
                  {/* <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                          >
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                          </Form.Group> */}
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  style={{
                    border: "1px solid #002758",
                    backgroundColor: "white"
                  }}
                  onClick={handleClose}
                >
                  Close
                </Button>
                <Button
                  style={{
                    border: "1px solid #002758",
                    backgroundColor: "white"
                  }}
                  onClick={() => [handleClick(id)]}
                >
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </>
      );
    });

  return (
    <>
      <div> {Alllockers} </div>
    </>
  );
};

export default ReadLocker;

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
  width: 70%;
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
