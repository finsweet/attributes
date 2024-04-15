import type FsCookieConsent from '../FsCookieConsent';
import { ACTIONS, CONSENTS, MODES, OPTIONAL_CONSENTS } from '.';

// Consents
export type ConsentKey = (typeof CONSENTS)[number];
export type Consents = Record<ConsentKey, boolean>;
export type OptionalConsentKey = (typeof OPTIONAL_CONSENTS)[number];
export type OptionalConsents = Record<OptionalConsentKey, boolean>;

// Modes
export type ModeKey = (typeof MODES)[number];

// Actions
export type Action = (typeof ACTIONS)[keyof typeof ACTIONS];

// Cookie
export interface ConsentsCookie {
  id?: string;
  consents?: Partial<Consents>;
}

// Scripts
export interface ScriptData {
  type: 'script';
  categories: ConsentKey[];
  element: HTMLScriptElement;
  active: boolean;
}

export interface IFrameData {
  type: 'iframe';
  categories: ConsentKey[];
  element: HTMLIFrameElement;
  src: string;
  active: boolean;
  placeholder?: HTMLElement;
}

// GTM
export type ConsentMode = {
  [key in
    | 'ad_storage'
    | 'ad_user_data'
    | 'ad_personalization'
    | 'analytics_storage'
    | 'functionality_storage'
    | 'personalization_storage'
    | 'security_storage']?: 'granted' | 'denied';
};

// JavaScript API
export type FsCookieConsentCallback = (instance: FsCookieConsent) => void;

// Global
declare global {
  interface Window {
    doNotTrack: string | null;
    FsCC: FsCookieConsent;
    dataLayer: Array<{ event: string } | IArguments>;
  }
}
