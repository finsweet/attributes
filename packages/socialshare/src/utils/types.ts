import type { ATTRIBUTES } from './constants';

export type SocialShareTypes = keyof typeof ATTRIBUTES['element']['values'];

export interface SocialShare {
  button: HTMLElement;
  width: number;
  height: number;
  type: SocialShareTypes;
}

export interface FacebookSocialShare extends SocialShare {
  hashtags: string | null;
  type: 'facebook';
}

export interface TwitterSocialShare extends SocialShare {
  hashtags: string | null;
  username: string | null;
  type: 'twitter';
}

export interface PinterestSocialShare extends SocialShare {
  image: string | null;
  description: string | null;
  type: 'pinterest';
}
