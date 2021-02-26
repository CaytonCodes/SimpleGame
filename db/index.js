const mongoose = require('mongoose');

const { Schema } = mongoose;

mongoose.connect('mongodb://localhost/quarantineGame', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to MongoDB');
});

const gameSchema = new Schema({
  playerName: String,
  sessionScores: [Number],
});

const highScores = new Schema({
  playerScores: [[]],
});

const Game = mongoose.model('Game', gameSchema);
const HighScores = mongoose.model('HighScores', highScores);

module.exports = {
  Game,
  HighScores,
};
