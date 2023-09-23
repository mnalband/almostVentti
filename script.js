'use strict';

const querySelector = function (selector) {
  return document.querySelector(selector);
};

// Defining elements
const scoreEl0 = querySelector('#score--0');
const scoreEl1 = querySelector('#score--1');
const currentEl0 = querySelector('#current--0');
const currentEl1 = querySelector('#current--1');
const diceLogo = querySelector('.dice');
const btnNew = querySelector('.btn--new');
const btnRoll = querySelector('.btn--roll');
const btnHold = querySelector('.btn--hold');
const playerEl1 = querySelector('.player--0');
const playerEl2 = querySelector('.player--1');
let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  currentEl0.textContent = 0;
  currentEl1.textContent = 0;

  diceLogo.classList.add('hidden');
  playerEl1.classList.remove('player--winner');
  playerEl2.classList.remove('player--winner');
  playerEl1.classList.add('player--active');
  playerEl2.classList.remove('player--active');
};

init();

const switchPLayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  // change focus
  playerEl1.classList.toggle('player--active');
  playerEl2.classList.toggle('player--active');
};

// Rolling the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceLogo.classList.remove('hidden');
    diceLogo.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      // currentEl0.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPLayer();
    }
  }
});

// Hold functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceLogo.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPLayer();
    }
  }
});

// New game
btnNew.addEventListener('click', init);
