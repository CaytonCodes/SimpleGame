import React from 'react';
import styled from 'styled-components';
import { playInstructionsTitle, playInstructions } from './Statements';

const StartCont = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
`;

const StartDiv = styled.div`
  opacity: 1.0;
  text-align: center;
`;

const Instructions = styled.div`
  white-space: pre-wrap;
  text-align: left;
`;

const StartButton = styled.input`
  margin: 50px;
`;

function StartScreen(props) {
  const { gameChange } = props;
  const startClick = (e) => {
    e.preventDefault();
    gameChange(1);
  };

  return (
    <StartCont>
      <StartDiv>
        <h3>{playInstructionsTitle}</h3>
        <Instructions>{playInstructions}</Instructions>
        <StartButton
          type="button"
          value="Let's Play!"
          onClick={startClick}
        />
      </StartDiv>
    </StartCont>
  );
}

export default StartScreen;
