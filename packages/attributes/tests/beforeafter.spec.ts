import { test } from '@playwright/test';
import { expect } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

const ELEMENT_KEY = 'beforeafter';

function getElementSelector(name: string) {
  return `[fs-${ELEMENT_KEY}-element="${name}"]`;
}

test.beforeEach(async ({ page }) => {
  await page.goto('https://dev-attributes-beforeafter.webflow.io/');
});

test.describe('beforeafter', () => {
  test('Div responds to mouse drag action', async ({ page }) => {
    await waitAttributeLoaded(page, ELEMENT_KEY);

    const element = page.locator(getElementSelector('wrapper'));
    await element.first().innerHTML(); // flakiness fix
    const slider = element.first();

    const handle = element.locator(getElementSelector('handle')).first();

    const initialHandlePosition = await handle.boundingBox();

    //start
    await slider.scrollIntoViewIfNeeded();
    const boundingBox = await slider.boundingBox();

    // move mouse to starting position
    const startPosition = { x: boundingBox!.x + boundingBox!.width / 2, y: boundingBox!.y + boundingBox!.height / 2 };
    await page.mouse.move(startPosition.x, startPosition.y);

    // press mouse button
    await page.mouse.down();

    // move mouse to end position
    const endPosition = { x: startPosition.x + 200, y: startPosition.y };
    await page.mouse.move(endPosition.x, endPosition.y, { steps: 100 });
    await page.mouse.up();
    //end

    const currentHandlePosition = await handle.boundingBox();

    // Check that the handle is now 200px from the left
    expect(currentHandlePosition?.x).toEqual(initialHandlePosition!.x + 200);
  });

  test('Div responds to mouse hover action', async ({ page }) => {
    await waitAttributeLoaded(page, ELEMENT_KEY);

    const element = page.locator(getElementSelector('wrapper'));
    await element.first().innerHTML(); // flakiness fix
    const slider = element.nth(1);

    const handle = element.locator(getElementSelector('handle')).nth(1);

    const initialHandlePosition = await handle.boundingBox();

    //start
    await slider.scrollIntoViewIfNeeded();
    const boundingBox = await slider.boundingBox();

    // move mouse to starting position
    const startPosition = { x: boundingBox!.x + boundingBox!.width / 2, y: boundingBox!.y + boundingBox!.height / 2 };
    await page.mouse.move(startPosition.x, startPosition.y);

    // move mouse to end position
    const endPosition = { x: startPosition.x + 200, y: startPosition.y };
    await page.mouse.move(endPosition.x, endPosition.y, { steps: 100 });
    //end

    const currentHandlePosition = await handle.boundingBox();

    // Check that the handle is now 200px from the left
    expect(currentHandlePosition?.x).toEqual(initialHandlePosition!.x + 200);
  });

  test('Images responds to mouse drag action', async ({ page }) => {
    await waitAttributeLoaded(page, ELEMENT_KEY);

    const element = page.locator(getElementSelector('wrapper'));
    await element.first().innerHTML(); // flakiness fix
    const slider = element.nth(2);

    const handle = element.locator(getElementSelector('handle')).nth(2);

    const initialHandlePosition = await handle.boundingBox();

    //start
    await slider.scrollIntoViewIfNeeded();
    const boundingBox = await slider.boundingBox();

    // move mouse to starting position
    const startPosition = { x: boundingBox!.x + boundingBox!.width / 2, y: boundingBox!.y + boundingBox!.height / 2 };
    await page.mouse.move(startPosition.x, startPosition.y);

    // press mouse button
    await page.mouse.down();

    // move mouse to end position
    const endPosition = { x: startPosition.x + 200, y: startPosition.y };
    await page.mouse.move(endPosition.x, endPosition.y, { steps: 100 });
    await page.mouse.up();
    //end

    const currentHandlePosition = await handle.boundingBox();

    // Check that the handle is now 200px from the left
    expect(currentHandlePosition?.x).toEqual(initialHandlePosition!.x + 200);
  });

  test('Text responds to mouse hover action', async ({ page }) => {
    await waitAttributeLoaded(page, ELEMENT_KEY);

    const element = page.locator(getElementSelector('wrapper'));
    await element.first().innerHTML(); // flakiness fix
    const slider = element.last();

    const handle = element.locator(getElementSelector('handle')).last();

    const initialHandlePosition = await handle.boundingBox();

    //start
    await slider.scrollIntoViewIfNeeded();
    const boundingBox = await slider.boundingBox();

    expect(boundingBox).not.toBeNull();

    // move mouse to starting position
    const startPosition = { x: boundingBox!.x + boundingBox!.width / 2, y: boundingBox!.y + boundingBox!.height / 2 };
    await page.mouse.move(startPosition.x, startPosition.y);

    // move mouse to end position
    const endPosition = { x: startPosition.x + 200, y: startPosition.y };
    await page.mouse.move(endPosition.x, endPosition.y, { steps: 100 });
    //end

    const currentHandlePosition = await handle.boundingBox();

    // Check that the handle is now 200px from the left
    expect(currentHandlePosition?.x).toEqual(initialHandlePosition!.x + 200);
  });
});
