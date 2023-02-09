import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import type { LDFlagValue } from 'launchdarkly-js-client-sdk';

async function itBehavesLikeNoPropertyIsSet(page: Page, flags: LDFlagValue) {
  const selector = '[data-test-id="image1"]';
  await page.evaluate(`fsLaunchDarkly.initFlags(${flags})`);

  const locator = page.locator(selector);
  const src = await locator.getAttribute('src');
  expect(src).toEqual('http://example.svg');

  const srcset = await locator.getAttribute('srcset');
  expect(srcset).toBeNull();

  const sizes = await locator.getAttribute('sizes');
  expect(sizes).toBeNull();
}

async function itBehavesLikePropertiesAreSet(page: Page, flags: string, srcsetValue: string, sizesValue: string) {
  const selector = '[data-test-id="image1"]';
  await page.evaluate(`fsLaunchDarkly.initFlags(${flags})`);

  const locator = page.locator(selector);
  const src = await locator.getAttribute('src');
  expect(src).toBeNull();

  const srcset = await locator.getAttribute('srcset');
  expect(srcset).toEqual(srcsetValue);

  const sizes = await locator.getAttribute('sizes');
  expect(sizes).toEqual(sizesValue);
}

test.describe('Update Element Properties', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('packages/launchdarkly/tests/fixtures/updateJSONProperties');
  });

  test.describe('When flag is not set', async () => {
    test('It does not update any property', async ({ page }) => {
      const flags = `{}`;
      await itBehavesLikeNoPropertyIsSet(page, flags);
    });
  });

  test.describe('When flag is set', async () => {
    test('It updates srcset, sizes properties and removes the src attribute: multiple action', async ({ page }) => {
      const srcsetValue = 'http://example2.svg';
      const sizesValue = '100vw';
      const flags = `{testing: { show:true, properties: { srcset: '${srcsetValue}', sizes: '${sizesValue}' } } }`;
      await itBehavesLikePropertiesAreSet(page, flags, srcsetValue, sizesValue);
    });

    test('It does not update properties if show is false', async ({ page }) => {
      const srcsetValue = 'http://example2.svg';
      const sizesValue = '100vw';
      const flags = `{testing: { show:false, properties: { srcset: '${srcsetValue}', sizes: '${sizesValue}' } } }`;
      const selector = '[data-test-id="image1"]';
      await page.evaluate(`fsLaunchDarkly.initFlags(${flags})`);

      const locator = page.locator(selector);
      await expect(locator).not.toBeVisible();
    });

    test('It updates srcset, sizes properties and removes the src attribute when only properties action is set', async ({
      page,
    }) => {
      const srcsetValue = 'http://example2.svg';
      const sizesValue = '100vw';
      const flags = `{testing: {properties: { srcset: '${srcsetValue}', sizes: '${sizesValue}' } } }`;
      await itBehavesLikePropertiesAreSet(page, flags, srcsetValue, sizesValue);
    });
  });

  test.describe('When flag is set but one action is set', async () => {
    test('It removes element when show is false', async ({ page }) => {
      const flags = `{testing: {show: false, properties:{}} }`;

      const selector = '[data-test-id="image1"]';
      await page.evaluate(`fsLaunchDarkly.initFlags(${flags})`);

      const locator = page.locator(selector);
      await expect(locator).not.toBeVisible();
    });

    test('It does not update any property', async ({ page }) => {
      const srcsetValue = 'http://example2.svg';
      const sizesValue = '100vw';
      const flags = `{testing: {properties: { srcset: '${srcsetValue}', sizes: '${sizesValue}' } } }`;

      await itBehavesLikePropertiesAreSet(page, flags, srcsetValue, sizesValue);
    });
  });
});
