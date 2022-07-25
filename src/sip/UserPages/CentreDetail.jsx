import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import banks from "../../utils/customHooks/banks";
import { userRequest } from "../../utils/requestMethods";
import Footer from "../../components/Footer/Footer";
import { mobile } from "../../utils/responsive";

//Custom Hooks
import state from "../../utils/customHooks/states";
import tradeAreas from "../../utils/customHooks/tradearea";

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
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const getCentre = async () => {
      const res = await userRequest.get(`/centre/find/${id}`);
      setCentre(res.data);
    };
    getCentre();
  }, [id]);

  const [inputs, setInputs] = useState(centre);
  const [ta, setTA] = useState([]);

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

  const handleClick = async (e) => {
    e.preventDefault();
    const centre = {
      ...inputs,
      tradeArea: ta,
    };
    try {
      await userRequest.put(`/centre/${id}`, centre);
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
              <WrapperInfoKey>Tools: </WrapperInfoKey>
              <WrapperInfoValue>{centre.tools}</WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Equipment: </WrapperInfoKey>
              <WrapperInfoValue>{centre.equipment}</WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Number of Instructors: </WrapperInfoKey>
              <WrapperInfoValue>{centre.numberOfInstructors}</WrapperInfoValue>
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
            <WrapperBodyContainer>
              <WrapperInfoKey>BVN: </WrapperInfoKey>
              <WrapperInfoValue>{centre.bvn}</WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Assessed by Team Leader: </WrapperInfoKey>
              <WrapperInfoValue>{centre.assessedByTeamLeader}</WrapperInfoValue>
            </WrapperBodyContainer>{" "}
            <WrapperBodyContainer>
              <WrapperInfoKey>Assessed by First Officer: </WrapperInfoKey>
              <WrapperInfoValue>{centre.assessedByOfficer1}</WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Assessed by Second Officer: </WrapperInfoKey>
              <WrapperInfoValue>{centre.assessedByOfficer2}</WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Assessed by A.O. Leader : </WrapperInfoKey>
              <WrapperInfoValue>{centre.assessedByAOLeader}</WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Assessed by A.O. Officer: </WrapperInfoKey>
              <WrapperInfoValue>{centre.assessedByAOOfficer}</WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Year Assessed: </WrapperInfoKey>
              <WrapperInfoValue>{centre.yearAssessed}</WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Year Re-Assessed: </WrapperInfoKey>
              <WrapperInfoValue>{centre.yearReAssessed}</WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Operational Status: </WrapperInfoKey>
              <WrapperInfoValue>{centre.operationalStatus}</WrapperInfoValue>
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
                {state.map((s) => (
                  <Option key={s.id} value={s.identifier}>
                    {s.identifier}
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
              <Label>BVN</Label>
              <Input
                name="bvn"
                defaultValue={centre.bvn}
                onChange={handleChange}
              />
              <Label>Tools</Label>
              <Input
                name="tools"
                defaultValue={centre.tools}
                onChange={handleChange}
              />
              <Label>Equipment</Label>
              <Input
                name="equipment"
                defaultValue={centre.equipment}
                onChange={handleChange}
              />
              <Label>Number Of Instructors</Label>
              <Input
                name="number of instructors"
                defaultValue={centre.numberOfInstructors}
                onChange={handleChange}
              />
              <Label>Assessed By Team Leader</Label>
              <Input
                name="assessedByTeamLeader"
                defaultValue={centre.assessedByTeamLeader}
                onChange={handleChange}
              />
              <Label>Assessed By Officer 1</Label>
              <Input
                name="assessedByOfficer1"
                defaultValue={centre.assessedByOfficer1}
                onChange={handleChange}
              />
              <Label>Assessed By Officer 2</Label>
              <Input
                name="assessedByOfficer2"
                defaultValue={centre.assessedByOfficer2}
                onChange={handleChange}
              />
              <Label>Assessed By Area Office Team Leader</Label>
              <Input
                name="assessedByAOLeader"
                defaultValue={centre.assessedByAOLeader}
                onChange={handleChange}
              />
              <Label>Assessed By A.O Officer</Label>
              <Input
                name="assessedByAOOficer"
                defaultValue={centre.assessedByAOOfficer}
                onChange={handleChange}
              />
              <Label>Year Assessed</Label>
              <Input
                name="yearAssessed"
                defaultValue={centre.yearAssessed}
                onChange={handleChange}
              />
              <Label>Year Re Assessed</Label>
              <Input
                name="yearReAssessed"
                defaultValue={centre.yearReAssessed}
                onChange={handleChange}
              />
              <Label>Operational Status</Label>
              <Select name="operationalStatus" onChange={handleChange}>
                <Option value="Active">Active</Option>
                <Option value="In-Active">In-Active</Option>
              </Select>

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
