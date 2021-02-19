import React from 'react';
import styled from 'styled-components';
import { playInstructionsTitle, playInstructions } from './Statements';

const StartCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  position: absolute;
  width: 100%;
  margin: auto;
`;

const StartDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Instructions = styled.div`
  white-space: pre-wrap;
  margin: auto 50px;
  text-align: left;
  line-height: 2;
`;

const StartButton = styled.input`
  margin: 50px;
  font-size: 1.25rem;
  font-weight: 700;
`;

function StartScreen(props) {
  const { gameChange } = props;
  const startClick = (e) => {
    e.preventDefault();
    gameChange(1);
  };

  return (
    <StartCont id="StartCont">
      <StartDiv id="StartDiv">
        <h3 id="StartHeader">{playInstructionsTitle}</h3>
        <Instructions id="StartInstructions">{playInstructions}</Instructions>
        <StartButton
          id="StartButton"
          type="button"
          value="Let's Play!"
          onClick={startClick}
        />
      </StartDiv>
    </StartCont>
  );
}

export default StartScreen;
