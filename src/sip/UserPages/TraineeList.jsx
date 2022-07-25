import { useEffect, useState } from "react";
import * as React from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useSearchParams } from "react-router-dom";
import { CSVLink } from "react-csv";
import { userRequest } from "../../utils/requestMethods";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { mobile } from "../../utils/responsive";

//Custom Hooks
import sips from "../../utils/customHooks/sips";
import state from "../../utils/customHooks/states";
import tradeAreas from "../../utils/customHooks/tradearea";
import Footer from "../../components/Footer/Footer";

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
  ${mobile({ margin: "10px" })};
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

const ExportButton = styled.button`
  border: solid 1px teal;
  padding: 15px 20px;
  background-color: white;
  color: teal;
  cursor: pointer;
  margin: 15px;
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
const Input = styled.input`
  flex: 1;
  margin: 5px;
  padding: 5px;
  :focus {
    border: none;
  }
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

//Data Table Information
const columns = [
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
    field: "dob",
    headerName: "Date of Birth",
    width: 110,
    editable: true,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 110,
    editable: true,
  },
  {
    field: "sip",
    headerName: "Programme",
    width: 110,
    editable: true,
  },
  {
    field: "tradeArea",
    headerName: "Trade Area",
    width: 200,
    editable: true,
  },
  {
    field: "state",
    headerName: "State",
    width: 110,
    editable: true,
  },
  {
    field: "year",
    headerName: "Year",
    width: 100,
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
            <Link to={`/trainee/${params.row._id}`}>View</Link>
          </ActionDivView>
          <ActionDivDelete>Delete</ActionDivDelete>
        </ActionDiv>
      );
    },
  },
];

