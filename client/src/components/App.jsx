/*
App returns a header, a board container component, and a list container component
Board Container houses the game.
The list container displays game scores.
*/
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import { mainTitle, SessScoresHeader, HighScoresHeader } from './Statements';
import BoardCont from './BoardCont';
import ScoresList from './ScoresList';

const Title = styled.h1`
  text-align: center;
  `;

const ScoreCont = styled.div`
  padding-top: 1rem;
  margin: auto;
  width: 70%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space evenly;
  align-items: stretch;
  align-content: stretch;
`;

function App() {
  const [sessionScores, setSessionScores] = useState([]);
  const [highScores, setHighScores] = useState([]);
  const [playerName, setPlayerName] = useState(null);

  useEffect(() => {
    $.get('/api/highScores', (data) => {
      setHighScores(data);
    });
  }, []);

  const gameEnd = (time) => {
    // add game time to our sessionScores array
    const tempScores = sessionScores;
    tempScores.unshift(time);
    if (tempScores.length > 10) { tempScores.pop(); }
    setSessionScores(tempScores);
    // send latest score to server
    $.post('/api/newGame', { playerId: playerName, sessionScores }, (returnedData) => {
      // if returnedData has a second value, our highScores have changed
      if (returnedData[1]) { setHighScores(returnedData[1]); }
    });
  };

  const updatePlayer = (name) => {
    setPlayerName(name);
  };

  return (
    <div>
      <Title>{mainTitle}</Title>
      <BoardCont
        gameEnd={gameEnd}
        playerName={playerName}
        updatePlayer={updatePlayer}
      />
      <ScoreCont className="ScoresContainer">
        <ScoresList list={highScores} header={HighScoresHeader} />
        <ScoresList list={sessionScores} header={SessScoresHeader} />
      </ScoreCont>
    </div>
  );
}

export default App;
