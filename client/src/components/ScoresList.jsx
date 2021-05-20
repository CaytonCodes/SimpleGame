/*
Returns a list of input scores for either the session or all time high scores
*/
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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

// This left in case we want to change styling for lists and entries
const ScoresUL = styled.ul`

`;

const ScoreEntry = styled.li`

`;

function ScoresList(props) {
  const { list, header } = props;

  // default to our empty scores statement
  // if the scores list prop is not empty, we'll update to that
  let scoresList = `${ScoresEmpty} `;
  if (list[0]) {
    // counter is used to placate the unique key error
    //   and eslint's aversion to passing index as a prop
    let counter = 0;
    scoresList = list.map((score) => {
      counter += 1;
      // score either contains [time] or [player, time]
      //   depending on whether it is session or highscores list
      //   currently handling it as a conditional.
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

ScoresList.propTypes = {
  list: PropTypes.instanceOf(Array).isRequired,
  header: PropTypes.string.isRequired,
};

export default ScoresList;
