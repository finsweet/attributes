import { expect, test } from '@playwright/test';

test.describe('Update Element Property', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('packages/launchdarkly/tests/fixtures/setProperties');
  });

  test.describe('When flag is not set', async () => {
    test('It does not update the property', async ({ page }) => {
      const flags = `{}`;
      const selector = '[data-test-id="image1"]';
      await page.evaluate(`fsLaunchDarkly.initFlags(${flags})`);

      const locator = page.locator(selector);
      const src = await locator.getAttribute('src');
      expect(src).toEqual('http://example.svg');
    });
  });

  test.describe('When flag is set', async () => {
    const titleText = 'abc';
    const innerHTMLContent = `<span>${titleText}</span>`;
    let flags = `{testing: 'http://example2.svg','testing-html': '${innerHTMLContent}', testing2: '${titleText}'}`;
    let selector: string;

    test('It updates src property of a nested iframe', async ({ page }) => {
      selector = '[data-test-id="iframe-container"]';
      await page.evaluate(`fsLaunchDarkly.initFlags(${flags})`);

      const locator = page.locator('[data-test-id="iframe"]');
      const src = await locator.getAttribute('src');
      expect(src).toEqual('http://example2.svg');
    });

    test('It updates src property and removes the srcset attribute', async ({ page }) => {
      selector = '[data-test-id="image1"]';
      await page.evaluate(`fsLaunchDarkly.initFlags(${flags})`);

      const locator = page.locator(selector);
      const src = await locator.getAttribute('src');
      expect(src).toEqual('http://example2.svg');

      const srcset = await locator.getAttribute('srcset');
      expect(srcset).toBeNull();
    });

    test('It updates srcset property and removes the src attribute', async ({ page }) => {
      selector = '[data-test-id="image2"]';
      await page.evaluate(`fsLaunchDarkly.initFlags(${flags})`);

      const locator = page.locator(selector);
      const srcset = await locator.getAttribute('srcset');
      expect(srcset).toEqual('http://example2.svg');

      const src = await locator.getAttribute('src');
      expect(src).toEqual(null);
    });

    test('It updates href property of an element', async ({ page }) => {
      selector = '[data-test-id="anchor1"]';
      await page.evaluate(`fsLaunchDarkly.initFlags(${flags})`);

      const locator = page.locator(selector);
      const href = await locator.getAttribute('href');
      expect(href).toEqual('http://example2.svg');
    });

    test('It updates innerHTML of an element', async ({ page }) => {
      selector = '[data-test-id="div1"]';
      await page.evaluate(`fsLaunchDarkly.initFlags(${flags})`);

      const innerHTML = await page.locator(selector).innerHTML();
      expect(innerHTML).toEqual(innerHTMLContent);
    });

    test('It sets the innerText of element when "setproperties" attribute is text', async ({ page }) => {
      selector = '[data-test-id="text1"]';
      await page.evaluate(`fsLaunchDarkly.initFlags(${flags})`);

      const locator = page.locator('data-test-id=text1');
      const textContent = await locator.innerText();
      expect(textContent).toEqual(titleText);
    });

    test('It sets the value of element when "setproperties" attribute is "value"', async ({ page }) => {
      const value = '123';
      flags = `{testing: '${value}'}`;
      selector = '[data-test-id="input1"]';
      await page.evaluate(`fsLaunchDarkly.initFlags(${flags})`);
      const selectorTestIds = ['input1', 'select1', 'textarea1'];

      let elementValue;
      for (const selectorTestId of selectorTestIds) {
        const locator = page.locator(`[data-test-id="${selectorTestId}"]`);
        elementValue = await locator.inputValue();
        expect(elementValue).toEqual('123');
      }

      // handle for button
      const locator = page.locator(`[data-test-id="button1"]`);
      elementValue = await locator.getAttribute('value');
      expect(elementValue).toEqual('123');
    });

    test('It includes the classname as part of classList when attribute is "classname"', async ({ page }) => {
      const className = 'classname1';
      flags = `{testing: '${className}'}`;
      selector = '[data-test-id="test_classname"]';
      await page.evaluate(`fsLaunchDarkly.initFlags(${flags})`);

      const locator = page.locator(selector);
      await expect(locator).toHaveClass(className);
    });
  });

  test.describe('When element is loader', () => {
    test('It hides fs-launchdarkly-element with "loader" value', async ({ page }) => {
      await page.evaluate(`fsLaunchDarkly.hideLoaders()`);

      const loader = page.locator('[data-test-id="loader"]');
      await expect(loader).not.toBeVisible();
    });

    test('It does not hide fs-launchdarkly-element with unsupported value', async ({ page }) => {
      await page.evaluate(`fsLaunchDarkly.hideLoaders()`);

      const loader = page.locator('[data-test-id="loader2"]');
      await expect(loader).toBeVisible();
    });
  });
});
