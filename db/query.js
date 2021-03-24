const { Game, HighScores } = require('./index.js');

const getHighScores = (callback) => {
  HighScores.find({}, (err, doc) => {
    const data = doc[0].playerScores;
    if (err) { callback(err); }
    callback(null, data);
  });
};

const newHighScore = (ScoresList, callback) => {
  HighScores.findOneAndUpdate(
    {},
    { playerScores: ScoresList },
    { upsert: true, new: true },
    (err, newList) => {
      if (err) { callback(err); }
      callback(null, newList);
    },
  );
};

const newGame = (playerId, sessionScores, callback) => {
  Game.findOneAndUpdate(
    { playerName: playerId },
    { sessionScores },
    { upsert: true, new: true },
    (err, newList) => {
      if (err) { callback(err); }
      callback(null, newList);
    },
  );
};

module.exports = {
  getHighScores,
  newHighScore,
  newGame,
};
