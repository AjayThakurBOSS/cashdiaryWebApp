import { Link } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import styled from "styled-components";

const FetchSecretPin = () => {
  const [clicked, setClicked] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsHidden(!isHidden);
  };

  const secretPins = useSelector((state) => state.allSecretPin.secretPin.data);

  const fetchedSecretPin =
    secretPins &&
    secretPins.map((eachSecretPin) => {
      const { id, secretPin } = eachSecretPin;
      return (
        <>
          {secretPin}
          {/* <Link to={`updatesecretpin/${id}`}> */}
          {/* <button className='editBut' style={{border:"none", marginLeft:'2rem', backgroundColor:'white',}} onClick={() =>navigate(`update-secretpin/${id}`)} >  <AiFillEdit /> </button> */}
          {/* </Link> */}
        </>
      );
    });

  return (
    <div>
      <p
        style={{
          position: "relative",
          marginLeft: "5px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
      >
        {isHidden
          ? String(fetchedSecretPin).replace(/./g, "*")
          : fetchedSecretPin}{" "}
        <span onClick={() => [handleClick()]}>
          {" "}
          {isHidden ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </span>
      </p>
    </div>
  );
};

export default FetchSecretPin;
