import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export function Markdown({ content }: { content: any }) {
  return documentToReactComponents(content);
}
