import { describe, expect, it } from "vitest";
import Backlinks from "../src/components/Backlinks";

type VNode = { type: unknown; props: Record<string, unknown> & { children?: unknown } };

function all(node: unknown, test: (v: VNode) => boolean, out: VNode[] = []): VNode[] {
  if (Array.isArray(node)) node.forEach((n) => all(n, test, out));
  else if (node && typeof node === "object" && "props" in node) {
    const v = node as VNode;
    if (typeof v.type === "function")
      return all((v.type as (p: unknown) => unknown)(v.props), test, out);
    if (test(v)) out.push(v);
    all(v.props.children, test, out);
  }
  return out;
}
const textOf = (node: unknown): string =>
  node === null || node === undefined || typeof node === "boolean"
    ? ""
    : typeof node === "string" || typeof node === "number"
      ? String(node)
      : Array.isArray(node)
        ? node.map(textOf).join("")
        : typeof (node as VNode).type === "function"
          ? textOf(((node as VNode).type as (p: unknown) => unknown)((node as VNode).props))
          : textOf((node as VNode).props.children);

const files = [
  { slug: "notes/a", links: ["notes/"], frontmatter: { title: "Note A" } },
  { slug: "deep/x/b", links: ["notes/", "other"], frontmatter: { title: "Note B" } },
  { slug: "c", links: ["other"], frontmatter: { title: "C" } },
];
const render = (slug: string, opts?: Parameters<typeof Backlinks>[0], locale = "en-US") =>
  Backlinks(opts)({
    fileData: { slug },
    allFiles: files,
    cfg: { locale },
    displayClass: "desktop-only",
  } as never);

describe("Backlinks", () => {
  it("links the pages linking to this one (a folder page by its folder), by title", () => {
    const tree = render("notes/index");
    const links = all(tree, (v) => v.type === "a");
    expect(links.map((a) => [a.props.href, textOf(a)])).toEqual([
      ["../notes/a", "Note A"],
      ["../deep/x/b", "Note B"],
    ]);
    expect((tree as unknown as VNode).props.class).toBe("desktop-only backlinks");
    expect(textOf(all(tree, (v) => v.type === "h3"))).toBe("Backlinks");
  });

  it("hides itself without backlinks, unless hideWhenEmpty is off", () => {
    expect(render("lonely")).toBeNull();
    const shown = render("lonely", { hideWhenEmpty: false }, "de-DE");
    expect(all(shown, (v) => v.type === "a")).toEqual([]);
    expect(textOf(shown)).toContain("Keine Backlinks gefunden");
  });
});
