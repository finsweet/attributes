import { type Entry, getObjectEntries, getObjectKeys, isKeyOf } from '@finsweet/attributes-utils';

import { Debug } from './components';
import {
  CONSENT_ALL,
  CONSENT_REQUIRED,
  type ConsentKey,
  type Consents,
  DEFAULT_COOKIE_MAX_AGE,
  type GlobalSettings,
  type IFrameData,
  type ModeKey,
  MODES,
  type ScriptData,
} from './utils';

/**
 * Stores all the consents, global settings and scripts.
 */
export default class Store {
  public readonly mode: ModeKey = 'opt-in'; // Cookie consent mode, opt-in by default
  public readonly cookieMaxAge: number = 120; // In days; Defaults to 120
  public readonly debugMode: boolean = true; // Cookie consent mode, opt-in by default
  public readonly endpoint?: string | null; // Endpoint where the consents will be POSTed
  public readonly componentsSource?: string | null; // Page where the components are located
  public readonly domain?: string | null; // The domain used to store the consent cookie
  public readonly resetix?: string | null; // resetix value that determines if restartWebflow(["ix2"]) should be called
  private confirmed = false; // True if the user actively confirmed his/her consent
  private consents: Consents = {} as Consents;
  private bannerText = 'empty';
  private scripts: ScriptData[] = [];
  private iFrames: IFrameData[] = [];

  constructor({ source, expires, debug, mode, endpoint, domain, resetix }: GlobalSettings) {
    if (!endpoint) {
      console.error('Oops! Finsweet consent element has no endpoint url.');
      return;
    }

    // Get the mode
    this.mode = isKeyOf(mode, MODES) ? mode : 'opt-in';

    switch (this.mode) {
      case 'informational':
      case 'opt-out':
        this.consents = { ...CONSENT_ALL };
        break;
      default:
        this.consents = { ...CONSENT_REQUIRED };
    }

    // Get the cookie max age
    this.cookieMaxAge = parseInt(expires || DEFAULT_COOKIE_MAX_AGE);

    // Get the debug mode
    this.debugMode = debug || false;
    if (this.debugMode) Debug.activate();

    // Get the endpoint
    this.endpoint = endpoint;

    // Get the components source
    this.componentsSource = source;

    // Get the cookies domain
    this.domain = domain;

    // Get the resetix value
    this.resetix = resetix;

    // Alert the setup
    Debug.alert(
      `The cookie banner is set to ${this.mode} mode with a consent expiry time of ${this.cookieMaxAge} days.${
        this.endpoint ? `The consents will be POSTed to ${this.endpoint}` : ''
      }`,
      'info'
    );
  }

  /**
   * @returns If the user has already allowed/denied the use of cookies
   */
  public userHasConfirmed = (): boolean => this.confirmed;

  /**
   * Stores a script in memory
   * @param consentKey
   * @param scriptData
   */
  public storeScript(scriptData: Omit<ScriptData, 'type'>): void {
    this.scripts.push({ ...scriptData, type: 'script' });
  }

  /**
   * Stores a script in memory
   * @param consentKey
   * @param iFrameData
   */
  public storeIFrame(iFrameData: Omit<IFrameData, 'type'>): void {
    this.iFrames.push({ ...iFrameData, type: 'iframe' });
  }

  /**
   * @returns The stored scripts and iFrames
   */
  public getStoredElements = (): (ScriptData | IFrameData)[] => [...this.scripts, ...this.iFrames];

  /**
   * @returns The stored elements that can be activated
   */
  public getActivableElements = (): (ScriptData | IFrameData)[] =>
    this.getStoredElements().filter(
      ({ active, categories }) => !active && categories.every((category) => this.consents[category])
    );

  /**
   * Stores new consents
   * @param newConsents
   * @returns True if any consent was updated
   */
  public storeConsents(newConsents: Partial<Consents>): ConsentKey[] {
    const updatedConsents: ConsentKey[] = [];

    // Build an array of the consents that were updated
    getObjectKeys(newConsents).forEach((consentKey) => {
      const newConsent = newConsents[consentKey];

      // Avoid storing undefined or not-updated consents
      if (newConsent === undefined || newConsent === this.consents[consentKey]) return;

      // Store the new consent
      this.consents[consentKey] = newConsent;
      updatedConsents.push(consentKey);
    });

    // Set the user state to confirmed
    this.confirmed = true;

    return updatedConsents;
  }

  /**
   * @returns All the consents
   */
  public getConsents = (): Consents => this.consents;

  /**
   * @returns All the consents as Object.entries()
   */
  public getConsentsEntries = (): Entry<Consents>[] => getObjectEntries(this.consents);

  /**
   * @returns A single consent value
   * @param consentKey
   */
  public getConsent = (consentKey: ConsentKey): boolean => this.consents[consentKey];

  /**
   * Store the banner text
   * @param banner
   */
  public storeBannerText(banner?: HTMLElement): void {
    if (banner && banner.textContent) this.bannerText = banner.textContent;
  }

  /**
   * @returns The banner text
   */
  public getBannerText = (): string | null | undefined => this.bannerText;
}
