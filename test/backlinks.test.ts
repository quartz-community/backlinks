import { describe, it, expect } from "vitest";
import { simplifySlug, resolveRelative } from "../src/util/path";

describe("path utilities", () => {
  it("simplifySlug removes index suffix", () => {
    const result = simplifySlug("folder/index");
    expect(result).toBe("folder/");
  });

  it("simplifySlug handles root index", () => {
    const result = simplifySlug("index");
    expect(result).toBe("/");
  });

  it("resolveRelative creates relative paths", () => {
    const result = resolveRelative("a/b/c", "a/b/d");
    expect(result).toContain("..");
  });
});
