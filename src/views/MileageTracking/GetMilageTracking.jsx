import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Collapsible from '../../components/global/Collapsible'
// import Table from '../../components/global/Table'
import styled from 'styled-components'
import { CheckBox } from '@mui/icons-material'
import { getValue } from '@testing-library/user-event/dist/utils'
import colors from '../../styles/colors';
import Table  from 'react-bootstrap/Table';
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { Link } from 'react-router-dom'
import { deleteMilageTrackingAction, fetchMilageTrackingData } from '../../redux/actions/milageTrackingAction'
import swal from 'sweetalert'


const GetMilageTracking = () => {
const dispatch = useDispatch()


const allmilages = useSelector((state) =>state.allMilageTrackings.milagetrackings.data )
console.log("Get All Milage:-",allmilages);

const Sorted_Date_allMilagees = allmilages && allmilages.sort((a,b) => {
  return new Date(a.dateOfDrive) - new Date(b.dateOfDrive);
})

const allSearchData = useSelector((state) => state.allMilageTrackings.searchMilage.data)
console.log("Get Search Milage:-",allSearchData);

const toalKms = () => {
   const totalkmss =  allmilages && allmilages.reduce((prev, curr) => prev + +curr.kiloMeters, 0)
   console.log(totalkmss)
   return totalkmss;
}

const handleDelete = (id) => {
  swal({
      title: "Are you sure? ",
      text: "You want to delete this Travel Data!..",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        dispatch(deleteMilageTrackingAction(id))
        dispatch(fetchMilageTrackingData())
          swal(" Your data has been deleted!", {
          icon: "success",
        })
      } 
      dispatch(fetchMilageTrackingData())
    })
    .then((willDelete) => {
      dispatch(fetchMilageTrackingData())
    })
} 

  return (
    <TableContainer>
    {/* <Collapsible  title='JOB'> */}
      
        <Table striped bordered hover>
            <thead>
               <tr>
                <th><b>Date</b></th>
                <th> <b>Business Name</b></th>
                <th><b>Purpose</b></th>
                <th><b>From</b></th>
                <th><b>To</b></th>
                <th><b>Distance Driven</b></th>
                <th><b>Action</b></th>

               </tr>
            </thead>
            <tbody>
                { 
                  Sorted_Date_allMilagees &&  
                  Sorted_Date_allMilagees.map((eachMilageData, key) => {
           
                    const {dateOfDrive, name,id, from,to,purpose,kiloMeters} = eachMilageData;
                    let displayDate = dateOfDrive.toString().substring(0,10);
                    let Datewa = new Date(dateOfDrive)
                    const yyyy = Datewa.toString().substring(11,15)
                    const dd = Datewa.toString().substring(8,10)
                    const MMM = Datewa.toString().substring(4,7)
                    console.log("Datewa: ",Datewa, dd, MMM, yyyy)
                    const DisplayDatewa = `${dd}-${MMM}-${yyyy}`
                  return(
                      <>
                      <tr key={id}>
                          <td> {DisplayDatewa} </td>
                          <td> {name}   </td>
                          <td> {purpose} </td> 
                          <td> {from} </td> 
                          <td> {to} </td> 
                          <td> {kiloMeters}  </td>
                          <td> <Link to={`updateMilage/${id}`} >
                                  <ActionButton className='editBut'>   <AiFillEdit/> </ActionButton>
                               </Link>
                               <ActionButton className='delButt' onClick={() => [handleDelete(id)]}  >  <AiFillDelete/> </ActionButton>          

                          </td>
                      </tr>
                      </>
                  )
              }) 
            }
            </tbody>

        </Table>
        <CollapsibleData >
             <div>
                <Title>Total Distance Driven:{ 
                toalKms()  
              }</Title>
                    <span>
                    <Subtitle> <label class="main">
                    <input type="checkbox" />
                    <span class="geekmark"></span>
                </label> Send Report by email to business</Subtitle>
                     </span>
                        <span>
                            <Subtitle> <label class="main">
                    <input type="checkbox" />
                    <span class="geekmark"></span>
                    </label> Send a copy to my email address</Subtitle>
                            
                            </span>
                        </div>
                        <AddnewButtons onClick={() => {}}>Submit</AddnewButtons>
        </CollapsibleData>    

      {/* </Collapsible> */}
    </TableContainer>
  )
}

export default GetMilageTracking


const CollapsibleData = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  padding-right: 10px;
`

const Title = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${colors.PRIMARY};
  margin-bottom: 10px;
`

const Subtitle = styled.div`
display: flex;
  font-size: 0.8rem;
  font-weight: 500;
  color: #333333;
`
const AddnewButton = styled.button`
  border: none;
  font-size: 1.1rem;
  background-color: #002857;
  color: white;
  border-radius: 3px;
  margin-bottom: 10px;
  float: right;
  padding: 2px 1rem;
  font-size: 30px;
  width: 60px;
  height: 50px;
`;

const AddnewButtons = styled.button`
  border: none;
  font-size: 1.1rem;
  background-color: #002857;
  color: white;
  border-radius: 3px;
  margin-bottom: 10px;
  float: right;
  padding: 2px 1rem;
 
`;

const TableContainer = styled.div`
  background-color: white;
  padding: 5px;
  margin-top: 10px;
`
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
`
