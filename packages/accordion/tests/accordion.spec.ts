import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/accordion');
});

test.describe('accordion', () => {
  test('Accordions open/close and set the active CSS class correctly', async ({ page }) => {
    await page.evaluate(async () => new Promise((resolve) => window.fsAttributes.push(['accordion', resolve])));

    const header11 = page.getByTestId('header-1-1');
    const header22 = page.getByTestId('header-2-2');
    const header61 = page.getByTestId('header-6-1');
    const header71 = page.getByTestId('header-7-1');
    const content11 = page.getByTestId('content-1-1');
    const content21 = page.getByTestId('content-2-1');
    const content22 = page.getByTestId('content-2-2');
    const content23 = page.getByTestId('content-2-3');
    const content31 = page.getByTestId('content-3-1');
    const content32 = page.getByTestId('content-3-2');
    const content33 = page.getByTestId('content-3-3');
    const content41 = page.getByTestId('content-4-1');
    const content42 = page.getByTestId('content-4-2');
    const content43 = page.getByTestId('content-4-3');
    const content52 = page.getByTestId('content-5-2');
    const content53 = page.getByTestId('content-5-3');
    const content71 = page.getByTestId('content-7-1');

    const DEFAULT_ACTIVE_CLASS_REGEX = /is-active-accordion/;

    // Initial state + active CSS class works
    await expect(header11).toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);
    await expect(content11).toBeVisible();

    // Trigger works
    await header11.click();
    await expect(header11).not.toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);
    await expect(content11).not.toBeVisible();

    // Single works
    await expect(content21).toBeVisible();
    await expect(content22).not.toBeVisible();
    await expect(content23).not.toBeVisible();

    await header22.click();
    await expect(content21).not.toBeVisible();
    await expect(content22).toBeVisible();
    await expect(content23).not.toBeVisible();

    // Initial none works
    await expect(content31).not.toBeVisible();
    await expect(content32).not.toBeVisible();
    await expect(content33).not.toBeVisible();

    // Initial numeric works
    await expect(content41).toBeVisible();
    await expect(content42).not.toBeVisible();
    await expect(content43).toBeVisible();

    // Initial numeric + single works
    await expect(content52).toBeVisible();
    await expect(content53).not.toBeVisible();

    // Custom active classes work
    await expect(header61).toHaveClass(/is-cool-header/);
    await header61.click();
    await expect(header61).not.toHaveClass(/is-cool-header/);

    // Waits for cmsload render-all
    const lastHeader = header71.nth(4);
    const lastContent = content71.nth(4);

    await expect(lastHeader).toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);
    await expect(lastContent).toBeVisible();

    await lastHeader.click();
    await expect(lastHeader).not.toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);
    await expect(lastContent).not.toBeVisible();
  });
});
