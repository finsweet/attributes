import { cloneNode } from './dom';
import { getPublishDate, getSiteId } from './webflow';

const DB_OBJECT_STORE_NAME = 'pages';

const cache = new Map<string, Promise<Document | null>>();

type Options = {
  /**
   * Whether to cache fetched documents. Defaults to `true`.
   */
  cache?: boolean;

  /**
   * Whether to cache external documents.
   * If set to true, it will follow a [stale-while-revalidate](https://web.dev/stale-while-revalidate/) strategy.
   */
  cacheExternal?: boolean;

  /**
   * Defines a manual database name for the IndexedDB instance.
   * If not provided, it will use the site ID or the current page's site ID.
   */
  cacheKey?: string;

  /**
   * Defines a manual version for the IndexedDB instance.
   * If not provided, it will use the publish date of the current page or `1` as default.
   */
  cacheVersion?: number;
};

/**
 * Fetches and parses an external page.
 * Stores the page response in an {@link IDBDatabase} if the page belongs to the same site.
 *
 * @param source The URL of the page.
 * @param options Optional {@link Options}
 *
 * @returns The page's {@link Document} if successful, `null` otherwise.
 */
export const fetchPageDocument = (source: string | URL, options: Options = {}): Promise<Document | null> | null => {
  let url;

  try {
    url = new URL(source, window.location.origin);
  } catch {
    return null;
  }

  const conclude = (page: Document | null) => (page ? cloneNode(page) : null);

  // If the same page is being fetched simultaneously, return it from the memory cache.
  const cached = cache.get(url.href);
  if (cached) {
    return cached.then(conclude);
  }

  const promise = createPromise(url, options);
  cache.set(url.href, promise);

  return promise.then(conclude);
};

/**
 * Creates a promise that fetches a page and stores it in an IndexedDB.
 * @param url
 * @param options
 * @returns A promise that resolves to the page's {@link Document} or `null` if the fetch fails.
 */
const createPromise = async (
  url: URL,
  { cache = true, cacheExternal, cacheKey, cacheVersion }: Options
): Promise<Document | null> => {
  try {
    // Try to create a DB instance.
    const siteId = getSiteId();
    const publishDate = getPublishDate();

    const dbName = siteId || cacheKey;
    const dbVersion = publishDate?.getTime() ?? cacheVersion ?? 1;
    const db = dbName ? await createCacheDB(dbName, dbVersion) : null;

    // If no caching enabled or no DB created, fetch the page and store it in the memory cache.
    if (!cache || !db) {
      const result = await fetchPage(url);
      if (!result) return null;

      const { page } = result;
      return page;
    }

    // If the page is in the DB, return it from there.
    const rawPageFromDB = await getRawPageFromDB(db, url);
    if (rawPageFromDB) {
      const page = parseRawPage(rawPageFromDB);

      // Cached external documents are considered stale,
      // so in the background we refetch the page and store it to the DB again.
      if (cacheExternal && !isPageSameSite(page, siteId)) {
        fetchAndCachePageInDB(db, url, siteId, cacheExternal);
      }

      return page;
    }

    // If the page is not in the DB, fetch it and store it in the DB.
    const page = await fetchAndCachePageInDB(db, url, siteId, cacheExternal);
    return page;
  } catch {
    return null;
  }
};

/**
 * Fetches a page and stores it in memory.
 * @param url The URL of the page.
 * @returns The page's {@link Document} and raw HTML text.
 */
const fetchPage = async (url: URL) => {
  const response = await fetch(url);
  const rawPage = await response.text();
  const page = parseRawPage(rawPage);

  return { page, rawPage };
};

/**
 * Fetches a page and stores it in a {@link IDBDatabase}.
 * @param db The DB instance.
 * @param url The URL of the page.
 * @param siteId The current site ID.
 * @param cacheExternal Whether to cache external documents.
 * @returns The page's {@link Document}.
 */
const fetchAndCachePageInDB = async (db: IDBDatabase, url: URL, siteId: string | null, cacheExternal?: boolean) => {
  const result = await fetchPage(url);
  if (!result) return null;

  const { page, rawPage } = result;
  const isSameSite = isPageSameSite(page, siteId);

  // If it can't be cached, just return the page.
  if (!isSameSite && !cacheExternal) return page;

  // Otherwise store it in the DB
  await storeRawPageInDB(db, url, rawPage);

  // If the page belongs to the same site, we can remove it from the memory cache as it's already in the DB.
  // If the page is external, we want to keep it in memory to avoid refetching it, as in every request is considered stale.
  if (isSameSite) {
    cache.delete(url.href);
  }

  return page;
};

/**
 * Checks if a fetched page document is from the same Webflow site as the current page.
 * @param page The fetched page document.
 * @param siteId The current site ID.
 */
const isPageSameSite = (page: Document, siteId: string | null) => {
  if (!siteId) return false;

  const pageSiteId = getSiteId(page);
  return pageSiteId && pageSiteId === siteId;
};

/**
 * Parses a raw page's HTML text into a {@link Document}.
 * @param rawPage
 */
const parseRawPage = (rawPage: string) => new DOMParser().parseFromString(rawPage, 'text/html');

/**
 * Creates a DB instance.
 * @param dbName The DB name.
 * @param dbVersion The DB version.
 * @returns An {@link IDBDatabase} instance.
 */
const createCacheDB = (dbName: string, dbVersion: number) => {
  return new Promise<IDBDatabase | null>((resolve) => {
    try {
      const dbOpenRequest = window.indexedDB.open(dbName, dbVersion);

      dbOpenRequest.onblocked = () => {
        resolve(null);
      };

      dbOpenRequest.onupgradeneeded = () => {
        const db = dbOpenRequest.result;

        if (db.objectStoreNames.contains(DB_OBJECT_STORE_NAME)) {
          db.deleteObjectStore(DB_OBJECT_STORE_NAME);
        }

        db.createObjectStore(DB_OBJECT_STORE_NAME);
      };

      dbOpenRequest.onerror = () => resolve(null);
      dbOpenRequest.onsuccess = () => {
        const db = dbOpenRequest.result;

        db.onversionchange = () => db.close();

        resolve(db);
      };
    } catch {
      resolve(null);
    }
  });
};

/**
 * Gets a page from the DB.
 * @param db
 * @param url
 */
const getRawPageFromDB = async (db: IDBDatabase, url: URL) => {
  return new Promise<string | null>((resolve) => {
    const transaction = db.transaction(DB_OBJECT_STORE_NAME);
    const objectStore = transaction.objectStore(DB_OBJECT_STORE_NAME);
    const request = objectStore.get(url.href);

    request.onerror = () => resolve(null);
    request.onsuccess = () => resolve(request.result);
  });
};

/**
 * Stores a page in the DB.
 * @param db
 * @param url
 * @param rawPage
 */
const storeRawPageInDB = async (db: IDBDatabase, url: URL, rawPage: string) => {
  return new Promise<void>((resolve) => {
    const transaction = db.transaction(DB_OBJECT_STORE_NAME, 'readwrite');
    const objectStore = transaction.objectStore(DB_OBJECT_STORE_NAME);
    const request = objectStore.put(rawPage, url.href);

    request.onerror = () => resolve();
    request.onsuccess = () => resolve();
  });
};
