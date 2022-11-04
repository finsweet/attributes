import type { Infer } from 'superstruct';

import type { jsonFlagValueSchema } from './constants';

export interface LaunchDarklyAttributes {
  devClientId: string | null | undefined;
  prodClientId: string | null | undefined;
  eventsToTrack?: string | string[] | null | undefined;
}

export type JSONFlagValue = Infer<typeof jsonFlagValueSchema>;
