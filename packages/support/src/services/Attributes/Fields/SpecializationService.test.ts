import type { DOMSelector } from '@global/types/schema';

import { validateDOMSelectors } from './SpecializationService';

describe('Validate Selector', () => {
  test('Validate selector checkbox success', () => {
    global.document.documentElement.innerHTML = `
      <html>
        <head>
          <script async src="www.google.com.br/ads.js"></script>
        </head>
        <body>
          <label class="w-checkbox">
            <span></span>

          </label>
        </body>
      </html>
    `;

    const label = document.querySelector('span');

    if (!label) {
      throw new Error('Missing label in DOM');
    }

    const selectors: DOMSelector[] = [
      {
        label: 'Checkbox Label',
        selectors: ['label.w-checkbox span'],
      },
    ];

    expect(validateDOMSelectors(label, selectors)).toBeTruthy();
  });

  test('Validate selector checkbox failed due a class mistake', () => {
    global.document.documentElement.innerHTML = `
      <html>
        <head>
          <script async src="www.google.com.br/ads.js"></script>
        </head>
        <body>
          <label class="checkbox">
            <span></span>

          </label>
        </body>
      </html>
    `;

    const label = document.querySelector('span');

    if (!label) {
      throw new Error('Missing label in DOM');
    }

    const selectors: DOMSelector[] = [
      {
        label: 'Checkbox Label',
        selectors: ['label.w-checkbox span'],
      },
    ];

    expect(validateDOMSelectors(label, selectors)).toBeFalsy();
  });

  test('Validate selector checkbox error failed due to element mistake', () => {
    global.document.documentElement.innerHTML = `
      <html>
        <head>
          <script async src="www.google.com.br/ads.js"></script>
        </head>
        <body>
          <div class="w-checkbox">
            <span></span>

          </div>
        </body>
      </html>
    `;

    const label = document.querySelector('span');

    if (!label) {
      throw new Error('Missing label in DOM');
    }

    const selectors: DOMSelector[] = [
      {
        label: 'Checkbox Label',
        selectors: ['label.w-checkbox span'],
      },
    ];

    expect(validateDOMSelectors(label, selectors)).toBeFalsy();
  });
});
