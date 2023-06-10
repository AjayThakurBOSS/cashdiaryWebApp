import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchPasswordData, updatePasswordAction } from "../../redux/actions/passwordActtion";
import Moment from "react-moment";
import ROUTES from "../../routes";
import swal from "sweetalert";
import { fetchPindata, updatePinAction } from "../../redux/actions/pinAction";


const UpdatePin = () => {
const navigate = useNavigate();
  // const [lastUpdated, setLastUpdated]  = useState()

  // const updatedDate =(new Date(lastUpdated)).toISOString()

  const dispatch = useDispatch()

  const { id } = useParams();
  // console.log({id})
  const [updatePin, setUpdatePin] = useState([]);
  const allPins = useSelector((state) => state.allPins.pins)
  console.log("allpins:-",allPins)
  // console.log(passwords.data)
 
  useEffect(() => {
    if (id) {
      // console.log(id)
      const singlePin = allPins.data.filter((ele) => {
        return ele.id == id;
      });
      setUpdatePin(singlePin[0]);
    }
   
  },[id]); 

  // let displayDate = updatePassword.lastUpdated.toString().substring(0,10);

  // const newPassword = (e) => {  
  //   console.log(e)
  //   setUpdatePin({ ...updatePin, [e.target.cardName]: e.target.value, 
  //     [e.target.code]: e.target.value,
       
  //      [e.target.lastUpdated]: e.target.value,
  //      });
  // };

  const handleUpdate = (e) => {
      e.preventDefault();
      dispatch(updatePinAction(id,updatePin ))
  }
  console.log("Updated pin:--", updatePin);

  // console.log(typeof(updatePassword.lastUpdated));
  // console.log(new Date())
  // console.log((new Date().toISOString()))
  // const [date, setDate] = useState(Moment(updatePassword.lastUpdated).format("YYYY-MM-DD"))
  // console.log( 'moment Date',date)

var toUpdateValue =(`${updatePin} && ${updatePin.lastUpdated}`).toString().substring(0,10);
console.log(toUpdateValue)

  const showUpdatesAlert = () => {
    swal({
      text: "PIN Data Updated Successfully!..",
      icon: "success",
      button: "Close",
    })
    .then(() => {
      navigate("/pin-list") 
      dispatch(fetchPindata());
      
    });
  }

  const isoTime = updatePin.length === 0 ?  "2023-04-22T12:34:56.789Z" : updatePin.lastUpdated 
  console.log(isoTime)
  console.log(updatePin.lastUpdated)
  const [utcTime, setUtcTime] = useState(isoTime); // example UTC time
  console.log(utcTime)
 
  const yyyyMMdd = new Date(isoTime).toISOString().split("T")[0];
  console.log("yyyyMMdd",yyyyMMdd)

  return (
    <div>
      <>
        <form className="passwordForm" onSubmit={handleUpdate}>
          <div className="formfields">
            <div className="form-control">
              <label htmlFor="cardName">Card Name</label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                value={updatePin && updatePin.cardName}
                onChange={(e) => setUpdatePin({...updatePin, cardName: e.target.value})}
              ></input>
            </div>

            <div className="form-control">
              <label htmlFor="code">Code</label>
              <input
                type="text"
                id="code"
                name="code"
                value={updatePin && updatePin.code}
                onChange={(e) => setUpdatePin({...updatePin, code: e.target.value})}
              ></input>
            </div>

            <div className="form-control">
              <label htmlFor="lastUpdated">Last Updated </label>
              <input
                type="date"
                id="lastUpdated"
                name="lastUpdated" 
                value={yyyyMMdd}
                onChange={(e) => {
                  const newUtcTime = new Date(e.target.value).toISOString();
                  setUtcTime(newUtcTime); 
                  setUpdatePin({...updatePin, lastUpdated: e.target.value})
                }}
              ></input>
            </div>
          </div>
          
            <button
              type="submit"
              className="submitButton"
              onClick={showUpdatesAlert}
            >
              Update
            </button>
            <button  className="submitButton" onClick={() => [navigate("/pin-list"), dispatch(fetchPindata())]} > Cancel </button>
          
        </form>
      </>
    </div>
  );
};

export default UpdatePin;
