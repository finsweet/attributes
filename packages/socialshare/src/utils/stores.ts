import type { SocialShareStore, SocialShareTypes } from './types';

export const stores: Record<SocialShareTypes, SocialShareStore> = {
  facebook: new Map(),
  twitter: new Map(),
  pinterest: new Map(),
  telegram: new Map(),
  linkedin: new Map(),
  reddit: new Map(),
};
