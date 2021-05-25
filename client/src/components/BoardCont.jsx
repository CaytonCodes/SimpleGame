/*
To be cleaned up
*/
import React, { useState } from 'react';
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
  background: black;
  width: 70%;
  min-width: 500px;
  height: 80vh;
  border: 5px solid white;
`;

// helper function to grab board size
const getBoardSize = () => {
  const boardWidth = document.getElementById('BoardWrapper').clientWidth;
  const boardHeight = document.getElementById('BoardWrapper').clientHeight;
  return { boardWidth, boardHeight };
};

function BoardCont(props) {
  const [gamePhase, setGamePhase] = useState();
  const [lastGame, setLastGame] = useState();

  const gameChange = (phase, time = 0) => {
    const { gameEnd } = props;
    if (time > 0) {
      setLastGame(time);
      gameEnd(time);
    }
    setGamePhase(phase);
  };
}

class BoardContOld extends React.Component {
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
    const { playerName, updatePlayer } = this.props;
    if (gamePhase === 0) {
      return <StartScreen gameChange={this.gameChange} />;
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

// class BoardCont extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       gamePhase: 0,
//       lastGame: 0,
//     };
//     this.gameChange = this.gameChange.bind(this);
//   }

//   gameChange(phase, time = 0) {
//     const { gameEnd } = this.props;
//     if (time > 0) {
//       this.setState({ lastGame: time });
//       gameEnd(time);
//     }
//     this.setState({ gamePhase: phase });
//   }

//   gameShow() {
//     const { gamePhase, lastGame } = this.state;
//     const { playerName, updatePlayer } = this.props;
//     if (gamePhase === 0) {
//       return <StartScreen gameChange={this.gameChange} />;
//     }
//     if (gamePhase === 1) {
//       if (!playerName) {
//         return (<PlayerModal updatePlayer={updatePlayer} />);
//       }
//       const { boardWidth, boardHeight } = getBoardSize();
//       return (
//         <GameCanvas
//           boardWidth={boardWidth}
//           boardHeight={boardHeight}
//           gameChange={this.gameChange}
//         />
//       );
//     }
//     return (
//       <GameEndScreen
//         gameTime={lastGame}
//         gameChange={this.gameChange}
//       />
//     );
//   }

//   render() {
//     return (
//       <BoardContainer className="BoardContainer">
//         <BoardWrapper id="BoardWrapper">
//           {this.gameShow()}
//         </BoardWrapper>
//       </BoardContainer>
//     );
//   }
// }
