import type { SocialShareStore, SocialShareTypes } from './types';

export const stores: Record<SocialShareTypes, SocialShareStore> = {
  facebook: new Map(),
  x: new Map(),
  pinterest: new Map(),
  telegram: new Map(),
  linkedin: new Map(),
  reddit: new Map(),
};
