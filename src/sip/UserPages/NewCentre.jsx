import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import { userRequest } from "../../utils/requestMethods";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Footer from "../../components/Footer/Footer";
import { mobile } from "../../utils/responsive";
//Custom Hooks
import state from "../../utils/customHooks/states";
import banks from "../../utils/customHooks/banks";
import tradeAreas from "../../utils/customHooks/tradearea";

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

const NewCentre = () => {
  const [inputs, setInputs] = useState([]);
  const [ta, setTA] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => {
      return { ...prev, [e?.target?.name]: e?.target?.value };
    });
  };

  const handleTradeAreaChange = (e, t) => {
    const foundInArray = ta.some((item) => item.id === t.id);

    //if item has been clicked/added to array, remove from array and uncheck
    if (foundInArray) {
      setTA((x) => x.filter((item) => item.id !== t.id));
    } else {
      setTA((x) => {
        return [...x, t.identifier];
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const centre = {
      ...inputs,
      tradeArea: ta,
    };
    try {
      const res = await userRequest.post(`/centre/`, centre);
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
        <WrapperTop>Add a Centre</WrapperTop>
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
        <FormContainer>
          <Form>
            <Label>Name</Label>
            <Input
              name="name"
              placeholder="Training Centre"
              onChange={handleChange}
              required
            />
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <Label>Phone Number</Label>
            <Input
              name="phoneNumber"
              placeholder="Phone Number"
              onChange={handleChange}
              required
            />
            <Label>Contact Person</Label>
            <Input
              name="contactPerson"
              placeholder="Contact Person"
              onChange={handleChange}
              required
            />
            <Label>Address</Label>
            <TextArea
              name="address"
              placeholder="Address"
              onChange={handleChange}
              required
            />
            <Label>Trade Area</Label>
            <CheckboxContainer>
              {tradeAreas.map((t) => (
                <CheckboxWrapper key={t.id}>
                  <CheckboxInput
                    type="checkbox"
                    onClick={(e) => handleTradeAreaChange(e, t)}
                  />
                  <CheckboxLabel>{t.identifier} </CheckboxLabel>
                </CheckboxWrapper>
              ))}
            </CheckboxContainer>
            <Label>State</Label>
            <Select name="state" onChange={handleChange}>
              <Option selected disabled>
                Please Select a State
              </Option>
              {state.map((s) => (
                <Option key={s.id}>{s.identifier}</Option>
              ))}
            </Select>
            <Label>Bank</Label>
            <Select name="bank" onChange={handleChange}>
              <Option selected disabled>
                Please Select a Bank
              </Option>
              {banks.map((s) => (
                <Option key={s.id}>{s.identifier}</Option>
              ))}
            </Select>
            <Label>Account Number</Label>
            <Input
              name="accountNumber"
              placeholder="01234567989"
              onChange={handleChange}
              required
            />
            <Label>BVN</Label>
            <Input
              name="bvn"
              placeholder="0123456789"
              onChange={handleChange}
              required
            />
            <Label>Tools</Label>
            <Input name="tools" placeholder="Tools" onChange={handleChange} />
            <Label>Equipment</Label>
            <Input
              name="equipment"
              placeholder="Equipment"
              onChange={handleChange}
            />
            <Label>Number Of Instructors</Label>
            <Input
              name="numberOfInstructors"
              placeholder="Number of Instructors"
              onChange={handleChange}
            />
            <Label>Assessed By Team Leader</Label>
            <Input
              name="assessedByTeamLeader"
              placeholder="Assessed By Team Leader"
              onChange={handleChange}
            />
            <Label>Assessed By Officer 1</Label>
            <Input
              name="assessedByOfficer1"
              placeholder="Assessed By Officer 1"
              onChange={handleChange}
            />
            <Label>Assessed By Officer 2</Label>
            <Input
              name="assessedByOfficer2"
              placeholder="Assessed By Officer 2"
              onChange={handleChange}
            />
            <Label>Assessed By Area Office Team Leader</Label>
            <Input
              name="assessedByAOLeader"
              placeholder="Assessed By Area Office Team Leader"
              onChange={handleChange}
            />
            <Label>Assessed By Area Office Officer</Label>
            <Input
              name="assessedByAOOfficer"
              placeholder="Assessed By Area Office Officer"
              onChange={handleChange}
            />
            <Label>Year Assessed</Label>
            <Input
              name="yearAssessed"
              placeholder="Year Assessed"
              onChange={handleChange}
            />
            <Label>Year Re Assessed</Label>
            <Input
              name="yearReAssessed"
              placeholder="Year Re Assessed"
              onChange={handleChange}
            />
            <Label>Operational Status</Label>
            <Select name="operationalStatus" onChange={handleChange}>
              <Option selected disabled>
                Please Select One
              </Option>
              <Option value="Active">Active</Option>
              <Option value="In-Active">In-Active</Option>
            </Select>

            <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
          </Form>
        </FormContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default NewCentre;
