import type { List } from '@finsweet/attributes-list';
import { expect, type Page, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.describe('fs-list: sort', () => {
  test('list_sort_buttons', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-sort-buttons?dev=true');

    await waitCMSItemsLoaded(page);

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

    await waitCMSItemsLoaded(page);

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

    await waitCMSItemsLoaded(page);

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

    await waitCMSItemsLoaded(page);

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

    await waitCMSItemsLoaded(page);

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

    await waitCMSItemsLoaded(page);

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

  test('list_load_more_loadcount', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-load-more-loadcount?dev=true');

    await waitCMSItemsLoaded(page);

    let listItem = page.getByTestId('list-item');

    await expect(listItem).toHaveCount(100);

    const nextButton = page.getByTestId('next-button');

    await nextButton.click();

    listItem = page.getByTestId('list-item');

    await expect(listItem).toHaveCount(120);

    await nextButton.click();

    listItem = page.getByTestId('list-item');

    await expect(listItem).toHaveCount(140);

    const loadRemainingButton = page.getByTestId('load-remaining');

    await loadRemainingButton.click();

    listItem = page.getByTestId('list-item');

    await expect(listItem).toHaveCount(1000);
  });

  test('list_load_all', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-load-all?dev=true');

    await waitCMSItemsLoaded(page);

    const listItem = page.getByTestId('list-item');

    await expect(listItem).toHaveCount(300);
  });

  test('list_load_pagination', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-load-pagination?dev=true');

    await waitCMSItemsLoaded(page);

    const paginationNext = page.getByTestId('pagination-next');
    const paginationPrevious = page.getByTestId('pagination-previous');

    let paginationCount = page.getByTestId('pagination-count');
    let paginationButtons = page.getByTestId('pagination-buttons');
    let paginationButtonsChildren = paginationButtons.locator('*');
    let listItem = page.getByTestId('list-item');

    await expect(listItem).toHaveCount(100);
    await expect(paginationCount).toHaveText('1 / 10');
    await expect(paginationNext).toBeVisible();
    await expect(paginationPrevious).not.toBeVisible();
    expect(await paginationButtonsChildren.count()).toBe(7);
    await expect(paginationButtonsChildren.nth(0)).toHaveClass(/w--current/);
    expect(await paginationButtonsChildren.nth(0).getAttribute('fs-list-element')).toBe('page-button');
    await expect(paginationButtonsChildren.nth(0)).toHaveText('1');
    await expect(paginationButtonsChildren.nth(1)).toHaveText('2');
    await expect(paginationButtonsChildren.nth(2)).toHaveText('3');
    await expect(paginationButtonsChildren.nth(3)).toHaveText('4');
    await expect(paginationButtonsChildren.nth(4)).toHaveText('5');
    await expect(paginationButtonsChildren.nth(5)).toHaveText('...');
    expect(await paginationButtonsChildren.nth(5).getAttribute('fs-list-element')).toBe('page-dots');
    await expect(paginationButtonsChildren.nth(6)).toHaveText('10');

    await paginationNext.click();

    listItem = page.getByTestId('list-item');

    await expect(listItem).toHaveCount(100);
    await expect(paginationCount).toHaveText('2 / 10');
    await expect(paginationPrevious).toBeVisible();
    await expect(paginationButtonsChildren.nth(0)).not.toHaveClass(/w--current/);
    await expect(paginationButtonsChildren.nth(1)).toHaveClass(/w--current/);

    await paginationButtonsChildren.nth(4).click();

    listItem = page.getByTestId('list-item');
    paginationButtonsChildren = paginationButtons.locator('*');

    await expect(paginationCount).toHaveText('5 / 10');
    await expect(listItem.first().getByTestId('field-name')).toHaveText('Eslezza');
    await expect(paginationButtonsChildren.nth(1)).toHaveText('...');
    expect(await paginationButtonsChildren.nth(1).getAttribute('fs-list-element')).toBe('page-dots');
    await expect(paginationButtonsChildren.nth(5)).toHaveText('...');
    expect(await paginationButtonsChildren.nth(5).getAttribute('fs-list-element')).toBe('page-dots');

    await paginationButtonsChildren.nth(6).click();

    paginationButtonsChildren = paginationButtons.locator('*');

    await expect(paginationCount).toHaveText('10 / 10');
    await expect(paginationNext).not.toBeVisible();
    await expect(paginationPrevious).toBeVisible();
    await expect(paginationButtonsChildren.nth(6)).toHaveText('10');
    await expect(paginationButtonsChildren.nth(6)).toHaveClass(/w--current/);

    await page.goto('http://fs-attributes-list.webflow.io/list-load-pagination?af0bd859_page=6&dev=true');

    await waitAttributeLoaded(page, 'list');

    await page.waitForTimeout(1000);

    listItem = page.getByTestId('list-item');
    paginationCount = page.getByTestId('pagination-count');
    paginationButtons = page.getByTestId('pagination-buttons');
    paginationButtonsChildren = paginationButtons.locator('*');

    await expect(listItem).toHaveCount(100);
    await expect(listItem.first().getByTestId('field-name')).toHaveText('Fijoallo');
    await expect(paginationCount).toHaveText('6 / 10');
    expect(await paginationButtonsChildren.count()).toBe(7);
    await expect(paginationButtonsChildren.nth(0)).toHaveText('1');
    await expect(paginationButtonsChildren.nth(1)).toHaveText('...');
    await expect(paginationButtonsChildren.nth(2)).toHaveText('5');
    await expect(paginationButtonsChildren.nth(3)).toHaveText('6');
    await expect(paginationButtonsChildren.nth(3)).toHaveClass(/w--current/);
    await expect(paginationButtonsChildren.nth(4)).toHaveText('7');
    await expect(paginationButtonsChildren.nth(5)).toHaveText('...');
    expect(await paginationButtonsChildren.nth(5).getAttribute('fs-list-element')).toBe('page-dots');
    await expect(paginationButtonsChildren.nth(6)).toHaveText('10');
  });
});

/**
 * Wait for the attribute to be loaded in the current test page.
 * @param page
 * @param attributeKey
 */
const waitCMSItemsLoaded = async (page: Page) => {
  return page.evaluate<Promise<List>>(async () => {
    return new Promise((r) => {
      window.finsweetAttributes = window.finsweetAttributes || [];
      window.finsweetAttributes.push([
        'list',
        async ([list]: List[]) => {
          await list.loadingPaginatedItems;
          r(list);
        },
      ]);
    });
  });
};
