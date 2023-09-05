import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('http://dev-attributes-copypaste.webflow.io');
  // Wait for attribute to load
  await waitAttributeLoaded(page, 'copypaste');
});

test.describe('copypaste', () => {
  test('Element is copied and pasted correctly', async ({ page }) => {
    // Get all instances of the attribute
    const instances = await page.$$('[fs-copypaste-instance]');

    // Loop through each instance and check if all elements with attribute [fs-copypaste-element="copy"] are only present inside a [fs-copypaste-element="paste"] element
    for (const instance of instances) {
      // Find all elements with the attribute fs-copypaste-element=copy
      const copyElements = await instance.$$('[fs-copypaste-element=copy]');

      // Find the element with the attribute fs-copypaste-element=paste
      const pasteElement = await instance.$('[fs-copypaste-element=paste]');

      const copyElementsCount = copyElements.length;
      const copiedElementsCount = (await pasteElement?.$$('[fs-copypaste-element=copy]'))?.length ?? 0;
      // Assert that all copy elements are also present inside the paste element
      expect(copyElementsCount).toEqual(copiedElementsCount * 2);
    }
  });
});

test('Element is cut and pasted correctly', async ({ page }) => {
  const instances = await page.$$('[fs-copypaste-instance]');

  for (const instance of instances) {
    // Find all elements with the attribute fs-copypaste-element=copy
    const cutElements = await instance.$$('[fs-copypaste-element=cut]');

    // Find the element with the attribute fs-copypaste-element=paste
    const pasteElement = await instance.$('[fs-copypaste-element=paste]');

    // Assert that all cut elements are only present inside the paste element
    const cutElementsCount = cutElements.length;
    const movedElementsCount = (await pasteElement?.$$('[fs-copypaste-element=cut]'))?.length ?? 0;
    expect(cutElementsCount).toEqual(movedElementsCount);
  }
});

test('Webflow interactions (IX) is reset after copy-paste', async ({ page }) => {
  const instances = await page.$$('[fs-copypaste-instance]');

  // console.log('instances', instances);

  for (const instance of instances) {
    // Find the element with the attribute fs-copypaste-element=paste
    const pasteElement = await instance.$('[fs-copypaste-element=paste]');

    const sliders = (await pasteElement?.$$('.w-slider')) ?? [];
    for (const slider of sliders) {
      const slides = await slider.$$('.w-slide');
      const slide0 = slides[0];
      // Get all elements in slider with role = button and name next slide
      const nextSlideButton = await slider.$('[role=button][aria-label="next slide"]');

      // Assert that the first slide is visible and becomes hidden after clicking the next slide button
      expect(await slide0.getAttribute('aria-hidden')).toBeFalsy();
      await nextSlideButton?.click();
      expect(await slide0.getAttribute('aria-hidden')).toBeTruthy();
    }
  }
});
