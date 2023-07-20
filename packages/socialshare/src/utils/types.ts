import type { SOCIAL_SHARE_PLATFORMS } from './constants';

export type SocialShareTypes = keyof typeof SOCIAL_SHARE_PLATFORMS;

export type GenericSocialShareFields = {
  width: number;
  height: number;
  content: string | null;
  url: string | null;
};

export type GenericSocialShare = GenericSocialShareFields & {
  type: 'linkedin' | 'reddit' | 'telegram';
  shareUrl: URL;
};

export type FacebookSocialShare = GenericSocialShareFields & {
  type: 'facebook';
  hashtags: string | null;
  shareUrl: URL;
};

export type TwitterSocialShare = GenericSocialShareFields & {
  type: 'twitter';
  hashtags: string | null;
  username: string | null;
  shareUrl: URL;
};

export type PinterestSocialShare = GenericSocialShareFields & {
  type: 'pinterest';
  image: string | null;
  description: string | null;
  shareUrl: URL;
};

export type CopySocialShare = {
  type: 'copy';
  shareUrl: URL;
};

export type SocialShare =
  | GenericSocialShare
  | FacebookSocialShare
  | TwitterSocialShare
  | PinterestSocialShare
  | CopySocialShare;

export type SocialShareStores = {
  facebook: Map<HTMLElement, FacebookSocialShare>;
  twitter: Map<HTMLElement, TwitterSocialShare>;
  pinterest: Map<HTMLElement, PinterestSocialShare>;
  telegram: Map<HTMLElement, GenericSocialShare>;
  linkedin: Map<HTMLElement, GenericSocialShare>;
  reddit: Map<HTMLElement, GenericSocialShare>;
  copy: Map<HTMLElement, CopySocialShare>;
};
