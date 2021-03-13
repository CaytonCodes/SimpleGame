/* eslint-disable no-lonely-if */
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const { getHighScores, newHighScore, newGame } = require('../db/query.js');

const port = 3000;
let highScoreList = [];
let lowestHighScore;

const app = express();

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(express.static(`${__dirname}/../client/dist`));

app.get('/api/highScores', (req, res) => {
  getHighScores((err, highScores) => {
    if (err) {
      res.status(400).send(err);
    } else {
      highScoreList = highScores[0].playerScores;
      if (highScoreList[0]) {
        lowestHighScore = highScoreList[highScores.length - 1][1];
      } else { lowestHighScore = 0; }
      res.status(200).send(highScoreList);
    }
  });
});

app.post('/api/newGame', (req, res) => {
  const { playerId, 'sessionScores[]': sessionScores } = req.body;
  const latestScore = Array.isArray(sessionScores) ? sessionScores[0] : sessionScores;
  let highScoreUpdate = false;
  if (latestScore > lowestHighScore || highScoreList.length < 10) {
    // update the highScoreList
    highScoreList = [...highScoreList, [playerId, latestScore]].sort((a, b) => b[1] - a[1]);
    while (highScoreList.length > 10) { highScoreList.pop(); }
    highScoreUpdate = true;
  }
  // update session scores
  newGame(playerId, sessionScores, (err, playerData) => {
    const { sessionScores: returnedData } = playerData;
    if (err) {
      res.status(400).send(err);
    } else {
      if (highScoreUpdate) {
        newHighScore(highScoreList, (err2, returnedHighScores) => {
          const { playerScores: updatedHighScores } = returnedHighScores;
          if (err2) {
            res.status(400).send(err2);
          } else {
            res.status(200).send([returnedData, updatedHighScores]);
          }
        });
      } else {
        res.status(200).send([returnedData]);
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
