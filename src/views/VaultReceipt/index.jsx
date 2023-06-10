// Packages:
import React, { useEffect, useState, createContext } from "react";
import styled from "styled-components";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
// import Collapsible from 'react-collapsible'
import axios from "axios"; 

// Constants:
import COLORS from "../../styles/colors";

// Components:
import { AUTH_HEADERS } from "../../api/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { fetchPindata } from "../../redux/actions/pinAction";
import swal from "sweetalert";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorage";
import UserSubscription from "../UserSubscription";
import { fetchVaultReceiptData } from "../../redux/actions/vault-receiptAction";
import GetFiles from "./GetFiles";
import { BASE } from "../../api/endpoints";
import GetBusinesses from "./GetBusinesses";
import { fetchVaultReceiptBusinessData } from "../../redux/actions/receiptVaultBusinessAction";
import EachBusiness from "./EachBusiness";


// Functions:
const VaultReceipt = () => { 
  const [emptyFieldError, setEmptyFieldError] = useState('')
  const [show, toggleShow] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);
  const [fileName, setFileName] = useState('');
  const [extension, setExtension] = useState('');
  console.log(selectedFile, fileName,extension)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  // Add Client
  const [clientsName, setClientsName] = useState('')

  const allClients = useSelector((state) => state.allClientsData.clientsdata.data)
    console.log("All Clients :-",allClients)

  const AllVaultReceipts = useSelector((state) => state.allfilesDatas.filesDatas.data)
  console.log(AllVaultReceipts)  

useEffect(() => {
 
  dispatch(fetchVaultReceiptBusinessData())
},[])

const handleFileUpload= (e) => {
  e.preventDefault()
  selectedFile.length !==0 && fileName.length !== 0 && extension.length !==0 ? bbbbb()  : setEmptyFieldError('Please fill the Input Fields.')
}

  const bbbbb = () => {
    console.log("Button Clicked");
  let file = selectedFile;
  const reader = new FileReader();
  reader.onload = () => {
    let fileData;
    // const fileData = new Blob([reader.result], { type: 'image/png' });
    if (file.type === 'image/png' ) {
      fileData = new Blob([reader.result], { type: 'image/png' });
    } else if (file.type === 'application/pdf') {
      fileData = new Blob([reader.result], { type: 'application/pdf' });
    } 
    console.log(fileData)
    axios
    .post(BASE + "/UserFiles",
      {
        File: fileData,
        FileName: fileName,
        Extension: extension,
      },
      { headers: { 
        "Content-Type": "multipart/form-data; boundary=AaB03x" +
        "--AaB03x" +
        "Content-Disposition: file" +
        "Content-Type: png" +
        "Content-Type: jpg" +
        "Content-Transfer-Encoding: binary" +
        "...data... " +
        "--AaB03x--",
        "Accept": "application/*",
          "type": "formData",
          'X-CASHDAIRY-HEADER': 'cashdairy',
          'x-api-version': '1.0',
          "Authorization": `Bearer ${ localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN) }`
       } }
    )
    .then((res) => {
      toggleShow(!show)
      dispatch(fetchVaultReceiptData());
      swal({
        text: "File/Image added Successfully.",
        icon: "success",
        button: "Close",
      })
      setSelectedFile([])
      setFileName('')
      setExtension('')
    }).catch((error) => {
      setEmptyFieldError('Please fill the Input Fields.')
    })
  };

  reader.readAsArrayBuffer(file);
  };

  const handleAddClients = (e) => {
    e.preventDefault();
    axios.post( BASE + "/UserClient", 
    {
      name: clientsName,
    },
    { headers: { ...AUTH_HEADERS } }
    )
    .then((res) => {
      toggleShow(!show);
      dispatch(fetchVaultReceiptBusinessData())
    })
  }

  
  return (
    <Wrapper>
      <TopHeaderDiv>
        <span style={{ fontSize: "2.0rem", fontWeight: "700" }}>
           Receipts Vault
        </span>
        <AddnewButton onClick={() => [toggleShow(!show), setEmptyFieldError('')]}>
          {show ? " - " : " Add Business "}
        </AddnewButton>
      </TopHeaderDiv>
      { show && (
        <VaultReceiptForm onSubmit={handleAddClients}>
          <InputDivField>
          <div className="form-control">
              <label htmlFor="businessName">Business</label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                onChange={(e) => [setClientsName(e.target.value), setEmptyFieldError('')]}
              ></input>
            </div>

            {/* <div className="form-control">
              <label htmlFor="dateadded">Date Added</label>
              <input
                type="date"
                id="dateadded"
                name="dateadded"
                onChange={(e) => [setFileName(e.target.value), setEmptyFieldError('')]}
              ></input>
            </div> */}
          </InputDivField>
          <div style={{ width: "100%", fontSize: "16px", color: "red" }}>
              {" "}
              {emptyFieldError}
            </div>
            <SubmitButton>Submit</SubmitButton>


        </VaultReceiptForm>

       /*  <form className="lockerForm" onSubmit={handleFileUpload}>
          <div className="formfields">
            <div className="form-control">
              <label htmlFor="file">File</label>
              <input
                type="file"
                id="file"
                name="file"
                accept="image/*"
                placeholder=".png, .pdf"
                onChange={(e) => [setSelectedFile(e.target.files[0]), setEmptyFieldError('')]}
              ></input>
            </div>

            <div className="form-control">
              <label htmlFor="fileName">File Name</label>
              <input
                type="text"
                id="fileName"
                name="fileName"
                onChange={(e) => [setFileName(e.target.value), setEmptyFieldError('')]}
              ></input>
            </div>

            <div className="form-control">
              <label htmlFor="extension">File Extension </label>
              <input
                type="text"
                id="extension"
                name="extension"
                // placeholder=".png or .pdf"
                onChange={(e) => [setExtension(e.target.value), setEmptyFieldError('')]}
              ></input>
            </div>
          </div>
          <div style={{ width: "100%", fontSize: "16px", color: "red" }}>
              {" "}
              {emptyFieldError}
            </div>
          
          <button type="submit" className="submitButton" onClick={()=> {}}>
            Update
          </button>
        </form> */
      )}
        {/* {AllVaultReceipts && AllVaultReceipts.length !==0 ?  <GetFiles/> :  <div style={{fontSize:'20px', margin:"20px 0 0 0"}}>Add Vault Receipt by clicking on + sign.</div>} */}
        {allClients && allClients.length !==0 ? 
        

      <GetBusinesses/> 
        
        
        :  <div style={{fontSize:'20px', margin:"20px 0 0 0"}}>Add Vault Receipt by clicking on Add Business.</div>}

        
        {/* <Outlet/> */}
    </Wrapper>
  );
};

