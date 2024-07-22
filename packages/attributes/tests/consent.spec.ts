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

const reloadPage = async (page: Page) => {
  await page.reload();

  await waitAttributeLoaded(page, 'consent');
};

/**
 * We have a single test because the context needs to be preserved between tests.
 * And playwright applies Isolation {@link https://playwright.dev/docs/browser-contexts} by default.
 */
test('Attributes Consent', async ({ page, browserName }) => {
  const scriptElement = await page.$('script[fs-consent]');
  const scriptSrc = await scriptElement?.getAttribute('src');

  if (browserName === 'webkit' && !scriptSrc?.startsWith('https://')) {
    //TODO: needs to run on https, otherwise it fails with timeout, hence the https check
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

  // get duration from banner element banner fs-consent-duration attribute
  const animationDuration = await banner.getAttribute('fs-consent-duration');

  // compute the wait time for display animation to complete else default to 1.1 second.
  const computedAnimationWaitTime = ((Number(animationDuration) || 1) + 0.1) * 1000;

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

  await reloadPage(page);

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
    (analyticsEvent) => window?.dataLayer?.find(({ event }) => event === analyticsEvent),
    analyticsEvent
  );

  expect(analyticsActivatedEvent).toBeDefined();

  const checkAnalyticsConsentMode = () => {
    function isConsentArguments(item: Record<string, unknown>): boolean {
      const isArguments = Object.prototype.toString.call(item) === '[object Arguments]';
      const isConsent = item[0] === 'consent';
      return isArguments && isConsent;
    }

    let analytisGranted = false;

    const dataLayer = [...(window?.dataLayer || [])];

    // events are always fired with arr.push() so there can exist multiple that matches gtag('consent', 'update', {})
    // Reverse the array so that the latest events are at the beginning
    dataLayer.reverse();

    for (const event of dataLayer) {
      if (isConsentArguments(event)) {
        const consentEvent = event as unknown as {
          analytics_storage?: string;
        }[];

        const [, , mode] = Array.from(consentEvent);

        console.log('mode?.analytics_storage', mode?.analytics_storage);
        console.log('Array.from(consentEvent)', Array.from(consentEvent));

        analytisGranted = mode?.analytics_storage === 'granted';

        // Stop looping after finding the last "consent" argument
        break;
      }
    }

    return analytisGranted;
  };

  const analyticsConsentModGranted = await page.evaluate(checkAnalyticsConsentMode);

  expect(analyticsConsentModGranted).toBeTruthy();

  await reloadPage(page);

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

  await reloadPage(page);

  await page.waitForTimeout(computedAnimationWaitTime);

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
  await reloadPage(page);

  expect(await getCookie(page, '_ga')).toBeUndefined();
});
