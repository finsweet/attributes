import type { List } from '@finsweet/attributes-list';
import { CMS_CSS_SELECTORS } from '@finsweet/attributes-list/dom';
import { getElementSelector, getInstanceSelector, getSettingSelector } from '@finsweet/attributes-list/selectors';
import { expect, type Page, test } from '@playwright/test';

test.describe('fs-list: sort', () => {
  test('sort_buttons', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-sort-buttons?dev=true');

    await waitCMSItemsLoaded(page);

    const sortTriggerSelector = getElementSelector('sort-trigger');
    const nameFieldSelector = getSettingSelector('field', undefined, 'name');
    const yearFieldSelector = getSettingSelector('field', undefined, 'year');
    const colorFieldSelector = getSettingSelector('field', undefined, 'color');
    const updatedFieldSelector = getSettingSelector('field', undefined, 'updated');

    const buttonName = page.locator(sortTriggerSelector + nameFieldSelector);
    const buttonYear = page.locator(sortTriggerSelector + yearFieldSelector);
    const buttonColor = page.locator(sortTriggerSelector + colorFieldSelector);
    const buttonUpdated = page.locator(sortTriggerSelector + updatedFieldSelector);

    let firstItem = page.locator(CMS_CSS_SELECTORS.item).first();
    let firstItemFieldName = firstItem.locator(nameFieldSelector);

    await expect(buttonName).not.toHaveClass(/is-list-asc/);
    await expect(buttonName).not.toHaveClass(/is-list-desc/);

    await buttonName.click();

    firstItem = page.locator(CMS_CSS_SELECTORS.item).first();
    firstItemFieldName = firstItem.locator(nameFieldSelector);

    await expect(firstItemFieldName).toHaveText('Belditini');
    await expect(buttonName).toHaveClass(/is-list-desc/);

    await buttonName.click();

    firstItem = page.locator(CMS_CSS_SELECTORS.item).first();
    firstItemFieldName = firstItem.locator(nameFieldSelector);

    await expect(firstItemFieldName).toHaveText('Alallo');
    await expect(buttonName).toHaveClass(/is-list-asc/);

    await buttonYear.click();

    firstItem = page.locator(CMS_CSS_SELECTORS.item).first();
    let firstItemFieldYear = firstItem.locator(yearFieldSelector);

    await expect(firstItemFieldYear).toHaveText('2017');
    await expect(buttonYear).toHaveClass(/is-list-asc/);

    await buttonYear.click();

    firstItem = page.locator(CMS_CSS_SELECTORS.item).first();
    firstItemFieldYear = firstItem.locator(yearFieldSelector);

    await expect(firstItemFieldYear).toHaveText('2024');
    await expect(buttonYear).toHaveClass(/is-list-desc/);

    await buttonColor.click();

    firstItem = page.locator(CMS_CSS_SELECTORS.item).first();
    let firstItemFieldColor = firstItem.locator(colorFieldSelector);

    await expect(firstItemFieldColor).toHaveText('Black');
    await expect(buttonColor).toHaveClass(/is-list-asc/);

    await buttonColor.click();

    firstItem = page.locator(CMS_CSS_SELECTORS.item).first();
    firstItemFieldColor = firstItem.locator(colorFieldSelector);

    await expect(firstItemFieldColor).toHaveText('Yellow');
    await expect(buttonColor).toHaveClass(/is-list-desc/);

    await buttonUpdated.click();

    firstItem = page.locator(CMS_CSS_SELECTORS.item).first();
    let firstItemFieldUpdated = firstItem.locator(updatedFieldSelector);

    await expect(firstItemFieldUpdated).toHaveText('August 27, 2024');
    await expect(buttonUpdated).toHaveClass(/is-list-asc/);

    await buttonUpdated.click();

    firstItem = page.locator(CMS_CSS_SELECTORS.item).first();
    firstItemFieldUpdated = firstItem.locator(updatedFieldSelector);

    await expect(firstItemFieldUpdated).toHaveText('August 27, 2024');
    await expect(buttonUpdated).toHaveClass(/is-list-desc/);
  });

  test('sort_load_buttons', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-sort-load-buttons?dev=true');

    await waitCMSItemsLoaded(page);

    const sortTriggerSelector = getElementSelector('sort-trigger');
    const nameFieldSelector = getSettingSelector('field', undefined, 'name');
    const yearFieldSelector = getSettingSelector('field', undefined, 'year');
    const colorFieldSelector = getSettingSelector('field', undefined, 'color');
    const updatedFieldSelector = getSettingSelector('field', undefined, 'updated');

    const buttonName = page.locator(sortTriggerSelector + nameFieldSelector);
    const buttonYear = page.locator(sortTriggerSelector + yearFieldSelector);
    const buttonColor = page.locator(sortTriggerSelector + colorFieldSelector);
    const buttonUpdated = page.locator(sortTriggerSelector + updatedFieldSelector);

    let firstItem = page.locator(CMS_CSS_SELECTORS.item).first();
    let firstItemFieldName = firstItem.locator(nameFieldSelector);

    await expect(buttonName).not.toHaveClass(/is-list-asc/);
    await expect(buttonName).not.toHaveClass(/is-list-desc/);

    await buttonName.click();

    firstItem = page.locator(CMS_CSS_SELECTORS.item).first();
    firstItemFieldName = firstItem.locator(nameFieldSelector);

    await expect(firstItemFieldName).toHaveText('Vizatara');
    await expect(buttonName).toHaveClass(/is-list-desc/);

    await buttonName.click();

    firstItem = page.locator(CMS_CSS_SELECTORS.item).first();
    firstItemFieldName = firstItem.locator(nameFieldSelector);

    await expect(firstItemFieldName).toHaveText('Alallo');
    await expect(buttonName).toHaveClass(/is-list-asc/);

    await buttonYear.click();

    firstItem = page.locator(CMS_CSS_SELECTORS.item).first();
    let firstItemFieldYear = firstItem.locator(yearFieldSelector);

    await expect(firstItemFieldYear).toHaveText('2017');
    await expect(buttonYear).toHaveClass(/is-list-asc/);

    await buttonYear.click();

    firstItem = page.locator(CMS_CSS_SELECTORS.item).first();
    firstItemFieldYear = firstItem.locator(yearFieldSelector);

    await expect(firstItemFieldYear).toHaveText('2024');
    await expect(buttonYear).toHaveClass(/is-list-desc/);

    await buttonColor.click();

    firstItem = page.locator(CMS_CSS_SELECTORS.item).first();
    let firstItemFieldColor = firstItem.locator(colorFieldSelector);

    await expect(firstItemFieldColor).toHaveText('Black');
    await expect(buttonColor).toHaveClass(/is-list-asc/);

    await buttonColor.click();

    firstItem = page.locator(CMS_CSS_SELECTORS.item).first();
    firstItemFieldColor = firstItem.locator(colorFieldSelector);

    await expect(firstItemFieldColor).toHaveText('Yellow');
    await expect(buttonColor).toHaveClass(/is-list-desc/);

    await buttonUpdated.click();

    firstItem = page.locator(CMS_CSS_SELECTORS.item).first();
    let firstItemFieldUpdated = firstItem.locator(updatedFieldSelector);

    await expect(firstItemFieldUpdated).toHaveText('August 27, 2024');
    await expect(buttonUpdated).toHaveClass(/is-list-asc/);

    await buttonUpdated.click();

    firstItem = page.locator(CMS_CSS_SELECTORS.item).first();
    firstItemFieldUpdated = firstItem.locator(updatedFieldSelector);

    await expect(firstItemFieldUpdated).toHaveText('August 27, 2024');
    await expect(buttonUpdated).toHaveClass(/is-list-desc/);
  });

  test('sort_select', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-sort-select?dev=true');

    await waitCMSItemsLoaded(page);

    const sortTriggerSelector = getElementSelector('sort-trigger');
    const nameFieldSelector = getSettingSelector('field', undefined, 'name');
    const yearFieldSelector = getSettingSelector('field', undefined, 'year');
    const colorFieldSelector = getSettingSelector('field', undefined, 'color');
    const updatedFieldSelector = getSettingSelector('field', undefined, 'updated');

    const select = page.locator(sortTriggerSelector);

    await select.selectOption('name-asc');

    let firstItem = page.locator(CMS_CSS_SELECTORS.item).first();
    let firstItemFieldName = firstItem.locator(nameFieldSelector);

    await expect(firstItemFieldName).toHaveText('Alallo');

    await select.selectOption('name-desc');

    firstItem = page.locator(CMS_CSS_SELECTORS.item).first();
    firstItemFieldName = firstItem.locator(nameFieldSelector);

    await expect(firstItemFieldName).toHaveText('Belditini');

    await select.selectOption('year-asc');

    firstItem = page.locator(CMS_CSS_SELECTORS.item).first();
    let firstItemFieldYear = firstItem.locator(yearFieldSelector);

    await expect(firstItemFieldYear).toHaveText('2017');

    await select.selectOption('year-desc');

    firstItem = page.locator(CMS_CSS_SELECTORS.item).first();
    firstItemFieldYear = firstItem.locator(yearFieldSelector);

    await expect(firstItemFieldYear).toHaveText('2024');

    await select.selectOption('color-asc');

    firstItem = page.locator(CMS_CSS_SELECTORS.item).first();
    let firstItemFieldColor = firstItem.locator(colorFieldSelector);

    await expect(firstItemFieldColor).toHaveText('Black');

    await select.selectOption('color-desc');

    firstItem = page.locator(CMS_CSS_SELECTORS.item).first();
    firstItemFieldColor = firstItem.locator(colorFieldSelector);

    await expect(firstItemFieldColor).toHaveText('Yellow');

    await select.selectOption('updated-asc');

    firstItem = page.locator(CMS_CSS_SELECTORS.item).first();
    let firstItemFieldUpdated = firstItem.locator(updatedFieldSelector);

    await expect(firstItemFieldUpdated).toHaveText('August 27, 2024');

    await select.selectOption('updated-desc');

    firstItem = page.locator(CMS_CSS_SELECTORS.item).first();
    firstItemFieldUpdated = firstItem.locator(updatedFieldSelector);

    await expect(firstItemFieldUpdated).toHaveText('August 27, 2024');
  });
});

