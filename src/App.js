import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Select, MenuItem, Card, CardContent, Typography, Container, Grid } from '@mui/material';
import { styled } from '@mui/system';

const ContainerStyled = styled(Container)({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f5f5f5',
  padding: '20px',
});

const CardStyled = styled(Card)({
  maxWidth: 400,
  width: '100%',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
  textAlign: 'center',
});

const ButtonStyled = styled(Button)({
  marginTop: '20px',
});

const DiceResultStyled = styled(Typography)({
  marginTop: '20px',
  fontSize: '18px',
  fontWeight: 'bold',
});

const App = () => {
  const [points, setPoints] = useState(5000);
  const [bet, setBet] = useState(100);
  const [choice, setChoice] = useState('7 up');
  const [diceResult, setDiceResult] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await axios.get('http://localhost:5000/points');
        setPoints(response.data.playerPoints);
      } catch (error) {
        console.error('Error fetching points:', error);
      }
    };
    fetchPoints();
  }, []);

  const handleRollDice = async () => {
    try {
      const response = await axios.get('http://localhost:5000/roll-dice');
      const { dice1, dice2, result } = response.data;

      setDiceResult({ dice1, dice2 });

      const betResponse = await axios.post('http://localhost:5000/bet', {
        betAmount: bet,
        betOption: choice,
        diceResult: result
      });

      const { win, playerPoints } = betResponse.data;
      setPoints(playerPoints);
      setMessage(win ? 'You win!' : 'You lose!');
    } catch (error) {
      console.error('Error rolling dice:', error);
    }
  };

  return (
    <ContainerStyled>
      <CardStyled>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            7 Up 7 Down
          </Typography>
          <Typography variant="h6" component="p" gutterBottom>
            Points: {points}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1" component="p">
                Bet Amount
              </Typography>
              <Select
                value={bet}
                onChange={(e) => setBet(e.target.value)}
                fullWidth
              >
                <MenuItem value={100}>100</MenuItem>
                <MenuItem value={200}>200</MenuItem>
                <MenuItem value={500}>500</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" component="p">
                Your Choice
              </Typography>
              <Select
                value={choice}
                onChange={(e) => setChoice(e.target.value)}
                fullWidth
              >
                <MenuItem value="7 up">7 Up</MenuItem>
                <MenuItem value="7 down">7 Down</MenuItem>
                <MenuItem value="Lucky 7">Lucky 7</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <ButtonStyled
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleRollDice}
              >
                Roll Dice
              </ButtonStyled>
            </Grid>
          </Grid>
          {diceResult && (
            <DiceResultStyled>
              Dice Results: {diceResult.dice1} and {diceResult.dice2}
            </DiceResultStyled>
          )}
          {message && (
            <Typography variant="body1" component="p">
              {message}
            </Typography>
          )}
        </CardContent>
      </CardStyled>
    </ContainerStyled>
  );
};

export default App;
