import type { List } from '@finsweet/attributes-list';
import { expect, type Page, test } from '@playwright/test';

test.describe('fs-list: sort', () => {
  test('list_sort_buttons', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-sort-buttons?dev=true');

    await waitCMSItemsLoaded(page);

    const buttonName = page.locator('[fs-list-element="sort-trigger"][fs-list-field="name"]');
    const buttonYear = page.locator('[fs-list-element="sort-trigger"][fs-list-field="year"]');
    const buttonColor = page.locator('[fs-list-element="sort-trigger"][fs-list-field="color"]');
    const buttonUpdated = page.locator('[fs-list-element="sort-trigger"][fs-list-field="updated"]');

    let firstItem = page.locator('.w-dyn-item').first();
    let firstItemFieldName = firstItem.locator('[fs-list-field="name"]');

    await expect(buttonName).not.toHaveClass(/is-list-asc/);
    await expect(buttonName).not.toHaveClass(/is-list-desc/);

    await buttonName.click();

    firstItem = page.locator('.w-dyn-item').first();
    firstItemFieldName = firstItem.locator('[fs-list-field="name"]');

    await expect(firstItemFieldName).toHaveText('Belditini');
    await expect(buttonName).toHaveClass(/is-list-desc/);

    await buttonName.click();

    firstItem = page.locator('.w-dyn-item').first();
    firstItemFieldName = firstItem.locator('[fs-list-field="name"]');

    await expect(firstItemFieldName).toHaveText('Alallo');
    await expect(buttonName).toHaveClass(/is-list-asc/);

    await buttonYear.click();

    firstItem = page.locator('.w-dyn-item').first();
    let firstItemFieldYear = firstItem.locator('[fs-list-field="year"]');

    await expect(firstItemFieldYear).toHaveText('2017');
    await expect(buttonYear).toHaveClass(/is-list-asc/);

    await buttonYear.click();

    firstItem = page.locator('.w-dyn-item').first();
    firstItemFieldYear = firstItem.locator('[fs-list-field="year"]');

    await expect(firstItemFieldYear).toHaveText('2024');
    await expect(buttonYear).toHaveClass(/is-list-desc/);

    await buttonColor.click();

    firstItem = page.locator('.w-dyn-item').first();
    let firstItemFieldColor = firstItem.locator('[fs-list-field="color"]');

    await expect(firstItemFieldColor).toHaveText('Black');
    await expect(buttonColor).toHaveClass(/is-list-asc/);

    await buttonColor.click();

    firstItem = page.locator('.w-dyn-item').first();
    firstItemFieldColor = firstItem.locator('[fs-list-field="color"]');

    await expect(firstItemFieldColor).toHaveText('Yellow');
    await expect(buttonColor).toHaveClass(/is-list-desc/);

    await buttonUpdated.click();

    firstItem = page.locator('.w-dyn-item').first();
    let firstItemFieldUpdated = firstItem.locator('[fs-list-field="updated"]');

    await expect(firstItemFieldUpdated).toHaveText('August 27, 2024');
    await expect(buttonUpdated).toHaveClass(/is-list-asc/);

    await buttonUpdated.click();

    firstItem = page.locator('.w-dyn-item').first();
    firstItemFieldUpdated = firstItem.locator('[fs-list-field="updated"]');

    await expect(firstItemFieldUpdated).toHaveText('August 27, 2024');
    await expect(buttonUpdated).toHaveClass(/is-list-desc/);
  });

  test('list_sort_load_buttons', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-sort-load-buttons?dev=true');

    await waitCMSItemsLoaded(page);

    const buttonName = page.locator('[fs-list-element="sort-trigger"][fs-list-field="name"]');
    const buttonYear = page.locator('[fs-list-element="sort-trigger"][fs-list-field="year"]');
    const buttonColor = page.locator('[fs-list-element="sort-trigger"][fs-list-field="color"]');
    const buttonUpdated = page.locator('[fs-list-element="sort-trigger"][fs-list-field="updated"]');

    let firstItem = page.locator('.w-dyn-item').first();
    let firstItemFieldName = firstItem.locator('[fs-list-field="name"]');

    await expect(buttonName).not.toHaveClass(/is-list-asc/);
    await expect(buttonName).not.toHaveClass(/is-list-desc/);

    await buttonName.click();

    firstItem = page.locator('.w-dyn-item').first();
    firstItemFieldName = firstItem.locator('[fs-list-field="name"]');

    await expect(firstItemFieldName).toHaveText('Vizatara');
    await expect(buttonName).toHaveClass(/is-list-desc/);

    await buttonName.click();

    firstItem = page.locator('.w-dyn-item').first();
    firstItemFieldName = firstItem.locator('[fs-list-field="name"]');

    await expect(firstItemFieldName).toHaveText('Alallo');
    await expect(buttonName).toHaveClass(/is-list-asc/);

    await buttonYear.click();

    firstItem = page.locator('.w-dyn-item').first();
    let firstItemFieldYear = firstItem.locator('[fs-list-field="year"]');

    await expect(firstItemFieldYear).toHaveText('2017');
    await expect(buttonYear).toHaveClass(/is-list-asc/);

    await buttonYear.click();

    firstItem = page.locator('.w-dyn-item').first();
    firstItemFieldYear = firstItem.locator('[fs-list-field="year"]');

    await expect(firstItemFieldYear).toHaveText('2024');
    await expect(buttonYear).toHaveClass(/is-list-desc/);

    await buttonColor.click();

    firstItem = page.locator('.w-dyn-item').first();
    let firstItemFieldColor = firstItem.locator('[fs-list-field="color"]');

    await expect(firstItemFieldColor).toHaveText('Black');
    await expect(buttonColor).toHaveClass(/is-list-asc/);

    await buttonColor.click();

    firstItem = page.locator('.w-dyn-item').first();
    firstItemFieldColor = firstItem.locator('[fs-list-field="color"]');

    await expect(firstItemFieldColor).toHaveText('Yellow');
    await expect(buttonColor).toHaveClass(/is-list-desc/);

    await buttonUpdated.click();

    firstItem = page.locator('.w-dyn-item').first();
    let firstItemFieldUpdated = firstItem.locator('[fs-list-field="updated"]');

    await expect(firstItemFieldUpdated).toHaveText('August 27, 2024');
    await expect(buttonUpdated).toHaveClass(/is-list-asc/);

    await buttonUpdated.click();

    firstItem = page.locator('.w-dyn-item').first();
    firstItemFieldUpdated = firstItem.locator('[fs-list-field="updated"]');

    await expect(firstItemFieldUpdated).toHaveText('August 27, 2024');
    await expect(buttonUpdated).toHaveClass(/is-list-desc/);
  });

  test('list_sort_select', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-sort-select?dev=true');

    await waitCMSItemsLoaded(page);

    const select = page.locator('[fs-list-element="sort-trigger"]');

    await select.selectOption('name-asc');

    let firstItem = page.locator('.w-dyn-item').first();
    let firstItemFieldName = firstItem.locator('[fs-list-field="name"]');

    await expect(firstItemFieldName).toHaveText('Alallo');

    await select.selectOption('name-desc');

    firstItem = page.locator('.w-dyn-item').first();
    firstItemFieldName = firstItem.locator('[fs-list-field="name"]');

    await expect(firstItemFieldName).toHaveText('Belditini');

    await select.selectOption('year-asc');

    firstItem = page.locator('.w-dyn-item').first();
    let firstItemFieldYear = firstItem.locator('[fs-list-field="year"]');

    await expect(firstItemFieldYear).toHaveText('2017');

    await select.selectOption('year-desc');

    firstItem = page.locator('.w-dyn-item').first();
    firstItemFieldYear = firstItem.locator('[fs-list-field="year"]');

    await expect(firstItemFieldYear).toHaveText('2024');

    await select.selectOption('color-asc');

    firstItem = page.locator('.w-dyn-item').first();
    let firstItemFieldColor = firstItem.locator('[fs-list-field="color"]');

    await expect(firstItemFieldColor).toHaveText('Black');

    await select.selectOption('color-desc');

    firstItem = page.locator('.w-dyn-item').first();
    firstItemFieldColor = firstItem.locator('[fs-list-field="color"]');

    await expect(firstItemFieldColor).toHaveText('Yellow');

    await select.selectOption('updated-asc');

    firstItem = page.locator('.w-dyn-item').first();
    let firstItemFieldUpdated = firstItem.locator('[fs-list-field="updated"]');

    await expect(firstItemFieldUpdated).toHaveText('August 27, 2024');

    await select.selectOption('updated-desc');

    firstItem = page.locator('.w-dyn-item').first();
    firstItemFieldUpdated = firstItem.locator('[fs-list-field="updated"]');

    await expect(firstItemFieldUpdated).toHaveText('August 27, 2024');
  });
});

