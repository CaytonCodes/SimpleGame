import React from 'react';
import styled from 'styled-components';
import GameCanvas from './GameCanvas';

const BoardContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const BoardWrapper = styled.div`
  position: relative;
  background: darkgrey;
  width: 80%;
  max-height: 80%;
  padding-bottom: 75%;
  border: 5px solid white;
`;

class BoardCont extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardWidth: '0',
      boardHeight: '0',
    };
  }

  componentDidMount() {
    const boardWidth = document.getElementById('BoardWrapper').clientWidth;
    const boardHeight = document.getElementById('BoardWrapper').clientHeight;
    this.setState({ boardWidth, boardHeight });
  }

  render() {
    const { boardWidth, boardHeight } = this.state;
    return (
      <BoardContainer className="BoardContainer">
        <BoardWrapper id="BoardWrapper">
          <GameCanvas boardWidth={boardWidth} boardHeight={boardHeight} />
        </BoardWrapper>
      </BoardContainer>
    );
  }
}

export default BoardCont;
