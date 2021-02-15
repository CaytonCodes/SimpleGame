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
  }

  render() {
    return (
      <div>
        <Title>{mainTitle}</Title>
        <BoardCont />
      </div>
    );
  }
}

export default App;