// Exports:
export default VaultReceipt;

// Styles:
const Wrapper = styled.div`
  position: absolute;
  left: 20vw;
  top: 3.75rem;
  width: 80vw;
  /* height: 100vh; */
  /* max-height: calc(100vh - 3.75rem); */
  height: calc(100vh - 3.75rem);
  padding: 1.5rem;
  background-color: #f5f3f3;
  overflow: auto;
  float: left;

  @media screen and (min-width: 768px) and (max-width: 992px) {
    font-size: 1rem ;
    font-weight: 400; 
    width: 100vw;
    left: 0;
  }

  @media screen and (min-width: 576px) and (max-width: 768px) {
    font-size: 1rem ;
    font-weight: 400; 
    width: 100vw;
    left: 0;
  }
  @media screen and (min-width: 200px) and (max-width: 576px) {
    font-size: 12px ;
    font-weight: 400; 
    width: 100vw;
    left: 0;
  }
`;

const EditButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const EditButton = styled.div`
  padding: 0.25rem 1.5rem;
  font-weight: 500;
  color: #ffffff;
  background-color: ${COLORS.PRIMARY};
  user-select: none;
  cursor: pointer;
`;
const AddnewButton = styled.button`
  border: none;
  background-color: #002857;
  color: white;
  border-radius: 3px;
  margin-bottom: 10px;
  float: right;
  padding: 2px 1rem;
  min-width: 50px;
  width: auto;
  height: 50px;
  font-size: 15px;
`;

const TopHeaderDiv = styled.div`
  position: sticky;
  top: -1.8rem;
  background-color: white;
  z-index: 9;
  padding: 4px 5px;
`

const VaultReceiptForm = styled.form`
  padding: 0;
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100%;
`

const InputDivField = styled.div`
  display: flex;
  flex-direction:row;
  flex-wrap: wrap;

`
const SubmitButton = styled.button`
  border: none;
  background-color: #002857;
  color: white;
  border-radius: 3px;
  margin-bottom: 10px;
  float: right;
  padding: 2px 1rem;
  min-width: 50px;
  width: 100px;
  margin-left: 10px;
  /* height: 50px; */
  font-size: 20px;
  &:hover{
    color: #002758;
    background-color: #fff;
    border: 1px solid #002758;
  }
`
