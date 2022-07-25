import React, { useEffect, useState } from "react";
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
import sips from "../../utils/customHooks/sips";

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

const SubmitButton = styled.button`
  padding: 10px;
  margin: 10px;
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

const NewTrainee = () => {
  const [inputs, setInputs] = useState([]);
  const [centres, setCentres] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getCentres = async () => {
      const res = await userRequest.get("centre");
      setCentres(res.data);
    };
    getCentres();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => {
      return { ...prev, [e?.target?.name]: e?.target?.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trainee = {
      ...inputs,
    };
    try {
      const res = await userRequest.post(`/trainee/`, trainee);
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
        <WrapperTop>Add a Trainee</WrapperTop>
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
              placeholder="Segun Arinze Musa"
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
            <Label>Date Of Birth</Label>
            <Input name="dob" onChange={handleChange} type="date" />
            <Label>Gender</Label>
            <Select name="gender" onChange={handleChange}>
              <Option>Please Select a Gender</Option>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
            <Label>Address</Label>
            <TextArea
              name="address"
              placeholder="Address"
              onChange={handleChange}
              required
            />
            <Label>Special Intervention Programme</Label>
            <Select name="sip" onChange={handleChange}>
              <Option selected disabled>
                Please Select a Special Intervention Programme
              </Option>
              {sips.map((s) => (
                <Option key={s.id}>{s.identifier}</Option>
              ))}
            </Select>
            <Label>Trade Area</Label>
            <Select name="tradeArea" onChange={handleChange}>
              <Option selected disabled>
                Please Select a Trade Area
              </Option>
              {tradeAreas.map((s) => (
                <Option key={s.id}>{s.identifier}</Option>
              ))}
            </Select>
            <Label>State</Label>
            <Select name="state" onChange={handleChange}>
              <Option selected disabled>
                Please Select a State
              </Option>
              {state.map((s) => (
                <Option key={s.id}>{s.identifier}</Option>
              ))}
            </Select>
            <Label>Centre </Label>
            <Select name="centreId" onChange={handleChange}>
              <Option selected disabled>
                Please Select a Centre
              </Option>
              {centres.map((s) => (
                <Option key={s._id} value={s._id}>
                  {s.name}
                </Option>
              ))}
            </Select>
            <Label>Year</Label>
            <Input
              name="year"
              placeholder="Year"
              onChange={handleChange}
              required
            />
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
            />
            <Label>Nationality</Label>
            <Input
              name="nationality"
              placeholder="Nigerian"
              onChange={handleChange}
              required
            />
            <Label>Town</Label>
            <Input
              name="town"
              placeholder="Town"
              onChange={handleChange}
              required
            />
            <Label>Local Government Area</Label>
            <Input
              name="localGovernmentArea"
              placeholder="Local Government Area"
              onChange={handleChange}
              required
            />
            <Label>Educational Background</Label>
            <Input
              name="educationalBackground"
              placeholder="Educational Background"
              onChange={handleChange}
            />
            <Label>Next Of Kin</Label>
            <Input
              name="nextOfkin"
              placeholder="Next of Kin"
              onChange={handleChange}
              required
            />
            <Label>Marital Status</Label>
            <Select name="maritalStatus" onChange={handleChange}>
              <Option>Please Select One</Option>
              <Option value="Single">Single</Option>
              <Option value="Married">Married</Option>
            </Select>
            <Label>Guarantor</Label>
            <Input
              name="guarantor"
              placeholder="Guarantor's Name"
              onChange={handleChange}
              required
            />
            <Label>Disability</Label>
            <Select name="disability" onChange={handleChange}>
              <Option>Please Select One</Option>
              <Option value="true">True</Option>
              <Option value="false">False</Option>
            </Select>
            <Label>Disability Type</Label>
            <Input
              name="disabilityType"
              placeholder="E.g. Myopia"
              onChange={handleChange}
            />
            <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
          </Form>
        </FormContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default NewTrainee;
