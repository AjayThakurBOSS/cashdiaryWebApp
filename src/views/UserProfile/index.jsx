import React from "react";
import styled from "styled-components";
import { RiLockPasswordLine } from "react-icons/ri";
import { VscGistSecret } from "react-icons/vsc";
import ROUTES from "../../routes";
import { Link, Outlet } from "react-router-dom";
import "./style/profile.css";
import { FLEX } from "../../styles/snippets";
import { Minus } from "lucide-react";
import { useSelector } from "react-redux";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorage";
import FetchSecretPin from "./FetchSecretPin";

const UserProfile = () => {
  const AllsecretPins = useSelector(
    (state) => state.allSecretPin.secretPin.data
  );
  console.log("Secret Pin:-", AllsecretPins);

  const userName = `${localStorage.getItem(LOCAL_STORAGE_KEYS.USERNAME)}`;

  return (
    <Wrapper>
      <ProfileCol>
        <ProfilePicture
          src={process.env.PUBLIC_URL + "/LOGO512x512.png"}
          // src="https://images.pexels.com/photos/14318586/pexels-photo-14318586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="user"
        />
        <div style={{ marginBottom: "2rem" }}>
          <h5>Name : {userName} </h5>
        </div>

        <div>
          <Link to="update-password" className="externalLink">
            <h6>
              <RiLockPasswordLine className="profileLogo" /> Change Password
            </h6>
          </Link>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Link to="secret-pin" className="externalLink">
              <h6>
                <VscGistSecret className="profileLogo" /> Secret Pin
              </h6>
            </Link>{" "}
            <FetchSecretPin />
          </div>
        </div>
        <div>{/* <FetchSecretPin /> */}</div>
      </ProfileCol>
      <ProfileDetails>
        <Outlet />
      </ProfileDetails>
    </Wrapper>
  );
};

export default UserProfile;

// css

const Wrapper = styled.div`
  position: absolute;
  left: 20vw;
  top: 3.75rem;
  width: 78.5vw;
  height: calc(100vh - 3.75rem);
  padding: 2.5rem;
  background-color: #f5f3f3;
  overflow: auto;
  float: left;
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  @media screen and (min-width: 768px) and (max-width: 992px) {
    font-size: 1rem;
    font-weight: 400;
    width: 100vw;
    left: 0;
  }

  @media screen and (min-width: 576px) and (max-width: 768px) {
    font-size: 10px;
    font-weight: 400;
    width: 100vw;
    left: 0;
  }
  @media screen and (min-width: 200px) and (max-width: 576px) {
    font-size: 10px;
    font-weight: 400;
    width: 100vw;
    left: 0;
    display: flex;
    flex-direction: column;
  }
`;

const ProfilePicture = styled.div`
  width: 90%;
  height: 10rem;
  background-color: lightgrey;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 10%;
  margin-bottom: 2rem;
  @media screen and (min-width: 200px) and (max-width: 576px) {
    width: 100%;
  }
`;

const ProfileCol = styled.div`
  width: 250px;
  /* border: 1px solid #002758; */
  height: 100%;
  @media screen and (min-width: 200px) and (max-width: 576px) {
    width: 100%;
  }
`;
const ProfileDetails = styled.div`
  width: 72%;
  /* border: 1px solid red; */
  height: 100%;
`;

const TrialModalWrapper = styled.div`
  ${FLEX}
  justify-content: space-between;
  height: 2.5rem;
  padding: 0.75rem;
  font-weight: 500;
  background-color: #ffc5c5;
`;
