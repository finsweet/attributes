import { expect, type Page, test } from '@playwright/test';

/**
 * Builds a self-contained page with a Collection List and a filters form with one native radio group,
 * where the radios target the same field but use different operators.
 */
const getPageHTML = ({
  filterOn,
  checked,
  inStockFirst,
}: { filterOn?: 'submit'; checked?: 'out' | 'in'; inStockFirst?: boolean } = {}) => {
  const quantities = [0, 0, 0, 1, 2, 5];

  const items = quantities
    .map(
      (qty, index) => `
        <div role="listitem" class="w-dyn-item">
          <div fs-list-field="name">Item ${index + 1}</div>
          <div fs-list-field="qty" fs-list-fieldtype="number">${qty}</div>
        </div>`
    )
    .join('');

  const inStockRadio = `<label><input type="radio" name="stock" id="in" fs-list-field="qty" fs-list-value="1" fs-list-operator="greater-equal" ${checked === 'in' ? 'checked' : ''} /> In stock</label>`;

  return `<!DOCTYPE html>
<html>
  <head>
    <script>
      // Minimal stand-in for the Webflow runtime ready queue.
      window.Webflow ||= [];
      document.addEventListener('DOMContentLoaded', () => {
        const queue = window.Webflow;
        window.Webflow = { push: (fn) => fn() };
        queue.forEach((fn) => fn());
      });
    </script>
    <script type="module" async fs-list src="http://localhost:3000/attributes.js"></script>
  </head>
  <body>
    <form fs-list-element="filters" ${filterOn ? `fs-list-filteron="${filterOn}"` : ''}>
      ${inStockFirst ? inStockRadio : ''}
      <label><input type="radio" name="stock" id="all" fs-list-field="qty" fs-list-value="" /> All</label>
      <label><input type="radio" name="stock" id="out" fs-list-field="qty" fs-list-value="0" ${checked === 'out' ? 'checked' : ''} /> Out of stock</label>
      ${inStockFirst ? '' : inStockRadio}
      <input type="text" id="name" fs-list-field="name" />
      <button type="button" id="clear-name" fs-list-element="clear" fs-list-field="name">Clear name</button>
      <input type="submit" id="submit" value="Submit" />
    </form>

    <div>Results: <span fs-list-element="results-count"></span></div>

    <div class="w-dyn-list">
      <div role="list" class="w-dyn-items" fs-list-element="list">${items}</div>
    </div>
  </body>
</html>`;
};

const PAGE_URL = 'https://fs-list-radios.test/';

const loadPage = async (page: Page, options?: Parameters<typeof getPageHTML>[0]) => {
  await page.route(PAGE_URL, (route) =>
    route.fulfill({ status: 200, contentType: 'text/html', body: getPageHTML(options) })
  );

  await page.goto(PAGE_URL);

  const resultsCount = page.locator('[fs-list-element="results-count"]');

  return { resultsCount };
};

test.describe('fs-list: radio groups with mixed operators', () => {
  test('selecting a radio supersedes the conditions of its siblings', async ({ page }) => {
    const { resultsCount } = await loadPage(page);

    await expect(resultsCount).toHaveText('6');

    await page.locator('#out').check();
    await expect(resultsCount).toHaveText('3');

    // "Out of stock" uses the default `equal` operator, "In stock" uses `greater-equal`.
    // The browser unchecks "Out of stock" without firing any event on it, so its condition must be cleared here.
    await page.locator('#in').check();
    await expect(resultsCount).toHaveText('3');

    await page.locator('#out').check();
    await expect(resultsCount).toHaveText('3');

    await page.locator('#all').check();
    await expect(resultsCount).toHaveText('6');

    await page.locator('#in').check();
    await expect(resultsCount).toHaveText('3');

    await page.locator('#all').check();
    await expect(resultsCount).toHaveText('6');
  });

  test('syncing the conditions back to the form keeps the selected radio checked', async ({ page }) => {
    const { resultsCount } = await loadPage(page, { inStockFirst: true });

    await page.locator('#out').check();
    await page.locator('#in').check();
    await expect(resultsCount).toHaveText('3');

    await page.locator('#name').fill('Item 6');
    await expect(resultsCount).toHaveText('1');

    // Clearing another field writes all the conditions back to the form fields
    await page.locator('#clear-name').click();
    await expect(resultsCount).toHaveText('3');
    await expect(page.locator('#in')).toBeChecked();
    await expect(page.locator('#out')).not.toBeChecked();
    await expect(page.locator('#all')).not.toBeChecked();
  });

  test('initially checked radio only applies its own operator', async ({ page }) => {
    const { resultsCount } = await loadPage(page, { checked: 'in' });

    await expect(resultsCount).toHaveText('3');
  });

  test('fs-list-filteron="submit" only applies the checked radio operator', async ({ page }) => {
    const { resultsCount } = await loadPage(page, { filterOn: 'submit' });

    await expect(resultsCount).toHaveText('6');

    await page.locator('#out').check();
    await page.locator('#submit').click();
    await expect(resultsCount).toHaveText('3');

    await page.locator('#in').check();
    await page.locator('#submit').click();
    await expect(resultsCount).toHaveText('3');

    await page.locator('#all').check();
    await page.locator('#submit').click();
    await expect(resultsCount).toHaveText('6');
  });
});
