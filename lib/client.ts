import decircular from "decircular";

import { createClient } from "contentful";
import { type CreateClientParams } from "contentful";

// Minimal entry interface that let's us know
// enough about what we get from contentful
// while we're making requests.  Once we get data
// it should be parsed by zod for validation, at which
// point we'll have the actual type definition.
// We do use this interface in validate since
// that's where we transform this data into
// valid, parsed data with a type.
export interface Entry {
  sys: {
    [x: string]: any;
    updatedAt: string;
    id: string;
    contentType: {
      sys: {
        id: string;
      };
    };
  };
  fields: any;
  metadata: any;
}

export interface RequestParams {
  skip: number;
  limit: number;
}

export interface RequestResponse {
  total: number;
  items: Entry[];
}

export default function client(config?: CreateClientParams) {
  const env = process.env;
  const isPreview = env.CONTENTFUL_USE_PREVIEW === "true";
  const defaults = {
    space: env.CONTENTFUL_SPACE_ID || "SET__CONTENTFUL_SPACE__ENV",
    environment: env.CONTENTFUL_ENVIRONMENT || "master",
    accessToken:
      (isPreview
        ? env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
        : env.CONTENTFUL_ACCESS_TOKEN) || "SET__CONTENTFUL_ACCESS_TOKEN__ENV",
    host: isPreview ? "preview.contentful.com" : "cdn.contentful.com",
  };

  return createClient({
    ...defaults,
    ...(config || {}),
  }).withoutUnresolvableLinks;
}

/**
 * Simplify the process of fetching all entries from Contentful.
 *
 * A helper function that continues requesting entries
 * from Contentful until there are no more.
 *
 * @param request Function that fetches entries from Contentful.
 * - A function that accepts an object with `skip` and `limit` properties.
 * @param limit {number} - The number of entries to fetch per request.
 * @param skip {number} - The number of entries to skip for this batch.
 * - The number of entries to fetch per request.
 * @returns
 * - An array of entries.
 * @example
 * ```ts
 * const entries = await getAll((params) => {
 *   return client.getEntries({
 *     'content_type': 'page',
 *     'fields.type[ne]': 'blog',
 *     // Spread the skip and limit params into
 *     // the request params object.
 *     ...params
 *   })
 * });
 * ```
 */
export async function getAll(
  request: (params: RequestParams) => Promise<RequestResponse>,
  limit = 100,
  skip = 0
): Promise<Entry[]> {
  let items: Entry[] = [];
  let total;

  do {
    const entries = await request({ skip, limit });
    items = items.concat(entries.items);

    if (!total) {
      total = entries.total;
    }

    skip += limit;
  } while (skip < total);

  return decircular(items);
}
