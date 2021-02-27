import React from 'react';
import styled from 'styled-components';
import { ScoresEmpty } from './Statements';

const ScoresWrapper = styled.div`
  border: 1px solid white;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const ScoresHeader = styled.h3`
  text-align: center;
`;

const ScoresUL = styled.ul`

`;

const ScoreEntry = styled.li`

`;

function ScoresList(props) {
  const { list, header } = props;

  let scoresList = `${ScoresEmpty} `;
  if (list[0]) {
    let counter = 0;
    scoresList = list.map((score) => {
      counter += 1;
      if (score[1]) {
        return (
          <ScoreEntry key={counter}>
            Player:&nbsp;
            {score[0]}
            &nbsp;-- Score:&nbsp;
            {score[1]}
          &nbsp;seconds&nbsp;
          </ScoreEntry>
        );
      }
      return (
        <ScoreEntry key={counter}>
          {score}
          &nbsp;seconds
        </ScoreEntry>
      );
    });
  }

  return (
    <ScoresWrapper id="ScoresWrapper">
      <ScoresHeader id="ScoresHeader">
        {header}
      </ScoresHeader>
      <ScoresUL id="ScoresList">
        {scoresList}
      </ScoresUL>
    </ScoresWrapper>
  );
}

export default ScoresList;
