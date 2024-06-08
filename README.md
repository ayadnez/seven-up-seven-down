# 7 UP 7 DOWN Game

## Overview

This project implements the classic dice game "7 Up 7 Down" using React for the frontend and Node.js with Express for the backend. In this game, players bet on whether the sum of two dice will be below 7, exactly 7, or above 7. Players win double their stake for correct bets on below or above 7, and five times their stake for correctly betting on exactly 7.

## Game Specifications

- Player starts with 5000 points.
- The player can bet on:
  - 7 Up (sum of dice > 7)
  - 7 Down (sum of dice < 7)
  - Lucky 7 (sum of dice = 7)
- The player can place bets of 100, 200, or 500 points.
- Dice rolls are generated via an API call.
- The result of the dice roll is displayed on the UI.
- Winning/losing calculations are handled via an API call.
- The player's points are updated via an API call after each result.

## Technologies Used

### Frontend
- React
- Material UI
- Axios

### Backend
- Node.js
- Express
- REST API (POST)
- JSON request and response