test.describe('fs-list: combine', () => {
  test('combine', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-combine?dev=true');

    await waitCMSItemsLoaded(page);

    const listSelector = getElementSelector('list');

    const mainList = page.locator(listSelector + getInstanceSelector('main'));
    const fooList = page.locator(listSelector + getInstanceSelector('foo'));
    const barList = page.locator(listSelector + getInstanceSelector('bar'));

    const mainListChildren = mainList.locator(CMS_CSS_SELECTORS.item);
    const fooListChildren = fooList.locator(CMS_CSS_SELECTORS.item);
    const barListChildren = barList.locator(CMS_CSS_SELECTORS.item);

    await expect(mainListChildren).toHaveCount(18);
    await expect(fooListChildren).toHaveCount(0);
    await expect(barListChildren).toHaveCount(0);
  });

  test('combine_sort', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-combine-sort?dev=true');

    await waitCMSItemsLoaded(page);

    const sortTriggerSelector = getElementSelector('sort-trigger');
    const listSelector = getElementSelector('list');
    const nameFieldSelector = getSettingSelector('field', undefined, 'name');
    const yearFieldSelector = getSettingSelector('field', undefined, 'year');
    const colorFieldSelector = getSettingSelector('field', undefined, 'color');
    const updatedFieldSelector = getSettingSelector('field', undefined, 'updated');

    const select = page.locator(sortTriggerSelector);
    const mainList = page.locator(listSelector + getInstanceSelector('main'));
    const fooList = page.locator(listSelector + getInstanceSelector('foo'));
    const barList = page.locator(listSelector + getInstanceSelector('bar'));

    const mainListChildren = mainList.locator(CMS_CSS_SELECTORS.item);
    const fooListChildren = fooList.locator(CMS_CSS_SELECTORS.item);
    const barListChildren = barList.locator(CMS_CSS_SELECTORS.item);

    await expect(mainListChildren).toHaveCount(18);
    await expect(fooListChildren).toHaveCount(0);
    await expect(barListChildren).toHaveCount(0);

    await select.selectOption('name-asc');

    let firstItem = mainList.locator(CMS_CSS_SELECTORS.item).first();
    let firstItemFieldName = firstItem.locator(nameFieldSelector);

    await expect(firstItemFieldName).toHaveText('Alallo');

    await select.selectOption('name-desc');

    firstItem = mainList.locator(CMS_CSS_SELECTORS.item).first();
    firstItemFieldName = firstItem.locator(nameFieldSelector);

    await expect(firstItemFieldName).toHaveText('Alguteice');

    await select.selectOption('year-asc');

    firstItem = mainList.locator(CMS_CSS_SELECTORS.item).first();
    let firstItemFieldYear = firstItem.locator(yearFieldSelector);

    await expect(firstItemFieldYear).toHaveText('2017');

    await select.selectOption('year-desc');

    firstItem = mainList.locator(CMS_CSS_SELECTORS.item).first();
    firstItemFieldYear = firstItem.locator(yearFieldSelector);

    await expect(firstItemFieldYear).toHaveText('2024');

    await select.selectOption('color-asc');

    firstItem = mainList.locator(CMS_CSS_SELECTORS.item).first();
    let firstItemFieldColor = firstItem.locator(colorFieldSelector);

    await expect(firstItemFieldColor).toHaveText('Black');

    await select.selectOption('color-desc');

    firstItem = mainList.locator(CMS_CSS_SELECTORS.item).first();
    firstItemFieldColor = firstItem.locator(colorFieldSelector);

    await expect(firstItemFieldColor).toHaveText('Yellow');

    await select.selectOption('updated-asc');

    firstItem = mainList.locator(CMS_CSS_SELECTORS.item).first();
    let firstItemFieldUpdated = firstItem.locator(updatedFieldSelector);

    await expect(firstItemFieldUpdated).toHaveText('August 27, 2024');

    await select.selectOption('updated-desc');

    firstItem = mainList.locator(CMS_CSS_SELECTORS.item).first();
    firstItemFieldUpdated = firstItem.locator(updatedFieldSelector);

    await expect(firstItemFieldUpdated).toHaveText('August 27, 2024');
  });
});

