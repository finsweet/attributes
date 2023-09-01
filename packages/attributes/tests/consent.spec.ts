import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

import { waitAttributeLoaded } from './utils';

export const MAIN_KEY = 'fs-consent';
export const ELEMENT = `${MAIN_KEY}-element`;

const ACTIONS = {
  allow: 'allow',
  deny: 'deny',
  submit: 'submit',
} as const;

export const COMPONENTS = {
  banner: `[${ELEMENT}="banner"]`,
  preferences: `[${ELEMENT}="preferences"]`,
  manager: `[${ELEMENT}="fixed-preferences"]`,
} as const;

export const BUTTONS = {
  allow: `[${ELEMENT}="${ACTIONS.allow}"]`,
  deny: `[${ELEMENT}="${ACTIONS.deny}"]`,
  submit: `[${ELEMENT}="${ACTIONS.submit}"]`,
  openPreferences: `[${ELEMENT}="open-preferences"]`,
  close: `[${ELEMENT}="close"]`,
} as const;

export const COOKIE_KEYS = {
  main: MAIN_KEY,
  consentsUpdated: `${MAIN_KEY}-updated`,
};

export const DYNAMIC_KEYS = {
  checkbox: (key: string): string => `[${ELEMENT}="checkbox-${key}"]`,
  gtmEvent: (key: string): string => `${key}-activated`,
};

/**
 * Gets a cookie from the page.
 * @param page
 * @param cookieName
 */
const getCookie = async (page: Page, cookieName: string) => {
  if (page.isClosed()) {
    return undefined;
  }

  const cookies = await page?.context()?.cookies();

  const cookie = cookies?.find(({ name }) => name === cookieName);
  return cookie;
};

test.beforeEach(async ({ page }) => {
  await page.goto('https://attributes-consent-sandbox-v2.webflow.io/');
});

const reloadPage = async (page: Page) => {
  await page?.reload();

  await waitAttributeLoaded(page, 'consent');
};

/**
 * We have a single test because the context needs to be preserved between tests.
 * And playwright applies Isolation {@link https://playwright.dev/docs/browser-contexts} by default.
 */
test('Attributes Consent', async ({ page, browserName }) => {
  // TODO: skipping webkit tests, for some reason there is a timeout error
  if (browserName === 'webkit') {
    return;
  }

  await waitAttributeLoaded(page, 'consent');

  const banner = page.locator(COMPONENTS.banner);
  const bannerClose = banner.locator(BUTTONS.close);

  const manager = page.locator(COMPONENTS.manager);

  const preferences = page.locator(COMPONENTS.preferences);
  const preferencesOpen = page.locator(BUTTONS.openPreferences).first();
  const preferencesAllowAll = preferences.locator(BUTTONS.allow);
  const preferencesDeny = preferences.locator(BUTTONS.deny);

  // form
  const preferencesForm = preferences.locator('[fs-consent-element="form"]');

  const marketingCheckbox = preferences.locator(DYNAMIC_KEYS.checkbox('marketing'));
  const personalizationCheckbox = preferences.locator(DYNAMIC_KEYS.checkbox('personalization'));
  const analyticsCheckbox = preferences.locator(DYNAMIC_KEYS.checkbox('analytics'));

  const analyticsEvent = DYNAMIC_KEYS.gtmEvent('analytics');

  await page.waitForTimeout(1000);

  // Banner should display, Manager and Preferences should be hidden.
  await expect(banner).toBeVisible();
  await expect(manager).not.toBeVisible();
  await expect(preferences).not.toBeVisible();

  // Clicking the close button closes the Banner, but on page refresh the Banner displays again.
  await page.waitForTimeout(250);

  await bannerClose.dispatchEvent('click');

  await page.waitForTimeout(250);

  await expect(banner).not.toBeVisible();
  await expect(manager).toBeVisible();
  await expect(preferences).not.toBeVisible();

  await reloadPage(page);

  await expect(banner).toBeVisible();
  await expect(manager).not.toBeVisible();
  await expect(preferences).not.toBeVisible();

  // Clicking the Preferences button closes the Banner and opens the Preferences.
  await page.waitForTimeout(250);

  await preferencesOpen.dispatchEvent('click');

  await page.waitForTimeout(250);

  await expect(banner).not.toBeVisible();
  await expect(preferences).toBeVisible();

  // Selecting the analytics checkbox doesn't fire any scripts, closes the Preferences, opens the Manager, displays the Manager and pushes the 'analytics-activated' event to the dataLayer.
  await page.waitForTimeout(250);

  // set analyticsCheckbox to checked
  await analyticsCheckbox.dispatchEvent('click');

  await page.waitForTimeout(250);

  // submit form
  await preferencesForm.dispatchEvent('submit');

  await page.waitForTimeout(250);

  await expect(manager).toBeVisible();
  await expect(preferences).not.toBeVisible();

  expect(await getCookie(page, '_ga')).toBeUndefined();
  expect(await getCookie(page, COOKIE_KEYS.main)).toBeDefined();

  const analyticsActivatedEvent = await page.evaluate(
    (analyticsEvent) => window?.dataLayer?.find(({ event }) => event === analyticsEvent),
    analyticsEvent
  );

  expect(analyticsActivatedEvent).toBeDefined();

  await reloadPage(page);

  await expect(banner).not.toBeVisible();
  await expect(manager).toBeVisible();

  // Clicking the Manager closes it and opens the Preferences.
  await page.waitForTimeout(250);

  const preferencesOpenTwo = page.locator(BUTTONS.openPreferences).first();
  await preferencesOpenTwo.dispatchEvent('click');

  await page.waitForTimeout(250);

  await expect(manager).not.toBeVisible();
  await expect(preferences).toBeVisible();

  // The Analytics checkbox in the Preferences preserves the checked state.
  await expect(analyticsCheckbox).toBeChecked();

  // Clicking "Allow All" selects all the consent checkboxes, closes the Preferences and fires the GA script.
  await page.waitForTimeout(250);

  await preferencesAllowAll.dispatchEvent('click');

  await page.waitForTimeout(2000);

  await expect(marketingCheckbox).toBeChecked();
  await expect(personalizationCheckbox).toBeChecked();
  await expect(analyticsCheckbox).toBeChecked();

  expect(await getCookie(page, '_ga')).toBeDefined();

  await reloadPage(page);

  await page.waitForTimeout(250);

  expect(await getCookie(page, '_ga')).toBeDefined();

  // Opening the Preferences and clicking Reject All sets the fs-consent-updated cookie
  await page.waitForTimeout(250);

  await preferencesOpen.dispatchEvent('click');

  await page.waitForTimeout(250);

  await expect(banner).not.toBeVisible();
  await expect(preferences).toBeVisible();

  await preferencesDeny.dispatchEvent('click');

  await page.waitForTimeout(1000);

  await expect(marketingCheckbox).not.toBeChecked();
  await expect(personalizationCheckbox).not.toBeChecked();
  await expect(analyticsCheckbox).not.toBeChecked();

  await page.waitForTimeout(1000);

  expect(await getCookie(page, COOKIE_KEYS.consentsUpdated)).toBeDefined();

  // After page refresh, the GA cookie is no longer present.
  await reloadPage(page);

  expect(await getCookie(page, '_ga')).toBeUndefined();
});
