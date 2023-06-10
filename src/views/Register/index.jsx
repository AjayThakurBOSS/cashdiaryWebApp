// Packages:
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { login, register } from "../../api/auth";
import * as EmailValidator from "email-validator";
import hasTokenExpired from "../../utils/hasTokenExpired";
import "../Login/login.css";

// Constants:
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorage";
import ROUTES from "../../routes";

// Styles:
import { FLEX } from "../../styles/snippets";
import { fetchCashDiaryData } from "../../redux/actions/cashDiaryAction";
import { fetchLockerData } from "../../redux/actions/lockerAction";
import { useDispatch, useSelector } from "react-redux";
import UserSubscription from "../UserSubscription";
import { fetchUserSubscriptionData } from "../../redux/actions/userSubscriptionAction";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import swal from "sweetalert";

// Functions:
const Register = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const toggleShowPassword1 = () => setShowPassword1(!showPassword1);

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const dispatch = useDispatch();
  // Constants:
  const dummyUsername = "user";
  const dummyEmail = "user@example.com";
  const dummyPassword = "123456Az!";
  const navigate = useNavigate();

  // State:
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  // Functions:
  const validate = () => {
    setErrorText("");
    if (username.length === 0) {
      setErrorText("Enter name");
      return false;
    }
    if (email.length === 0 || !EmailValidator.validate(email)) {
      setErrorText("Invalid email");
      return false;
    }
    if (password.length === 0) {
      setErrorText("Invalid password");
      return false;
    }
    if (confirmPassword.length === 0) {
      setErrorText("Invalid confirm password");
      return false;
    }
    if (password !== confirmPassword) {
      setErrorText("Passwords don't match");
      return false;
    }
    if (phoneNumber.length === 0) {
      setErrorText("Invalid phone number");
      return false;
    }
    return true;
  };

  const refresh = () => window.location.reload(true);

  const handleRegister = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const validationResult = validate();
    if (!validationResult) {
      setIsLoading(false);
      return;
    }
    const { result, payload } = await register({
      username,
      phoneNumber,
      email,
      password
    });

    setIsLoading(false);
    if (!result) setErrorText(payload);
    else {
      navigate(ROUTES.INDEX);
      swal({
        text: `Thank You For Signing Up with Cash Diary.`,
        icon: "success",
        button: "Close"
      });
    }
  };

  // Effects:
  useEffect(() => {
    if (
      localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN) &&
      !hasTokenExpired(localStorage.getItem(LOCAL_STORAGE_KEYS.EXPIRATION))
    ) {
      navigate(ROUTES.HOME);
    }
  }, [navigate]);

  // Return:
  return (
    <Wrapper>
      <RegisterContainer>
        <LogoDiv>
          <img
            style={{ width: "100px" }}
            src={process.env.PUBLIC_URL + "/LOGO512x512.png"}
            alt="CashDiary_logo"
          />
          <h2
            style={{
              fontWeight: "600",
              color: "#002758",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center"
            }}
          >
            Create Your <br></br> Cash Diary Account
          </h2>
        </LogoDiv>
        <hr />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          <RegistrationForm>
            <div className="mb-3" style={{ width: "300px" }}>
              <label htmlFor="userid" className="form-label">
                Name
              </label>
              <input
                style={{ border: "1px solid #002857", borderRadius: "3px" }}
                type="text"
                className="form-control"
                id="userid"
                placeholder="Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3" style={{ width: "300px" }}>
              <label htmlFor="emailAddress" className="form-label">
                Email
              </label>
              <input
                style={{ border: "1px solid #002857" }}
                type="text"
                className="form-control"
                id="emailAddress"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div
              className="mb-3"
              style={{
                position: "relative",
                width: "300px",
                height: "75.33px"
              }}
            >
              <label htmlFor="formGroupExampleInput2" className="form-label">
                Password
              </label>
              <input
                style={{
                  border: "1px solid #002857",
                  borderRadius: "0",
                  width: "280px",
                  height: "33.33px"
                }}
                type={showPassword1 ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <HideShowButton onClick={toggleShowPassword1}>
                {showPassword1 ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </HideShowButton>
            </div>

            <div
              className="mb-3"
              style={{
                position: "relative",
                width: "300px",
                height: "75.33px"
              }}
            >
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                style={{
                  border: "1px solid #002857",
                  borderRadius: "0",
                  width: "280px",
                  height: "33.33px"
                }}
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <HideShowButton onClick={toggleShowPassword}>
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </HideShowButton>
            </div>

            <div className="mb-3" style={{ width: "300px" }}>
              <label htmlFor="mobileNo" className="form-label">
                Mobile Number
              </label>
              <input
                style={{ border: "1px solid #002857" }}
                type="text"
                className="form-control"
                id="mobileNo"
                placeholder="Mobile Number"
                value={phoneNumber}
                onChange={(e) => setphoneNumber(e.target.value)}
              />
            </div>

            <span style={{ width: "100%" }}>
              {" "}
              {errorText.length > 0 && (
                <ErrorText>Error: {errorText}</ErrorText>
              )}{" "}
            </span>
          </RegistrationForm>

          <div className="d-grid gap-2">
            <button
              className="btn "
              type="submit"
              style={{
                width: "100%",
                minWidth: "300px",
                borderRadius: "0",
                filter: isLoading ? "grayscale(1) blur(1px)" : "",
                cursor: isLoading ? "default" : "pointer"
              }}
            >
              Sign Up
            </button>
          </div>

          <div className="d-grid gap-2"></div>
          <Typography
            variant="body2"
            className="text-center"
            sx={{ marginTop: "1rem" }}
          >
            Already have an account? <Link to={ROUTES.LOGIN}>Login</Link>
          </Typography>
        </form>

        <SignUpDescription>
          <p></p>
        </SignUpDescription>
      </RegisterContainer>
    </Wrapper>
  );
};

// Exports:
export default Register;

const HideShowButton = styled.span`
  position: absolute;
  border: none;
  right: 10%;
  top: 50%;
  background-color: white;
`;

const RegistrationForm = styled.form`
  min-width: 350px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  ${FLEX}
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 3.5rem 0rem;
  background-color: #f0f5f7;
`;

const RegisterContainer = styled.div`
  max-width: 660px;
  min-width: 300px;
  width: 95%;
  background-color: white;
  padding: 2%;
  box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.4);
  border-radius: 3px;
`;

const ErrorText = styled.div`
  ${FLEX}
  padding-bottom: 0.5rem;
  font-weight: 600;
  color: #841b1b;
`;
const SignUpDescription = styled.div`
  background-color: white;
`;

const LogoDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0;
`;
