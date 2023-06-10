import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../Lockers/readData.css";
import { deletePinAction, fetchPindata } from "../../redux/actions/pinAction";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import swal from "sweetalert";
import styled from "styled-components";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const ReadPin = () => {
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const allPins = useSelector((state) => state.allPins.pins.data);
  console.log("allpins:-", allPins);
  const [show, setShow] = useState(false);
  const handleClose = () => [setShow(false), setSecretPinErr("")];
  const handleShow = () => setShow(true);
  const [secretPinErr, setSecretPinErr] = useState("");
  const [inputSecretPin, setInputSecretPin] = useState("");
  const secretPins = useSelector((state) => state.allSecretPin.secretPin.data);
  console.log("Secret Pins in Get Page,", secretPins);

  const secretPinForCompare = secretPins && secretPins[0].secretPin;
  console.log(secretPinForCompare);

  const AllPins =
    allPins &&
    allPins.map((eachPin) => {
      const { id, cardName, code, lastUpdated } = eachPin;
      let displayDate = lastUpdated.toString().substring(0, 10);
      let Datewa = new Date(lastUpdated);
      const yyyy = Datewa.toString().substring(11, 15);
      const dd = Datewa.toString().substring(8, 10);
      const MMM = Datewa.toString().substring(4, 7);
      console.log("Datewa: ", Datewa, dd, MMM, yyyy);
      const DisplayDatewa = `${dd}-${MMM}-${yyyy}`;

      const handleClick = (id) => {
        if (inputSecretPin === secretPinForCompare) {
          setIsHidden(!isHidden);
          handleClose();
          setSecretPinErr("");
        } else {
          setSecretPinErr("Invalid Secret Pin.");
        }
      };

      const handleDelete = () => {
        swal({
          title: "Are you sure? ",
          text: "You want to delete this PIN !",
          icon: "warning",
          buttons: true,
          dangerMode: true
        })
          .then((willDelete) => {
            if (willDelete) {
              dispatch(deletePinAction(id));
              dispatch(fetchPindata());
              swal(" Your data has been deleted!", {
                icon: "success"
              });
            }
            console.log("yaha tk aaya");
            dispatch(fetchPindata());
          })
          .then((willDelete) => {
            console.log("yaha tk aaya");
            dispatch(fetchPindata());
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
                      width: "100px",
                      marginBottom: "0"
                    }}
                  >
                    {" "}
                    Name{" "}
                  </p>
                  <p style={{ marginBottom: "0" }}>: {cardName}</p>{" "}
                </RowDiv>
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
                    Code{" "}
                  </p>
                  <p style={{ marginBottom: "0" }}>
                    : {isHidden ? code.replace(/./g, "*") : code}{" "}
                    <Button
                      style={{
                        backgroundColor: "white",
                        border: "none",
                        padding: "0 20px"
                      }}
                      onClick={() => [setClicked(id), handleShow()]}
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
                      width: "100px",
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
                          </Form.Group>
                  */}
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
      <div> {AllPins} </div>
    </>
  );
};

export default ReadPin;

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
const LinkWithStyle = styled(Link)`
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
