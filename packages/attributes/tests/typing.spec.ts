import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('https://dev-attributes-typing.webflow.io/');
});

test.describe('typing', () => {
  test('Word should be updated', async ({ page }) => {
    await waitAttributeLoaded(page, 'typing');

    const wordElement = page.getByTestId('animated-word');

    const initialText = await wordElement.innerText();

    await page.waitForTimeout(6000);

    const updatedText = await wordElement.innerText();

    expect(updatedText).not.toEqual(initialText);
  });
});
