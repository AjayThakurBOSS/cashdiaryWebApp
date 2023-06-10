import React, { useState } from 'react'
import styled from 'styled-components'
import Table from "react-bootstrap/Table";
import colors from '../../styles/colors';
import COLORS from '../../styles/colors';
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { Link,NavLink, Outlet } from 'react-router-dom';
import EachBusiness from './EachBusiness';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { deleteVaultReceiptBusinessData, fetchVaultReceiptBusinessData } from '../../redux/actions/receiptVaultBusinessAction';

const GetBusinesses = () => {

  const  dispatch = useDispatch()

const allClients = useSelector((state) => state.allClientsData.clientsdata.data)
    console.log("All Clients :-",allClients)

    const handleDelete = (id) => {
      swal({
          title: "Are you sure? ",
          text: "You want to delete this Business !",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            dispatch(deleteVaultReceiptBusinessData(id))
            dispatch(fetchVaultReceiptBusinessData())
              swal(" Your data has been deleted!", {
              icon: "success",
            })
          } 
          console.log("yaha tk aaya")
          dispatch(fetchVaultReceiptBusinessData())
        })
        .then((willDelete) => {
          console.log("yaha tk aaya")
          dispatch(fetchVaultReceiptBusinessData())
        })
  } 

  return (
    <div>
       <Outlet/>
         
                <TableContainer>
                <Table striped bordered hover>
                  <thead
                    style={{ position: "sticky", top: 0, backgroundColor: "white" }}
                  >
                    <tr>
                      <th>
                        <b>Business Name</b>
                      </th>
                      <th>
                        {" "}
                        <b>Edit / Delete </b>
                      </th>
                      <th>
                        <b>Date Added</b>
                      </th>
                     
                    </tr>
                  </thead>
                  <tbody>
                        {
                       allClients && allClients.map((business) => {
                            const {id, name } = business
                            return(
                          <tr key={id}>
                            <td><NavLink to={`/business/${id}/${name}`} >  {name}</NavLink> </td>
                            <td style={{display: 'flex', flexDirection: 'row',   flexWrap: "nowrap",
                                    alignItems: "flex-start",
                                    justifyContent: "flex-start",
                                    }}> <AddnewButton> <AiFillEdit/></AddnewButton>  <AddnewButton onClick={() => handleDelete(id)}><AiFillDelete/></AddnewButton>
                                </td>
                            <td> {"01-May-2023"} </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </TableContainer>
           

    </div>
  )
}

export default GetBusinesses

const ReturnDiv = styled.div`
    
`


const CollapsibleData = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  padding-right: 10px;
`;

const Title = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${colors.PRIMARY};
  margin-bottom: 10px;
`;

const Subtitle = styled.div`
  display: flex;
  font-size: 0.8rem;
  font-weight: 500;
  color: #333333;
`;
const AddnewButton = styled.button`
  border: none;
  font-size: 1.1rem;
  background-color: #002857;
  color: white;
  border-radius: 3px;
  margin-bottom: 10px;
  /* float: right; */
  /* padding: 2px 1rem; */
  font-size: 25px;
  width: 40px;
  height: 35px;
  margin-right: 10px;
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
  width: 100%;
  overflow: auto;
  float: left;
  height: 70vh;
`;