import GithubSlugger from "github-slugger";
import { toString } from "mdast-util-to-string";
import { visit } from "unist-util-visit";

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export function createRemarkHeadings(toc: TocItem[]) {
  return function remarkHeadings() {
    return function transformer(tree) {
      const slugger = new GithubSlugger();

      visit(tree, "heading", (node) => {
        const text = toString(node);

        if (!text) {
          return;
        }

        const id = slugger.slug(text);

        node.data ??= {};
        node.data.hProperties = {
          ...node.data.hProperties,
          id,
        };

        if (node.depth === 2) {
          toc.push({ id, text, level: node.depth });
        }
      });
    };
  };
}
