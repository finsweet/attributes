import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/starrating');
});

test.describe('starrating', () => {
  test('Adds the correct active classes', async ({ page }) => {
    const star11 = page.getByTestId('star-1-1');
    const star12 = page.getByTestId('star-1-2');
    const star13 = page.getByTestId('star-1-3');
    const star21 = page.getByTestId('star-2-1');
    const star25 = page.getByTestId('star-2-5');
    const star34 = page.getByTestId('star-3-4');

    // Default checked
    await expect(star34).toHaveClass(/is-active-starrating/);

    // Hovering
    await expect(star13).not.toHaveClass(/is-active-starrating/);
    await star13.hover();
    await expect(star11).toHaveClass(/is-active-starrating/);
    await expect(star12).toHaveClass(/is-active-starrating/);
    await expect(star13).toHaveClass(/is-active-starrating/);

    // Selecting and hovering lower
    await star13.click();
    await star11.hover();

    await expect(star11).toHaveClass(/is-active-starrating/);
    await expect(star12).toHaveClass(/is-active-starrating/);
    await expect(star13).toHaveClass(/is-active-starrating/);

    // Custom classes
    await star25.hover();
    await expect(star21).toHaveClass(/is-cool/);
    await expect(star25).toHaveClass(/is-super-cool/);
  });
});
