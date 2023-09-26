/**
 * @jest-environment jsdom
 */

const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { JSDOM } = require('jsdom');
const path = require('node:path');

test('should query selector correctly', async () => {
  let dom = await JSDOM.fromFile('/private/tmp/almostVentti/src/index.html');
  global.document = dom.window;
  const { qs } = require('../src/script');
  const mockElement = {
    querySelector: jest.fn(),
  };

  qs(mockElement, '.player--active');

  //   expect(mockElement.querySelector).toHaveBeenCalledWith('#your-selector');
});
