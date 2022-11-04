import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/codehighlight');
});

test.describe('codehighlight', () => {
  test('Highlights code with hljs', async ({ page }) => {
    const code = page.getByTestId('code-1');
    await expect(code).toHaveClass(/hljs/);
  });

  test('Imports hljs theme', async ({ page }) => {
    const link = page.locator(
      'link[href="https://cdn.jsdelivr.net/npm/@finsweet/attributes-codehighlight@1/themes/webflow.min.css"]'
    );

    expect(await link.count()).toBeGreaterThan(0);
  });

  test('Highlights richtext component code with hljs', async ({ page }) => {
    const codeComponent = page.locator('[fs-richtext-element] [data-testid="code-2"]');
    await expect(codeComponent).toHaveClass(/hljs/);
  });
});
