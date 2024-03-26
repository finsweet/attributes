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

// Global
declare global {
  interface Window {
    doNotTrack: string | null;
    dataLayer?: { event: string }[];
  }
}
