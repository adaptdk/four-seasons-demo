import { CTA } from "./cta";

export const BlockRenderer = ({ blocks }) => {
  return blocks.map((block) => {
    const type = block.sys.contentType.sys.id;

    switch (type) {
      case "cta":
        return <CTA key={block.sys.id} {...block.fields} />;
      default:
        return null;
    }
  });
};
