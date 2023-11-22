import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('https://dev-attributes-pagetransition.webflow.io/');
});

test.describe('pagetransition', () => {
  test('Overlay should be clickable', async ({ page }) => {
    await waitAttributeLoaded(page, 'pagetransition');

    const overlay = page.getByTestId('overlay');
    expect(overlay).toBeTruthy();

    const overlayStyleHandle = await overlay.evaluateHandle((element: Element) => {
      const style = window.getComputedStyle(element);
      return {
        pointerEvents: style.pointerEvents,
      };
    });

    const overlayStyle = await overlayStyleHandle.jsonValue();

    expect(overlayStyle.pointerEvents).toBe('none');
  });
});
