import React from 'react'
import styled from 'styled-components';
import "./milagetracking.css";
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchMilageTrackingData, updateMilageTrackingAction } from '../../redux/actions/milageTrackingAction';
import swal from 'sweetalert';

const UpdateMilage = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
const [updateMilage, setUpdateMilage] = useState([])

const allmilages = useSelector((state) =>state.allMilageTrackings.milagetrackings.data )
console.log("Get All Milage:-",allmilages);

const Sorted_Date_allMilagees = allmilages && allmilages.sort((a,b) => {
  return new Date(a.dateOfDrive) - new Date(b.dateOfDrive);
})

useEffect(() => {
    if (id) {
      // console.log(id)
      const singleMilage = allmilages.filter((ele) => {
        return ele.id == id;
      });
      setUpdateMilage(singleMilage[0]);
    }
  },[id]); 

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateMilageTrackingAction(id,updateMilage ))
}
console.log("Updated Milage :--",updateMilage );

const showUpdatesAlert = () => {
    swal({
      text: "Milage tracking Data Updated Successfully!..",
      icon: "success",
      button: "Close",
    })
    .then(() => {
      navigate("/mileage-tracking") 
      dispatch(fetchMilageTrackingData());
    });
  }


const isoTime = updateMilage.length === 0 ?  "2023-04-22T12:34:56.789Z" : updateMilage.dateOfDrive 
console.log(isoTime)
console.log(updateMilage.dateOfDrive)
const [utcTime, setUtcTime] = useState(isoTime); // example UTC time
console.log(utcTime)

const yyyyMMdd = new Date(isoTime).toISOString().split("T")[0];
console.log("yyyyMMdd",yyyyMMdd)


  return (
    <div>
    <form className="milageTrackingForm" onSubmit={handleUpdate}>
      <div className="milageTrackingDiv">
        <div>
          <label htmlFor="name">Business Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={updateMilage && updateMilage.name}
            onChange={(e) => setUpdateMilage({...updateMilage, name: e.target.value})}
          ></input>
        </div>

        <div>
          <label htmlFor="from">From</label>
          <input
            type="text"
            id="from"
            name="from"
            value={updateMilage && updateMilage.from}
            onChange={(e) => setUpdateMilage({...updateMilage, from: e.target.value})}
          ></input>
        </div>

        <div>
          <label htmlFor="to">To</label>
          <input
            type="text"
            id="to"
            name="to"
            value={updateMilage && updateMilage.to}
            onChange={(e) => setUpdateMilage({...updateMilage, to: e.target.value})}
          ></input>
        </div>
        <div>
          <label htmlFor="purpose">Purpose</label>
          <input
            type="text"
            id="purpose"
            name="purpose"
            value={updateMilage && updateMilage.purpose}
            onChange={(e) => setUpdateMilage({...updateMilage, purpose: e.target.value})}

          ></input>
        </div>

        <div>
          <label htmlFor="kiloMeters">Distance Driven</label>
          <input
            type="number"
            id="kiloMeters"
            name="kiloMeters"
            value={updateMilage && updateMilage.kiloMeters}
            onChange={(e) => setUpdateMilage({...updateMilage, kiloMeters: e.target.value})}

          ></input>
        </div>

        <div>
          <label htmlFor="dateOfDrive">Date of Travel</label>
          <input
            type="date"
            id="dateOfDrive"
            name="dateOfDrive"
            value={yyyyMMdd}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => {
                const newUtcTime = (new Date(e.target.value)).toISOString();
                setUtcTime(newUtcTime); 
                setUpdateMilage({...updateMilage, dateOfDrive: e.target.value})
              }}
          ></input>
        </div>
      </div>
      {/* <div style={{ width: "100%", fontSize: "16px", color: "red" }}>
        {emptyFieldError}
      </div> */}

      <AddnewButtons type="submit" name="submit" id="submit"
      onClick={() => [ showUpdatesAlert()]}
      >
        Update
      </AddnewButtons>
      <AddnewButtons type="reset" name="submit" id="submit" 
      onClick={() => [navigate(-1)]}
      >
        Cancel
      </AddnewButtons>
    </form>
  </div>
  )
}

export default UpdateMilage

const AddnewButtons = styled.button`
  border: none;
  font-size: 1.1rem;
  background-color: #002857;
  color: white;
  border-radius: 3px;
  margin-bottom: 10px;
  float: right;
  padding: 2px 1rem;
  margin-right: 10px;
`;
