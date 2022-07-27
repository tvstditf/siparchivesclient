import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../../utils/responsive";

//Custom Hooks
import state from "../../utils/customHooks/states";
import tradeAreas from "../../utils/customHooks/tradearea";
import sips from "../../utils/customHooks/sips";
import { userRequest } from "../../utils/requestMethods";

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const FeaturedItem = styled.div`
  flex: 1;
  margin: 20px;
  padding: 30px;
  border-radius: 10px;
  cursor: pointer;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  ${mobile({ margin: "10px" })}
`;

const FeaturedTitle = styled.span`
  font-size: 20px;
`;

const FeaturedCounterContainer = styled.div`
  margin: 10px;
`;

const FeaturedCounter = styled.span`
  font-size: 30px;
`;

const Counter = () => {
  const [centres, setCentres] = useState([]);
  const [trainees, setTrainees] = useState([]);

  useEffect(() => {
    const getNumber = async () => {
      try {
        const resTrain = await userRequest.get(`/trainee/?`);
        const resCen = await userRequest.get(`/centre/?`);
        setTrainees(resTrain?.data);
        setCentres(resCen?.data);
      } catch (error) {
        // console.log(error);
      }
    };
    getNumber();
  }, []);

  return (
    <Wrapper>
      <FeaturedItem>
        <FeaturedTitle>Number of Trainees</FeaturedTitle>
        <FeaturedCounterContainer>
          <FeaturedCounter>{trainees?.length} </FeaturedCounter>
        </FeaturedCounterContainer>
      </FeaturedItem>
      <FeaturedItem>
        <FeaturedTitle>Number of Centres</FeaturedTitle>
        <FeaturedCounterContainer>
          <FeaturedCounter> {centres?.length}</FeaturedCounter>
        </FeaturedCounterContainer>
      </FeaturedItem>
      <FeaturedItem>
        <FeaturedTitle>Number of Special Intervention Programmes</FeaturedTitle>
        <FeaturedCounterContainer>
          <FeaturedCounter>{sips.length} </FeaturedCounter>
        </FeaturedCounterContainer>
      </FeaturedItem>
      <FeaturedItem>
        <FeaturedTitle>Number of Trade Areas</FeaturedTitle>
        <FeaturedCounterContainer>
          <FeaturedCounter>{tradeAreas.length} </FeaturedCounter>
        </FeaturedCounterContainer>
      </FeaturedItem>
    </Wrapper>
  );
};

export default Counter;
