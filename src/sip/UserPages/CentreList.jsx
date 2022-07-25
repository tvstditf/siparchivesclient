import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import { userRequest } from "../../utils/requestMethods";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Footer from "../../components/Footer/Footer";
import { mobile } from "../../utils/responsive";

//Custom Hooks

import state from "../../utils/customHooks/states";
import tradeAreas from "../../utils/customHooks/tradearea";

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

const MiddleContainer = styled.div`
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
  ${mobile({ margin: "10px" })}
`;

const TopMiddle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftTop = styled.p`
  font-size: 30px;
`;
const RightTop = styled.button`
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

const BottomMiddle = styled.div``;

const QueryForm = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const QueryDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  margin: 5px;
  padding: 10px;
  :focus {
    border: none;
  }
`;

const Label = styled.label`
  padding: 5px;
`;

const Select = styled.select`
  padding: 5px;
  height: 40px;
  margin: 5px;
`;
const Option = styled.option`
  background-color: white;
  color: teal;
  font-size: 17px;
`;

const Submit = styled.button`
  border: none;
  padding: 10px;
  margin: 5px;
  width: 90px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const TableContainer = styled.div``;
const TableContainerTitle = styled.h2`
  font-weight: 400;
  margin: 15px;
`;
const ExportButton = styled.button`
  border: solid 1px teal;
  padding: 15px 20px;
  background-color: white;
  color: teal;
  cursor: pointer;
  margin: 15px;
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

const columns = [
  // { field: "id", headerName: "ID", width: 50 },
  {
    field: "name",
    headerName: "Name",
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
  {
    field: "contactPerson",
    headerName: "Contact Person",
    width: 110,
    editable: true,
  },
  {
    field: "address",
    headerName: "Address",
    width: 110,
    editable: true,
  },
  // {
  //   field: "tradeArea",
  //   headerName: "Trade Area",
  //   width: 200,
  //   editable: true,
  // },
  {
    field: "state",
    headerName: "State",
    width: 110,
    editable: true,
  },
  {
    field: "bank",
    headerName: "Bank",
    width: 200,
    editable: true,
  },
  {
    field: "yearAssessed",
    headerName: "Year Assessed",
    width: 100,
    editable: true,
  },
];
let deleteData = "";
const actionColumn = [
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <ActionDiv>
          <ActionDivView>
            <Link to={`/centre/${params.row._id}`}>View</Link>
          </ActionDivView>
          <ActionDivDelete
            onClick={async () => {
              try {
                await userRequest.delete(`/centre/${params.row._id}`);
                window.location.reload();
              } catch (error) {}
            }}
          >
            Delete
          </ActionDivDelete>
        </ActionDiv>
      );
    },
  },
];

const CentreList = () => {
  const [centres, setCentres] = useState([]);
  // const [inputs, setInputs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  const [st, setST] = useState("");
  const [ta, setTA] = useState("");

  const handleStateChange = (e) => {
    e.preventDefault();
    setST(e.target.value);
  };
  const handleTAChange = (e) => {
    e.preventDefault();
    setTA(e.target.value);
  };

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   setInputs((prev) => {
  //     return {
  //       ...prev,
  //       [e?.target?.name]: e?.target?.name + "=" + e?.target?.value,
  //     };
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let query = "";

    if (ta === "" && st === "") {
      query = "?";
    } else if (st === "") {
      const queryTA = `?tradeArea=${ta}`;
      query = queryTA;
    } else if (ta === "") {
      const queryState = `?state=${st}`;
      query = queryState;
    } else {
      query = `?state=${st}&tradeArea=${ta}`;
    }

    console.log(query);

    try {
      const res = await userRequest.get(`/centre/${query}`);
      setCentres(res.data);
    } catch (error) {
      setErrorMessage(error?.response?.data?.message);
      console.log(error?.response?.data?.message);
    }
  };

  const fileName = "centres-list";
  const headers = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone Number", key: "phoneNumber" },
    { label: "Contact Person", key: "contactPerson" },
    { label: "Gender", key: "gender" },
    { label: "Special Intervention Program", key: "sip" },
    { label: "State", key: "state" },
    { label: "Address", key: "address" },
    { label: "Tools", key: "tools" },
    { label: "Equipment", key: "equipment" },
    { label: "Number of Instructors", key: "numberOfInstructors" },
    { label: "Bank", key: "bank" },
    { label: "Account Number", key: "accountNumber" },
    { label: "BVN", key: "bvn" },
    { label: "Assessed by Team Leader", key: "assessedbyTeamLeader" },
    { label: "Assessed by First Officer", key: "assessedbyOfficer1" },
    { label: "Assessed by Second Officer", key: "assessedbyOfficer2" },
    { label: "Assessed by Area Office Leader", key: "assessedbyAOLeader" },
    { label: "Assessed by Area Office Officer", key: "assessedbybyAOOfficer" },
    { label: "Year Assessed", key: "yearAssessed" },
    { label: "Year Re-Assessed", key: "yearReAssessed" },
    { label: "Operational Status", key: "operationalStatus" },
    { label: "Trade Area", key: "tradeArea" },
  ];

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <MiddleContainer>
          <TopMiddle>
            <LeftTop>Query Training Centre Database</LeftTop>
            <RightTop>
              <Link to="/newcentre">Add New</Link>{" "}
            </RightTop>
          </TopMiddle>
          <BottomMiddle>
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
            {deleteMessage && (
              <Stack sx={{ margin: "10px" }} spacing={2}>
                <Alert
                  onClose={() => {
                    setDeleteMessage("");
                  }}
                  severity="info"
                >
                  {deleteMessage}
                </Alert>
              </Stack>
            )}
            <QueryForm>
              <QueryDiv>
                <Select name="tradeArea" onChange={handleTAChange}>
                  <Option selected disabled>
                    Please Select a Trade Area
                  </Option>
                  {tradeAreas.map((s) => (
                    <Option key={s.id}>{s.identifier}</Option>
                  ))}
                </Select>
              </QueryDiv>
              <QueryDiv>
                <Select name="state" onChange={handleStateChange}>
                  <Option selected disabled>
                    Please Select a State
                  </Option>
                  {state.map((s) => (
                    <Option key={s.id}>{s.identifier}</Option>
                  ))}
                </Select>
              </QueryDiv>

              <QueryDiv>
                <Submit onClick={handleSubmit}>Submit</Submit>
              </QueryDiv>
            </QueryForm>
          </BottomMiddle>
        </MiddleContainer>
        <TableContainer>
          <TableContainerTitle>Training Centre Information</TableContainerTitle>
          <div style={{ height: 500, width: "100%", marginBottom: "100px" }}>
            <ExportButton>
              <CSVLink headers={headers} data={centres} filename={fileName}>
                Export
              </CSVLink>
            </ExportButton>
            <DataGrid
              style={{ marginLeft: "15px", marginRight: "15px" }}
              rows={centres}
              getRowId={(row) => row._id}
              columns={columns.concat(actionColumn)}
              pageSize={10}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          </div>
        </TableContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default CentreList;
