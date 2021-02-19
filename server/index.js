const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const port = 3000;

const app = express();

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(express.static(`${__dirname}/../client/dist`));

// app.get('/api/highScores')

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
