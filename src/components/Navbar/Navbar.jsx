import React from "react";
import styled from "styled-components";
import Burger from "./Burger";
import { Link } from "react-router-dom";

const Nav = styled.nav`
  width: 100%;
  height: 55px;
  border-bottom: 2px solid #f1f1f1;
  padding: 0px;
  display: flex;
  justify-content: space-between;
  .logo {
    padding: 15px;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <div className="logo">
        <Link to="/">Home</Link>
      </div>
      <Burger />
    </Nav>
  );
};

export default Navbar;
