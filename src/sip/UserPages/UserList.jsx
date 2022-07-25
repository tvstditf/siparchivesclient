import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import { userRequest } from "../../utils/requestMethods";
import Footer from "../../components/Footer/Footer";
import { mobile } from "../../utils/responsive";

const Container = styled.div`
  width: 100%;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80")
      center;
  background-size: cover;
`;

const Wrapper = styled.div``;
const WrapperTop = styled.div`
  margin: 20px;
  display: flex;
  justify-content: space-between;
`;
const Title = styled.h1`
  ${mobile({ marginTop: "15px" })}
`;

const AddNew = styled.button`
  border: solid 1px teal;
  padding: 15px 20px;
  background-color: white;
  color: teal;
  cursor: pointer;
  margin-top: 15px;
  :hover {
    background-color: teal;
    color: white;
  }
`;
const TableContainer = styled.div`
  height: 500px;
  width: 100%;
  margin-bottom: 100px;
`;
const ActionDiv = styled.div`
  display: flex;
  width: 100%;
`;
const ActionDivView = styled.button`
  flex: 1;
  width: 80%;
  margin: 3px;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const ActionDivDelete = styled.button`
  flex: 1;
  width: 80%;
  margin: 3px;
  border: solid 1px red;
  background-color: white;
  color: red;
  cursor: pointer;
`;

//Columns
const columns = [
  // { field: "id", headerName: "ID", width: 50 },
  {
    field: "name",
    headerName: "Name",
    width: 200,
    editable: true,
  },
  {
    field: "username",
    headerName: "Username",
    width: 200,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
    editable: true,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    width: 150,
    editable: true,
  },
];

const actionColumn = [
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <ActionDiv>
          <ActionDivView>
            <Link to={`/user/${params.row._id}`}>View</Link>
          </ActionDivView>
          <ActionDivDelete>Delete</ActionDivDelete>
        </ActionDiv>
      );
    },
  },
];

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await userRequest.get("/user");
      console.log(res.data);
      setUsers(res.data);
    };
    getUsers();
  }, []);

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <WrapperTop>
          <Title>List of all Users</Title>

          <Link to="/register">
            <AddNew>AddNew</AddNew>
          </Link>
        </WrapperTop>
        <TableContainer>
          <DataGrid
            style={{ marginLeft: "15px", marginRight: "15px" }}
            rows={users}
            getRowId={(row) => row._id}
            columns={columns.concat(actionColumn)}
            pageSize={10}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </TableContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default UserList;
