/*
Game End Screen displays at the end of the game.
Shows game duration, and allows for a new game to be started.
All statement strings live in Statements.js.
*/
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { gameEndPhrase, gameLengthTuple, startNewGame } from './Statements';

const EndCont = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: #e43d3d;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
`;

const EndWrapper = styled.div`
  margin: auto;
  background-color: transparent;
`;
const RestartButt = styled.input`
  margin: 50px;
  font-size: 1.25rem;
  font-weight: 700;
`;

const GameEndScreen = (props) => {
  const { gameTime, gameChange } = props;

  const restartGame = (e) => {
    e.preventDefault();
    gameChange(1);
  };

  return (
    <EndCont id="EndContainer">
      <EndWrapper id="EndWrapper">
        <div>
          <h3>{gameEndPhrase}</h3>
          <br />
          {gameLengthTuple[0]}
          &nbsp;
          {gameTime}
          &nbsp;
          {gameLengthTuple[1]}
        </div>
        <RestartButt
          id="EndButton"
          type="button"
          value={startNewGame}
          onClick={restartGame}
        />
      </EndWrapper>
    </EndCont>
  );
};

GameEndScreen.propTypes = {
  gameTime: PropTypes.number.isRequired,
  gameChange: PropTypes.func.isRequired,
};

export default GameEndScreen;
