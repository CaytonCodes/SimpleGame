import React from 'react';
import styled from 'styled-components';
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
  background: #221c1c;
  width: 70%;
  min-width: 500px;
  height: 80vh;
  border: 5px solid white;
`;

const getBoardSize = () => {
  const boardWidth = document.getElementById('BoardWrapper').clientWidth;
  const boardHeight = document.getElementById('BoardWrapper').clientHeight;
  return { boardWidth, boardHeight };
};

class BoardCont extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gamePhase: 0,
      lastGame: 0,
    };
    this.gameChange = this.gameChange.bind(this);
  }

  gameChange(phase, time = 0) {
    const { gameEnd } = this.props;
    if (time > 0) {
      this.setState({ lastGame: time });
      gameEnd(time);
    }
    this.setState({ gamePhase: phase });
  }

  gameShow() {
    const { gamePhase, lastGame } = this.state;
    if (gamePhase === 0) {
      return <StartScreen gameChange={this.gameChange} />;
    }
    if (gamePhase === 1) {
      const { boardWidth, boardHeight } = getBoardSize();
      return (
        <GameCanvas
          boardWidth={boardWidth}
          boardHeight={boardHeight}
          gameChange={this.gameChange}
        />
      );
    }
    return (
      <GameEndScreen
        gameTime={lastGame}
        gameChange={this.gameChange}
      />
    );
  }

  render() {
    const { playerName, updatePlayer } = this.props;
    let playerModal = '';
    if (!playerName) {
      playerModal = <PlayerModal updatePlayer={updatePlayer} />;
    }
    return (
      <BoardContainer className="BoardContainer">
        <BoardWrapper id="BoardWrapper">
          {playerModal}
          {this.gameShow()}
        </BoardWrapper>
      </BoardContainer>
    );
  }
}

export default BoardCont;
