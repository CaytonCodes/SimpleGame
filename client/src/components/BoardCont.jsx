import React from 'react';
import styled from 'styled-components';
import GameCanvas from './GameCanvas';
import StartScreen from './StartScreen';

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
      gamePhase: 0,
    };
    this.gameChange = this.gameChange.bind(this);
  }

  componentDidMount() {
    const boardWidth = document.getElementById('BoardWrapper').clientWidth;
    const boardHeight = document.getElementById('BoardWrapper').clientHeight;
    this.setState({ boardWidth, boardHeight });
  }

  gameChange(phase) {
    console.log('game change');
    this.setState({ gamePhase: phase });
  }

  gameShow() {
    const { gamePhase, boardWidth, boardHeight } = this.state;
    if (gamePhase === 0) {
      return <StartScreen gameChange={this.gameChange} />;
    }
    if (gamePhase === 1) {
      return (
        <GameCanvas
          boardWidth={boardWidth}
          boardHeight={boardHeight}
          gameChange={this.gameChange}
        />
      );
    }
  }

  render() {
    return (
      <BoardContainer className="BoardContainer">
        <BoardWrapper id="BoardWrapper">
          {this.gameShow()}
        </BoardWrapper>
      </BoardContainer>
    );
  }
}

export default BoardCont;
