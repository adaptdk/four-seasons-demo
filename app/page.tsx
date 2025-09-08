import Link from "next/link";
import { draftMode } from "next/headers";

import Date from "./date";
import CoverImage from "./cover-image";
import Avatar from "./avatar";
import MoreStories from "./more-stories";

import { getAllPosts } from "@/lib/api";
import { CMS_NAME, CMS_URL } from "@/lib/constants";
import { Markdown } from "@/lib/markdown";

function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Blog.
      </h1>
      <h2 className="text-center md:text-left text-lg mt-5 md:pl-8">
        A statically generated blog example using{" "}
        <a
          href="https://nextjs.org/"
          className="underline hover:text-success duration-200 transition-colors"
        >
          Next.js
        </a>{" "}
        and{" "}
        <a
          href={CMS_URL}
          className="underline hover:text-success duration-200 transition-colors"
        >
          {CMS_NAME}
        </a>
        .
      </h2>
    </section>
  );
}

function HeroPost({
  title,
  publishDate,
  slug,
  img,
  summary,
}: {
  title: string;
  publishDate: string;
  slug: string;
}) {
  const imgUrl = `http:${img.fields.file.url}`;
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} slug={slug} url={imgUrl} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link href={`/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <Date dateString={publishDate} />
          </div>
        </div>
        <div className="text-lg leading-relaxed mb-4">
          <Markdown content={summary} />
          {/* {author && <Avatar name={author.name} picture={author.picture} />} */}
        </div>
      </div>
    </section>
  );
}

export default async function Page() {
  const allPosts = await getAllPosts();
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <div className="container mx-auto px-5">
      <Intro />
      {heroPost && <HeroPost {...heroPost.fields} />}
      <MoreStories morePosts={morePosts} />
    </div>
  );
}
