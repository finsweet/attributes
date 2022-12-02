import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/starrating');
});

test.describe('starrating', () => {
  test('Adds the correct active classes', async ({ page }) => {
    const DEFAULT_ACTIVE_CLASS_REGEX = /is-active-starrating/;

    const star11 = page.getByTestId('star-1-1');
    const star12 = page.getByTestId('star-1-2');
    const star13 = page.getByTestId('star-1-3');

    const radio11 = page.getByTestId('radio-1-1');
    const radio12 = page.getByTestId('radio-1-2');
    const radio13 = page.getByTestId('radio-1-3');

    const star21 = page.getByTestId('star-2-1');
    const star25 = page.getByTestId('star-2-5');
    const star34 = page.getByTestId('star-3-4');

    // Default checked
    await expect(star34).toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);

    // Hovering
    await expect(star11).not.toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);
    await expect(star12).not.toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);
    await expect(star13).not.toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);

    await star11.hover();
    await expect(star11).toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);
    await expect(star12).not.toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);
    await expect(star13).not.toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);

    await star12.hover();
    await expect(star11).toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);
    await expect(star12).toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);
    await expect(star13).not.toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);

    await star13.hover();
    await expect(star11).toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);
    await expect(star12).toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);
    await expect(star13).toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);

    // Selecting and hovering lower
    await star13.click();
    await star11.hover();

    await expect(star11).toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);
    await expect(star12).toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);
    await expect(star13).toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);

    // Custom classes
    await star25.hover();
    await expect(star21).toHaveClass(/is-cool/);
    await expect(star25).toHaveClass(/is-super-cool/);

    // Keyboard inputs
    await radio11.check({ force: true });
    await expect(star11).toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);
    await expect(star12).not.toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);
    await expect(star13).not.toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);

    await radio12.check({ force: true });
    await expect(star11).toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);
    await expect(star12).toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);
    await expect(star13).not.toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);

    await radio13.check({ force: true });
    await expect(star11).toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);
    await expect(star12).toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);
    await expect(star13).toHaveClass(DEFAULT_ACTIVE_CLASS_REGEX);
  });
});
