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

const elementsToCheck = [
  '#name--0',
  '#name--1',
  '.dice',
  '.btn--new',
  '.btn--roll',
  '.btn--hold',
];

describe('html unittests', function () {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  });

  afterEach(() => {
    jest.resetModules();
  });

  elementsToCheck.forEach((element, index) => {
    it(`should check if ${element} exists`, () => {
      const button = document.querySelector(element);
      expect(button).toBeTruthy();
    });
  });
});
