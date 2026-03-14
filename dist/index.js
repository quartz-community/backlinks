import { simplifySlug as simplifySlug$1, joinSegments } from '@quartz-community/utils';
import { jsxs, jsx } from 'preact/jsx-runtime';

// src/util/lang.ts
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// src/i18n/locales/en-US.ts
var en_US_default = {
  components: {
    backlinks: {
      title: "Backlinks",
      noBacklinksFound: "No backlinks found"
    }
  }
};

// src/i18n/index.ts
var locales = {
  "en-US": en_US_default
};
function i18n(locale) {
  return locales[locale] || en_US_default;
}

// src/components/styles/backlinks.scss
var backlinks_default = ".backlinks {\n  flex-direction: column;\n}\n.backlinks > h3 {\n  font-size: 1rem;\n  margin: 0;\n}\n.backlinks > ul.overflow {\n  list-style: none;\n  padding: 0;\n  margin: 0.5rem 0;\n  max-height: calc(100% - 2rem);\n  overscroll-behavior: contain;\n}\n.backlinks > ul.overflow > li > a {\n  background-color: transparent;\n}";
function simplifySlug(fp) {
  return simplifySlug$1(fp);
}
function resolveRelative(current, target) {
  const simplified = simplifySlug(target);
  const rootPath = pathToRoot(current);
  return joinSegments(rootPath, simplified);
}
function pathToRoot(slug) {
  let rootPath = slug.split("/").filter((x) => x !== "").slice(0, -1).map((_) => "..").join("/");
  if (rootPath.length === 0) {
    rootPath = ".";
  }
  return rootPath;
}
var OverflowList = ({
  children,
  ...props
}) => {
  return /* @__PURE__ */ jsxs("ul", { ...props, class: [props.class, "overflow"].filter(Boolean).join(" "), id: props.id, children: [
    children,
    /* @__PURE__ */ jsx("li", { class: "overflow-end" })
  ] });
};
var numLists = 0;
var OverflowList_default = () => {
  const id = `list-${numLists++}`;
  return {
    OverflowList: (props) => /* @__PURE__ */ jsx(OverflowList, { ...props, id }),
    overflowListAfterDOMLoaded: `
document.addEventListener("nav", (e) => {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const parentUl = entry.target.parentElement
      if (!parentUl) return
      if (entry.isIntersecting) {
        parentUl.classList.remove("gradient-active")
      } else {
        parentUl.classList.add("gradient-active")
      }
    }
  })

  const ul = document.getElementById("${id}")
  if (!ul) return

  const end = ul.querySelector(".overflow-end")
  if (!end) return

  observer.observe(end)
})
`
  };
};
var defaultOptions = {
  hideWhenEmpty: true
};
var Backlinks_default = ((opts) => {
  const options = { ...defaultOptions, ...opts };
  const { OverflowList: OverflowList2, overflowListAfterDOMLoaded } = OverflowList_default();
  const Backlinks = ({
    fileData,
    allFiles,
    displayClass,
    cfg
  }) => {
    const slug = simplifySlug(fileData.slug);
    const locale = cfg.locale ?? "en-US";
    const backlinkFiles = allFiles.filter((file) => file.links?.includes(slug));
    if (options.hideWhenEmpty && backlinkFiles.length === 0) {
      return null;
    }
    return /* @__PURE__ */ jsxs("div", { class: classNames(displayClass, "backlinks"), children: [
      /* @__PURE__ */ jsx("h3", { children: i18n(locale).components.backlinks.title }),
      /* @__PURE__ */ jsx(OverflowList2, { children: backlinkFiles.length > 0 ? backlinkFiles.map((f) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: resolveRelative(fileData.slug, f.slug), class: "internal", children: f.frontmatter?.title }) })) : /* @__PURE__ */ jsx("li", { children: i18n(locale).components.backlinks.noBacklinksFound }) })
    ] });
  };
  Backlinks.css = backlinks_default;
  Backlinks.afterDOMLoaded = overflowListAfterDOMLoaded;
  return Backlinks;
});

export { Backlinks_default as Backlinks };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map