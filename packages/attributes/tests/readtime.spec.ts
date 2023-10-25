import { formatNumberToLocale, parseNumericAttribute } from '@finsweet/attributes-utils';
import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

const DEFAULT_WPM = 265;
const DEFAULT_DECIMALS = 0;
const DEFAULT_LOCALE = 'auto';

test.beforeEach(async ({ page, browser }) => {
  // set locale to es-ES
  await browser.newContext({
    locale: 'es-ES',
  });

  await page.goto('http://fs-attributes.webflow.io/readtime');
});

test.describe('readtime', () => {
  test('Displays the read time for each instance', async ({ page }) => {
    await waitAttributeLoaded(page, 'readtime');

    const elements = await page.locator('[fs-readtime-element="time"][fs-readtime-instance]').all();

    for (const element of elements) {
      const readtime = await element.textContent();

      expect(readtime).toBeTruthy();

      expect(readtime?.length).toBeGreaterThan(2);
    }
  });

  test('Displays the read time in locality', async ({ page }) => {
    await waitAttributeLoaded(page, 'readtime');

    // test es-ES locale
    const element = await page.locator('[fs-readtime-element="time"][fs-readtime-locale="es-ES"]');

    const readtime = await element.textContent();

    expect(readtime).toBe('1,0 minuto');
  });
});
