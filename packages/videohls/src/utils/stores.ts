import type Hls from 'hls.js';

export const hlsInstancesStore: Map<HTMLVideoElement, Hls> = new Map();
