// Packages:
import React, { useEffect } from "react";
import styled from "styled-components";
import "./topbar.css";

// Imports:
import { Share2, Bell } from "lucide-react";
import { BiUserCircle } from "react-icons/bi";

import { BiLogOutCircle } from "react-icons/bi";

// Constants:
import COLORS from "../../../styles/colors";

// Styles:
import { FLEX } from "../../../styles/snippets";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../../../routes";
import { logout } from "../../../api/auth";

// Functions:
const Topbar = (props) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [show, toggleShow] = useState(false);

  const refresh = () => window.location.reload(true);

  const handleLogOut = async () => {
    const result = await logout().then(() => {
      window.location.href = "/";
    });
    if (result) {
      navigate(ROUTES.INDEX);
      window.location.href = "/";
    }
    // console.log(result);
  };

  return (
    <Wrapper>
      <Logo>
        {/* <img
          src="C:\Users\Hp\Downloads\CashDairy.Web\CashDairy.Web\public\LOGO 512x512.png"
          alt=""
        /> */}
        Cash Diary
      </Logo>
      {props.isAuth && (
        <IconGroup>
          {/* <Share2 color='#ffffff' size='1.25rem' style={{cursor:'pointer'}} />
            <Bell color='#ffffff' size='1.25rem'  style={{cursor:'pointer'}}/> */}
          <div
            className="container"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <ProfileLogo
              // onClick={() => toggleShow(!show)}
              className="hover-trigger"
            >
              <ProfilePicture
                src={process.env.PUBLIC_URL + "/LOGO512x512.png"}
                // src="https://images.pexels.com/photos/14318586/pexels-photo-14318586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="user"
              />
            </ProfileLogo>
            <div
              className="hover-div"
              style={{ display: isHovering ? "block" : "none" }}
            >
              <ProfileAction>
                {/* <ProfileImage src='https://images.pexels.com/photos/14318586/pexels-photo-14318586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='user'/> */}
                <Link to={ROUTES.VIEW_PROFILE} className="profileLinks">
                  {" "}
                  <h6>
                    {" "}
                    <BiUserCircle className="profileLogo" />
                    View Profile
                  </h6>
                </Link>
                {/* <Link to={ROUTES.LOGIN} className='profileLinks' ><h6> <BiLogOutCircle className='profileLogo'/> <LogoutBut onClick={handleLogOut}>Logout</LogoutBut></h6></Link> */}
                <div style={{ display: "flex" }}>
                  <BiLogOutCircle className="profileLogo" />
                  <LogoutBut onClick={handleLogOut}>Logout</LogoutBut>
                </div>
              </ProfileAction>
            </div>
          </div>
        </IconGroup>
      )}

      {show && (
        <ProfileAction>
          {/* <ProfileImage src='https://images.pexels.com/photos/14318586/pexels-photo-14318586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='user'/> */}
          <Link to={ROUTES.VIEW_PROFILE} className="profileLinks">
            <h6>
              <BiUserCircle className="profileLogo" />
              View Profile
            </h6>
          </Link>
          {/* <Link to={ROUTES.LOGIN} className='profileLinks' ><h6> <BiLogOutCircle className='profileLogo'/> <LogoutBut onClick={handleLogOut}>Logout</LogoutBut></h6></Link> */}
          <div style={{ display: "flex" }}>
            <BiLogOutCircle className="profileLogo" />
            <LogoutBut onClick={handleLogOut}>Logout</LogoutBut>
          </div>
        </ProfileAction>
      )}
    </Wrapper>
  );
};

// Exports:
export default Topbar;

const LogoutBut = styled.div`
  color: white;
  background-color: #002758;
  border: none;
  outline: none;
  margin: 0;
  padding: 0;
  width: auto;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.75rem;
  padding: 0.8rem 1rem;
  background-color: ${COLORS.PRIMARY};
  color: #ffffff;
  user-select: none;
  width: 100vw;
`;

const Logo = styled.div`
  font-weight: 700;
  font-size: 2rem;
  margin-left: 3rem;
`;

const IconGroup = styled.div`
  ${FLEX}
  gap: 2rem;
`;

const ProfilePicture = styled.div`
  width: 2.7rem;
  height: 2.7rem;
  padding: 2px;
  background-color: lightgrey;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 50%;
`;

const ProfileAction = styled.div`
  position: absolute;
  width: 170px;
  top: 9%;
  right: 0%;
  background-color: #002758;
  color: white;
  display: flex;
  flex-direction: column;
  z-index: 99999999999999;
  padding: 1rem 1rem 1rem 1rem;
  /* border-radius: 50%; */
`;
const ProfileImage = styled.div`
  width: 8rem;
  height: 6rem;
  background-color: lightgrey;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 10%;
  margin-bottom: 2rem;
`;

const ProfileLogo = styled.div`
  border-radius: 50%;
  cursor: pointer;
`;