const TraineeList = () => {
  const [trainees, setTrainees] = useState([]);
  const [centres, setCentres] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [yr, setYear] = useState("");
  const [gn, setGN] = useState("");
  const [cn, setCN] = useState("");
  const [st, setST] = useState("");
  const [ta, setTA] = useState("");

  //Test Code
  // const [params, setParams] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  // const search = useLocation().search;
  // const parsed = queryString.parse(search);
  // console.log(parsed);

  //Get Centres
  useEffect(() => {
    const getCentres = async () => {
      try {
        const res = await userRequest.get(`/centre/`);
        setCentres(res.data);
      } catch (error) {
        setErrorMessage(error?.response?.data?.message);
        console.log(error?.response?.data?.message);
      }
    };
    getCentres();
  }, []);

  const handleStateChange = (e) => {
    e.preventDefault();
    setST(e.target.value);
  };

  const handleTAChange = (e) => {
    e.preventDefault();
    setTA(e.target.value);
  };
  const handleGenderChange = (e) => {
    e.preventDefault();
    setGN(e.target.value);
  };

  const handleYearChange = (e) => {
    e.preventDefault();
    setYear(e.target.value);
  };

  const handleCentreChange = (e) => {
    e.preventDefault();
    setCN(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let query = "";

    //All Empty Strings
    if (ta === "" && st === "" && cn === "" && gn === "" && yr === "") {
      query = "?";

      //1 given & 4 missing parameters
      //Only Gender
    } else if (ta === "" && st === "" && cn === "" && yr === "") {
      const queryGN = `?gender=${gn}`;
      query = queryGN;

      //Only Trade Area
    } else if (st === "" && cn === "" && gn === "" && yr === "") {
      const queryTA = `?tradeArea=${ta}`;
      query = queryTA;

      //Only State
    } else if (ta === "" && cn === "" && gn === "" && yr === "") {
      const queryState = `?state=${st}`;
      query = queryState;
      //Only Year
    } else if (ta === "" && cn === "" && gn === "" && st === "") {
      const queryYear = `?year=${yr}`;
      query = queryYear;
      //Only Centre
    } else if (ta === "" && yr === "" && gn === "" && st === "") {
      const queryYear = `?centreId=${cn}`;
      query = queryYear;

      //2 given & 3 Missing Paramters
      //Gender and Trade Area
    } else if (st === "" && cn === "" && yr === "") {
      query = `?gender=${gn}&tradeArea=${ta}`;
      //Gender and State
    } else if (ta === "" && cn === "" && yr === "") {
      query = `?gender=${gn}&state=${st}`;
      //Gender and Centre
    } else if (ta === "" && st === "" && yr === "") {
      query = `?gender=${gn}&centreId=${cn}`;
      //Gender and Year
    } else if (ta === "" && st === "" && cn === "") {
      query = `?gender=${gn}&year=${yr}`;
      // Trade Area and State
    } else if (gn === "" && cn === "" && yr === "") {
      query = `?tradeArea=${ta}&state=${st}`;
      //Trade Area and Centre
    } else if (gn === "" && st === "" && yr === "") {
      query = `?tradeArea=${ta}&centreId=${cn}`;
      //Trade Area and Year
    } else if (gn === "" && st === "" && cn === "") {
      query = `?tradeArea=${ta}&year=${yr}`;
      //State and Centre
    } else if (gn === "" && ta === "" && yr === "") {
      query = `?state=${st}&centreId=${cn}`;
      //State and Year
    } else if (gn === "" && ta === "" && cn === "") {
      query = `?state=${st}&year=${yr}`;
      //Centre and Year
    } else if (gn === "" && st === "" && ta === "") {
      query = `?centreId=${cn}&year=${yr}`;

      //3 given & 2 missing Parameters
      //State, Centre and Year
    } else if (gn === "" && ta === "") {
      query = `?state=${st}&centreId=${cn}&year=${yr}`;
      //Trade Area, Centre and Year
    } else if (gn === "" && st === "") {
      query = `?tradeArea=${ta}&centreId=${cn}&year=${yr}`;
      //Trade Area, State and Year
    } else if (gn === "" && st === "") {
      query = `?tradeArea=${ta}&state=${st}&year=${yr}`;
      //Trade Area, State and Centre
    } else if (gn === "" && yr === "") {
      query = `?tradeArea=${ta}&state=${st}&centreId=${cn}`;
      //Gender, Centre and Year
    } else if (st === "" && ta === "") {
      query = `?gender=${gn}&year=${yr}&centreId=${cn}`;
      //Gender, State and Year
    } else if (ta === "" && cn === "") {
      query = `?gender=${gn}&state=${st}&year=${yr}`;
      //Gender, State and Centre
    } else if (ta === "" && yr === "") {
      query = `?gender=${gn}&state=${st}&centreId=${cn}`;
      //Gender, Trade Area and Year
    } else if (st === "" && cn === "") {
      query = `?gender=${gn}&tradeArea=${ta}&year=${yr}`;
      //Gender, Trade Area and Centre
    } else if (yr === "" && st === "") {
      query = `?gender=${gn}&tradeArea=${ta}&year=${yr}`;
      //Gender, Trade Area and State
    } else if (cn === "" && yr === "") {
      query = `?gender=${gn}&tradeArea=${ta}&state=${st}`;

      //4 given & 1 missing parameter
      //Gender, Trade Area, State and Centre
    } else if (yr === "") {
      query = `?gender=${gn}&tradeArea=${ta}&centreId=${cn}&state=${st}`;
      //Gender, Trade Area, State and Year
    } else if (cn === "") {
      query = `?gender=${gn}&tradeArea=${ta}&year=${yr}&state=${st}`;
      //Gender, Trade Area, Centre and Year
    } else if (st === "") {
      query = `?gender=${gn}&tradeArea=${ta}&centreId=${cn}&year=${yr}`;
      //Gender, State, Centre and Year
    } else if (ta === "") {
      query = `?gender=${gn}&state=${st}&centreId=${cn}&year=${yr}`;
      //TradeArea, State, Centre and Year
    } else if (gn === "") {
      query = `?tradeArea=${ta}&state=${st}&centreId=${cn}&year=${yr}`;
    }

    console.log(query);
    try {
      const res = await userRequest.get(`/trainee/${query}`);
      setTrainees(res.data);
    } catch (error) {
      setErrorMessage(error?.response?.data?.message);
    }
  };

  // useEffect(() => {
  //   const getTrainees = async () => {
  //     try {
  //       const res = await userRequest.get(`/trainee/?`);
  //       setTrainees(res.data);
  //     } catch (error) {}
  //   };
  //   getTrainees();
  // }, []);

  const fileName = "trainees-list";
  const headers = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone Number", key: "phoneNumber" },
    { label: "DOB", key: "dob" },
    { label: "Gender", key: "gender" },
    { label: "Special Intervention Program", key: "sip" },
    { label: "Trade Area", key: "tradeArea" },
    { label: "State", key: "state" },
    { label: "Centre", key: "centre" },
    { label: "Year", key: "year" },
  ];

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <MiddleContainer>
          <TopMiddle>
            <LeftTop>Query Trainee Database</LeftTop>
            <RightTop>
              <Link to="/newtrainee">Add New</Link>{" "}
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
            <QueryForm>
              <QueryDiv>
                <Select name="tradeArea" onChange={handleGenderChange}>
                  <Option selected disabled>
                    Please Select a Gender
                  </Option>
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
              </QueryDiv>
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
                <Select name="centreId" onChange={handleCentreChange}>
                  <Option selected disabled>
                    Please Select a Centre
                  </Option>
                  {centres.map((s) => (
                    <Option key={s._id} value={s._id}>
                      {s.name}
                    </Option>
                  ))}
                </Select>
              </QueryDiv>
              <QueryDiv>
                <Input
                  placeholder="Enter a Year:  2019"
                  onChange={handleYearChange}
                />
              </QueryDiv>

              <QueryDiv>
                <Submit onClick={handleSubmit}>Submit</Submit>
              </QueryDiv>
            </QueryForm>
          </BottomMiddle>
        </MiddleContainer>
        <TableContainer>
          <TableContainerTitle>Trainee Information</TableContainerTitle>
          <div style={{ height: 500, width: "100%", marginBottom: "100px" }}>
            <ExportButton>
              <CSVLink headers={headers} data={trainees} filename={fileName}>
                Export
              </CSVLink>
            </ExportButton>

            <DataGrid
              style={{ marginLeft: "15px", marginRight: "15px" }}
              rows={trainees}
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

export default TraineeList;
