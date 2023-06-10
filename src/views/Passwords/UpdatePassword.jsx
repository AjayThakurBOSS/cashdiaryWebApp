import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchPasswordData, updatePasswordAction } from "../../redux/actions/passwordActtion";
import Moment from "react-moment";
import ROUTES from "../../routes";
import swal from "sweetalert";

// Function
const UpdatePassword = () => {
  // Constants
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { id } = useParams();
  // State
  const [updatePassword, setUpdatePassword] = useState([]);
  const { passwords, loading } = useSelector((state) => state.allPasswords);
 
 
  useEffect(() => {
    if (id) {
      const singlePassword = passwords.data.filter((ele) => {
        return ele.id == id;
      });
      setUpdatePassword(singlePassword[0]);
    }
  },[id]);


  const newPassword = (e) => {  
    console.log(e)
    setUpdatePassword({ ...updatePassword, [e.target.name]: e.target.value, 
      [e.target.url]: e.target.value,
       [e.target.loginId]: e.target.value, 
       [e.target.password]: e.target.value, 
       [e.target.lastUpdated]: e.target.value,
       });
  };

  const handleUpdate = (e) => {
      e.preventDefault();
      dispatch(updatePasswordAction(id, updatePassword))
  }
  console.log("Updated Password--", updatePassword);

 
  const showUpdatesAlert = () => {
    swal({
      text: "Password Data Updated Successfully!..",
      icon: "success",
      button: "Close",
    })
    .then(() => {
      navigate("/passwords") 
      dispatch(fetchPasswordData());
      
    });
  }

  const isoTime = updatePassword.length === 0 ?  "2023-04-22T12:34:56.789Z" : updatePassword.lastUpdated 
  console.log(isoTime)
  console.log(updatePassword.lastUpdated)
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
              <label htmlFor="name">Password Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={updatePassword && updatePassword.name}
                onChange={newPassword}
              ></input>
            </div>

            <div className="form-control">
              <label htmlFor="url">URL</label>
              <input
                type="text"
                id="url"
                name="url"
                value={updatePassword && updatePassword.url}
                onChange={newPassword}
              ></input>
            </div>

            <div className="form-control">
              <label htmlFor="loginId">Login Id</label>
              <input
                type="text"
                id="loginId"
                name="loginId"
                value={updatePassword && updatePassword.loginId}
                onChange={newPassword}
              ></input>
            </div>

            <div className="form-control">
              <label htmlFor="password">password</label>
              <input
                type="text"
                id="password"
                name="password"
                value={updatePassword && updatePassword.password}
                onChange={newPassword}
              ></input>
            </div>

            <div className="form-control">
              <label htmlFor="lastUpdarted">Last Updated </label>
              <input
                type="date"
                id="lastUpdarted"
                name="lastUpdarted"
                value={yyyyMMdd}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => {
                  const newUtcTime = new Date(e.target.value).toISOString();
                  setUtcTime(newUtcTime);
                  setUpdatePassword({...updatePassword, lastUpdated: e.target.value})
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
            <button  className="submitButton" onClick={() => [navigate("/passwords"), dispatch(fetchPasswordData())]} > Cancel </button>
          
        </form>
      </>
    </div>
  );
};

export default UpdatePassword;
