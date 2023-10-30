import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/a11y');
});

test.describe('aria-controls', () => {
  test('Sets correct aria-expanded', async ({ page }) => {
    await waitAttributeLoaded(page, 'a11y');

    const header = page.getByTestId('header-1');
    const content = page.getByTestId('content-1');

    await expect(content).toBeHidden();
    await expect(header).toHaveAttribute('aria-expanded', 'false');

    await header.click();
    await expect(content).toBeVisible();
    await expect(header).toHaveAttribute('aria-expanded', 'true');
  });

  test('Skips elements without aria-expanded', async ({ page }) => {
    await waitAttributeLoaded(page, 'a11y');

    const header = page.getByTestId('header-2');
    const content = page.getByTestId('content-2');

    await expect(content).toBeHidden();
    await expect(header).not.toHaveAttribute('aria-expanded', /(.*?)/);

    await header.click();
    await expect(content).toBeVisible();
    await expect(header).not.toHaveAttribute('aria-expanded', /(.*?)/);
  });

  test('Traps focus in dialogs', async ({ page, browserName }) => {
    if (browserName === 'webkit') {
      // Seems like Tab is a browser setting that needs to be enabled first? https://github.com/microsoft/playwright/issues/2114#issue-612491788
      // another related issue: https://github.com/microsoft/playwright/issues/5609
      // suggested approach is page.keyboard.press('Alt+Tab'); but that doesn't seem to work either :(

      return;
    }

    await waitAttributeLoaded(page, 'a11y');

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

test.describe('keyboard', () => {
  test('Enter triggers click', async ({ page }) => {
    await waitAttributeLoaded(page, 'a11y');

    const header = page.getByTestId('header-1');
    const content = page.getByTestId('content-1');

    await expect(content).toBeHidden();

    await header.focus();
    await page.keyboard.press('Enter');
    await expect(content).toBeVisible();
  });

  test('Space triggers click', async ({ page }) => {
    await waitAttributeLoaded(page, 'a11y');

    const header = page.getByTestId('header-1');
    const content = page.getByTestId('content-1');

    await expect(content).toBeHidden();

    await header.focus();
    await page.keyboard.press(' ');
    await expect(content).toBeVisible();
  });
});
