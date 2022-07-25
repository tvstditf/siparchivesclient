import React from "react";
import Chart from "../../components/chart/Chart";
import Counter from "../../components/counter/Counter";
import Navbar from "../../components/Navbar/Navbar";
import styled from "styled-components";
import Footer from "../../components/Footer/Footer";

const Container = styled.div`
  background: linear-gradient(
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.7)
    ),
    url("http://images.unsplash.com/photo-1531685250784-7569952593d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60")
      center;
  background-size: cover;
`;

const ChartDiv = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ChartTitle = styled.h3`
  font-weight: 500;
  margin-left: 60px;
  margin-bottom: 10px;
`;

const Home = () => {
  return (
    <Container>
      <Navbar />
      <Counter />
      <ChartDiv>
        <ChartTitle>Special Intervention Training Statistics</ChartTitle>
        <Chart />
      </ChartDiv>
      <Footer />
    </Container>
  );
};

export default Home;
