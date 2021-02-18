import React from 'react';
import styled from 'styled-components';
import { mainTitle } from './Statements';
import BoardCont from './BoardCont';

const Title = styled.h1`
  text-align: center;
  `;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionScores: [],
    };
    this.gameEnd = this.gameEnd.bind(this);
  }

  gameEnd(time) {
    const { sessionScores } = this.state;
    sessionScores.unshift(time);
    if (sessionScores.length > 10) { sessionScores.pop(); }
    this.setState({ sessionScores });
  }

  render() {
    return (
      <div>
        <Title>{mainTitle}</Title>
        <BoardCont gameEnd={this.gameEnd} />
      </div>
    );
  }
}

export default App;
