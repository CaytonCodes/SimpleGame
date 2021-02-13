import React from 'react';
import styled from 'styled-components';

const BoardBody = styled.div`
  width: 80%;
  max-width: 700px;
  padding-top: 50%;
  border: 5px solid white;
`;

const Board = (props) => {
  console.log('Board Up', props);
  return <BoardBody />;
};

export default Board;
