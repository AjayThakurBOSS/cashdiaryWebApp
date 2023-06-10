import React from "react";
import styled from "styled-components";

const ImagePopup = ({ imageUrl, onClose }) => {
  return (
    <PopupImageConatainer className="image-popup"  >
      <div className="image-popup__content">
        <img src={imageUrl} alt="popup" style={{width:'300px', height:'300px'}} />
        <button onClick={onClose}>Close</button>
      </div>
    </PopupImageConatainer>
  );
};

export default ImagePopup;

const PopupImageConatainer = styled.div`
    position: absolute;
    width: 600px;
    height: 600px;
`