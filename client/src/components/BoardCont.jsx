/*
Container for game board

Fills board container with screens depending on phase of game play.
phase 0 -> Start Screen
phase 1 -> Game Canvas or Player Modal if no playerName
phase 2 -> Game End Screen
*/
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GameCanvas from './GameLogic/GameCanvas';
import StartScreen from './StartScreen';
import GameEndScreen from './GameEndScreen';
import PlayerModal from './PlayerModal';

const BoardContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const BoardWrapper = styled.div`
  position: relative;
  background: black;
  width: 70%;
  min-width: 500px;
  height: 80vh;
  border: 5px solid white;
`;

// helper function to grab board size
// grabbing board size now makes an easy reference that doesn't have to be
// rechecked with every new animation frame
// the drawback is that if the board changes size during gameplay
// it won't be acknowledged by game
const getBoardSize = () => {
  const boardWidth = document.getElementById('BoardWrapper').clientWidth;
  const boardHeight = document.getElementById('BoardWrapper').clientHeight;
  return { boardWidth, boardHeight };
};

function BoardCont(props) {
  const [gamePhase, setGamePhase] = useState(0);
  const [lastGame, setLastGame] = useState(0);

  const gameChange = (phase, time = 0) => {
    const { gameEnd } = props;
    if (time > 0) {
      setLastGame(time);
      gameEnd(time);
    }
    setGamePhase(phase);
  };

  const gameShow = () => {
    const { playerName, updatePlayer } = props;
    if (gamePhase === 0) {
      return <StartScreen gameChange={gameChange} />;
    }
    if (gamePhase === 1) {
      if (!playerName) {
        return (<PlayerModal updatePlayer={updatePlayer} />);
      }
      const { boardWidth, boardHeight } = getBoardSize();
      return (
        <GameCanvas
          boardWidth={boardWidth}
          boardHeight={boardHeight}
          gameChange={gameChange}
        />
      );
    }
    return (
      <GameEndScreen
        gameTime={lastGame}
        gameChange={gameChange}
      />
    );
  };

  return (
    <BoardContainer className="BoardContainer">
      <BoardWrapper id="BoardWrapper">
        {gameShow()}
      </BoardWrapper>
    </BoardContainer>
  );
}

BoardCont.propTypes = {
  gameEnd: PropTypes.func.isRequired,
  playerName: PropTypes.string.isRequired,
  updatePlayer: PropTypes.func.isRequired,
};

export default BoardCont;
