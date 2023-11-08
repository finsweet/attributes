import { type Entry, getObjectEntries, getObjectKeys, isKeyOf } from '@finsweet/attributes-utils';

import { activateDebug, alert } from './components';
import {
  CONSENT_ALL,
  CONSENT_REQUIRED,
  type ConsentKey,
  type Consents,
  DEFAULT_COOKIE_MAX_AGE,
  type GlobalSettings,
  type IFrameData,
  MODES,
  type ScriptData,
} from './utils';

let modeSetting;
let consents: Consents = {} as Consents;
let endpointSetting;
let domainSetting;
let resetixSetting: string;
let componentsSource;
const scripts: ScriptData[] = [];
const iFrames: IFrameData[] = [];
let bannerText = '';
let confirmed = false;

/**
 * Stores all the consents, global settings and scripts.
 */
export const useStore = ({ source, expires, debug, mode, endpoint, domain, resetix }: GlobalSettings) => {
  if (!endpoint) {
    console.error('Oops! Finsweet consent element has no endpoint url.');
    return;
  }

  // Get the mode
  modeSetting = isKeyOf(mode, MODES) ? mode : 'opt-in';

  switch (modeSetting) {
    case 'informational':
    case 'opt-out':
      consents = { ...CONSENT_ALL };
      break;
    default:
      consents = { ...CONSENT_REQUIRED };
  }

  // Get the cookie max age
  const cookieMaxAge = parseInt(expires || DEFAULT_COOKIE_MAX_AGE);

  // Get the debug mode
  const debugMode = debug || false;
  if (debugMode) activateDebug();

  // Get the endpoint
  endpointSetting = endpoint;

  // Get the components source
  componentsSource = source;

  // Get the domain
  domainSetting = domain;

  // Get the resetix
  resetixSetting = resetix || '';

  // Alert the setup
  alert(
    `The cookie banner is set to ${modeSetting} mode with a consent expiry time of ${cookieMaxAge} days.${
      endpointSetting ? `The consents will be POSTed to ${endpointSetting}` : ''
    }`,
    'info'
  );

  /**
   * @returns If the user has already allowed/denied the use of cookies
   */
  const userHasConfirmed = (): boolean => confirmed;

  /**
   * Stores a script in memory
   * @param consentKey
   * @param scriptData
   */
  const storeScript = (scriptData: Omit<ScriptData, 'type'>): void => {
    scripts.push({ ...scriptData, type: 'script' });
  };

  /**
   * Stores a script in memory
   * @param consentKey
   * @param iFrameData
   */
  const storeIFrame = (iFrameData: Omit<IFrameData, 'type'>): void => {
    iFrames.push({ ...iFrameData, type: 'iframe' });
  };

  /**
   * @returns The stored scripts and iFrames
   */
  const getStoredElements = (): (ScriptData | IFrameData)[] => [...scripts, ...iFrames];

  /**
   * @returns The stored elements that can be activated
   */
  const getActivableElements = (): (ScriptData | IFrameData)[] => {
    const stored = getStoredElements();

    return stored.filter(({ active, categories }) => !active && categories.every((category) => consents[category]));
  };

  /**
   * Stores new consents
   * @param newConsents
   * @returns True if any consent was updated
   */
  const storeConsents = (newConsents: Partial<Consents>): ConsentKey[] => {
    const updatedConsents: ConsentKey[] = [];

    // Build an array of the consents that were updated
    getObjectKeys(newConsents).forEach((consentKey) => {
      const newConsent = newConsents[consentKey];

      // Avoid storing undefined or not-updated consents
      if (newConsent === undefined || newConsent === consents[consentKey]) return;

      // Store the new consent
      consents[consentKey] = newConsent;
      updatedConsents.push(consentKey);
    });

    // Set the user state to confirmed
    confirmed = true;

    return updatedConsents;
  };

  /**
   * @returns All the consents
   */
  const getConsents = (): Consents => consents;

  /**
   * @returns All the consents as Object.entries()
   */
  const getConsentsEntries = (): Entry<Consents>[] => getObjectEntries(consents);

  /**
   * @returns A single consent value
   * @param consentKey
   */
  const getConsent = (consentKey: ConsentKey): boolean => consents[consentKey];

  /**
   * Store the banner text
   * @param banner
   */
  const storeBannerText = (banner?: HTMLElement): string => {
    if (banner && banner.textContent) bannerText = banner.textContent;
    return bannerText;
  };

  /**
   * @returns The banner text
   */
  const getBannerText = (): string | null | undefined => bannerText;

  return {
    bannerText,
    componentsSource,
    confirmed,
    consents,
    cookieMaxAge,
    debugMode,
    domain,
    endpoint,
    getActivableElements,
    getBannerText,
    getConsent,
    getConsents,
    getConsentsEntries,
    getStoredElements,
    iFrames,
    mode,
    resetix,
    scripts,
    storeBannerText,
    storeConsents,
    storeScript,
    storeIFrame,
    userHasConfirmed,
  };
};
