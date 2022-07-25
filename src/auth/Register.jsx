import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile, tablet } from "../utils/responsive";
import { userRequest } from "../../src/utils/requestMethods";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.unsplash.com/photo-1588600878108-578307a3cc9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "100%" })}
  ${tablet({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px;
  padding: 10px;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const SignInContainer = styled.div`
  margin-top: 25px;
`;

const ButtonTwo = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-top: 15px;
`;

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (
        password === confirmPassword &&
        password !== "" &&
        username !== "" &&
        name !== "" &&
        email !== ""
      ) {
        userRequest
          .post("auth/register", {
            name,
            username,
            password,
            email,
            phoneNumber,
            profilePicture: file,
          })
          .then(
            (res) => {
              navigate("/");
            },
            (error) => {
              setErrorMessage(error?.response?.data?.message);
            }
          );
      } else {
      }
      setName("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setEmail("");
      setPhoneNumber("");
      setFile(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE USER ACCOUNT</Title>
        {errorMessage && (
          <Stack sx={{ margin: "10px" }} spacing={2}>
            <Alert
              onClose={() => {
                setErrorMessage("");
              }}
              severity="error"
            >
              {errorMessage}
            </Alert>
          </Stack>
        )}
        <Form onSubmit={handleSubmit}>
          {/* Add onSubmit Function to Form */}
          <Input
            placeholder="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            required
          />
          <Input
            placeholder="Name"
            value={name}
            onChange={({ target }) => setName(target.value)}
            required
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            required
          />
          <Input
            placeholder="Phone Number: E.g. 08001234567"
            value={phoneNumber}
            onChange={({ target }) => setPhoneNumber(target.value)}
            required
          />
          <Input
            placeholder="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            required
            type="password"
          />
          <Input
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
            required
            type="password"
          />
          {/* 
          <Input
            type="file"
            id="file"
            accept=".png, .jpeg, .jpg"
            onChange={(e) => setFile(e.target.files[0])}
          /> */}

          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>

          <Button type="submit">CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
