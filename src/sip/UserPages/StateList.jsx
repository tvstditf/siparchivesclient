import { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useSearchParams } from "react-router-dom";
import { CSVLink } from "react-csv";
import { publicRequest, userRequest } from "../../utils/requestMethods";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { mobile } from "../../utils/responsive";
import tradeAreas from "../../utils/customHooks/tradearea";
import state from "../../utils/customHooks/states";
import SIPS from "../../utils/customHooks/sips";

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
  {
    field: "name",
    headerName: "Name",
    width: 200,
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
            <Link to={`/state/${params.row._id}`}>View</Link>
          </ActionDivView>
          <ActionDivDelete
            onClick={async () => {
              try {
                await userRequest.delete(`/state/${params.row._id}`);
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

const StateList = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [states, setStates] = useState([]);

  useEffect(() => {
    const getStates = async () => {
      const res = await publicRequest.get("/state");
      setStates(res.data);
    };
    getStates();
  }, []);
  const fileName = "state-list";
  const headers = [
    { label: "Name", key: "name" },
    { label: "Trade Areas", key: "tradeArea" },
    { label: "Special Intervention Programmes", key: "sips" },
  ];
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <MiddleContainer>
          <TopMiddle>
            <LeftTop>Query Training Centre Database</LeftTop>
            <RightTop>
              <Link to="/newstate">Add New</Link>{" "}
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
            {/* <QueryForm>
              <QueryDiv>
                <Select name="tradeArea">
                  <Option selected disabled>
                    Please Select a Trade Area
                  </Option>
                  {tradeAreas.map((s) => (
                    <Option key={s.id}>{s.identifier}</Option>
                  ))}
                </Select>
              </QueryDiv>
              <QueryDiv>
                <Select name="state">
                  <Option selected disabled>
                    Please Select a Special Intervention Programme
                  </Option>
                  {SIPS.map((s) => (
                    <Option key={s.id}>{s.identifier}</Option>
                  ))}
                </Select>
              </QueryDiv>
              <QueryDiv>
                <Submit>Submit</Submit>
              </QueryDiv>
            </QueryForm> */}
          </BottomMiddle>
        </MiddleContainer>

        <TableContainer>
          <TableContainerTitle>Training Centre Information</TableContainerTitle>
          <div style={{ height: 500, width: "100%", marginBottom: "100px" }}>
            <ExportButton>
              <CSVLink headers={headers} data={states} filename={fileName}>
                Export
              </CSVLink>
            </ExportButton>
            <DataGrid
              style={{ marginLeft: "15px", marginRight: "15px" }}
              rows={states}
              getRowId={(row) => row._id}
              columns={columns.concat(actionColumn)}
              pageSize={10}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          </div>
        </TableContainer>
      </Wrapper>
    </Container>
  );
};

export default StateList;