test.describe('fs-list: combine', () => {
  test('list_combine', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-combine?dev=true');

    await waitCMSItemsLoaded(page);

    const mainList = page.locator('[fs-list-element="list"][fs-list-instance="main"]');
    const fooList = page.locator('[fs-list-element="list"][fs-list-instance="foo"]');
    const barList = page.locator('[fs-list-element="list"][fs-list-instance="bar"]');

    const mainListChildren = mainList.locator('.w-dyn-item');
    const fooListChildren = fooList.locator('.w-dyn-item');
    const barListChildren = barList.locator('.w-dyn-item');

    await expect(mainListChildren).toHaveCount(18);
    await expect(fooListChildren).toHaveCount(0);
    await expect(barListChildren).toHaveCount(0);
  });

  test('list_combine_sort', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-combine-sort?dev=true');

    await waitCMSItemsLoaded(page);

    const select = page.locator('[fs-list-element="sort-trigger"]');

    const mainList = page.locator('[fs-list-element="list"][fs-list-instance="main"]');
    const fooList = page.locator('[fs-list-element="list"][fs-list-instance="foo"]');
    const barList = page.locator('[fs-list-element="list"][fs-list-instance="bar"]');

    const mainListChildren = mainList.locator('.w-dyn-item');
    const fooListChildren = fooList.locator('.w-dyn-item');
    const barListChildren = barList.locator('.w-dyn-item');

    await expect(mainListChildren).toHaveCount(18);
    await expect(fooListChildren).toHaveCount(0);
    await expect(barListChildren).toHaveCount(0);

    await select.selectOption('name-asc');

    let firstItem = mainList.locator('.w-dyn-item').first();
    let firstItemFieldName = firstItem.locator('[fs-list-field="name"]');

    await expect(firstItemFieldName).toHaveText('Alallo');

    await select.selectOption('name-desc');

    firstItem = mainList.locator('.w-dyn-item').first();
    firstItemFieldName = firstItem.locator('[fs-list-field="name"]');

    await expect(firstItemFieldName).toHaveText('Alguteice');

    await select.selectOption('year-asc');

    firstItem = mainList.locator('.w-dyn-item').first();
    let firstItemFieldYear = firstItem.locator('[fs-list-field="year"]');

    await expect(firstItemFieldYear).toHaveText('2017');

    await select.selectOption('year-desc');

    firstItem = mainList.locator('.w-dyn-item').first();
    firstItemFieldYear = firstItem.locator('[fs-list-field="year"]');

    await expect(firstItemFieldYear).toHaveText('2024');

    await select.selectOption('color-asc');

    firstItem = mainList.locator('.w-dyn-item').first();
    let firstItemFieldColor = firstItem.locator('[fs-list-field="color"]');

    await expect(firstItemFieldColor).toHaveText('Black');

    await select.selectOption('color-desc');

    firstItem = mainList.locator('.w-dyn-item').first();
    firstItemFieldColor = firstItem.locator('[fs-list-field="color"]');

    await expect(firstItemFieldColor).toHaveText('Yellow');

    await select.selectOption('updated-asc');

    firstItem = mainList.locator('.w-dyn-item').first();
    let firstItemFieldUpdated = firstItem.locator('[fs-list-field="updated"]');

    await expect(firstItemFieldUpdated).toHaveText('August 27, 2024');

    await select.selectOption('updated-desc');

    firstItem = mainList.locator('.w-dyn-item').first();
    firstItemFieldUpdated = firstItem.locator('[fs-list-field="updated"]');

    await expect(firstItemFieldUpdated).toHaveText('August 27, 2024');
  });
});

