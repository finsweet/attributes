import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/a11y');
});

test.describe('aria-controls', () => {
  test('Sets correct aria-expanded', async ({ page }) => {
    const header = page.getByTestId('header-1');
    const content = page.getByTestId('content-1');

    await expect(content).toBeHidden();
    await expect(header).toHaveAttribute('aria-expanded', 'false');

    await header.click();
    await expect(content).toBeVisible();
    await expect(header).toHaveAttribute('aria-expanded', 'true');
  });

  test('Skips elements without aria-expanded', async ({ page }) => {
    const header = page.getByTestId('header-2');
    const content = page.getByTestId('content-2');

    await expect(content).toBeHidden();
    await expect(header).not.toHaveAttribute('aria-expanded', /(.*?)/);

    await header.click();
    await expect(content).toBeVisible();
    await expect(header).not.toHaveAttribute('aria-expanded', /(.*?)/);
  });

  test('Traps focus in doalogs', async ({ page }) => {
    const modal = page.getByTestId('modal');
    const openModalButton = page.getByTestId('open-modal');
    const closeModalButton = page.getByTestId('close-modal');
    const link1 = page.getByTestId('link-1');
    const link2 = page.getByTestId('link-2');

    await expect(modal).toBeHidden();

    await openModalButton.click();
    await expect(modal).toBeVisible();
    await expect(closeModalButton).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(link1).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(link2).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(closeModalButton).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(modal).toBeHidden();

    await expect(openModalButton).toBeFocused();
  });
});
