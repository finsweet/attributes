import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/accordion');
});

const DEFAULT_ACTIVE_CLASS_REGEX = /is-active-accordion/;

test.describe('accordion', () => {
  test('Accordions open/close and set the active CSS class correctly', async ({ page }) => {
    await waitAttributeLoaded(page, 'accordion');

    const header11 = page.getByTestId('header-1-1');
    const content11 = page.getByTestId('content-1-1');

    // Initial state + active CSS class works
    await expect(header11).toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);
    await expect(content11).toBeVisible();

    // Trigger works
    await header11.click();
    await expect(header11).not.toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);
    await expect(content11).not.toBeVisible();
  });

  test('fs-accordion-single', async ({ page }) => {
    await waitAttributeLoaded(page, 'accordion');

    const header22 = page.getByTestId('header-2-2');
    const content21 = page.getByTestId('content-2-1');
    const content22 = page.getByTestId('content-2-2');
    const content23 = page.getByTestId('content-2-3');

    // Single works
    await expect(content21).toBeVisible();
    await expect(content22).not.toBeVisible();
    await expect(content23).not.toBeVisible();

    await header22.click();
    await expect(content21).not.toBeVisible();
    await expect(content22).toBeVisible();
    await expect(content23).not.toBeVisible();
  });

  test('fs-accordion-initial="none"', async ({ page }) => {
    await waitAttributeLoaded(page, 'accordion');

    const content31 = page.getByTestId('content-3-1');
    const content32 = page.getByTestId('content-3-2');
    const content33 = page.getByTestId('content-3-3');

    // Initial none works
    await expect(content31).not.toBeVisible();
    await expect(content32).not.toBeVisible();
    await expect(content33).not.toBeVisible();
  });

  test('fs-accordion-initial="{NUMERIC_INDEX}"', async ({ page }) => {
    await waitAttributeLoaded(page, 'accordion');

    const content41 = page.getByTestId('content-4-1');
    const content42 = page.getByTestId('content-4-2');
    const content43 = page.getByTestId('content-4-3');

    // Initial numeric works
    await expect(content41).toBeVisible();
    await expect(content42).not.toBeVisible();
    await expect(content43).toBeVisible();
  });

  test('fs-accordion-initial="{NUMERIC_INDEX}" + fs-accordion-single', async ({ page }) => {
    await waitAttributeLoaded(page, 'accordion');

    const content52 = page.getByTestId('content-5-2');
    const content53 = page.getByTestId('content-5-3');

    // Initial numeric + single works
    await expect(content52).toBeVisible();
    await expect(content53).not.toBeVisible();
  });

  test('fs-accordion-active="{ACTIVE_CSS_CLASS}"', async ({ page }) => {
    await waitAttributeLoaded(page, 'accordion');

    const header61 = page.getByTestId('header-6-1');

    // Custom active classes work
    await expect(header61).toHaveClass(/is-cool-header/);
    await header61.click();
    await expect(header61).not.toHaveClass(/is-cool-header/);
  });

  test('fs-accordion + fs-list', async ({ page }) => {
    await waitAttributeLoaded(page, 'accordion');

    const header71 = page.getByTestId('header-7-1');
    const content71 = page.getByTestId('content-7-1');

    // Waits for list render-all
    const lastHeader = header71.nth(4);
    const lastContent = content71.nth(4);

    await expect(lastHeader).toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);
    await expect(lastContent).toBeVisible();

    await lastHeader.click();
    await expect(lastHeader).not.toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);
    await expect(lastContent).not.toBeVisible();
  });

  test('Accordions initially hidden are forced to be closed', async ({ page }) => {
    await waitAttributeLoaded(page, 'accordion');

    const header81 = page.getByTestId('header-8-1');
    const header82 = page.getByTestId('header-8-2');
    const content81 = page.getByTestId('content-8-1');
    const content82 = page.getByTestId('content-8-2');

    const tab2Link = page.getByTestId('tab-2-link');

    // Accordion 1 is open and visible
    await expect(header81).toBeVisible();
    await expect(content81).toBeVisible();

    // Accordion 2 is hidden
    await expect(header82).not.toBeVisible();
    await expect(content82).not.toBeVisible();

    await tab2Link.click();

    // Content 2 is closed
    await expect(header82).toBeVisible();
    await expect(content82).not.toBeVisible();
  });
});
