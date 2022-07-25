import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { userRequest } from "../../utils/requestMethods";
import Footer from "../../components/Footer/Footer";
import { mobile } from "../../utils/responsive";
import { refreshToken } from "../../redux/userRedux/apiCalls";

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
  margin-bottom: 100px;
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

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [inputs, setInputs] = useState([]);
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const getUser = async () => {
      const res = await userRequest.get(`/user/find/${id}`);
      setUser(res.data);
    };
    getUser();
  }, [id]);

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prev) => {
      return { ...prev, [e?.target?.name]: e?.target?.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      ...inputs,
    };
    try {
      console.log(user);
      await userRequest.put(`/user/${id}`, user);
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
            <Title>User Information</Title>
          </WrapperLeftTop>
          <WrapperLeftBody>
            <WrapperBodyContainer>
              <WrapperInfoKey>Name: </WrapperInfoKey>
              <WrapperInfoValue>{user.name} </WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Email: </WrapperInfoKey>
              <WrapperInfoValue>{user.email}</WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Phone Number: </WrapperInfoKey>
              <WrapperInfoValue>{user.phoneNumber} </WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Username: </WrapperInfoKey>
              <WrapperInfoValue>{user.username} </WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>Profile Picture: </WrapperInfoKey>
              <WrapperInfoValue>{user.profilePicture} </WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>isAdmin: </WrapperInfoKey>
              <WrapperInfoValue>
                {user.isAdmin ? "True" : "False"}{" "}
              </WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>isMgt: </WrapperInfoKey>
              <WrapperInfoValue>
                {user.isMgt ? "True" : "False"}{" "}
              </WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>isAO: </WrapperInfoKey>
              <WrapperInfoValue>
                {user.isAO ? "True" : "False"}{" "}
              </WrapperInfoValue>
            </WrapperBodyContainer>
            <WrapperBodyContainer>
              <WrapperInfoKey>isDeskOfficer: </WrapperInfoKey>
              <WrapperInfoValue>
                {user.isDeskOfficer ? "True" : "False"}{" "}
              </WrapperInfoValue>
            </WrapperBodyContainer>
          </WrapperLeftBody>
        </WrapperLeft>
        <WrapperRight>
          <WrapperRightTop>
            <Title>Edit User Information</Title>
          </WrapperRightTop>
          <WrapperFormContainer>
            <Form>
              <Label>Name</Label>
              <Input
                name="name"
                placeholder="Segun Arinze Musa"
                defaultValue={user.name}
                onChange={handleChange}
              />
              <Label>Email</Label>
              <Input
                name="email"
                placeholder="Email"
                defaultValue={user.email}
                onChange={handleChange}
              />
              <Label>Phone Number</Label>
              <Input
                name="phoneNumber"
                placeholder="Phone Number"
                defaultValue={user.phoneNumber}
                onChange={handleChange}
              />
              <Label>Username</Label>
              <Input
                name="username"
                defaultValue={user.username}
                onChange={handleChange}
              />
              {/* <Label>Profile Picture</Label>
              <Input
                name="profilePicture"
                defaultValue={user.profilePicture}
                onChange={handleChange}
              /> */}
              <Label>Password</Label>
              <Input name="password" onChange={handleChange} />
              <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
            </Form>
          </WrapperFormContainer>
        </WrapperRight>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default ProfilePage;
