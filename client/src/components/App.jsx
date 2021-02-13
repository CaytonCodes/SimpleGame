import React from 'react';
import styled from 'styled-components';
import { mainTitle } from './Statements';
import GameBoard from './GameBoard';

const Title = styled.h1`
  text-align: center;
  `;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionScores: [],
    };
  }

  render() {
    return (
      <div>
        <Title>{mainTitle}</Title>
        <GameBoard />
      </div>
    );
  }
}

export default App;
