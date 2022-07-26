import type { FacebookSocialShare, PinterestSocialShare, SocialShare, TwitterSocialShare } from './utils/types';

const FACEBOOK_URL = 'https://www.facebook.com/sharer/sharer.php';
const TWITTER_URL = 'https://twitter.com/intent/tweet/';
const PINTEREST_URL = 'https://www.pinterest.com/pin/create/button/';
const REDDIT_URL = 'https://www.reddit.com/submit';
const LINKEDIN_URL = 'https://www.linkedin.com//sharing/share-offsite';
const TELEGRAM_URL = 'https://t.me/share';

export function socialShareFactory(
  content: string,
  url: string,
  facebook: FacebookSocialShare | null,
  twitter: TwitterSocialShare | null,
  pinterest: PinterestSocialShare | null,
  reddit: SocialShare | null,
  telegram: SocialShare | null,
  linkedin: SocialShare | null
) {
  if (facebook) {
    createSocialShare(
      facebook.button,
      FACEBOOK_URL,
      { u: url, hashtag: facebook.hashtags, quote: content },
      facebook.width,
      facebook.height
    );
  }

  if (twitter) {
    createSocialShare(
      twitter.button,
      TWITTER_URL,
      {
        text: content,
        via: twitter.username,
        hashtags: twitter.hashtags,
        url,
      },
      twitter.width,
      twitter.height
    );
  }

  if (pinterest) {
    createSocialShare(
      pinterest.button,
      PINTEREST_URL,
      {
        url,
        media: pinterest.image,
        description: pinterest.description,
      },
      pinterest.width,
      pinterest.height
    );
  }

  if (reddit) {
    createSocialShare(
      reddit.button,
      REDDIT_URL,
      {
        url,
        title: content,
      },
      reddit.width,
      reddit.height
    );
  }

  if (telegram) {
    createSocialShare(
      telegram.button,
      TELEGRAM_URL,
      {
        text: content,
        url,
      },
      telegram.width,
      telegram.height
    );
  }

  if (linkedin) {
    createSocialShare(linkedin.button, LINKEDIN_URL, { url }, linkedin.width, linkedin.height);
  }
}

function createSocialShare(
  button: HTMLElement,
  urlSocialMedia: string,
  params: { [key: string]: string | null },
  width: number,
  height: number
): void {
  button.addEventListener('click', function () {
    const shareUrl = new URL(urlSocialMedia);
    const shareParams = Object.entries(params);

    for (const [key, value] of shareParams) {
      if (value) shareUrl.searchParams.append(key, value);
    }

    const left = window.innerWidth / 2 - width / 2 + window.screenX;
    const top = window.innerHeight / 2 - height / 2 + window.screenY;
    const popParams = `scrollbars=no, width=${width}, height=${height}, top=${top}, left=${left}`;
    const newWindow = window.open(shareUrl, '', popParams);

    if (newWindow) {
      newWindow.focus();
    }
  });
}
