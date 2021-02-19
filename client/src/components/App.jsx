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
    const { sessionScores } = this.state;
    sessionScores.unshift(time);
    if (sessionScores.length > 10) { sessionScores.pop(); }
    this.setState({ sessionScores });
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
        <ScoreCont>
          <ScoresList list={highScores} header={HighScoresHeader} />
          <ScoresList list={sessionScores} header={SessScoresHeader} />
        </ScoreCont>
      </div>
    );
  }
}

export default App;
