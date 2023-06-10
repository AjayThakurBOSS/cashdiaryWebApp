import React from 'react'
import styled from 'styled-components'
import Table from "react-bootstrap/Table";
import colors from '../../styles/colors';
import { AiFillDelete } from "react-icons/ai";

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { AiOutlineFundView } from "react-icons/ai";
import { MdFileDownload } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { Document, Page } from 'react-pdf';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { BASE } from "../../api/endpoints"
import axios from 'axios';
import { LOCAL_STORAGE_KEYS } from '../../constants/localStorage';
import GetFiles from './GetFiles';
import { useEffect } from 'react';
import { fetchVaultReceiptData } from '../../redux/actions/vault-receiptAction';

const EachBusiness = () => {

    const navigate = useNavigate()
    const {id, name } = useParams()
    console.log(id, name)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [show, toggleShow] = useState(false);
    const [emptyFieldError, setEmptyFieldError] = useState("");
    const [numPages, setNumPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedFile, setSelectedFile] = useState([]);
    const [fileName, setFileName] = useState('');
    const [extension, setExtension] = useState('');

    useEffect(() =>{
      dispatch(fetchVaultReceiptData())
    },[id])

    const pdfUrl = 'http://www.cs.cmu.edu/~Compose/ftp/shaw-fin-etaps.pdf';
    const imageUrl = 'https://picsum.photos/600/600';
    const handleButtonClick = () => {
      window.open(pdfUrl, '_blank');
      };

      
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    display: 'flex',
    alignItem: 'flex-end',
    justifyContent: 'flex-start',
    flexDirection:'column',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height:'450px',
    width:'450px',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    // boxShadow: 24,
    pt: 2,
    px: 2,
    pb: 2,
  };

      const OpenImage = () => {
        const imageUrl = 'https://picsum.photos/600/600';
        const img = document.createElement("img");
        img.src = imageUrl;
        // const options = 'height=500,width=500,top=50,left=50';
        // const imageWindow = window.open(imageUrl, '_blank', options);
        // const closeButton = document.createElement('button');
        // closeButton.innerHTML = 'Close';
        // closeButton.onclick = () => imageWindow.close();
        // imageWindow.document.body.appendChild(closeButton);
        // // const imageComponent = <OpenAndDownload />;
        // ReactDOM.render(imageWindow, imageWindow.document.body);
    
      };
    

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
            UserClientId: id,
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

  return (
    <Wrapper>
      <TopHeaderDiv>
        <span style={{ fontSize: "2.0rem", fontWeight: "700" }}>
           Receipts Vault
        </span>
      </TopHeaderDiv>

     <TopHeaderDiv>
        <span style={{ fontSize: "1.1rem", fontWeight: "600" }}>
          {`${name}`} 
        </span>
          <SearchForm onSubmit={() => {}} >
           <div>
           From
            <input
              type="date"
              style={{ width: "120px", marginRight: "5px", marginLeft: "3px", marginBottom:'0' }}
              name="startDate"
              id="startDate"
            //   onChange={(e) => setStartDate(e.target.value)}
            />
           </div>
           <div>
           To
            <input
              type="date"
              style={{ width: "120px", marginLeft: "5px", marginRight: "5px", marginBottom:'0'  }}
              name="endDate"
              id="endDate"
            //   onChange={(e) => setEndDate(e.target.value)}
            />
           </div>
            <div>
            <SearchButton onClick={() => {}}>Apply</SearchButton>
            <SearchButton onClick={() => [, document.getElementById("startDate").value = "", document.getElementById("endDate").value = "", ]}>
              Cancel
            </SearchButton>
            </div>
          </SearchForm>
          <AddnewButton
          onClick={() => [
            toggleShow(!show),
            // setEmptyFieldError(""),
            // setValue(todayDate),
          ]}
        >
        {show ? " - " : " + Receipt "}
        </AddnewButton>
        
      </TopHeaderDiv>
      { show && (
        <>
          <EachBusinessForm  onSubmit={handleFileUpload}>
            <FormInputdiv >
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
              <label htmlFor="fileName">Receipt By</label>
              <input
                type="text"
                id="fileName"
                name="fileName"
                onChange={(e) => [setFileName(e.target.value), setEmptyFieldError('')]}
              ></input>
            </div>

            <div className="form-control">
              <label htmlFor="extension"> Receipt </label>
              <input
                type="text"
                id="extension"
                name="extension"
                // placeholder=".png or .pdf"
                onChange={(e) => [setExtension(e.target.value), setEmptyFieldError('')]}
              ></input>
            </div>


            {/* 
              <div style={{width:"280px" , margin:'0 10px'}}>
                <label htmlFor="date">Date </label>
                <input
                 style={{width:"280px", height:'33.33px'}}
                  type="date"
                  id="date"
                  name="date"
                //   value={value}
                  max={new Date().toISOString().split("T")[0]}
                //   onChange={(e) => [
                //     setLastUpdated(e.target.value),
                //     setEmptyFieldError(""),
                //     setValue(e.target.value),
                //   ]}
                ></input>
              </div>

            <div  style={{width:"280px", margin:'0 10px'}}>
                <label htmlFor="file">Select File</label>
                <input
                 style={{width:"280px", height:'33.33px'}}
                  type="file"
                  id="file"
                  name="file"
                //   onChange={(e) => [
                //     setName(e.target.value),
                //     setEmptyFieldError(" "),
                //   ]}
                ></input>
              </div>


              <div  style={{width:"250px", margin:'0 10px'}}>
                <label htmlFor="receiptBy">Receipt By</label>
                <input
                 style={{width:"250px", height:'33.33px'}}
                  type="text"
                  id="receiptBy"
                  name="receiptBy"
                //   onChange={(e) => [
                //     setUrl(e.target.value),
                //     setEmptyFieldError(" "),
                //   ]}
                ></input>
              </div>


              <div  style={{width:"280px", margin:'0 10px'}}>
                <label htmlFor="amount">Amount</label>
                <input
                 style={{width:"280px", height:'33.33px'}}
                  type="number"
                  id="amount"
                  name="amount"
                //   onChange={(e) => [
                //     setLoginId(e.target.value),
                //     setEmptyFieldError(" "),
                //   ]}
                ></input>
              </div> */}


            </FormInputdiv>
            <div style={{ width: "100%", fontSize: "16px", color: "red" }}>
              {" "}
              {emptyFieldError}
            </div>

            {/* <AddnewButtons
              type="submit"
              className="submitButton"
              // onClick={showSaveAlert}
            >
              Save
            </AddnewButtons> */}

            <SubmitButton>Submit</SubmitButton>
          </EachBusinessForm>
        </>
      )}  

<GetFiles/>


  </Wrapper>
  )
}

