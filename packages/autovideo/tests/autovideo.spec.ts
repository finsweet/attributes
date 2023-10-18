import { test } from '@playwright/test';

test.beforeEach(async ({}) => {
  // await page.goto('http://fs-attributes.webflow.io/autovideo');
});

test.describe('autovideo', () => {
  test('Videos are played/paused based on the viewport', async ({}) => {
    // const video = page.locator('video').first();
    // await video.scrollIntoViewIfNeeded();
    // const pausedState = await video.evaluate<boolean, HTMLVideoElement>((e) => e.paused);
    // expect(pausedState).toBe(false);
    // await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    // const pausedState2 = await video.evaluate<boolean, HTMLVideoElement>((e) => e.paused);
    // expect(pausedState2).toBe(true);
  });
});
