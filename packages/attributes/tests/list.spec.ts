import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.describe('fs-list: sort', () => {
  test('list_sort_buttons', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-sort-buttons?dev=true');

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
    await page.goto('http://fs-attributes-list.webflow.io/list-sort-load-buttons?dev=true');

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

  test('list_sort_select', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-sort-select?dev=true');

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

test.describe('fs-list: combine', () => {
  test('list_combine', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-combine?dev=true');

    await waitAttributeLoaded(page, 'list');

    const mainList = page.getByTestId('main');
    const fooList = page.getByTestId('foo');
    const barList = page.getByTestId('bar');

    const mainListChildren = mainList.getByTestId('list-item');
    const fooListChildren = fooList.getByTestId('list-item');
    const barListChildren = barList.getByTestId('list-item');

    await expect(mainListChildren).toHaveCount(18);
    await expect(fooListChildren).toHaveCount(0);
    await expect(barListChildren).toHaveCount(0);
  });

  test('list_combine_sort', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-combine-sort?dev=true');

    await waitAttributeLoaded(page, 'list');

    const select = page.getByTestId('select');

    const mainList = page.getByTestId('main');
    const fooList = page.getByTestId('foo');
    const barList = page.getByTestId('bar');

    const mainListChildren = mainList.getByTestId('list-item');
    const fooListChildren = fooList.getByTestId('list-item');
    const barListChildren = barList.getByTestId('list-item');

    await expect(mainListChildren).toHaveCount(18);
    await expect(fooListChildren).toHaveCount(0);
    await expect(barListChildren).toHaveCount(0);

    await select.selectOption('name-asc');

    let firstItem = mainList.getByTestId('list-item').first();
    let firstItemFieldName = firstItem.getByTestId('field-name');

    await expect(firstItemFieldName).toHaveText('Alallo');

    await select.selectOption('name-desc');

    firstItem = mainList.getByTestId('list-item').first();
    firstItemFieldName = firstItem.getByTestId('field-name');

    await expect(firstItemFieldName).toHaveText('Alguteice');

    await select.selectOption('year-asc');

    firstItem = mainList.getByTestId('list-item').first();
    let firstItemFieldYear = firstItem.getByTestId('field-year');

    await expect(firstItemFieldYear).toHaveText('2017');

    await select.selectOption('year-desc');

    firstItem = mainList.getByTestId('list-item').first();
    firstItemFieldYear = firstItem.getByTestId('field-year');

    await expect(firstItemFieldYear).toHaveText('2024');

    await select.selectOption('color-asc');

    firstItem = mainList.getByTestId('list-item').first();
    let firstItemFieldColor = firstItem.getByTestId('field-color');

    await expect(firstItemFieldColor).toHaveText('Black');

    await select.selectOption('color-desc');

    firstItem = mainList.getByTestId('list-item').first();
    firstItemFieldColor = firstItem.getByTestId('field-color');

    await expect(firstItemFieldColor).toHaveText('Yellow');

    await select.selectOption('updated-asc');

    firstItem = mainList.getByTestId('list-item').first();
    let firstItemFieldUpdated = firstItem.getByTestId('field-updated');

    await expect(firstItemFieldUpdated).toHaveText('August 27, 2024');

    await select.selectOption('updated-desc');

    firstItem = mainList.getByTestId('list-item').first();
    firstItemFieldUpdated = firstItem.getByTestId('field-updated');

    await expect(firstItemFieldUpdated).toHaveText('August 27, 2024');
  });
});

test.describe('fs-list: load', () => {
  test('list_load_more', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-load-more?dev=true');

    await waitAttributeLoaded(page, 'list');

    let listItem = page.getByTestId('list-item');

    await expect(listItem).toHaveCount(100);

    const nextButton = page.getByTestId('next-button');

    await nextButton.click();

    listItem = page.getByTestId('list-item');

    await expect(listItem).toHaveCount(200);

    await nextButton.click();

    listItem = page.getByTestId('list-item');

    await expect(listItem).toHaveCount(300);
  });

  test('list_load_all', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-load-all?dev=true');

    await waitAttributeLoaded(page, 'list');

    await page.waitForTimeout(1000);

    const listItem = page.getByTestId('list-item');

    await expect(listItem).toHaveCount(300);

    const nextButton = page.getByTestId('next-button');

    expect(nextButton).toHaveCSS('display', 'none');
  });

  test('list_load_remaining', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-load-remaining?dev=true');

    await waitAttributeLoaded(page, 'list');

    await page.waitForTimeout(1000);

    let listItem = page.getByTestId('list-item');

    await expect(listItem).toHaveCount(100);

    const nextButton = page.getByTestId('next-button');

    await nextButton.click();

    listItem = page.getByTestId('list-item');

    await expect(listItem).toHaveCount(300);
  });
});
