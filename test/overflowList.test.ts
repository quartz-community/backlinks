import { describe, expect, it } from "vitest";
import type { VNode } from "preact";
import OverflowListFactory from "../src/components/OverflowList";

type Rendered = VNode<{ id?: string; class?: string }>;

// The factory's `OverflowList` wraps the inner list component: render that one step to get the <ul>.
function renderUl(factory: ReturnType<typeof OverflowListFactory>): Rendered {
  const outer = factory.OverflowList({ class: "backlinks-list" }) as Rendered;
  const inner = outer.type as (props: object) => Rendered;
  return inner(outer.props);
}

describe("OverflowList factory", () => {
  it("gives each list a distinct backlinks-list-<n> id used by the <ul> and the script", () => {
    const first = OverflowListFactory();
    const second = OverflowListFactory();

    expect(first.id).toMatch(/^backlinks-list-\d+$/);
    expect(second.id).toMatch(/^backlinks-list-\d+$/);
    expect(second.id).not.toBe(first.id);

    for (const factory of [first, second]) {
      const ul = renderUl(factory);
      expect(ul.type).toBe("ul");
      expect(ul.props.id).toBe(factory.id);
      expect(ul.props.class).toBe("backlinks-list overflow");
      expect(factory.overflowListAfterDOMLoaded).toContain(
        `document.getElementById("${factory.id}")`,
      );
    }
    expect(first.overflowListAfterDOMLoaded).not.toContain(second.id);
  });
});
