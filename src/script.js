'use strict';

/**
 * Helper function to query the DOM and select a single element.
 * @param {string} selector - The CSS selector for the element to select.
 * @returns {Element} The selected DOM element.
 */
const qs = selector => document.querySelector(selector);

/**
 * Helper function to query the DOM and select multiple elements.
 * @param {string} selector - The CSS selector for the elements to select.
 * @returns {NodeList} A NodeList containing the selected DOM elements.
 */
const qsa = selector => document.querySelectorAll(selector);

/**
 * DOM element selectors.
 */
const EL = {
  SCORE: ['#score--0', '#score--1'],
  CURRENT: ['#current--0', '#current--1'],
  DICE_LOGO: '.dice',
  BTN_NEW: '.btn--new',
  BTN_ROLL: '.btn--roll',
  BTN_HOLD: '.btn--hold',
  PLAYERS: ['.player--0', '.player--1'],
};

const DICE_SIDES = 6;

let scores, currentScore, activePlayer, playing;

/**
 * Initialize the game.
 * Sets up initial game state and displays it on the UI.
 */
const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  EL.SCORE.forEach((el, index) => (qs(el).textContent = 0));
  EL.CURRENT.forEach((el, index) => (qs(el).textContent = 0));

  qs(EL.DICE_LOGO).classList.add('hidden');
  EL.PLAYERS.forEach((el, index) => {
    qs(el).classList.remove('player--winner', 'player--active');
    if (index === 0) qs(el).classList.add('player--active');
  });
};

init();

/**
 * Switches to the other player.
 * Updates the UI to reflect the change in active player.
 */
const switchPlayer = () => {
  qs(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  EL.PLAYERS.forEach(el => qs(el).classList.toggle('player--active'));
};

/**
 * Rolls the dice and updates the current score based on the roll.
 * Updates the UI to reflect the dice roll and current score.
 */
const rollDice = () => {
  if (playing) {
    const dice = Math.trunc(Math.random() * DICE_SIDES) + 1;
    qs(EL.DICE_LOGO).classList.remove('hidden');
    qs(EL.DICE_LOGO).src = `./assets/dice-img/dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      qs(`#current--${activePlayer}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
};

/**
 * Holds the current score for the active player.
 * Updates the total score and checks for a winning condition.
 * Updates the UI to reflect the changes.
 */
const holdScore = () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    qs(`#score--${activePlayer}`).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      qs(EL.DICE_LOGO).classList.add('hidden');
      qs(EL.PLAYERS[activePlayer]).classList.add('player--winner');
      qs(EL.PLAYERS[activePlayer]).classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
};

qs(EL.BTN_ROLL).addEventListener('click', rollDice);
qs(EL.BTN_HOLD).addEventListener('click', holdScore);
qs(EL.BTN_NEW).addEventListener('click', init);
