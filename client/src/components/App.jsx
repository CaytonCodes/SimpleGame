import React from 'react';
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionScores: [],
      highScores: [['juicebox', 5.5]],
      playerName: null,
    };
    this.gameEnd = this.gameEnd.bind(this);
    this.updatePlayer = this.updatePlayer.bind(this);
  }

  componentDidMount() {
    $.get('/api/highScores', (data) => {
      this.setState({ highScores: data });
    });
  }

  gameEnd(time) {
    const { sessionScores, playerName } = this.state;
    sessionScores.unshift(time);
    if (sessionScores.length > 10) { sessionScores.pop(); }
    this.setState({ sessionScores });
    console.log(this.state.sessionScores);
    $.post('/api/newGame', { playerId: playerName, sessionScores: sessionScores }, (returnedData) => {
      if (returnedData[1]) {
        this.setState({ highScores: returnedData[1] });
      }
    });
  }

  updatePlayer(name) {
    this.setState({ playerName: name });
  }

  render() {
    const { sessionScores, highScores, playerName } = this.state;
    return (
      <div>
        <Title>{mainTitle}</Title>
        <BoardCont
          gameEnd={this.gameEnd}
          playerName={playerName}
          updatePlayer={this.updatePlayer}
        />
        <ScoreCont className="ScoresContainer">
          <ScoresList list={highScores} header={HighScoresHeader} />
          <ScoresList list={sessionScores} header={SessScoresHeader} />
        </ScoreCont>
      </div>
    );
  }
}

export default App;
