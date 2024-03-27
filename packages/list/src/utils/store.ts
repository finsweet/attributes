import type { CollectionListWrapperElement } from '@finsweet/attributes-utils';

import type { List } from '../components/List';

export const listInstancesStore = new Map<CollectionListWrapperElement, List>();
