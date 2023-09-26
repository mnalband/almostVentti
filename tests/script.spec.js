const fs = require('fs');
const path = require('path');
const { execPath } = require('process');
const html = fs.readFileSync(
  path.resolve(__dirname, '../src/index.html'),
  'utf8'
);

jest.dontMock('fs');

// Mock the DOM elements and events
const mockElements = {
  '#score--0': { textContent: '' },
  '#score--1': { textContent: '' },
  '#current--0': { textContent: '' },
  '#current--1': { textContent: '' },
  '.dice': { classList: { remove: jest.fn(), add: jest.fn() }, src: '' },
};

const simulateClick = selector => {
  const clickEvent = new Event('click');
  mockElements[selector].dispatchEvent(clickEvent);
};

describe('html unittests', function () {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  });

  afterEach(() => {
    jest.resetModules();
  });
  it('should check if button with ID name--0 exists', () => {
    const button = document.getElementById('name--0');
    expect(button).toBeTruthy();
  });

  it('should check if button with ID name--1 exists', () => {
    const button = document.getElementById('name--1');
    expect(button).toBeTruthy();
  });

  it('should check if dice image exists', () => {
    const diceImage = document.querySelector('.dice');
    expect(diceImage).toBeTruthy();
  });

  it('should check if new game button exists', () => {
    const newGameButton = document.querySelector('.btn--new');
    expect(newGameButton).toBeTruthy();
  });

  it('should check if roll dice button exists', () => {
    const rollDiceButton = document.querySelector('.btn--roll');
    expect(rollDiceButton).toBeTruthy();
  });

  it('should check if hold button exists', () => {
    const holdButton = document.querySelector('.btn--hold');
    expect(holdButton).toBeTruthy();
  });
});
