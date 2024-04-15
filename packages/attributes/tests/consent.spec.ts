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

test.setTimeout(120 * 1000);

test.beforeEach(async ({ page }) => {
  await page.goto('https://attributes-consent-sandbox-v2.webflow.io/');
});

/**
 * We have a single test because the context needs to be preserved between tests.
 * And playwright applies Isolation {@link https://playwright.dev/docs/browser-contexts} by default.
 */
test('Finsweet Cookie Consent', async ({ page }) => {
  /**
   * Reloads the page and waits for the fs-cc-ready event.
   * @param page
   * @param reload - Whether to reload the page or not.
   */
  const reloadPage = async (reload = true) => {
    if (reload) await page.reload();

    await waitAttributeLoaded(page, 'consent');
    await page.waitForTimeout(1000);
  };

  await reloadPage(false);

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

  // get duration from banner element banner fs-consent-duration attribute
  const animationDuration = await banner.getAttribute('fs-consent-duration');

  // compute the wait time for display animation
  const computedAnimationWaitTime = (Number(animationDuration) || 1000) + 1;

  await page.waitForTimeout(computedAnimationWaitTime);

  // Banner should display, Manager and Preferences should be hidden.
  await expect(banner).toBeVisible();
  await expect(manager).not.toBeVisible();
  await expect(preferences).not.toBeVisible();

  // Clicking the close button closes the Banner, but on page refresh the Banner displays again.
  await page.waitForTimeout(computedAnimationWaitTime);

  await bannerClose.dispatchEvent('click');

  await page.waitForTimeout(computedAnimationWaitTime);

  await expect(banner).not.toBeVisible();
  await expect(manager).toBeVisible();
  await expect(preferences).not.toBeVisible();

  await reloadPage();

  await expect(banner).toBeVisible();
  await expect(manager).not.toBeVisible();
  await expect(preferences).not.toBeVisible();

  // Clicking the Preferences button closes the Banner and opens the Preferences.
  await page.waitForTimeout(computedAnimationWaitTime);

  await preferencesOpen.dispatchEvent('click');

  await page.waitForTimeout(computedAnimationWaitTime);

  await expect(banner).not.toBeVisible();
  await expect(preferences).toBeVisible();

  // Selecting the analytics checkbox doesn't fire any scripts, closes the Preferences, opens the Manager, displays the Manager and pushes the 'analytics-activated' event to the dataLayer.
  await page.waitForTimeout(computedAnimationWaitTime);

  // set analyticsCheckbox to checked
  await analyticsCheckbox.dispatchEvent('click');

  await page.waitForTimeout(computedAnimationWaitTime);

  // submit form
  await preferencesForm.dispatchEvent('submit');

  await page.waitForTimeout(computedAnimationWaitTime);

  await expect(manager).toBeVisible();
  await expect(preferences).not.toBeVisible();

  expect(await getCookie(page, '_ga')).toBeUndefined();
  expect(await getCookie(page, COOKIE_KEYS.main)).toBeDefined();

  const analyticsActivatedEvent = await page.evaluate(
    (analyticsEvent) =>
      window.dataLayer?.find((data) => typeof data === 'object' && 'event' in data && data.event === analyticsEvent),
    analyticsEvent
  );

  expect(analyticsActivatedEvent).toBeDefined();

  // After page refresh, the Banner is not displayed, but the Manager is.
  await reloadPage();

  await expect(banner).not.toBeVisible();
  await expect(manager).toBeVisible();

  // Clicking the Manager closes it and opens the Preferences.
  await page.waitForTimeout(computedAnimationWaitTime);

  const preferencesOpenTwo = page.locator(BUTTONS.openPreferences).first();
  await preferencesOpenTwo.dispatchEvent('click');

  await page.waitForTimeout(computedAnimationWaitTime);

  await expect(manager).not.toBeVisible();
  await expect(preferences).toBeVisible();

  // The Analytics checkbox in the Preferences preserves the checked state.
  await expect(analyticsCheckbox).toBeChecked();

  // Clicking "Allow All" selects all the consent checkboxes, closes the Preferences and fires the GA script.
  await page.waitForTimeout(computedAnimationWaitTime);

  await preferencesAllowAll.dispatchEvent('click');

  await page.waitForTimeout(computedAnimationWaitTime);

  // preference to be closed
  await expect(preferences).not.toBeVisible();

  // open preferences again
  await preferencesOpen.dispatchEvent('click');

  await page.waitForTimeout(computedAnimationWaitTime);

  // preferences to be open
  await expect(preferences).toBeVisible();

  await expect(marketingCheckbox).toBeChecked();
  await expect(personalizationCheckbox).toBeChecked();
  await expect(analyticsCheckbox).toBeChecked();

  await reloadPage();

  await page.waitForTimeout(computedAnimationWaitTime);

  const checkAnalyticsConsentMode = () => {
    const dataLayer = [...(window?.dataLayer || [])];

    const consentObjects = dataLayer?.filter(
      (data) =>
        typeof data === 'object' && 'callee' in data && typeof data[2] === 'object' && 'analytics_storage' in data[2]
    ) as IArguments[];

    // there can exist multiple that matches gtag('consent', 'update', {...consentModes})
    // we want the latest from datalayer.push event
    const consentModeEvent = consentObjects[consentObjects.length - 1];

    return consentModeEvent?.[2].analytics_storage === 'granted';
  };

  const analyticsConsentModGranted = await page.evaluate(checkAnalyticsConsentMode);

  expect(analyticsConsentModGranted).toBeTruthy();

  // After page refresh, the GA script fires automatically.
  expect(await getCookie(page, '_ga')).toBeDefined();

  // Opening the Preferences and clicking Reject All sets the fs-consent-updated cookie
  await preferencesOpen.dispatchEvent('click');

  await page.waitForTimeout(computedAnimationWaitTime);

  await expect(banner).not.toBeVisible();
  await expect(preferences).toBeVisible();

  await preferencesDeny.dispatchEvent('click');

  await page.waitForTimeout(computedAnimationWaitTime);

  await expect(marketingCheckbox).not.toBeChecked();
  await expect(personalizationCheckbox).not.toBeChecked();
  await expect(analyticsCheckbox).not.toBeChecked();

  await page.waitForTimeout(computedAnimationWaitTime);

  expect(await getCookie(page, COOKIE_KEYS.consentsUpdated)).toBeDefined();

  // After page refresh, the GA cookie is no longer present.
  await reloadPage();

  expect(await getCookie(page, '_ga')).toBeUndefined();
});
