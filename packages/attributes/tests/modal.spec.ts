import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('https://fs-attributes.webflow.io/modal');
  page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
});

test.describe('modal', () => {
  test('Modal opens + settings work', async ({ page, browserName }) => {
    if (browserName === 'webkit') {
      // todo: seems to be a bug in webkit, tests fails with this error: Target closed
      // found something similar: https://github.com/microsoft/playwright/issues/27615
      // fails on my Windows PC
      // todo: investigate on other OS
      return;
    }

    await waitAttributeLoaded(page, 'modal');

    const modal1 = await page.locator('[fs-modal-element="modal"][fs-modal-instance="one"]');
    const openTrigger1 = await page.locator('[fs-modal-element="open"][fs-modal-instance="one"]');
    const closeTrigger1 = await page.locator('[fs-modal-element="close"][fs-modal-instance="one"]').all();

    const modal4 = await page.locator('[fs-modal-element="modal"][fs-modal-instance="five"]');
    const openTrigger4 = await page.locator('[fs-modal-element="open"][fs-modal-instance="five"]');

    // Opens
    await openTrigger1.click();
    await page.waitForTimeout(1000);
    await expect(modal1).toHaveCSS('display', 'flex');

    // Closes
    await closeTrigger1[1].click();
    await page.waitForTimeout(1000);
    await expect(modal1).toHaveCSS('display', 'none');

    // Opens with custom display property
    await openTrigger4.click();
    await page.waitForTimeout(1000);
    await expect(modal4).toHaveCSS('display', 'block');
  });
});
