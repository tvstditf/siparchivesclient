import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { userRequest } from "../../utils/requestMethods";
import { mobile } from "../../utils/responsive";

//Custom Hooks
import state from "../../utils/customHooks/states";
import banks from "../../utils/customHooks/banks";
import tradeAreas from "../../utils/customHooks/tradearea";
import sips from "../../utils/customHooks/sips";
import Footer from "../../components/Footer/Footer";

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
  margin-bottom: 50px;
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

const TraineeDetail = () => {
  const [traineeInfo, setTraineeInfo] = useState({});
  const [centre, setCentre] = useState("");
  const [centres, setCentres] = useState([]);
  const [inputs, setInputs] = useState([]);
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const getTrainee = async () => {
      const res = await userRequest.get(`/trainee/find/${id}`);
      setTraineeInfo(res.data);
      const resCen = await userRequest.get(`/centre/find/${res.data.centreId}`);
      setCentre(resCen.data);
      const getCen = await userRequest.get("centre");
      setCentres(getCen.data);
    };
    getTrainee();
  }, [id]);

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
      await userRequest.put(`/trainee/${id}`, trainee);
      // console.log(res.data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <WrapperLeft>
          <WrapperLeftTop>
            <Title>Trainee Information</Title>
          </WrapperLeftTop>
          <WrapperLeftBody>
            <WrapperBodyContainer>
              <WrapperInfoKey>Name: </WrapperInfoKey>
              <WrapperInfoValue>{traineeInfo.name} </WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Email: </WrapperInfoKey>
              <WrapperInfoValue>{traineeInfo.email}</WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Phone Number: </WrapperInfoKey>
              <WrapperInfoValue>{traineeInfo.phoneNumber} </WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Date of Birth: </WrapperInfoKey>
              <WrapperInfoValue>{traineeInfo.dob} </WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Gender: </WrapperInfoKey>
              <WrapperInfoValue>{traineeInfo.gender} </WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Disability: </WrapperInfoKey>
              <WrapperInfoValue>
                {traineeInfo.disability ? "True" : "False"}
              </WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Disability Type: </WrapperInfoKey>
              <WrapperInfoValue>{traineeInfo.disabilityType} </WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Address: </WrapperInfoKey>
              <WrapperInfoValue>{traineeInfo.address} </WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Special Intervention Program: </WrapperInfoKey>
              <WrapperInfoValue>{traineeInfo.sip}</WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Trade Area: </WrapperInfoKey>
              <WrapperInfoValue>{traineeInfo.tradeArea}</WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>State: </WrapperInfoKey>
              <WrapperInfoValue>{traineeInfo.state}</WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Center: </WrapperInfoKey>
              <WrapperInfoValue>{centre.name}</WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Year: </WrapperInfoKey>
              <WrapperInfoValue>{traineeInfo.year}</WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Bank: </WrapperInfoKey>
              <WrapperInfoValue>{traineeInfo.bank}</WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Account Number: </WrapperInfoKey>
              <WrapperInfoValue>{traineeInfo.accountNumber}</WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>BVN: </WrapperInfoKey>
              <WrapperInfoValue>{traineeInfo.bvn}</WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Nationality: </WrapperInfoKey>
              <WrapperInfoValue>{traineeInfo.nationality}</WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Town: </WrapperInfoKey>
              <WrapperInfoValue>{traineeInfo.town}</WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Local Government Area: </WrapperInfoKey>
              <WrapperInfoValue>
                {traineeInfo.localGovernmentArea}
              </WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Educational Background: </WrapperInfoKey>
              <WrapperInfoValue>
                {traineeInfo.educationalBackground}
              </WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Next of Kin: </WrapperInfoKey>
              <WrapperInfoValue>{traineeInfo.nextOfkin}</WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Marital Status: </WrapperInfoKey>
              <WrapperInfoValue>{traineeInfo.maritalStatus}</WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Guarantor: </WrapperInfoKey>
              <WrapperInfoValue>{traineeInfo.guarantor}</WrapperInfoValue>
            </WrapperBodyContainer>
          </WrapperLeftBody>
        </WrapperLeft>
        <WrapperRight>
          <WrapperRightTop>
            <Title>Edit Trainee Information</Title>
          </WrapperRightTop>
          <WrapperFormContainer>
            <Form>
              <Label>Name</Label>
              <Input
                name="name"
                placeholder="Segun Arinze Musa"
                defaultValue={traineeInfo.name}
                onChange={handleChange}
              />
              <Label>Email</Label>
              <Input
                name="email"
                placeholder="Email"
                defaultValue={traineeInfo.email}
                onChange={handleChange}
              />
              <Label>Phone Number</Label>
              <Input
                name="phoneNumber"
                placeholder="Phone Number"
                defaultValue={traineeInfo.phoneNumber}
                onChange={handleChange}
              />
              <Label>Date Of Birth</Label>
              <Input
                name="dob"
                type="date"
                defaultValue={traineeInfo.dob}
                onChange={handleChange}
              />
              <Label>Gender</Label>
              <Select name="gender" onChange={handleChange}>
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
              </Select>
              <Label>Address</Label>
              <TextArea
                name="address"
                placeholder="Address"
                defaultValue={traineeInfo.address}
                onChange={handleChange}
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
                defaultValue={traineeInfo.year}
              />
              <Label>Bank</Label>
              <Select
                name="bank"
                onChange={handleChange}
                defaultValue={traineeInfo.bank}
              >
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
                defaultValue={traineeInfo.accountNumber}
              />
              <Label>BVN</Label>
              <Input
                name="bvn"
                placeholder="0123456789"
                onChange={handleChange}
                defaultValue={traineeInfo.bvn}
              />
              <Label>Nationality</Label>
              <Input
                name="nationality"
                placeholder="Nigerian"
                onChange={handleChange}
                defaultValue={traineeInfo.nationality}
              />
              <Label>Town</Label>
              <Input
                name="town"
                placeholder="Town"
                onChange={handleChange}
                defaultValue={traineeInfo.town}
              />
              <Label>Local Government Area</Label>
              <Input
                name="localGovernmentArea"
                placeholder="Local Government Area"
                onChange={handleChange}
                defaultValue={traineeInfo.localGovernmentArea}
              />
              <Label>Educational Background</Label>
              <Input
                name="educationalBackground"
                placeholder="Educational Background"
                onChange={handleChange}
                defaultValue={traineeInfo.educationalBackground}
              />
              <Label>Next Of Kin</Label>
              <Input
                name="nextOfkin"
                placeholder="Next of Kin"
                onChange={handleChange}
                defaultValue={traineeInfo.nextOfkin}
              />
              <Label>Marital Status</Label>
              <Select name="maritalStatus" onChange={handleChange}>
                <Option value="Single">Single</Option>
                <Option value="Married">Married</Option>
              </Select>
              <Label>Guarantor</Label>
              <Input
                name="guarantor"
                placeholder="Guarantor's Name"
                onChange={handleChange}
                defaultValue={traineeInfo.guarantor}
              />
              <Label>Disability</Label>
              <Select name="disability" onChange={handleChange}>
                <Option value="true">True</Option>
                <Option value="false">False</Option>
              </Select>
              <Label>Disability Type</Label>
              <Input
                name="disabilityType"
                placeholder="E.g. Myopia"
                onChange={handleChange}
                defaultValue={traineeInfo.disabilityType}
              />
              <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
            </Form>
          </WrapperFormContainer>
        </WrapperRight>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default TraineeDetail;
