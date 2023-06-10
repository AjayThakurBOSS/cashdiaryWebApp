import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { AiFillDelete } from "react-icons/ai";
import { deleteVaultReceiptData, downloadVaultReceiptData, fetchVaultReceiptData } from '../../redux/actions/vault-receiptAction';
import { AiOutlineFundView } from "react-icons/ai";
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import OpenAndDownload from './OpenAndDownload';
import ReactDOM from 'react-dom';
import { MdFileDownload } from "react-icons/md";
import axios from 'axios';
import { AUTH_HEADERS } from '../../api/endpoints';
import { LOCAL_STORAGE_KEYS } from '../../constants/localStorage';
import ImagePopup from './ImagePopUP';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './viewReceipt.css'
import swal from 'sweetalert';
import Table from "react-bootstrap/Table";
import colors from '../../styles/colors';
import { BsFillEyeFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

const GetFiles = () => {
  const {id} = useParams()
  const [open, setOpen] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [imageId, setImageId] = useState(null);
  const [imageURL, setImageURL] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const AllVaultReceipts = useSelector((state) => state.allfilesDatas.filesDatas.data)
  console.log("AllVaultReceipts",AllVaultReceipts)

  const filtereduserClientId = AllVaultReceipts && AllVaultReceipts.filter((each) => {
   
   return each.userClientId == id;
  
  }  )
  console.log(id, filtereduserClientId )

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

  const stylesss = {
    bgcolor: 'none',
  }


  const handleButtonClick = () => {
    const imageUrl = 'https://picsum.photos/600/600';
    const options = 'height=500,width=500,top=50,left=50';
    const imageWindow = window.open(imageUrl, '_blank', options);
    const closeButton = document.createElement('button');
    closeButton.innerHTML = 'Close';
    closeButton.onclick = () => imageWindow.close();
    imageWindow.document.body.appendChild(closeButton);
    // const imageComponent = <OpenAndDownload />;
    ReactDOM.render(imageWindow, imageWindow.document.body);

  };

  const handleOpenImage = (id) => {
    const url = `http://103.150.136.244/api/UserFiles/${id}`;
    axios
      .get(url, {
        headers: {
          "X-CASHDAIRY-HEADER": "cashdairy",
          "Content-Type": "application/json;multipart/form-data; x-api-version=1.0",
          "Authorization": `Bearer ${ localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN) }`
        },
        // headers: { ...AUTH_HEADERS },
        responseType: "blob",
      })
      
      .then((response) => {
        const dataToDownload = response.data;
        console.log("data ToDownload" , dataToDownload)
        const fileName = `myFile.${response.data.type.split("/")[1]}`;
        const fileUrl = URL.createObjectURL(dataToDownload);
        const myFile = new File([fileName], `${fileName}`, {
            type: response.data.type,
        });
        console.log("My File", myFile )
        // Display the image
        const img = document.createElement("img");
        img.src = fileUrl;
        //  document.body.appendChild(img);

        setImageId(id);
        setShowPopup(true);
        setImageURL(fileUrl)

      });
  };



  const handleDownloadImage = (id) => {
    const url = `http://103.150.136.244/api/UserFiles/${id}`;
    axios
      .get(url, {
        headers: {
          "X-CASHDAIRY-HEADER": "cashdairy",
          "Content-Type": "application/json;multipart/form-data; x-api-version=1.0",
          "Authorization": `Bearer ${ localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN) }`
        },
        responseType: "blob",
      })
      .then((response) => {
        const dataToDownload = response.data;
        const fileName = `myFile.${response.data.type.split("/")[1]}.PNG`;
        const fileUrl = URL.createObjectURL(dataToDownload);
  
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
  };


  const handleClosePopup = () => {
    setShowPopup(false);
    setImageId(null);
  };

  const handleDelete = (id) => {
    swal({
        title: "Are you sure? ",
        text: "You want to delete this File!..",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          dispatch(deleteVaultReceiptData(id))
            swal(" Your data has been deleted!", {
            icon: "success",
          })
          dispatch(fetchVaultReceiptData())
        } 
      }).then((willDelete) => { 
        console.log("yaha tk aaya")
        dispatch(fetchVaultReceiptData())
      })
}

  return (
    <div>
      <TableContainer>
    <Table striped bordered hover>
      <thead
        style={{ position: "sticky", top: 0, backgroundColor: "white" }}
      >
        <tr>
        {/* <th>
            <b>Date Added</b>
          </th> */}
          <th>
            <b>Receipt by</b>
          </th>
          {/* <th>
            <b>Amount</b>
          </th> */}
          <th>
            <b>Receipt</b>
          </th>
          <th>
            <b>Action</b>
          </th>

        </tr>
      </thead>
      <tbody>
            {
      filtereduserClientId && filtereduserClientId.map((eachfile) => {
        const {id, fileName, extension, userClientId} = eachfile;
                return(
              <tr key={userClientId}>
                {/* <td> {dateAdded} </td> */}
                <td>{fileName} </td>
                {/* <td> {amount} </td> */}
                <td> {extension} </td>
                <td> 
                <CollDiv1 >
                <ActionButton onClick={() => [ handleOpenImage(id),handleOpen()]}> <AiOutlineFundView/> </ActionButton> 
               <ActionButton  onClick={() => {dispatch(downloadVaultReceiptData(id)); handleDownloadImage(id)}} > <MdFileDownload/> </ActionButton> 
               <ActionButton onClick={() => [handleDelete(id)]}> <AiFillDelete/> </ActionButton>
              </CollDiv1>

                {/* <CollDiv1 >
                    <ActionButton 
                                onClick={() => [ handleButtonClick()]}
                                > <BsFillEyeFill/> </ActionButton> 
                    <ActionButton  
                            // onClick={() => {dispatch(downloadVaultReceiptData(id)); handleDownloadImage(id)}} 
                            > <AiFillEdit/> </ActionButton> 
                    <ActionButton 
                            // onClick={() => [handleDelete(id)]}
                            > <AiFillDelete/> </ActionButton>
                </CollDiv1> */}
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>

   <BottomDiv>
    <BackButton onClick={() => navigate(-1)}>Back</BackButton>
   <CollapsibleData>
      <div>
        <Title>Total Amount for duration selected:{}</Title>
        <span>
          <Subtitle>
            {" "}
            <label class="main">
              <input type="checkbox" />
              <span class="geekmark"></span>
            </label>{" "}
            Send Report by email to business
          </Subtitle>
        </span>
        <span>
          <Subtitle>
            {" "}
            <label class="main">
              <input type="checkbox" />
              <span class="geekmark"></span>
            </label>{" "}
            Send a copy to my email address
          </Subtitle>
        </span>
      </div>
      <AddnewButtons onClick={() => {}}>Submit</AddnewButtons>
    </CollapsibleData>

   </BottomDiv>

   <Modal 
                    sx={style}
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                      backdrop: {
                        timeout: 500,
                      },
                    }}
                  >
                  <Fade in={open}>
                    <Box sx={style}>
                    <CloseButton onClick={handleClose}>X</CloseButton>
                       <img src={imageURL} alt='fetched data' width='400' height='400'/>
                      
                       {/* onClose={handleClosePopup} */}
                    </Box>
                  </Fade>
                </Modal>
  </TableContainer>
  
      {
        // AllVaultReceipts && AllVaultReceipts.map((eachfile) => {
        //   const {id, fileName, extension} = eachfile;
        //   return(
        //     <EachDisplayDiv key={id}>
           
           

        //      <RowContainer>
        //       <RowDiv> <p style={{fontSize:'1rem',fontWeight:'500', marginRight:'10px'}}>File Name </p><p style={{fontSize:'1rem',}}>:  {fileName}</p>    </RowDiv>
        //       <RowDiv> <p style={{fontSize:'1rem',fontWeight:'500', marginRight:'10px'}}>Extension </p><p style={{fontSize:'1rem',}}>: {extension} </p> </RowDiv>
        //       </RowContainer>
        //       <CollDiv1 >
        //         <ActionButton onClick={() => [ handleOpenImage(id),handleOpen()]}> <AiOutlineFundView/> </ActionButton> 
        //        <ActionButton  onClick={() => {dispatch(downloadVaultReceiptData(id)); handleDownloadImage(id)}} > <MdFileDownload/> </ActionButton> 
        //        <ActionButton onClick={() => [handleDelete(id)]}> <AiFillDelete/> </ActionButton>
        //       </CollDiv1>
            
        //         <Modal 
        //             sx={style}
        //             aria-labelledby="transition-modal-title"
        //             aria-describedby="transition-modal-description"
        //             open={open}
        //             onClose={handleClose}
        //             closeAfterTransition
        //             slots={{ backdrop: Backdrop }}
        //             slotProps={{
        //               backdrop: {
        //                 timeout: 500,
        //               },
        //             }}
        //           >
        //           <Fade in={open}>
        //             <Box sx={style}>
        //             <CloseButton onClick={handleClose}>X</CloseButton>
        //                <img src={imageURL} alt='image' width='400' height='400'/>
                      
        //                {/* onClose={handleClosePopup} */}
        //             </Box>
        //           </Fade>
        //         </Modal>
               
        //     </EachDisplayDiv>
        //   )
        // })
      }

 {/* Show the popup if it's open */}
      {/* {showPopup && (
        <ImagePopup imageUrl={imageURL} onClose={handleClosePopup} />
      )} */}
      
    </div>
  )
}

export default GetFiles

const EachDisplayDiv = styled.div`
  display: flex;
  background-color: white;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
  margin: 5px 0;
  width: 100%;
`

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  
`
const CollDiv = styled.div`
font-size: 1rem;
  margin-left: 0rem;
`
const CollDiv1 = styled.div`
max-width: 180px;
  margin-right: 0;
  display: flex;
  flex-direction: row;
  flex-wrap:wrap;
  justify-content: flex-end;
  align-items: flex-start;
  
`

const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
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