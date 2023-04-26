import React from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import { userRequest } from "../../utils/requestMethods";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Footer from "../../components/Footer/Footer";
import { mobile } from "../../utils/responsive";
import tradeAreas from "../../utils/customHooks/tradearea";
import SIPS from "../../utils/customHooks/sips";
import { useState } from "react";
import { useEffect } from "react";

const Container = styled.div`
  background: linear-gradient(
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.7)
    ),
    url("https://images.unsplash.com/photo-1614029951470-ef9eb9952be7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cmVnaXN0ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60")
      center;
  background-size: cover;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  margin-bottom: 50px;
`;
const WrapperTop = styled.div`
  font-size: 35px;
`;

const FormContainer = styled.div`
  width: 50%;
  background-color: white;
  justify-content: center;
  align-items: center;
  ${mobile({ width: "100%" })}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
`;

const Label = styled.label`
  padding: 5px;
`;
const Input = styled.input`
  padding: 10px;
  margin: 5px;
`;
const TextArea = styled.textarea``;

const Select = styled.select`
  padding: 5px;
  height: 40px;
`;
const Option = styled.option`
  background-color: white;
  color: teal;
  font-size: 17px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  margin: 5px;
`;

const CheckboxLabel = styled.label`
  font-size: 15px;
`;
const CheckboxInput = styled.input`
  margin-right: 5px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid teal;
  border-radius: 5px;
  margin-top: 20px;
  :hover {
    background-color: teal;
    color: white;
  }
`;

const NewState = () => {
  const [inputs, setInputs] = useState([]);
  const [ta, setTA] = useState([]);
  const [sp, setSp] = useState([]);
  const [tradeArea, setTradeArea] = useState([]);
  const [sips, setSips] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getItemsFromDB = async () => {
      const resTradeArea = await userRequest.get(`/tradearea`);
      setTradeArea(resTradeArea.data);
      const resSIPs = await userRequest.get(`/sip`);
      setSips(resSIPs.data);
    };
    getItemsFromDB();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => {
      return { ...prev, [e?.target?.name]: e?.target?.value };
    });
  };

  const handleTradeAreaChange = (e, t) => {
    const foundInArray = ta.some((item) => item._id === t._id);
    //if item has been clicked/added to array, remove from array and uncheck
    if (foundInArray) {
      setTA((x) => x.filter((item) => item._id !== t._id));
    } else {
      setTA((x) => {
        return [...x, t.name];
      });
    }
  };

  const handleSIPChange = (e, t) => {
    const foundInArray = sp.some((item) => item._id === t._id);
    //if item has been clicked/added to array, remove from array and uncheck
    if (foundInArray) {
      setSp((x) => x.filter((item) => item._id !== t.id));
    } else {
      setSp((x) => {
        return [...x, t.name];
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const state = {
      ...inputs,
      tradeArea: ta,
      sip: sp,
    };
    console.log(state);
    try {
      const res = await userRequest.post(`/state/`, state);
      console.log(res.data);
      window.location.reload();
    } catch (error) {
      setErrorMessage(error?.response?.data?.message);
    }
  };
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <WrapperTop>Add a State</WrapperTop>
        <FormContainer>
          <Form>
            <Label>Name</Label>
            <Input name="name" onChange={handleChange} placeholder="State" />

            <Label>Trade Area</Label>
            <CheckboxContainer>
              {tradeArea.map((t) => (
                <CheckboxWrapper key={t._id}>
                  <CheckboxInput
                    type="checkbox"
                    onClick={(e) => handleTradeAreaChange(e, t)}
                  />
                  <CheckboxLabel>{t.name} </CheckboxLabel>
                </CheckboxWrapper>
              ))}
            </CheckboxContainer>

            <Label>Special Intervention Programme</Label>
            <CheckboxContainer>
              {sips.map((s) => (
                <CheckboxWrapper key={s._id}>
                  <CheckboxInput
                    type="checkbox"
                    onClick={(e) => handleSIPChange(e, s)}
                  />
                  <CheckboxLabel>{s.name} </CheckboxLabel>
                </CheckboxWrapper>
              ))}
            </CheckboxContainer>
            <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
          </Form>
        </FormContainer>
      </Wrapper>
    </Container>
  );
};

export default NewState;
