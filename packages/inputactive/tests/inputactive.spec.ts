import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://fs-attributes.webflow.io/inputactive');
});

test.describe('inputactive', () => {
  test('Adds CSS classes correctly', async ({ page }) => {
    const checkbox1 = page.getByTestId('checkbox-1-1');
    const checkbox2 = page.getByTestId('checkbox-2-1');
    const checkbox31 = page.getByTestId('checkbox-3-1');
    const checkbox32 = page.getByTestId('checkbox-3-2');
    const radio11 = page.getByTestId('radio-1-1');
    const radio12 = page.getByTestId('radio-1-2');
    const radio21 = page.getByTestId('radio-2-1');
    const radio22 = page.getByTestId('radio-2-2');
    const radio31 = page.getByTestId('radio-3-1');
    const radio32 = page.getByTestId('radio-3-2');
    const radio33 = page.getByTestId('radio-3-3');

    // Checkboxes (default)
    await expect(checkbox1).not.toHaveClass(/is-active-inputactive/);
    await checkbox1.click();
    await expect(checkbox1).toHaveClass(/is-active-inputactive/);

    await page.waitForTimeout(10000);

    // Checkboxes (inherit)
    await checkbox2.click();
    await expect(checkbox2).toHaveClass(/is-cool/);

    await checkbox31.click();
    await expect(checkbox31).toHaveClass(/is-cool/);

    // Checkboxes (individual)
    await checkbox32.click();
    await expect(checkbox32).toHaveClass(/is-cooler/);

    // Radios (default)
    await expect(radio11).not.toHaveClass(/is-active-inputactive/);
    await radio11.click();
    await expect(radio11).toHaveClass(/is-active-inputactive/);

    await radio12.click();
    await expect(radio11).not.toHaveClass(/is-active-inputactive/);
    await expect(radio12).toHaveClass(/is-active-inputactive/);

    // Radios (inherit)
    await expect(radio21).not.toHaveClass(/is-cool/);
    await radio21.click();
    await expect(radio21).toHaveClass(/is-cool/);

    await radio22.click();
    await expect(radio21).not.toHaveClass(/is-cool/);
    await expect(radio22).toHaveClass(/is-cool/);

    // Radios (individual)
    await radio31.click();
    await expect(radio31).toHaveClass(/is-cool/);
    await expect(radio32).not.toHaveClass(/is-cooler/);
    await expect(radio33).not.toHaveClass(/is-the-coolest/);

    await radio32.click();
    await expect(radio31).not.toHaveClass(/is-cool/);
    await expect(radio32).toHaveClass(/is-cooler/);
    await expect(radio33).not.toHaveClass(/is-the-coolest/);

    await radio33.click();
    await expect(radio31).not.toHaveClass(/is-cool/);
    await expect(radio32).not.toHaveClass(/is-cooler/);
    await expect(radio33).toHaveClass(/is-the-coolest/);
  });
});
