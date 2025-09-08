import { Markdown } from "@/lib/markdown";

export const CTA = ({ heading, subheading, content, link, footnote }) => {
  return (
    <section className="mx-auto my-8 bg-gray-100 rounded px-8 py-20 max-w-5xl flex gap-4 flex-col items-center">
      <div className="text-center">
        <h2 className="text-3xl mb-1">{heading}</h2>
        <p className="text-lg">{subheading}</p>
      </div>
      <Markdown content={content} />
      <a
        className="rounded bg-gray-800 text-gray-50 px-3 py-2 text-lg hover:bg-gray-700 transition"
        href={link.fields.url}
      >
        {link.fields.label}
      </a>
      <p className="text-xs text-gray-500">{footnote}</p>
    </section>
  );
};
