import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export function Markdown({ content }) {
  return documentToReactComponents(content);
}
