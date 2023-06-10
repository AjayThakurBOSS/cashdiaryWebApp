import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRealEstateData, updateRealEstateAction } from '../../redux/actions/realEstateAction';
import "./realEstate.css"
import swal from 'sweetalert';
import ROUTES from "../../routes";

const UpdateRealEstate = () => {
const navigate = useNavigate()
  const dispatch = useDispatch(); 

  const {id} = useParams();
  console.log(id)
  const [updateRealEstate, setUpdateRealEstate] = useState([])
  const realEstates = useSelector((state) => state.AllRealStatesData.realEstate)
  console.log(realEstates)

  useEffect(() => {
    if(id) {
      console.log(id)
      const singleRealEstate = realEstates.data.filter((ele) => {
        return ele.id == id;
      });
      console.log(singleRealEstate);
      setUpdateRealEstate(singleRealEstate[0])
    }
  },[id]);
  console.log("updated RealEstate:- ",updateRealEstate)



    const newRealEstate = (e) => {
      setUpdateRealEstate({...updateRealEstate, [e.target.name]: e.target.value, 
                          [e.target.purchasePrice]: e.target.value,
                          [e.target.yearOfPurchase] : e.target.value,
                          [e.target.percentOwn]: e.target.value,
                          [e.target.url] : e.target.value,
                          [e.target.percentOwn] : e.target.value,
      })
    }

    const handleUpdateRealState =(e) => {
      e.preventDefault();
       dispatch(updateRealEstateAction(id,updateRealEstate ))
     }
  console.log("Updated Real Estate:- ", updateRealEstate)
    
  const handleUpdateAlert = () => {
    swal({
      text: "Real Estate Data Updated Successfully!..",
      icon: "success",
      button: "Close",
    })
    .then(() => {
      navigate("/real-estate")
      dispatch(fetchRealEstateData());
      
    });
     }

  return (
    <div>
        <form className="realEstateForm"  onSubmit={handleUpdateRealState} > 
            <div className='realEstatediv'>
            <div>
              <label htmlFor="name ">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={updateRealEstate && updateRealEstate.name}
                onChange={newRealEstate}
              ></input>
            </div>
          
            <div>
              <label htmlFor="purchasePrice">Purchase Price</label>
              <input
                type="text"
                id="purchasePrice"
                name="purchasePrice"
                value={updateRealEstate && updateRealEstate.purchasePrice}
                onChange={newRealEstate}
              ></input>
            </div>

            <div>
              <label htmlFor="yearOfPurchase">Year Of Purchase</label>
              <input
                type="text"
                id="yearOfPurchase"
                name="yearOfPurchase"
                value={updateRealEstate && updateRealEstate.yearOfPurchase}
                onChange={newRealEstate}
              ></input>
            </div>

            <div>
              <label htmlFor="percentOwn"> % Own </label>
              <input
                type="text"
                id="percentOwn"
                name="percentOwn"
                value={updateRealEstate && updateRealEstate.percentOwn}
                onChange={newRealEstate}
              ></input>
            </div>

            <div>
              <label htmlFor="url">Location URL</label>
              <input
                type="text"
                id="url"
                name="url"
                value={updateRealEstate && updateRealEstate.url}
                onChange={newRealEstate}
              ></input>
            </div>
            
            <div>
              <label htmlFor="netWorth">Net-Worth</label>
              <input
                type="text"
                id="netWorth"
                name="netWorth"
                value={updateRealEstate && updateRealEstate.netWorth}
                onChange={newRealEstate}
              ></input>
            </div>
            </div>
           
            <button type="submit" name="submit" id="submitForm" onClick={handleUpdateAlert} >
              Update
            </button>

            <button id="submitForm" onClick={() => [navigate("/real-estate"), dispatch(fetchRealEstateData()) ]} >Cancel</button>
          </form>
    </div>
  )
}

export default UpdateRealEstate