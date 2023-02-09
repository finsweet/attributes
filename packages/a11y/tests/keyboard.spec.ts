import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/a11y');
});

test.describe('keyboard', () => {
  test('Enter triggers click', async ({ page }) => {
    const header = page.getByTestId('header-1');
    const content = page.getByTestId('content-1');

    await expect(content).toBeHidden();

    await header.focus();
    await page.keyboard.press('Enter');
    await expect(content).toBeVisible();
  });

  test('Space triggers click', async ({ page }) => {
    const header = page.getByTestId('header-1');
    const content = page.getByTestId('content-1');

    await expect(content).toBeHidden();

    await header.focus();
    await page.keyboard.press(' ');
    await expect(content).toBeVisible();
  });
});
