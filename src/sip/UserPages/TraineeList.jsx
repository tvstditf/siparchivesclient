import { useEffect, useState } from "react";
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
          <ActionDivDelete
            onClick={async () => {
              try {
                await userRequest.delete(`/trainee/${params.row._id}`);
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

const TraineeList = () => {
  const [trainees, setTrainees] = useState([]);
  const [centres, setCentres] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [sp, setSp] = useState("");
  const [yr, setYear] = useState("");
  const [gn, setGN] = useState("");
  const [cn, setCN] = useState("");
  const [st, setST] = useState("");
  const [ta, setTA] = useState("");

  const [states, setStates] = useState([]);
  const [tradeAreas, setTradeAreas] = useState([]);
  const [sips, setSips] = useState([]);

  useEffect(() => {
    const getItemsFromDB = async () => {
      const resState = await userRequest.get(`/state`);
      setStates(resState.data);
      const resTradeArea = await userRequest.get(`/tradearea`);
      setTradeAreas(resTradeArea.data);
      const resSIP = await userRequest.get(`/sip`);
      setSips(resSIP.data);
    };
    getItemsFromDB();
  }, []);

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

  const handleSIPChange = (e) => {
    e.preventDefault();
    setSp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let query = "";

    //All Empty Strings
    if (
      ta === "" &&
      st === "" &&
      cn === "" &&
      gn === "" &&
      yr === "" &&
      sp === ""
    ) {
      query = "?";

      //1 given & 5 missing parameters
      //Only Gender
    } else if (ta === "" && st === "" && cn === "" && yr === "" && sp === "") {
      const queryGN = `?gender=${gn}`;
      query = queryGN;

      //Only Trade Area
    } else if (st === "" && cn === "" && gn === "" && yr === "" && sp === "") {
      const queryTA = `?tradeArea=${ta}`;
      query = queryTA;

      //Only State
    } else if (ta === "" && cn === "" && gn === "" && yr === "" && sp === "") {
      const queryState = `?state=${st}`;
      query = queryState;
      //Only Year
    } else if (ta === "" && cn === "" && gn === "" && st === "" && sp === "") {
      query = `?year=${yr}`;

      //Only Centre
    } else if (ta === "" && yr === "" && gn === "" && st === "" && sp === "") {
      query = `?centreId=${cn}`;

      //Only Special Intervention Programme
    } else if (ta === "" && yr === "" && gn === "" && st === "" && cn === "") {
      query = `?sip=${sp}`;

      //2 given & 4 Missing Paramters
      //Gender and Trade Area
    } else if (st === "" && cn === "" && yr === "" && sp === "") {
      query = `?gender=${gn}&tradeArea=${ta}`;
      //Gender and State
    } else if (ta === "" && cn === "" && yr === "" && sp === "") {
      query = `?gender=${gn}&state=${st}`;
      //Gender and Centre
    } else if (ta === "" && st === "" && yr === "" && sp === "") {
      query = `?gender=${gn}&centreId=${cn}`;
      //Gender and Year
    } else if (ta === "" && st === "" && cn === "" && sp === "") {
      query = `?gender=${gn}&year=${yr}`;
      // Gender and Special Intervention Programme
    } else if (ta === "" && st === "" && cn === "" && yr === "") {
      query = `?gender=${gn}&sip=${sp}`;
      // Trade Area and State
    } else if (gn === "" && cn === "" && yr === "" && sp === "") {
      query = `?tradeArea=${ta}&state=${st}`;
      //Trade Area and Centre
    } else if (gn === "" && st === "" && yr === "" && sp === "") {
      query = `?tradeArea=${ta}&centreId=${cn}`;
      //Trade Area and Year
    } else if (gn === "" && st === "" && cn === "" && sp === "") {
      query = `?tradeArea=${ta}&year=${yr}`;
      //Trade Area and Special Intervention Programme
    } else if (gn === "" && st === "" && cn === "" && yr === "") {
      query = `?tradeArea=${ta}&sip=${sp}`;
      //State and Centre
    } else if (gn === "" && ta === "" && yr === "" && sp === "") {
      query = `?state=${st}&centreId=${cn}`;
      //State and Year
    } else if (gn === "" && ta === "" && cn === "" && sp === "") {
      query = `?state=${st}&year=${yr}`;
      //State and Special Intervention Programme
    } else if (gn === "" && ta === "" && cn === "" && yr === "") {
      query = `?state=${st}&sip=${sp}`;
      //Centre and Year
    } else if (gn === "" && st === "" && ta === "" && sp === "") {
      query = `?centreId=${cn}&year=${yr}`;
      //Centre and Special Intervention Programme
    } else if (yr === "" && st === "" && ta === "" && gn === "") {
      query = `?centreId=${cn}&sip=${sp}`;
      //Special Intervention Program and Year
    } else if (cn === "" && st === "" && ta === "" && gn === "") {
      query = `?year=${yr}&sip=${sp}`;

      //3 given & 3 missing Parameters
      //State, Centre and Year
    } else if (gn === "" && ta === "" && sp === "") {
      query = `?state=${st}&centreId=${cn}&year=${yr}`;
      //Trade Area, Centre and Year
    } else if (gn === "" && st === "" && sp === "") {
      query = `?tradeArea=${ta}&centreId=${cn}&year=${yr}`;
      //Trade Area, State and Year
    } else if (gn === "" && st === "" && sp === "") {
      query = `?tradeArea=${ta}&state=${st}&year=${yr}`;
      //Trade Area, State and Centre
    } else if (gn === "" && yr === "" && sp === "") {
      query = `?tradeArea=${ta}&state=${st}&centreId=${cn}`;
      //Gender, Centre and Year
    } else if (st === "" && ta === "" && sp === "") {
      query = `?gender=${gn}&year=${yr}&centreId=${cn}`;
      //Gender, State and Year
    } else if (ta === "" && cn === "" && sp === "") {
      query = `?gender=${gn}&state=${st}&year=${yr}`;
      //Gender, State and Centre
    } else if (ta === "" && yr === "" && sp === "") {
      query = `?gender=${gn}&state=${st}&centreId=${cn}`;
      //Gender, Trade Area and Year
    } else if (st === "" && cn === "" && sp === "") {
      query = `?gender=${gn}&tradeArea=${ta}&year=${yr}`;
      //Gender, Trade Area and Centre
    } else if (yr === "" && st === "" && sp === "") {
      query = `?gender=${gn}&tradeArea=${ta}&year=${yr}`;
      //Gender, Trade Area and State
    } else if (cn === "" && yr === "" && sp === "") {
      query = `?gender=${gn}&tradeArea=${ta}&state=${st}`;
      //Special Intervention Programme, State, Year
    } else if (cn === "" && gn === "" && ta === "") {
      query = `?sip=${sp}&year=${yr}&state=${st}`;

      //Special Intervention Programme, State, Centre
    } else if (yr === "" && gn === "" && ta === "") {
      query = `?sip=${sp}&state=${st}&centreId=${cn}`;
      console.log(query);

      //Special Intervention Programme, State, Gender
    } else if (yr === "" && cn === "" && ta === "") {
      query = `?state=${st}&sip=${sp}&gender=${gn}`;

      //Special Intervention Programme, State, Trade Area
    } else if (yr === "" && gn === "" && cn === "") {
      query = `?sip=${sp}&state=${st}&tradeArea=${ta}`;

      //Special Intervention Programme, Year, Centre
    } else if (st === "" && gn === "" && ta === "") {
      query = `?sip=${sp}&year=${yr}&centreId=${cn}`;
      //Special Intervention Programme, Year, Gender
    } else if (st === "" && cn === "" && ta === "") {
      query = `?sip=${sp}&year=${yr}&gender=${gn}`;
      //Special Intervention Programme, Year, TradeArea
    } else if (st === "" && cn === "" && gn === "") {
      query = `?sip=${sp}&year=${yr}&tradeArea=${ta}`;
      //Special Intervention Programme, Centre, Gender
    } else if (st === "" && yr === "" && ta === "") {
      query = `?sip=${sp}&centreId=${cn}&gender=${gn}`;
      //Special Intervention Programme, Centre, Trade Area
    } else if (st === "" && yr === "" && gn === "") {
      query = `?sip=${sp}&centreId=${cn}&tradeArea=${ta}`;
      //Special Intervention Programme, Gender, Trade Area
    } else if (st === "" && yr === "" && cn === "") {
      query = `?sip=${sp}&gender=${gn}&tradeArea=${ta}`;

      //4 given & 2 missing parameter
      //Gender, Trade Area, State and Centre
    } else if (yr === "" && sp === "") {
      query = `?gender=${gn}&tradeArea=${ta}&centreId=${cn}&state=${st}`;
      //Gender, Trade Area, State and Year
    } else if (cn === "" && sp === "") {
      query = `?gender=${gn}&tradeArea=${ta}&year=${yr}&state=${st}`;
      //Gender, Trade Area, Centre and Year
    } else if (st === "" && sp === "") {
      query = `?gender=${gn}&tradeArea=${ta}&centreId=${cn}&year=${yr}`;
      //Gender, State, Centre and Year
    } else if (ta === "" && sp === "") {
      query = `?gender=${gn}&state=${st}&centreId=${cn}&year=${yr}`;
      //TradeArea, State, Centre and Year
    } else if (gn === "" && sp === "") {
      query = `?tradeArea=${ta}&state=${st}&centreId=${cn}&year=${yr}`;

      //Special Intervention Programme, Trade Area, State, Centre
    } else if (gn === "" && yr === "") {
      query = `?sip=${sp}&tradeArea=${ta}&state=${st}&centreId=${cn}`;
      //Special Intervention Programme, Trade Area, State, Year
    } else if (gn === "" && cn === "") {
      query = `?sip=${sp}&tradeArea=${ta}&state=${st}&year=${yr}`;

      //Special Intervention Programme, Trade Area, State, Gender
    } else if (yr === "" && cn === "") {
      query = `?sip=${sp}&tradeArea=${ta}&state=${st}&gender=${gn}`;
      //Special Intervention Programme, State, Centre, Year
    } else if (ta === "" && gn === "") {
      query = `?sip=${sp}&state=${st}&centreId=${cn}&year=${yr}`;
      //Special Intervention Programme, State, Gender, Year
    } else if (ta === "" && cn === "") {
      query = `?sip=${sp}&state=${st}&gender=${gn}&year=${yr}`;
      //Special Intervention Programme, Gender, Year, Trade Area
    } else if (st === "" && cn === "") {
      query = `?sip=${sp}&gender=${gn}&year=${yr}&tradeArea=${ta}`;

      //5 given and 1 missing parameter
      //Gender, Trade Area, State, Centre, Year / Special Intervention Programme
    } else if (sp === "") {
      query = `?gender=${gn}&tradeArea=${ta}&state=${st}&centreId=${cn}&year=${yr}`;
      //Gender, State, Centre, Year, Special Intervention Programme / Trade Area
    } else if (ta === "") {
      query = `?gender=${gn}&sip=${sp}&state=${st}&centreId=${cn}&year=${yr}`;
      //Gender, Trade Area, Centre, Year, Special Intervention Programme / State
    } else if (st === "") {
      query = `?gender=${gn}&sip=${sp}&tradeArea=${ta}&centreId=${cn}&year=${yr}`;
      //Gender, State, TradeArea, Year, Special Intervention Programme / Centre
    } else if (cn === "") {
      query = `?gender=${gn}&sip=${sp}&tradeArea=${ta}&state=${st}&year=${yr}`;
      //Gender, State, Centre, Trade Area, Special Intervention Programme / Year
    } else if (yr === "") {
      query = `?gender=${gn}&sip=${sp}&tradeArea=${ta}&state=${st}&centreId=${cn}`;
      //Year, State, Centre, Trade Area, Special Intervention Programme / Gender
    } else if (gn === "") {
      query = `&year=${yr}&sip=${sp}&tradeArea=${ta}&state=${st}&centreId=${cn}`;
    }
    try {
      console.log(query);
      const res = await userRequest.get(`/trainee/${query}`);
      setTrainees(res.data);
    } catch (error) {
      setErrorMessage(error?.response?.data?.message);
    }
  };

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
                <Select name="gender" onChange={handleGenderChange}>
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
                    <Option key={s._id}>{s.name}</Option>
                  ))}
                </Select>
              </QueryDiv>
              <QueryDiv>
                <Select name="state" onChange={handleStateChange}>
                  <Option selected disabled>
                    Please Select a State
                  </Option>
                  {states.map((s) => (
                    <Option key={s._id} value={s.name}>
                      {s.name}
                    </Option>
                  ))}
                </Select>
              </QueryDiv>
              <QueryDiv>
                <Select name="sips" onChange={handleSIPChange}>
                  <Option selected disabled>
                    Please Select a Special Intervention Programme
                  </Option>
                  {sips.map((s) => (
                    <Option key={s._id} value={s.name}>
                      {s.name}
                    </Option>
                  ))}
                </Select>
              </QueryDiv>
              <QueryDiv>
                <Select name="centreId" onChange={handleCentreChange}>
                  <Option selected disabled>
                    Please Select a Centre
                  </Option>
                  {centres.map((s) => (
                    <Option key={s._id} value={s._id.toString()}>
                      {s.name}
                    </Option>
                  ))}
                </Select>
              </QueryDiv>
              <QueryDiv>
                <Input
                  name="year"
                  placeholder="Enter a Year:  2019"
                  onChange={handleYearChange}
                />
              </QueryDiv>

              <QueryDiv>
                <Submit onClick={handleSubmit}>Submit</Submit>
              </QueryDiv>

              <QueryDiv>
                <Submit onClick={() => window.location.reload()}>
                  Refresh Query Form
                </Submit>
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
