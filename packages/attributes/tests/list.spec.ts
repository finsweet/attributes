import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.describe('fs-list: sort', () => {
  test('list_sort_basic_buttons', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-sort-basic-buttons');

    await waitAttributeLoaded(page, 'list');

    const buttonName = page.getByTestId('button-name');
    const buttonYear = page.getByTestId('button-year');
    const buttonColor = page.getByTestId('button-color');
    const buttonUpdated = page.getByTestId('button-updated');

    let firstItem = page.getByTestId('list-item').first();
    let firstItemFieldName = firstItem.getByTestId('field-name');

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

    await buttonYear.click();

    firstItem = page.getByTestId('list-item').first();
    let firstItemFieldYear = firstItem.getByTestId('field-year');

    await expect(firstItemFieldYear).toHaveText('2017');
    await expect(buttonYear).toHaveClass(/is-list-asc/);

    await buttonYear.click();

    firstItem = page.getByTestId('list-item').first();
    firstItemFieldYear = firstItem.getByTestId('field-year');

    await expect(firstItemFieldYear).toHaveText('2024');
    await expect(buttonYear).toHaveClass(/is-list-desc/);

    await buttonColor.click();

    firstItem = page.getByTestId('list-item').first();
    let firstItemFieldColor = firstItem.getByTestId('field-color');

    await expect(firstItemFieldColor).toHaveText('Black');
    await expect(buttonColor).toHaveClass(/is-list-asc/);

    await buttonColor.click();

    firstItem = page.getByTestId('list-item').first();
    firstItemFieldColor = firstItem.getByTestId('field-color');

    await expect(firstItemFieldColor).toHaveText('Yellow');
    await expect(buttonColor).toHaveClass(/is-list-desc/);

    await buttonUpdated.click();

    firstItem = page.getByTestId('list-item').first();
    let firstItemFieldUpdated = firstItem.getByTestId('field-updated');

    await expect(firstItemFieldUpdated).toHaveText('August 27, 2024');
    await expect(buttonUpdated).toHaveClass(/is-list-asc/);

    await buttonUpdated.click();

    firstItem = page.getByTestId('list-item').first();
    firstItemFieldUpdated = firstItem.getByTestId('field-updated');

    await expect(firstItemFieldUpdated).toHaveText('August 27, 2024');
    await expect(buttonUpdated).toHaveClass(/is-list-desc/);
  });

  test('list_sort_load_buttons', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-sort-load-buttons');

    await waitAttributeLoaded(page, 'list');

    const buttonName = page.getByTestId('button-name');
    const buttonYear = page.getByTestId('button-year');
    const buttonColor = page.getByTestId('button-color');
    const buttonUpdated = page.getByTestId('button-updated');

    let firstItem = page.getByTestId('list-item').first();
    let firstItemFieldName = firstItem.getByTestId('field-name');

    await expect(buttonName).not.toHaveClass(/is-list-asc/);
    await expect(buttonName).not.toHaveClass(/is-list-desc/);

    await buttonName.click();

    firstItem = page.getByTestId('list-item').first();
    firstItemFieldName = firstItem.getByTestId('field-name');

    await expect(firstItemFieldName).toHaveText('Vizatara');
    await expect(buttonName).toHaveClass(/is-list-desc/);

    await buttonName.click();

    firstItem = page.getByTestId('list-item').first();
    firstItemFieldName = firstItem.getByTestId('field-name');

    await expect(firstItemFieldName).toHaveText('Alallo');
    await expect(buttonName).toHaveClass(/is-list-asc/);

    await buttonYear.click();

    firstItem = page.getByTestId('list-item').first();
    let firstItemFieldYear = firstItem.getByTestId('field-year');

    await expect(firstItemFieldYear).toHaveText('2017');
    await expect(buttonYear).toHaveClass(/is-list-asc/);

    await buttonYear.click();

    firstItem = page.getByTestId('list-item').first();
    firstItemFieldYear = firstItem.getByTestId('field-year');

    await expect(firstItemFieldYear).toHaveText('2024');
    await expect(buttonYear).toHaveClass(/is-list-desc/);

    await buttonColor.click();

    firstItem = page.getByTestId('list-item').first();
    let firstItemFieldColor = firstItem.getByTestId('field-color');

    await expect(firstItemFieldColor).toHaveText('Black');
    await expect(buttonColor).toHaveClass(/is-list-asc/);

    await buttonColor.click();

    firstItem = page.getByTestId('list-item').first();
    firstItemFieldColor = firstItem.getByTestId('field-color');

    await expect(firstItemFieldColor).toHaveText('Yellow');
    await expect(buttonColor).toHaveClass(/is-list-desc/);

    await buttonUpdated.click();

    firstItem = page.getByTestId('list-item').first();
    let firstItemFieldUpdated = firstItem.getByTestId('field-updated');

    await expect(firstItemFieldUpdated).toHaveText('August 27, 2024');
    await expect(buttonUpdated).toHaveClass(/is-list-asc/);

    await buttonUpdated.click();

    firstItem = page.getByTestId('list-item').first();
    firstItemFieldUpdated = firstItem.getByTestId('field-updated');

    await expect(firstItemFieldUpdated).toHaveText('August 27, 2024');
    await expect(buttonUpdated).toHaveClass(/is-list-desc/);
  });

  test('list_sort_basic_select', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-sort-basic-select');

    await waitAttributeLoaded(page, 'list');

    const select = page.getByTestId('select');

    await select.selectOption('name-asc');

    let firstItem = page.getByTestId('list-item').first();
    let firstItemFieldName = firstItem.getByTestId('field-name');

    await expect(firstItemFieldName).toHaveText('Alallo');

    await select.selectOption('name-desc');

    firstItem = page.getByTestId('list-item').first();
    firstItemFieldName = firstItem.getByTestId('field-name');

    await expect(firstItemFieldName).toHaveText('Belditini');

    await select.selectOption('year-asc');

    firstItem = page.getByTestId('list-item').first();
    let firstItemFieldYear = firstItem.getByTestId('field-year');

    await expect(firstItemFieldYear).toHaveText('2017');

    await select.selectOption('year-desc');

    firstItem = page.getByTestId('list-item').first();
    firstItemFieldYear = firstItem.getByTestId('field-year');

    await expect(firstItemFieldYear).toHaveText('2024');

    await select.selectOption('color-asc');

    firstItem = page.getByTestId('list-item').first();
    let firstItemFieldColor = firstItem.getByTestId('field-color');

    await expect(firstItemFieldColor).toHaveText('Black');

    await select.selectOption('color-desc');

    firstItem = page.getByTestId('list-item').first();
    firstItemFieldColor = firstItem.getByTestId('field-color');

    await expect(firstItemFieldColor).toHaveText('Yellow');

    await select.selectOption('updated-asc');

    firstItem = page.getByTestId('list-item').first();
    let firstItemFieldUpdated = firstItem.getByTestId('field-updated');

    await expect(firstItemFieldUpdated).toHaveText('August 27, 2024');

    await select.selectOption('updated-desc');

    firstItem = page.getByTestId('list-item').first();
    firstItemFieldUpdated = firstItem.getByTestId('field-updated');

    await expect(firstItemFieldUpdated).toHaveText('August 27, 2024');
  });
});
