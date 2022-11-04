import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/socialshare');
});

test.describe('socialshare', () => {
  test('Triggers share correctly', async ({ page, context }) => {
    const facebook1 = page.getByTestId('facebook-1');
    const twitter1 = page.getByTestId('twitter-1');
    const linkedin1 = page.getByTestId('linkedin-1');
    const pinterest1 = page.getByTestId('pinterest-1');
    const telegram1 = page.getByTestId('telegram-1');
    const reddit1 = page.getByTestId('reddit-1');
    const twitter4 = page.getByTestId('twitter-4').first();
    const pinterest4 = page.getByTestId('pinterest-4').first();

    await facebook1.click();
    await page.context().waitForEvent('page', (p) => p.url().includes('facebook'));
    await context.pages()[1].close();

    await twitter1.click();
    await page.context().waitForEvent('page', (p) => p.url().includes('twitter'));
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

    await twitter4.click();
    await page.context().waitForEvent('page', (p) => p.url().includes('twitter'));
    await context.pages()[1].close();

    await pinterest4.click();
    await page.context().waitForEvent('page', (p) => p.url().includes('pinterest'));
    await context.pages()[1].close();
  });
});
