import Link from "next/link";
import { draftMode } from "next/headers";

import MoreStories from "../../more-stories";
import Avatar from "../../avatar";
import Date from "../../date";
import CoverImage from "../../cover-image";

import { Markdown } from "@/lib/markdown";
import { getAllPosts, getPostPage } from "@/lib/api";
import { BlockRenderer } from "@/app/block-renderer";

export async function generateStaticParams() {
  const allPosts = await getAllPosts();

  return allPosts.map((post) => ({
    slug: post.fields.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostPage(params.slug);

  const { title, content, publishDate, summary, img, blocksAfter } =
    post.fields;

  const imgUrl = `https:${img.fields.file.url}`;

  return (
    <div className="container mx-auto px-5">
      <h2 className="mb-20 mt-8 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
        <Link href="/" className="hover:underline">
          Blog
        </Link>
        .
      </h2>
      <article>
        <h1 className="mb-12 text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl">
          {title}
        </h1>
        {/* <div className="hidden md:mb-12 md:block">
          {post.author && (
            <Avatar name={post.author.name} picture={post.author.picture} />
          )}
        </div> */}
        <div className="mb-8 sm:mx-0 md:mb-16">
          <CoverImage title={title} url={imgUrl} />
        </div>
        <div className="mx-auto max-w-2xl">
          {/* <div className="mb-6 block md:hidden">
            {post.author && (
              <Avatar name={post.author.name} picture={post.author.picture} />
            )}
          </div> */}
          <div className="mb-6 text-lg">
            <Date dateString={publishDate} />
          </div>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="rounded bg-gray-100 p-4 mb-6">
            <Markdown content={summary} />
          </div>

          <div className="prose">
            <Markdown content={content} />
          </div>
        </div>
      </article>
      <hr className="border-accent-2 mt-28 mb-24" />
      {blocksAfter?.at(0) && <BlockRenderer blocks={blocksAfter} />}
    </div>
  );
}
