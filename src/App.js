import React from "react";
import { useSelector } from "react-redux";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import CentreDetail from "./sip/UserPages/CentreDetail";
import CentreList from "./sip/UserPages/CentreList";
import Home from "./sip/UserPages/Home";
import NewCentre from "./sip/UserPages/NewCentre";
import NewTrainee from "./sip/UserPages/NewTrainee";
import ProfilePage from "./sip/UserPages/ProfilePage";
import TraineeDetail from "./sip/UserPages/TraineeDetail";
import TraineeList from "./sip/UserPages/TraineeList";
import UserList from "./sip/UserPages/UserList";

const App = () => {
  const user = useSelector((state) => state?.user?.currentUser);

  return (
    <Router>
      {user ? (
        <Routes>
          <>
            <Route path="/" element={<Home />} />

            <Route path="/register" element={<Register />} />

            {/* Centres */}
            <Route path="/centres" element={<CentreList />} />
            <Route path="/centre/:id" element={<CentreDetail />} />
            <Route path="/newcentre" element={<NewCentre />} />

            {/* Trainees */}
            <Route path="/trainees" element={<TraineeList />} />
            <Route path="/trainee/:id" element={<TraineeDetail />} />
            <Route path="/newtrainee" element={<NewTrainee />} />

            {/* User Pages */}
            <Route path="/users" element={<UserList />} />
            <Route path="/user/:id" element={<ProfilePage />} />
          </>
        </Routes>
      ) : (
        <Login />
      )}
    </Router>
  );
};

export default App;