test.describe('fs-list: load', () => {
  test('load_more', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-load-more?dev=true');

    await waitCMSItemsLoaded(page);

    const listSelector = getElementSelector('list');
    const list = page.locator(listSelector);

    let listItem = list.locator(CMS_CSS_SELECTORS.item);

    await expect(listItem).toHaveCount(100);

    const nextButton = page.locator(CMS_CSS_SELECTORS['pagination-next']);

    await nextButton.click();

    listItem = list.locator(CMS_CSS_SELECTORS.item);

    await expect(listItem).toHaveCount(200);

    await nextButton.click();

    listItem = list.locator(CMS_CSS_SELECTORS.item);

    await expect(listItem).toHaveCount(300);
  });

  test('load_more_loadcount', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-load-more-loadcount?dev=true');

    await waitCMSItemsLoaded(page);

    const listSelector = getElementSelector('list');
    const paginationNextSelector = getElementSelector('pagination-next');
    const loadCountAllSelector = getSettingSelector('loadcount', 'all');

    const list = page.locator(listSelector);

    let listItem = list.locator(CMS_CSS_SELECTORS.item);

    await expect(listItem).toHaveCount(100);

    const nextButton = page.locator(CMS_CSS_SELECTORS['pagination-next']);

    await nextButton.click();

    listItem = list.locator(CMS_CSS_SELECTORS.item);

    await expect(listItem).toHaveCount(120);

    await nextButton.click();

    listItem = list.locator(CMS_CSS_SELECTORS.item);

    await expect(listItem).toHaveCount(140);

    const loadRemainingButton = page.locator(paginationNextSelector + loadCountAllSelector);
    await loadRemainingButton.click();

    listItem = list.locator(CMS_CSS_SELECTORS.item);

    await expect(listItem).toHaveCount(1000);
  });

  test('load_all', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-load-all?dev=true');

    await waitCMSItemsLoaded(page);

    const listItem = page.locator(CMS_CSS_SELECTORS.item);

    await expect(listItem).toHaveCount(300);
  });

  test('load_pagination', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-load-pagination?dev=true');

    await waitCMSItemsLoaded(page);

    const elementAttribute = 'fs-list-element';
    const nameFieldSelector = getSettingSelector('field', undefined, 'name');

    const paginationNext = page.locator(CMS_CSS_SELECTORS['pagination-next']);
    const paginationPrevious = page.locator(CMS_CSS_SELECTORS['pagination-previous']);

    let paginationCount = page.locator(CMS_CSS_SELECTORS['page-count']);
    let paginationButtons = page.getByTestId('pagination-buttons');
    let paginationButtonsChildren = paginationButtons.locator('*');
    let listItem = page.locator(CMS_CSS_SELECTORS.item);

    await expect(listItem).toHaveCount(100);
    await expect(paginationCount).toHaveText('1 / 10');
    await expect(paginationNext).toBeVisible();
    await expect(paginationPrevious).not.toBeVisible();
    expect(await paginationButtonsChildren.count()).toBe(7);
    await expect(paginationButtonsChildren.nth(0)).toHaveClass(/w--current/);
    expect(await paginationButtonsChildren.nth(0).getAttribute(elementAttribute)).toBe('page-button');
    await expect(paginationButtonsChildren.nth(0)).toHaveText('1');
    await expect(paginationButtonsChildren.nth(1)).toHaveText('2');
    await expect(paginationButtonsChildren.nth(2)).toHaveText('3');
    await expect(paginationButtonsChildren.nth(3)).toHaveText('4');
    await expect(paginationButtonsChildren.nth(4)).toHaveText('5');
    await expect(paginationButtonsChildren.nth(5)).toHaveText('...');
    expect(await paginationButtonsChildren.nth(5).getAttribute(elementAttribute)).toBe('page-dots');
    await expect(paginationButtonsChildren.nth(6)).toHaveText('10');

    await paginationNext.click();

    listItem = page.locator(CMS_CSS_SELECTORS.item);

    await expect(listItem).toHaveCount(100);
    await expect(paginationCount).toHaveText('2 / 10');
    await expect(paginationPrevious).toBeVisible();
    await expect(paginationButtonsChildren.nth(0)).not.toHaveClass(/w--current/);
    await expect(paginationButtonsChildren.nth(1)).toHaveClass(/w--current/);

    await paginationButtonsChildren.nth(4).click();

    listItem = page.locator(CMS_CSS_SELECTORS.item);
    paginationButtonsChildren = paginationButtons.locator('*');

    await expect(paginationCount).toHaveText('5 / 10');
    await expect(listItem.first().locator(nameFieldSelector)).toHaveText('Eslezza');
    await expect(paginationButtonsChildren.nth(1)).toHaveText('...');
    expect(await paginationButtonsChildren.nth(1).getAttribute(elementAttribute)).toBe('page-dots');
    await expect(paginationButtonsChildren.nth(5)).toHaveText('...');
    expect(await paginationButtonsChildren.nth(5).getAttribute(elementAttribute)).toBe('page-dots');

    await paginationButtonsChildren.nth(6).click();

    paginationButtonsChildren = paginationButtons.locator('*');

    await expect(paginationCount).toHaveText('10 / 10');
    await expect(paginationNext).not.toBeVisible();
    await expect(paginationPrevious).toBeVisible();
    await expect(paginationButtonsChildren.nth(6)).toHaveText('10');
    await expect(paginationButtonsChildren.nth(6)).toHaveClass(/w--current/);

    await page.goto('http://fs-attributes-list.webflow.io/list-load-pagination?af0bd859_page=6&dev=true');

    await waitCMSItemsLoaded(page);

    listItem = page.locator(CMS_CSS_SELECTORS.item);
    paginationCount = page.locator(CMS_CSS_SELECTORS['page-count']);
    paginationButtons = page.getByTestId('pagination-buttons');
    paginationButtonsChildren = paginationButtons.locator('*');

    await expect(listItem).toHaveCount(100);
    await expect(listItem.first().locator(nameFieldSelector)).toHaveText('Fijoallo');
    await expect(paginationCount).toHaveText('6 / 10');
    expect(await paginationButtonsChildren.count()).toBe(7);
    await expect(paginationButtonsChildren.nth(0)).toHaveText('1');
    await expect(paginationButtonsChildren.nth(1)).toHaveText('...');
    await expect(paginationButtonsChildren.nth(2)).toHaveText('5');
    await expect(paginationButtonsChildren.nth(3)).toHaveText('6');
    await expect(paginationButtonsChildren.nth(3)).toHaveClass(/w--current/);
    await expect(paginationButtonsChildren.nth(4)).toHaveText('7');
    await expect(paginationButtonsChildren.nth(5)).toHaveText('...');
    expect(await paginationButtonsChildren.nth(5).getAttribute(elementAttribute)).toBe('page-dots');
    await expect(paginationButtonsChildren.nth(6)).toHaveText('10');
  });

  test('filter_basic_text', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-filter-basic-text?dev=true');

    await waitCMSItemsLoaded(page);

    const filters = page.locator(getElementSelector('filters'));
    const list = page.locator(getElementSelector('list'));
    const itemsCount = page.locator(getElementSelector('items-count'));
    const resultsCount = page.locator(getElementSelector('results-count'));
    const equalInput = filters.locator(getSettingSelector('operator', 'equal'));
    const notEqualInput = filters.locator(getSettingSelector('operator', 'not-equal'));
    const containsInput = filters.locator(getSettingSelector('operator', 'contains'));
    const notContainsInput = filters.locator(getSettingSelector('operator', 'not-contains'));
    const fuzzyInput = filters.locator(getSettingSelector('operator', 'fuzzy'));
    const nameFieldSelector = getSettingSelector('field', undefined, 'name');

    await expect(itemsCount).toHaveText('300');
    await expect(resultsCount).toHaveText('300');

    await equalInput.fill('alallo');

    let listItems = list.locator(CMS_CSS_SELECTORS.item);
    let firstItemFieldName = listItems.first().locator(nameFieldSelector);

    await expect(resultsCount).toHaveText('1');
    await expect(firstItemFieldName).toHaveText('Alallo');

    await equalInput.fill('');

    await notEqualInput.fill('alallo');

    listItems = list.locator(CMS_CSS_SELECTORS.item);
    firstItemFieldName = listItems.first().locator(nameFieldSelector);

    await expect(resultsCount).toHaveText('299');
    await expect(firstItemFieldName).toHaveText('Albero');

    await notEqualInput.fill('');

    await containsInput.fill('oge');

    listItems = list.locator(CMS_CSS_SELECTORS.item);
    const itemNames = listItems.locator(nameFieldSelector);

    await expect(resultsCount).toHaveText('3');
    await expect(itemNames).toHaveCount(3);
    await expect(itemNames.nth(0)).toHaveText('Beljogera');
    await expect(itemNames.nth(1)).toHaveText('Belkogera');
    await expect(itemNames.nth(2)).toHaveText('Clalogera');

    await containsInput.fill('');

    await notContainsInput.fill('oge');

    listItems = list.locator(CMS_CSS_SELECTORS.item);
    firstItemFieldName = listItems.first().locator(nameFieldSelector);

    await expect(resultsCount).toHaveText('297');
    await expect(firstItemFieldName).toHaveText('Alallo');

    await fuzzyInput.fill('aldiris alalo');

    listItems = list.locator(CMS_CSS_SELECTORS.item);
    firstItemFieldName = listItems.first().locator(nameFieldSelector);

    await expect(resultsCount).toHaveText('10');
  });

  test('filter_basic_number', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-filter-basic-number?dev=true');

    await waitCMSItemsLoaded(page);

    const filters = page.locator(getElementSelector('filters'));
    const list = page.locator(getElementSelector('list'));
    const itemsCount = page.locator(getElementSelector('items-count'));
    const resultsCount = page.locator(getElementSelector('results-count'));
    const equalInput = filters.locator(getSettingSelector('operator', 'equal'));
    const notEqualInput = filters.locator(getSettingSelector('operator', 'not-equal'));
    const greaterInput = filters.locator(getSettingSelector('operator', 'greater'));
    const greaterEqualInput = filters.locator(getSettingSelector('operator', 'greater-equal'));
    const lessInput = filters.locator(getSettingSelector('operator', 'less'));
    const lessEqualInput = filters.locator(getSettingSelector('operator', 'less-equal'));
    const containsInput = filters.locator(getSettingSelector('operator', 'contains'));
    const notContainsInput = filters.locator(getSettingSelector('operator', 'not-contains'));
    const fuzzyInput = filters.locator(getSettingSelector('operator', 'fuzzy'));
    const yearFieldSelector = getSettingSelector('field', undefined, 'year');

    await expect(itemsCount).toHaveText('300');
    await expect(resultsCount).toHaveText('300');

    await equalInput.fill('2020');

    let listItems = list.locator(CMS_CSS_SELECTORS.item);
    let firstItemFieldYear = listItems.first().locator(yearFieldSelector);

    await expect(resultsCount).toHaveText('38');
    await expect(firstItemFieldYear).toHaveText('2020');

    await equalInput.fill('');
    await notEqualInput.fill('2020');

    listItems = list.locator(CMS_CSS_SELECTORS.item);
    firstItemFieldYear = listItems.first().locator(yearFieldSelector);

    await expect(resultsCount).toHaveText('262');
    await expect(firstItemFieldYear).toHaveText('2017');

    await notEqualInput.fill('');
    await containsInput.fill('201');

    listItems = list.locator(CMS_CSS_SELECTORS.item);
    firstItemFieldYear = listItems.first().locator(yearFieldSelector);

    await expect(resultsCount).toHaveText('108');
    await expect(firstItemFieldYear).toHaveText('2017');

    await containsInput.fill('');
    await notContainsInput.fill('201');

    listItems = list.locator(CMS_CSS_SELECTORS.item);
    firstItemFieldYear = listItems.first().locator(yearFieldSelector);

    await expect(resultsCount).toHaveText('192');
    await expect(firstItemFieldYear).toHaveText('2020');

    await notContainsInput.fill('');
    await fuzzyInput.fill('2020');

    listItems = list.locator(CMS_CSS_SELECTORS.item);
    firstItemFieldYear = listItems.first().locator(yearFieldSelector);

    await expect(resultsCount).toHaveText('192');

    await fuzzyInput.fill('');
    await greaterInput.fill('2020');

    listItems = list.locator(CMS_CSS_SELECTORS.item);
    firstItemFieldYear = listItems.first().locator(yearFieldSelector);

    await expect(resultsCount).toHaveText('154');
    await expect(firstItemFieldYear).toHaveText('2021');

    await greaterInput.fill('');
    await greaterEqualInput.fill('2020');

    listItems = list.locator(CMS_CSS_SELECTORS.item);
    firstItemFieldYear = listItems.first().locator(yearFieldSelector);

    await expect(resultsCount).toHaveText('192');
    await expect(firstItemFieldYear).toHaveText('2020');

    await greaterEqualInput.fill('');
    await lessInput.fill('2020');

    listItems = list.locator(CMS_CSS_SELECTORS.item);
    firstItemFieldYear = listItems.first().locator(yearFieldSelector);

    await expect(resultsCount).toHaveText('108');
    await expect(firstItemFieldYear).toHaveText('2017');

    await lessInput.fill('');
    await lessEqualInput.fill('2020');

    listItems = list.locator(CMS_CSS_SELECTORS.item);
    firstItemFieldYear = listItems.first().locator(yearFieldSelector);

    await expect(resultsCount).toHaveText('146');
    await expect(firstItemFieldYear).toHaveText('2020');
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
