import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/date');
});

test.describe('fs-date', () => {
  test('Sets the correct value to the elements', async ({ page }) => {
    await waitAttributeLoaded(page, 'date');

    const element1 = page.getByTestId('1');
    const element2 = page.getByTestId('2');
    const element3 = page.getByTestId('3');

    expect(await element1.innerText()).toBe('viernes, 12 de abril de 2024');
    expect(await element2.innerText()).toBe('miércoles, 24 de abril de 2024');
    expect(await element3.innerText()).toBe('miércoles, 17 de abril de 2024');
  });
});
