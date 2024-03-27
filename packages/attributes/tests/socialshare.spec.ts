import { test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('https://fs-attributes.webflow.io/socialshare');
});

test.describe('socialshare', () => {
  test('Triggers share correctly', async ({ page, context }) => {
    await waitAttributeLoaded(page, 'socialshare');

    const facebook1 = page.getByTestId('facebook-1');
    const x1 = page.getByTestId('x-1');
    const linkedin1 = page.getByTestId('linkedin-1');
    const pinterest1 = page.getByTestId('pinterest-1');
    const telegram1 = page.getByTestId('telegram-1');
    const reddit1 = page.getByTestId('reddit-1');
    const x = page.getByTestId('x').first();
    const pinterest = page.getByTestId('pinterest').first();

    await facebook1.click();
    await page.context().waitForEvent('page', (p) => p.url().includes('facebook'));
    await context.pages()[1].close();

    await x1.click();
    await page.context().waitForEvent('page', (p) => p.url().includes('x'));
    await context.pages()[1].close();

    await linkedin1.click();
    await page.context().waitForEvent('page', (p) => p.url().includes('linkedin'));
    await context.pages()[1].close();

    await pinterest1.click();
    await page.context().waitForEvent('page', (p) => p.url().includes('pinterest'));
    await context.pages()[1].close();

    await telegram1.click();
    await page.context().waitForEvent('page', (p) => p.url().includes('t.me'));
    await context.pages()[1].close();

    await reddit1.click();
    await page.context().waitForEvent('page', (p) => p.url().includes('reddit'));
    await context.pages()[1].close();

    await x.click();
    await page.context().waitForEvent('page', (p) => p.url().includes('x'));
    await context.pages()[1].close();

    await pinterest.click();
    await page.context().waitForEvent('page', (p) => p.url().includes('pinterest'));
    await context.pages()[1].close();
  });
});
