import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/combobox');
  // eslint-disable-next-line no-console
  page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
});

test.describe('combobox', () => {
  test('Combobox initializes properly', async ({ page }) => {
    const comboboxDropdown = page.locator('[fs-combobox-element="dropdown"]');
    const comboboxClearDropdown = page.locator('[fs-combobox-element="clear"]');
    const comboboxLabels = page.locator('[fs-combobox-element="label"]');
    const comboboxInput = comboboxDropdown.locator('input');
    const comboboSelect = comboboxDropdown.locator('select');
    const comboboSelectOptions = comboboSelect.locator('option');

    const comboboxLabelsCount = await comboboxLabels.count();
    const comboboSelectOptionsCount = await comboboSelectOptions.count();

    for (let optionIndex = 0; optionIndex < comboboSelectOptionsCount; optionIndex++) {
      const option = comboboSelect.nth(optionIndex);
      await expect(option).not.toBe(null);
    }

    await expect(comboboxLabelsCount).toBeGreaterThan(0);

    await expect(comboboxDropdown).toBeVisible();
    await expect(comboboxClearDropdown).toHaveCSS('display', 'none');
    await expect(comboboxInput).toBeVisible();
    await expect(comboboxInput).toBeEditable();
  });

  test('Combobox opens and closes by clicking on input.', async ({ page }) => {
    const comboboxDropdown = page.locator('[fs-combobox-element="dropdown"]');
    const comboboxInput = comboboxDropdown.locator('input');

    const comboboxNav = comboboxDropdown.locator('nav');

    // open dropdown
    await comboboxInput.click();
    // expect nav class to include w--open
    await expect(comboboxNav).toHaveClass(/w--open/);

    // second click should not close dropdown
    await comboboxInput.click();
    await expect(comboboxNav).toHaveClass(/w--open/);
  });

  test('Combobox input arrow down key opens dropdown', async ({ page }) => {
    const comboboxDropdown = page.locator('[fs-combobox-element="dropdown"]');
    const comboboxInput = comboboxDropdown.locator('input');
    const comboboxNav = comboboxDropdown.locator('nav');

    await comboboxInput.focus();

    await comboboxInput.press('ArrowDown');

    await expect(comboboxNav).toHaveClass(/w--open/);
  });

  test('Combobox input on escape key if nothing has been selected, it should clear input field and close dropdown', async ({
    page,
  }) => {
    const comboboxDropdown = page.locator('[fs-combobox-element="dropdown"]');
    const comboboxInput = comboboxDropdown.locator('input');
    const comboboxClearDropdown = page.locator('[fs-combobox-element="clear"]');
    const select = comboboxDropdown.locator('select');

    const comboboxNav = comboboxDropdown.locator('nav');

    await comboboxInput.focus();
    await comboboxInput.type('test');

    await expect(comboboxNav).toHaveClass(/w--open/);

    await comboboxNav.press('Escape');

    await expect(comboboxNav).not.toHaveClass(/w--open/);

    const selectedValue = await select.getAttribute('value');
    if (!selectedValue) {
      const inputValue = await comboboxInput.inputValue();
      await expect(inputValue).toEqual('');

      await expect(comboboxClearDropdown).toHaveCSS('display', 'none');
    }
  });

  test('Combobox should show clear icon only when selected option value matches input value', async ({ page }) => {
    const comboboxDropdown = page.locator('[fs-combobox-element="dropdown"]');
    const comboboxInput = comboboxDropdown.locator('input');
    const comboboxNav = comboboxDropdown.locator('nav');
    const comboboxOptions = comboboxNav.locator('a');
    const select = comboboxDropdown.locator('select');
    const comboboxClearDropdown = page.locator('[fs-combobox-element="clear"]');

    await expect(comboboxClearDropdown).toHaveCSS('display', 'none');

    await comboboxInput.click();

    expect(await comboboxNav).toHaveClass(/w--open/);

    const randomOptionIndex = Math.floor(Math.random() * (await comboboxOptions.count()));
    const randomOption = comboboxOptions.nth(randomOptionIndex);
    await randomOption.click();

    await expect(comboboxNav).not.toHaveClass(/w--open/);

    await expect(comboboxClearDropdown).toBeVisible();

    const activeElement = await page.evaluate(() => document.activeElement?.tagName);
    await expect(activeElement).toEqual('INPUT');

    await comboboxInput.press('Backspace');
    await expect(comboboxClearDropdown).toHaveCSS('display', 'none');

    await comboboxInput.press('Backspace');
    await expect(comboboxClearDropdown).toHaveCSS('display', 'none');

    await comboboxInput.type('');

    await expect(comboboxClearDropdown).toHaveCSS('display', 'none');

    await comboboxInput.press('Escape');

    await expect(comboboxNav).not.toHaveAttribute('aria-expanded', 'true');

    const selectedValue = await select.getAttribute('value');

    if (selectedValue) {
      await expect(comboboxClearDropdown).toHaveCSS('display', 'flex');
    }
  });

  test('Combobox whenever it is opened and if selected option does not exist, it should focus on first option', async ({
    page,
  }) => {
    const comboboxDropdown = page.locator('[fs-combobox-element="dropdown"]');
    const comboboxInput = comboboxDropdown.locator('input');
    const comboboxNav = comboboxDropdown.locator('nav');
    const comboboxOptions = comboboxNav.locator('a');

    await comboboxInput.focus();

    await comboboxInput.press('ArrowDown');
    await expect(comboboxNav).toHaveClass(/w--open/);

    const firstOption = comboboxOptions.nth(0);

    const activeElement = await page.evaluate(() => document.activeElement?.getAttribute('id'));
    const firstOptionId = await firstOption.getAttribute('id');

    await expect(activeElement).toEqual(firstOptionId);
  });

  test('Combobox whenever it is opened and something is typed, arrow up should close dropdown and arrow down should focus on first element on the list if no selected option is found', async ({
    page,
  }) => {
    const comboboxDropdown = page.locator('[fs-combobox-element="dropdown"]');
    const comboboxInput = comboboxDropdown.locator('input');
    const comboboxNav = comboboxDropdown.locator('nav');
    const comboboxOptions = comboboxNav.locator('a');

    await comboboxInput.type('a');

    await expect(comboboxNav).toHaveClass(/w--open/);

    await comboboxInput.press('ArrowUp');

    await expect(comboboxNav).not.toHaveClass(/w--open/);

    await comboboxInput.press('ArrowDown');

    await expect(comboboxNav).toHaveClass(/w--open/);

    const firstOption = comboboxOptions.nth(0);

    const activeElement = await page.evaluate(() => document.activeElement?.getAttribute('id'));
    const firstOptionId = await firstOption.getAttribute('id');

    await expect(activeElement).toEqual(firstOptionId);
  });

  test('Combobox input field enter key should submit form', async ({ page }) => {
    const comboboxDropdown = page.locator('[fs-combobox-element="dropdown"]');
    const comboboxInput = comboboxDropdown.locator('input');
    const comboboxNav = comboboxDropdown.locator('nav');

    await comboboxInput.focus();

    await comboboxInput.type('test');

    await comboboxInput.press('Enter');

    // timeout to check if form is submitted, webflow will trigger form to display none natively if form is submitted
    await page.waitForTimeout(2000);
    await expect(comboboxNav).not.toBeVisible();
    await expect(comboboxInput).not.toBeVisible();
  });

  test('Combobox clear icon enter key should not submit form', async ({ page }) => {
    const comboboxDropdown = page.locator('[fs-combobox-element="dropdown"]');
    const comboboxInput = comboboxDropdown.locator('input');
    const comboboxNav = comboboxDropdown.locator('nav');
    const comboboxClearDropdown = page.locator('[fs-combobox-element="clear"]');

    // toggle dropdown by clicking on input
    await comboboxInput.click();

    // dropdown should be open
    await expect(comboboxNav).toHaveClass(/w--open/);

    // click on first item in the list
    const randomOption = comboboxNav.locator('a').nth(1);
    await randomOption.click();

    // get randomOption text content
    const randomOptionTextVal = await randomOption.textContent();
    // trim
    const randomOptionText = randomOptionTextVal?.trim();

    await expect(randomOptionText).not.toEqual('');

    // dropdown should be closed

    await expect(comboboxNav).not.toHaveClass(/w--open/);

    // get input value
    const inputValue = await comboboxInput.inputValue();

    await expect(inputValue).toEqual(randomOptionText);

    // expect clear icon to be visible
    await expect(comboboxClearDropdown).toBeVisible();

    // focus on clear icon
    await comboboxClearDropdown.focus();

    // press enter key

    await comboboxClearDropdown.press('Enter');

    // timeout to check if form is submitted, webflow will trigger form to display none natively if form is submitted
    await page.waitForTimeout(2000);

    // dropdown should be closed
    await expect(comboboxNav).not.toHaveClass(/w--open/);

    // updated input value
    const updatedInputValue = await comboboxInput.inputValue();

    // input value should be empty
    await expect(updatedInputValue).toEqual('');

    // clear icon should not be visible
    await expect(comboboxClearDropdown).not.toBeVisible();

    // input should be focused
    const activeElement = await page.evaluate(() => document.activeElement?.tagName);
    await expect(activeElement).toEqual('INPUT');

    // input field should be visible meaning enter key on clear icon did not submit form
    await expect(comboboxInput).toBeVisible();
  });
});