export default EachBusiness

const CloseButton = styled.button`
position: absolute;
top: -25px;
right: -25px;
background-color: #002758;
color: white;
border: 1px solid #002758;
border-radius: 50%;
width: 30px;
height: 30px;
text-align: center;
&:hover{
  color: #002758;
  background-color: white;
}
`

const Wrapper = styled.div`
  position: absolute;
  left: 20vw;
  top: 3.75rem;
  width: 80vw;
  /* height: 100vh; */
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
    font-size: 16px ;
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
  /* margin-bottom: 10px; */
  /* float: right; */
  /* padding: 2px 1rem; */
  font-size: 25px;
  min-width: 40px;
  width: auto;
  height: 35px;
  margin-right: 3px;
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

const TopHeaderDiv = styled.div`
  position: sticky;
  top: -1.8rem;
  background-color: white;
  z-index: 9;
  padding: 4px 0 4px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-left: 5px;
`;

const EachBusinessForm = styled.form`
    display: flex;
    flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
    width: 100%;
    background-color: white;
    margin: 5px 0;
`
const FormInputdiv = styled.div`
      display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
`
const BottomDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
`
const BackButton = styled.div`
    border: 1px solid #002758;
    background-color: #002758;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    margin-left: 10px;
    padding: 1px 5px;
    border-radius:3px;
    &:hover{
        color: #002758;
        background-color: white;
    }

`
const HeaderInIndex = styled.div`
display: flex;
flex-direction: row;

align-items: center;
justify-content: space-between;
`;

const SearchButton = styled.button`
background-color: #002758;
color: white;
margin: 0 0.5rem 0 0;
border: none;
outline: none;
border-radius: 2px;
padding: 1px 4px;
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: flex-end;
`
const CollDiv1 = styled.div`
  max-width: 100px;
  margin-right: 0;
  display: flex;
  flex-direction: row;
  flex-wrap:nowrap;
  justify-content: flex-end;
  align-items: flex-start;
  
`

const ActionButton = styled.button`
  border: 1px solid #002758;
  outline: none;
  background-color: #002758;
  color: white;
  border-radius: 2px;
  margin-left: 8px;
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