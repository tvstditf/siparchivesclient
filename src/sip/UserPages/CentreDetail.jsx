import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../../components/Navbar/Navbar";

import { userRequest } from "../../utils/requestMethods";
import Footer from "../../components/Footer/Footer";
import { mobile } from "../../utils/responsive";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

//Custom Hooks
import banks from "../../utils/customHooks/banks";
const Container = styled.div`
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80")
      center;
  background-size: cover;
`;
const Wrapper = styled.div`
  display: flex;
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
  padding: 30px;
  width: 90%;
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

const CentreDetail = () => {
  const [centre, setCentre] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [inputs, setInputs] = useState(centre);
  const [ta, setTA] = useState([]);
  const [states, setStates] = useState([]);
  const [tradeAreas, setTradeAreas] = useState([]);

  useEffect(() => {
    const getItemsFromDB = async () => {
      const resState = await userRequest.get(`/state`);
      setStates(resState.data);
      console.log(resState.data);
      const resTradeArea = await userRequest.get(`/tradearea`);
      setTradeAreas(resTradeArea.data);
    };
    getItemsFromDB();
  }, []);

  useEffect(() => {
    const getCentre = async () => {
      const res = await userRequest.get(`/centre/find/${id}`);
      setCentre(res.data);
    };
    getCentre();
  }, [id]);

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

  const handleClick = async (e) => {
    e.preventDefault();
    const centre = {
      ...inputs,
      tradeArea: ta,
    };

    console.log(centre);
    try {
      await userRequest.put(`/centre/${id}`, centre);
      window.location.reload();
    } catch (error) {
      setErrorMessage(error?.response?.data?.message);
    }
  };

  return (
    <Container>
      <Navbar />
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
        <WrapperLeft>
          <WrapperLeftTop>
            <Title>Training Centre Information</Title>
          </WrapperLeftTop>
          <WrapperLeftBody>
            <WrapperBodyContainer>
              <WrapperInfoKey>Name: </WrapperInfoKey>
              <WrapperInfoValue>{centre.name} </WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Email: </WrapperInfoKey>
              <WrapperInfoValue>{centre.email} </WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Phone Number: </WrapperInfoKey>
              <WrapperInfoValue>{centre.phoneNumber} </WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Contact Person: </WrapperInfoKey>
              <WrapperInfoValue>{centre.contactPerson} </WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Address: </WrapperInfoKey>
              <WrapperInfoValue>{centre.address}</WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey> Trade Area:</WrapperInfoKey>
              <WrapperInfoValue>
                <TradeAreaDiv>
                  {centre?.tradeArea?.map((t) => (
                    <TradeAreaP>{t}</TradeAreaP>
                  ))}
                </TradeAreaDiv>
              </WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>State: </WrapperInfoKey>
              <WrapperInfoValue>{centre.state}</WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Bank: </WrapperInfoKey>
              <WrapperInfoValue>{centre.bank}</WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Account Number: </WrapperInfoKey>
              <WrapperInfoValue>{centre.accountNumber}</WrapperInfoValue>
            </WrapperBodyContainer>
          </WrapperLeftBody>
        </WrapperLeft>
        <WrapperRight>
          <WrapperRightTop>
            <Title>Edit Training Centre Information</Title>
          </WrapperRightTop>
          <WrapperFormContainer>
            <Form>
              <Label>Name</Label>
              <Input
                name="name"
                defaultValue={centre.name}
                onChange={handleChange}
              />
              <Label>Email</Label>
              <Input
                name="email"
                defaultValue={centre.email}
                onChange={handleChange}
              />
              <Label>Phone Number</Label>
              <Input
                name="phoneNumber"
                defaultValue={centre.phoneNumber}
                onChange={handleChange}
                type="text"
              />
              <Label>Contact Person</Label>
              <Input
                name="contactPerson"
                defaultValue={centre.contactPerson}
                onChange={handleChange}
              />
              <Label>Address</Label>
              <TextArea
                name="address"
                defaultValue={centre.address}
                onChange={handleChange}
              />
              <Label>Trade Area</Label>
              <CheckboxContainer>
                {tradeAreas.map((t) => (
                  <CheckboxWrapper key={t._id}>
                    <CheckboxInput
                      type="checkbox"
                      onClick={(e) => handleTradeAreaChange(e, t)}
                    />
                    <CheckboxLabel>{t.name} </CheckboxLabel>
                  </CheckboxWrapper>
                ))}
              </CheckboxContainer>
              <Label>State</Label>
              <Select name="state" onChange={handleChange}>
                {states.map((s) => (
                  <Option key={s._id} value={s.name}>
                    {s.name}
                  </Option>
                ))}
              </Select>

              <Label>Bank</Label>
              <Select name="bank" onChange={handleChange}>
                {banks.map((s) => (
                  <Option key={s.id} value={s.identifier}>
                    {s.identifier}
                  </Option>
                ))}
              </Select>
              <Label>Account Number</Label>
              <Input
                name="Account number"
                defaultValue={centre.accountNumber}
                onChange={handleChange}
              />

              <SubmitButton onClick={handleClick}>Submit</SubmitButton>
            </Form>
          </WrapperFormContainer>
        </WrapperRight>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default CentreDetail;
