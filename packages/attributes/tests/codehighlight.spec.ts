import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/codehighlight');
});

test.describe('codehighlight', () => {
  test('Highlights code with hljs', async ({ page }) => {
    await waitAttributeLoaded(page, 'codehighlight');

    const code = page.getByTestId('code-1');
    await expect(code).toHaveClass(/hljs/);
  });

  test('Highlights richtext component code with hljs', async ({ page }) => {
    await waitAttributeLoaded(page, 'codehighlight');

    const codeComponent = page.locator('[fs-richtext-element] [data-testid="code-2"]');
    await expect(codeComponent).toHaveClass(/hljs/);
  });
});
