const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 5000;

// Player starts with 5000 points
let playerPoints = 5000;

// Helper function to roll dice
const rollDice = () => {
  return Math.floor(Math.random() * 6) + 1;
};

// API endpoint to generate dice roll
app.get('/roll-dice', (req, res) => {
  const dice1 = rollDice();
  const dice2 = rollDice();
  const result = dice1 + dice2;
  res.json({ dice1, dice2, result });
});

// API endpoint to calculate win/loss
app.post('/bet', (req, res) => {
  const { betAmount, betOption, diceResult } = req.body;

  if (![100, 200, 500].includes(betAmount)) {
    return res.status(400).json({ error: 'Invalid bet amount' });
  }

  let win = false;

  switch (betOption) {
    case '7 up':
      if (diceResult > 7) win = true;
      break;
    case '7 down':
      if (diceResult < 7) win = true;
      break;
    case 'Lucky 7':
      if (diceResult === 7) win = true;
      break;
    default:
      return res.status(400).json({ error: 'Invalid bet option' });
  }

  if (win) {
    playerPoints += betAmount;
  } else {
    playerPoints -= betAmount;
  }

  res.json({ win, playerPoints });
});

// API endpoint to get current points
app.get('/points', (req, res) => {
  res.json({ playerPoints });
});

app.listen(PORT, () => {
  console.log(`listening: http://localhost:${PORT}`);
});