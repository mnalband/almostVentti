const {
  init,
  switchPlayer,
  rollDice,
  holdScore,
  scores,
  currentScore,
  activePlayer,
  playing,
} = require("../script.js");

describe("AlmostVentti Game", () => {
  beforeEach(() => {
    init();
  });

  test("Initial game state", () => {
    expect(scores).toEqual([0, 0]);
    expect(currentScore).toBe(0);
    expect(activePlayer).toBe(0);
    expect(playing).toBe(true);
  });

  test("Switching players", () => {
    switchPlayer();
    expect(activePlayer).toBe(1);

    switchPlayer();
    expect(activePlayer).toBe(0);
  });

  test("Rolling the dice", () => {
    // Ensure dice roll is between 1 and 6
    for (let i = 0; i < 100; i++) {
      rollDice();
      const diceValue = parseInt(
        document.querySelector(".dice").src.split("dice-")[1].split(".png")[0]
      );
      expect(diceValue).toBeGreaterThanOrEqual(1);
      expect(diceValue).toBeLessThanOrEqual(6);
    }
  });

  test("Holding the score", () => {
    scores[0] = 10;
    currentScore = 5;
    activePlayer = 0;

    holdScore();

    expect(scores[0]).toBe(15);
    expect(currentScore).toBe(0);

    expect(playing).toBe(true);

    scores[1] = 95;
    currentScore = 5;
    activePlayer = 1;

    holdScore();

    expect(scores[1]).toBe(100);
    expect(playing).toBe(false);
  });
});
