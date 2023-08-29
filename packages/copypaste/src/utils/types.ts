import type { FsAttributeInit } from '@finsweet/attributes-utils';

import type { SETTINGS } from '.';

export type GlobalSettings = Parameters<FsAttributeInit<typeof SETTINGS>>['0'];
