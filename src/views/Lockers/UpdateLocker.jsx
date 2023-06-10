import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchLockerData, updateLockerAction } from "../../redux/actions/lockerAction";
import swal from "sweetalert";

const UpdateLocker = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [updateLocker, setUpdateLocker] = useState([]);
  const lockers = useSelector((state) => state.allLockers.lockers);
  console.log(lockers);



  useEffect(() => {
    if (id) {
      const singleLocker = lockers.data.filter((ele) => {
        return ele.id == id;
      });
      console.log("singleLocker:-", singleLocker);
      setUpdateLocker(singleLocker[0]);
    }
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateLockerAction(id, updateLocker))
  }
  console.log("updatedLocker:-", updateLocker);

  const showUpdatesAlert = () => {
    swal({
      text: "Locker Data Updated Successfully!..",
      icon: "success",
      button: "Close",
    })
    .then(() => {
      navigate("/lockers")
      dispatch(fetchLockerData());
    });
  } 

  const updatedLocker = (e) => { 
    console.log(e)
    setUpdateLocker({ ...updateLocker, 
          [e.target.name]: e.target.value, 
          [e.target.pin]: e.target.value,
          [e.target.comments]: e.target.value, 
          [e.target.lockerNumber]: e.target.value, 
          // [ e.target.lastUpdated]: setUtcTime,
       });
  };
  
  const isoTime = updateLocker.length === 0 ?  "2023-04-22T12:34:56.789Z" : updateLocker.lastUpdated 
  console.log(isoTime)
  console.log(updateLocker.lastUpdated)
  const [utcTime, setUtcTime] = useState(isoTime); // example UTC time
  console.log(utcTime)
 
  const yyyyMMdd = new Date(isoTime).toISOString().split("T")[0];
  console.log("yyyyMMdd",yyyyMMdd)


  return (
    <div>
      <form className="lockerForm" onSubmit={handleUpdate}>
        <div className="formfields">
          <div className="form-control">
            <label htmlFor="name">Locker Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={updateLocker && updateLocker.name}
              onChange={updatedLocker}
            ></input>
          </div>

          <div className="form-control">
            <label htmlFor="lockerNumber">lockerNumber</label>
            <input
              type="text"
              id="lockerNumber"
              name="lockerNumber"
              value={updateLocker && updateLocker.lockerNumber}
              onChange={updatedLocker}
            ></input>
          </div>

          <div className="form-control">
            <label htmlFor="pin">Pin</label>
            <input
              type="text"
              id="pin"
              name="pin"
              value={updateLocker && updateLocker.pin}
              onChange={updatedLocker}
            ></input>
          </div>

          <div className="form-control">
            <label htmlFor="lastUpdated">Last Updated </label>
            <input
              type="date"
              id="lastUpdated"
              name="lastUpdated"
              value={yyyyMMdd}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => {
                const newUtcTime = new Date(e.target.value).toISOString();
                setUtcTime(newUtcTime);
                setUpdateLocker({...updateLocker, lastUpdated: e.target.value})
              }}
             
            ></input> 
          </div>
 
          <div className="form-control">
            <label htmlFor="comments">Comments</label>
            <input
              type="text"
              id="comments"
              name="comments"
              value={updateLocker && updateLocker.comments}
              onChange={updatedLocker}
            ></input>
          </div>
        </div>
        <button type="submit" className="submitButton" onClick={showUpdatesAlert}>
          Submit
        </button>
         <button className="submitButton" onClick={() => [navigate("/lockers"), dispatch(fetchLockerData())]} > cancel</button>
      </form>
    </div>
  );
};

export default UpdateLocker;
