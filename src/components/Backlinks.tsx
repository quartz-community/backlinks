import type { QuartzComponent, QuartzComponentProps } from "@quartz-community/types";
import { classNames } from "../util/lang";
import { i18n } from "../i18n";
import style from "./styles/backlinks.scss";
import { resolveRelative, simplifySlug } from "../util/path";
import OverflowListFactory from "./OverflowList";

export interface BacklinksOptions {
  hideWhenEmpty: boolean;
}

type QuartzComponentConstructor<Options extends object | undefined = undefined> = (
  opts: Options,
) => QuartzComponent;

const defaultOptions: BacklinksOptions = {
  hideWhenEmpty: true,
};

export default ((opts?: Partial<BacklinksOptions>) => {
  const options: BacklinksOptions = { ...defaultOptions, ...opts };
  const { OverflowList, overflowListAfterDOMLoaded } = OverflowListFactory();

  const Backlinks: QuartzComponent = ({
    fileData,
    allFiles,
    displayClass,
    cfg,
  }: QuartzComponentProps & { displayClass?: string }) => {
    const slug = simplifySlug(fileData.slug!);
    const backlinkFiles = allFiles.filter((file: { links?: string[] }) =>
      file.links?.includes(slug),
    );
    if (options.hideWhenEmpty && backlinkFiles.length === 0) {
      return null;
    }
    return (
      <div class={classNames(displayClass, "backlinks")}>
        <h3>{i18n(cfg.locale).components.backlinks.title}</h3>
        <OverflowList>
          {backlinkFiles.length > 0 ? (
            backlinkFiles.map((f: { slug?: string; frontmatter?: { title?: string } }) => (
              <li>
                <a href={resolveRelative(fileData.slug!, f.slug!)} class="internal">
                  {f.frontmatter?.title}
                </a>
              </li>
            ))
          ) : (
            <li>{i18n(cfg.locale).components.backlinks.noBacklinksFound}</li>
          )}
        </OverflowList>
      </div>
    );
  };

  Backlinks.css = style;
  Backlinks.afterDOMLoaded = overflowListAfterDOMLoaded;

  return Backlinks;
}) satisfies QuartzComponentConstructor;
