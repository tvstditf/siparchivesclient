import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #0d2538;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    z-index: 10;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
      font-size: 25px;
    }
  }
`;

const Li = styled.li`
  padding: 15px 10px;
  /* @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #0d2538;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
  } */
`;

const LinkImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

const RightNav = ({ open }) => {
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const id = user._id;

  const handleLogout = () => {
    localStorage.removeItem("persist:root");
    navigate("/");
    window.location.reload();
  };

  return (
    <Ul open={open}>
      <Link to="/users">
        <Li>Users</Li>
      </Link>
      <Link to="/centres">
        <Li>Training Centres</Li>
      </Link>
      <Link to="/trainees">
        <Li>Trainees</Li>
      </Link>
      {user ? (
        <Link onClick={handleLogout} to="/">
          <Li>Log Out</Li>
        </Link>
      ) : (
        <Link to="/logout">
          <Li>Sign Out</Li>
        </Link>
      )}

      {user ? (
        <Link to={`/user/${id}`}>
          <Li>{user.name}</Li>
        </Link>
      ) : (
        <Link to="/logout">
          <Li>Sign Out</Li>
        </Link>
      )}
      {user ? (
        <Link to={`/user/${id}`}>
          <Li>
            <LinkImg
              src={
                user.profilePicture
                  ? user.profilePicture
                  : "https://images.unsplash.com/photo-1512850692650-c382e34f7fb2?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768"
              }
            />
          </Li>
        </Link>
      ) : (
        <Link to="/logout">
          <Li>Sign Out</Li>
        </Link>
      )}
    </Ul>
  );
};

export default RightNav;
