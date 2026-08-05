import { createRemarkHeadings, type TocItem } from "@/app/[locale]/blog/toc";
import { Link } from "@/i18n/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import Image from "next/image";
import React from "react";
import { highlight } from "sugar-high";

function Table({ data }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink(props) {
  let href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

function Code({ children, ...props }) {
  let codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function createHeading(level) {
  const Heading = ({ children, id, ...props }) => {
    return React.createElement(
      `h${level}`,
      { id, ...props },
      id
        ? React.createElement("a", {
            href: `#${id}`,
            key: `link-${id}`,
            className: "anchor",
            "aria-label": `跳转到 ${id}`,
          })
        : null,
      children,
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
};

export async function compilePostMDX(source, customComponents = {}) {
  const toc: TocItem[] = [];
  const { content } = await compileMDX({
    source,
    components: { ...components, ...customComponents },
    options: {
      mdxOptions: {
        remarkPlugins: [createRemarkHeadings(toc)],
      },
    },
  });

  return { content, toc };
}

export async function CustomMDX({ source, components: customComponents = {} }) {
  const { content } = await compilePostMDX(source, customComponents);

  return content;
}
