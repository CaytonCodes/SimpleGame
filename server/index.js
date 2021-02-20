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
      console.log(err);
      res.status(400).send(err);
    } else {
      highScoreList = highScores[0].playerScores;
      console.log(highScoreList);
      if (highScoreList[0]) {
        lowestHighScore = highScoreList[highScores.length - 1][1];
      } else { lowestHighScore = 0; }
      res.status(200).send(highScoreList);
    }
  });
});

app.post('/api/newGame', (req, res) => {
  const { playerId } = req.body;
  const sessionScores = req.body['sessionScores[]'];
  // update highscores if needed
  // update session scores
  newGame(playerId, sessionScores, (err, playerData) => {
    if (err) {
      console.log(err);
      res.status(200).send(err);
    // }
    // const lastSession = parseFloat(sessionScores[0]);
    // if (lastSession > lowestHighScore || highScoreList.length < 10) {
    //   let i = 0;
    //   let next;
    //   if (highScoreList[i]) {
    //     while (lastSession <= highScoreList[i][1]) {
    //       i += 1;
    //     }
    //     next = highScoreList[i];
    //     highScoreList[i] = [playerId, lastSession];
    //     i += 1;
    //     highScoreList[i] = next;
    //     while (i < highScoreList.length) {
    //       next = highScoreList[i];
    //       highScoreList[i] = next;
    //     }
    //     while (highScoreList.length > 10) {
    //       highScoreList.pop();
    //     }
    //   } else {
    //     highScoreList = [playerId, lastSession];
    //   }
    //   newHighScore(highScoreList, (err2, highScoreData) => {
    //     if (err) {
    //       res.status(400).send(err2);
    //     } else {
    //       res.status(200).send([playerData, highScoreData]);
    //     }
    //   });
    } else {
      res.status(200).send([playerData]);
    }
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
