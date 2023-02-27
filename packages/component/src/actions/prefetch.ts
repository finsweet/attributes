import type { ComponentTargetData } from 'src/utils/types';

import { fetchPageDocument, parseNumericAttribute } from '$global/helpers';

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
 * @param cacheKey
 * @param cacheVersion
 */
export const prefetchComponentsPages = async (
  componentTargetsData: ComponentTargetData[],
  cacheKey?: string | null,
  cacheVersion?: string | number | null
) => {
  const uniqueSourcesToFetch = [
    ...new Set(componentTargetsData.map(({ proxiedSource, source }) => proxiedSource?.href || source.href)),
  ];

  const pagesData = await Promise.all(
    uniqueSourcesToFetch.map(async (href) => {
      const page = await fetchPageDocument(href, {
        cacheExternal: true,
        cacheKey: cacheKey || undefined,
        cacheVersion: parseNumericAttribute(cacheVersion, 1),
      });

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