test.describe('fs-list: load', () => {
  test('list_load_more', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-load-more?dev=true');

    await waitCMSItemsLoaded(page);

    const list = page.locator('[fs-list-element="list"]');

    let listItem = list.locator('.w-dyn-item');

    await expect(listItem).toHaveCount(100);

    const nextButton = page.locator('.w-pagination-next');

    await nextButton.click();

    listItem = list.locator('.w-dyn-item');

    await expect(listItem).toHaveCount(200);

    await nextButton.click();

    listItem = list.locator('.w-dyn-item');

    await expect(listItem).toHaveCount(300);
  });

  test('list_load_more_loadcount', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-load-more-loadcount?dev=true');

    await waitCMSItemsLoaded(page);

    const list = page.locator('[fs-list-element="list"]');

    let listItem = list.locator('.w-dyn-item');

    await expect(listItem).toHaveCount(100);

    const nextButton = page.locator('.w-pagination-next');

    await nextButton.click();

    listItem = list.locator('.w-dyn-item');

    await expect(listItem).toHaveCount(120);

    await nextButton.click();

    listItem = list.locator('.w-dyn-item');

    await expect(listItem).toHaveCount(140);

    const loadRemainingButton = page.locator('[fs-list-element="pagination-next"][fs-list-loadcount="all"]');

    await loadRemainingButton.click();

    listItem = list.locator('.w-dyn-item');

    await expect(listItem).toHaveCount(1000);
  });

  test('list_load_all', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-load-all?dev=true');

    await waitCMSItemsLoaded(page);

    const listItem = page.locator('.w-dyn-item');

    await expect(listItem).toHaveCount(300);
  });

  test('list_load_pagination', async ({ page }) => {
    await page.goto('http://fs-attributes-list.webflow.io/list-load-pagination?dev=true');

    await waitCMSItemsLoaded(page);

    const paginationNext = page.locator('.w-pagination-next');
    const paginationPrevious = page.locator('.w-pagination-previous');

    let paginationCount = page.locator('.w-page-count');
    let paginationButtons = page.getByTestId('pagination-buttons');
    let paginationButtonsChildren = paginationButtons.locator('*');
    let listItem = page.locator('.w-dyn-item');

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

    listItem = page.locator('.w-dyn-item');

    await expect(listItem).toHaveCount(100);
    await expect(paginationCount).toHaveText('2 / 10');
    await expect(paginationPrevious).toBeVisible();
    await expect(paginationButtonsChildren.nth(0)).not.toHaveClass(/w--current/);
    await expect(paginationButtonsChildren.nth(1)).toHaveClass(/w--current/);

    await paginationButtonsChildren.nth(4).click();

    listItem = page.locator('.w-dyn-item');
    paginationButtonsChildren = paginationButtons.locator('*');

    await expect(paginationCount).toHaveText('5 / 10');
    await expect(listItem.first().locator('[fs-list-field="name"]')).toHaveText('Eslezza');
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

    await waitCMSItemsLoaded(page);

    listItem = page.locator('.w-dyn-item');
    paginationCount = page.locator('.w-page-count');
    paginationButtons = page.getByTestId('pagination-buttons');
    paginationButtonsChildren = paginationButtons.locator('*');

    await expect(listItem).toHaveCount(100);
    await expect(listItem.first().locator('[fs-list-field="name"]')).toHaveText('Fijoallo');
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
