import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { mobile } from "../../utils/responsive";
import tradeAreas from "../../utils/customHooks/tradearea";
import SIPS from "../../utils/customHooks/sips";
import { publicRequest, userRequest } from "../../utils/requestMethods";

const Container = styled.div`
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80")
      center;
  background-size: cover;
  height: 100vh;
`;
const Wrapper = styled.div`
  display: flex;
  height: 100%;
  ${mobile({ flexDirection: "column" })}
`;
const WrapperLeft = styled.div`
  flex: 1;
  margin-left: 20px;
`;
const WrapperLeftTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WrapperLeftBody = styled.div``;

const Title = styled.h2``;

const TradeAreaDiv = styled.div`
  list-style: none;
  margin: 0;
`;
const TradeAreaP = styled.p`
  margin-bottom: 5px;
`;

const WrapperBodyContainer = styled.div`
  display: flex;
  margin: 15px;
`;
const WrapperInfoKey = styled.div`
  flex: 1;
`;
const WrapperInfoValue = styled.div`
  flex: 1;
`;

const WrapperRight = styled.div`
  flex: 1;
`;
const WrapperRightTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WrapperFormContainer = styled.div`
  background-color: white;
  justify-content: center;
  align-items: center;
  width: 90%;
  padding: 50px;
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
  width: 50%;
  align-self: center;
  :hover {
    background-color: teal;
    color: white;
  }
`;

const TradeAreaDetail = () => {
  const location = useLocation();
  const [tradeArea, setTradeArea] = useState({});
  const [inputs, setInputs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const getTradeArea = async () => {
      const res = await userRequest(`/tradearea/find/${id}`);
      setTradeArea(res.data);
    };
    getTradeArea();
  }, [id]);

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => {
      return { ...prev, [e?.target?.name]: e?.target?.value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const tradearea = {
      ...inputs,
    };

    try {
      const res = await userRequest.put(`/tradearea/${id}`, tradearea);

      window.location.reload();
    } catch (error) {
      setErrorMessage(error?.response?.data?.message);
    }
  };

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <WrapperLeft>
          <WrapperLeftTop>
            <Title>Trade Area Information</Title>
          </WrapperLeftTop>
          <WrapperLeftBody>
            <WrapperBodyContainer>
              <WrapperInfoKey>Name: </WrapperInfoKey>
              <WrapperInfoValue>{tradeArea.name}</WrapperInfoValue>
            </WrapperBodyContainer>
          </WrapperLeftBody>
        </WrapperLeft>
        <WrapperRight>
          <WrapperRightTop>
            <Title>Edit Trade Area Information</Title>
          </WrapperRightTop>
          <WrapperFormContainer>
            <Form>
              <Label>Name</Label>
              <Input defaultValue={tradeArea.name} onChange={handleChange} />
              <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
            </Form>
          </WrapperFormContainer>
        </WrapperRight>
      </Wrapper>
    </Container>
  );
};

export default TradeAreaDetail;
