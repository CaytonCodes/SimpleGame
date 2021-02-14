import React from 'react';
import styled from 'styled-components';
import Obstacle from './Obstacle';

const BoardContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const BoardBody = styled.div`
  position: relative;
  background: darkgrey;
  width: 80%;
  max-width: 700px;
  padding-top: 50%;
  border: 5px solid white;
`;

const Board = (props) => (
  <BoardContainer className="BoardContainer">
    <BoardBody className="Board">
      <Obstacle />
    </BoardBody>
  </BoardContainer>
);

export default Board;
