import React from 'react';
import styled from 'styled-components';

const EndCont = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: #d16666;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
`;

const EndWrapper = styled.div`
  margin: auto;
  background-color: transparent;
`;
const RestartButt = styled.input`
  margin: 50px;
  font-size: 1.25rem;
  font-weight: 700;
`;

const GameEndScreen = (props) => {
  const { gameTime, gameChange} = props;

  const restartGame = (e) => {
    e.preventDefault();
    gameChange(1);
  };

  return (
    <EndCont id="EndContainer">
      <EndWrapper id="EndWrapper">
        <div>
          <h3>Infected!</h3>
          <br />
          You survived for&nbsp;
          {gameTime}
          &nbsp;seconds.
        </div>
        <RestartButt
          id="EndButton"
          type="button"
          value="I can do better!"
          onClick={restartGame}
        />
      </EndWrapper>
    </EndCont>
  );
};

export default GameEndScreen;
