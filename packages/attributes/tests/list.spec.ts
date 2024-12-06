import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.describe('list-sort', () => {
  test.only('list-sort-basic-buttons', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-sort-basic-buttons');

    await waitAttributeLoaded(page, 'list');

    const buttonName = page.getByTestId('button-name');
    const buttonYear = page.getByTestId('button-year');
    const buttonColor = page.getByTestId('button-color');
    const buttonUpdated = page.getByTestId('button-updated');

    let firstItem = page.getByTestId('list-item').first();
    let firstItemFieldName = firstItem.getByTestId('field-name');
    const firstItemFieldYear = firstItem.getByTestId('field-year');
    const firstItemFieldColor = firstItem.getByTestId('field-color');
    const firstItemFieldUpdated = firstItem.getByTestId('field-updated');

    await expect(firstItemFieldName).toHaveText('Alallo');
    await expect(buttonName).not.toHaveClass(/is-list-asc/);
    await expect(buttonName).not.toHaveClass(/is-list-desc/);

    await buttonName.click();

    firstItem = page.getByTestId('list-item').first();
    firstItemFieldName = firstItem.getByTestId('field-name');

    await expect(firstItemFieldName).toHaveText('Belditini');
    await expect(buttonName).toHaveClass(/is-list-desc/);

    await buttonName.click();

    firstItem = page.getByTestId('list-item').first();
    firstItemFieldName = firstItem.getByTestId('field-name');

    await expect(firstItemFieldName).toHaveText('Alallo');
    await expect(buttonName).toHaveClass(/is-list-asc/);
  });
});
