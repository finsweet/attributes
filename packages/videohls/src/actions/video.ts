import Hls from 'hls.js';
import { hlsInstancesStore } from 'src/utils/stores';

import { getAttribute } from '../utils/constants';

/**
 * Inits hls.js on a video that supports it.
 * @param video
 *
 * @returns The HLS instance.
 */
export const initVideoHLS = (video: HTMLVideoElement) => {
  if (hlsInstancesStore.get(video)) return;
  if (video.canPlayType('application/vnd.apple.mpegurl') || !Hls.isSupported()) return;

  const hlsManifestURL = getHLSManifestURL(video);
  if (!hlsManifestURL) return;

  const hlsInstance = new Hls();

  hlsInstance.loadSource(hlsManifestURL);
  hlsInstance.attachMedia(video);

  hlsInstancesStore.set(video, hlsInstance);

  return hlsInstance;
};

const HLS_FILE_EXTENSION_REGEX = /.*\.m3u8$/;

/**
 * @returns A URL of a `.m3u8` source file from a video, if existing.
 * @param video
 */
const getHLSManifestURL = (video: HTMLVideoElement): string | undefined => {
  let hlsManifestURL: string | null | undefined = getAttribute(video, 'manifest');
  if (hlsManifestURL) return hlsManifestURL;

  const sources = video.querySelectorAll('source');

  hlsManifestURL = [video, ...sources].find(({ src }) => HLS_FILE_EXTENSION_REGEX.test(src))?.src;

  return hlsManifestURL;
};
