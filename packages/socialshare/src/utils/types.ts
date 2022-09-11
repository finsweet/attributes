import type { SOCIAL_SHARE_PLATFORMS } from './constants';

export type SocialShareTypes = keyof typeof SOCIAL_SHARE_PLATFORMS;

export interface SocialShare {
  width: number;
  height: number;
  type: SocialShareTypes;
  content: string | null;
  url: string | null;
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

export type SocialShareStoreData = Pick<SocialShare, 'height' | 'width' | 'type'> & {
  shareUrl: URL;
};

export type SocialShareStore = Map<HTMLElement, SocialShareStoreData>;
