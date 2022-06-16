import { Debug } from '@finsweet/ts-utils';

import { ATTRIBUTE } from './constants';
import type { VideoStore } from './types';

/**
 * Inits the attribute.
 */
export const init = (): void => {
  const videos = document.querySelectorAll('video');

  if (!videos.length) {
    Debug.alert('No videos were found in this page.', 'info');
    return;
  }

  const videoStore: VideoStore = new Map();

  const observer = new IntersectionObserver((entries) => {
    for (const { target, isIntersecting } of entries) {
      if (!(target instanceof HTMLVideoElement)) continue;

      if (isIntersecting) target.play();
      else target.pause();

      videoStore.set(target, isIntersecting);
    }
  }, {});

  document.addEventListener('visibilitychange', () => {
    for (const [video, playState] of videoStore) {
      if (document.hidden || !playState) video.pause();
      else video.play();
    }
  });

  for (const video of videos) {
    video.autoplay = false;
    videoStore.set(video, null);
    observer.observe(video);
  }

  window.fsAttributes[ATTRIBUTE].resolve?.(videoStore);
};
