import React, { useState } from "react";
import styled from "styled-components";
import { mobile, tablet } from "../utils/responsive";
import { login } from "../../src/redux/userRedux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.unsplash.com/photo-1529078155058-5d716f45d604?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGRhdGF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "90%" })}
  ${tablet({ width: "60%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
// const Error = styled.span`
//   color: red;
// `;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

// const Links = styled.a`
//   margin: 5px 0px;
//   font-size: 12px;
//   cursor: pointer;
//   text-decoration: none;
// `;

const Login = () => {
  const error = useSelector((state) => state.user.errorMessage);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    login(dispatch, { username, password });
    setErrorMessage(error);
  };
  return (
    <Container>
      <Wrapper>
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
        <Title>Sign In to Special Intervention Programme Databank</Title>
        <Form>
          <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Button onClick={handleLogin}>LOGIN</Button>
        </Form>
        {/* <Links className="link">Forgot Password? </Links>
        <Links className="link">Create a New Account</Links> */}
      </Wrapper>
    </Container>
  );
};

export default Login;
