import client from "./client";

export async function getPostPage(slug: string) {
  const entries = await client().getEntries({
    content_type: "postPage",
    include: 5,
    "fields.slug": slug,
    limit: 1,
  });

  return entries?.items[0] as unknown as any;
}

export async function getAllPosts() {
  const entries = await client().getEntries({
    content_type: "postPage",
    include: 5,
  });

  return entries?.items;
}

export async function getRelatedPosts(slug: string) {
  const entries = await client().getEntries({
    content_type: "postPage",
    "fields.slug[nin]": slug,
    include: 5,
    limit: 2,
  });

  return entries?.items;
}
