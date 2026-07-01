import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  ExternalHyperlink,
} from "docx";
import type { Root, Content, PhrasingContent, TableCell as MdTableCell, ListItem } from "mdast";
import { parseMarkdownToAst } from "./parseMarkdown";
import type { TypographyStyles } from "./defaultStyles";

function fontName(family: string): string {
  return family.split(",")[0].trim();
}

function bodyRun(text: string, styles: TypographyStyles, opts?: { bold?: boolean; italics?: boolean }) {
  return new TextRun({
    text,
    font: fontName(styles.bodyFont),
    size: styles.bodySize * 2,
    bold: opts?.bold,
    italics: opts?.italics,
  });
}

function codeRun(text: string, styles: TypographyStyles) {
  return new TextRun({
    text,
    font: fontName(styles.codeFont),
    size: styles.codeSize * 2,
  });
}

function phrasingToPlain(nodes: PhrasingContent[]): string {
  return nodes
    .map((n) => {
      if (n.type === "text") return n.value;
      if ("children" in n && Array.isArray(n.children)) {
        return phrasingToPlain(n.children as PhrasingContent[]);
      }
      return "";
    })
    .join("");
}

function phrasingToRuns(
  nodes: PhrasingContent[] | undefined,
  styles: TypographyStyles,
  baseSize: number
): (TextRun | ExternalHyperlink)[] {
  if (!nodes?.length) return [bodyRun("", styles)];

  const runs: (TextRun | ExternalHyperlink)[] = [];

  for (const node of nodes) {
    switch (node.type) {
      case "text":
        runs.push(
          new TextRun({
            text: node.value,
            font: fontName(styles.bodyFont),
            size: baseSize * 2,
          })
        );
        break;
      case "strong": {
        const text = phrasingToPlain(node.children as PhrasingContent[]);
        runs.push(bodyRun(text, styles, { bold: true }));
        break;
      }
      case "emphasis": {
        const text = phrasingToPlain(node.children as PhrasingContent[]);
        runs.push(bodyRun(text, styles, { italics: true }));
        break;
      }
      case "inlineCode":
        runs.push(codeRun(node.value, styles));
        break;
      case "link":
        runs.push(
          new ExternalHyperlink({
            link: node.url,
            children: [
              new TextRun({
                text: phrasingToPlain(node.children as PhrasingContent[]),
                font: fontName(styles.bodyFont),
                size: baseSize * 2,
                color: "2563EB",
                underline: { type: "single" },
              }),
            ],
          })
        );
        break;
      case "break":
        runs.push(new TextRun({ break: 1 }));
        break;
      default:
        if ("children" in node && Array.isArray(node.children)) {
          runs.push(...phrasingToRuns(node.children as PhrasingContent[], styles, baseSize));
        }
        break;
    }
  }

  return runs.length ? runs : [bodyRun("", styles)];
}

function makeParagraph(
  children: (TextRun | ExternalHyperlink)[],
  styles: TypographyStyles,
  opts?: { indent?: number; heading?: (typeof HeadingLevel)[keyof typeof HeadingLevel] }
) {
  return new Paragraph({
    spacing: { before: opts?.heading ? 240 : undefined, after: 120 },
    indent: opts?.indent ? { left: opts.indent } : undefined,
    heading: opts?.heading,
    children,
  });
}

function blockToParagraphs(node: Content, styles: TypographyStyles, indent = 0): Paragraph[] {
  switch (node.type) {
    case "heading": {
      const levels = [HeadingLevel.HEADING_1, HeadingLevel.HEADING_2, HeadingLevel.HEADING_3];
      const sizes = [styles.h1Size, styles.h2Size, styles.h3Size];
      const level = Math.min(node.depth, 3) - 1;
      return [
        makeParagraph(
          phrasingToRuns(node.children as PhrasingContent[], styles, sizes[level] ?? styles.h3Size),
          styles,
          { heading: levels[level] ?? HeadingLevel.HEADING_3, indent: indent || undefined }
        ),
      ];
    }
    case "paragraph":
      return [
        makeParagraph(
          phrasingToRuns(node.children as PhrasingContent[], styles, styles.bodySize),
          styles,
          { indent: indent || undefined }
        ),
      ];
    case "blockquote":
      return (node.children as Content[]).flatMap((child) =>
        blockToParagraphs(child, styles, indent || 720)
      );
    case "code":
      return [
        makeParagraph([codeRun(node.value, styles)], styles, { indent: indent || undefined }),
      ];
    case "list":
      return (node.children as ListItem[]).flatMap((item, i) => {
        const prefix = node.ordered ? `${(node.start ?? 1) + i}. ` : "• ";
        return item.children.flatMap((child) => {
          if (child.type === "paragraph") {
            return [
              makeParagraph(
                [
                  bodyRun(prefix, styles),
                  ...phrasingToRuns(child.children as PhrasingContent[], styles, styles.bodySize),
                ],
                styles,
                { indent: (indent || 0) + 360 }
              ),
            ];
          }
          return blockToParagraphs(child, styles, indent);
        });
      });
    default:
      return [];
  }
}

function astToDocxChildren(ast: Root, styles: TypographyStyles): (Paragraph | Table)[] {
  const children: (Paragraph | Table)[] = [];

  for (const node of ast.children) {
    if (node.type === "table") {
      const rows = node.children.map((row) => {
        const isHeader = node.children.indexOf(row) === 0;
        const cells = row.children.map((cell: MdTableCell) => {
          const text = (cell.children as Content[])
            .flatMap((c) => {
              if (c.type === "paragraph") {
                return phrasingToPlain(c.children as PhrasingContent[]);
              }
              return "";
            })
            .join("\n");
          return new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text,
                    font: fontName(styles.bodyFont),
                    size: styles.bodySize * 2,
                    bold: isHeader,
                  }),
                ],
              }),
            ],
          });
        });
        return new TableRow({ children: cells });
      });
      children.push(
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: {
            top: { style: BorderStyle.SINGLE, size: 1 },
            bottom: { style: BorderStyle.SINGLE, size: 1 },
            left: { style: BorderStyle.SINGLE, size: 1 },
            right: { style: BorderStyle.SINGLE, size: 1 },
            insideHorizontal: { style: BorderStyle.SINGLE, size: 1 },
            insideVertical: { style: BorderStyle.SINGLE, size: 1 },
          },
          rows,
        })
      );
    } else {
      children.push(...blockToParagraphs(node, styles));
    }
  }

  return children.length
    ? children
    : [new Paragraph({ children: [bodyRun("", styles)] })];
}

export async function mdToDocx(markdown: string, styles: TypographyStyles): Promise<Blob> {
  const ast = parseMarkdownToAst(markdown);
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: astToDocxChildren(ast, styles),
      },
    ],
  });
  return Packer.toBlob(doc);
}
