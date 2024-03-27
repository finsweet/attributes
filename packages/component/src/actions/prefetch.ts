import { fetchPageDocument, parseNumericAttribute } from '@finsweet/attributes-utils';

import type { ComponentTargetData } from '../utils/types';

const componentsPages: Record<string, Document | null> = {};

/**
 * Prefetches the pages of the components.
 * This is a hack to work around all components being initted in parallel and not hitting the cache.
 * The {@link fetchPageDocument} helper already caches the pages in memory and in an IndexedDB instance,
 * but when initting all components in parallel, it doesn't have enough time to cache them
 * before other components try to fetch the same resource.
 * So with this trick we filter and prefetch all the pages before initting the components.
 *
 * @param componentsData
 * @param cachekey
 * @param cacheversion
 */
export const prefetchComponentsPages = async (
  componentTargetsData: ComponentTargetData[],
  cacheKey?: string,
  cacheVersion?: string
) => {
  const uniqueSourcesToFetch = [
    ...new Set(componentTargetsData.map(({ proxiedSource, source }) => proxiedSource?.href || source.href)),
  ];

  const pagesData = await Promise.all(
    uniqueSourcesToFetch.map(async (href) => {
      const page = await fetchPageDocument(href, {
        cacheKey,
        cacheExternal: true,
        cacheVersion: parseNumericAttribute(cacheVersion, 1),
      });

      page?.cloneNode(true);

      return [href, page] as const;
    })
  );

  Object.assign(componentsPages, Object.fromEntries(pagesData));
};

/**
 * @returns A prefetched component page.
 * @param source The source URL of the component.
 */
export const getComponentPage = (source: URL) => componentsPages[source.href];
