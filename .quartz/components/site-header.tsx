import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { classNames } from "../../util/lang"

const SiteHeader: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const description = cfg?.description

  if (!description) {
    return null
  }

  return <div class={classNames(displayClass, "site-header")}>
    <p class={classNames(displayClass, "site-description")}>{description}</p>
    <div class="site-links">
      <a class="site-tags" href="/tags">Tags</a>
      <a class="site-rss" href="/rss.xml">RSS</a>
      <a class="my-github" href="https://github.com/adoyle-h/Today-I-Learned">Github</a>
    </div>
  </div>
}

SiteHeader.css = `
.site-header {
}

.site-description {
  color: var(--darkgray);
  font-size: 0.9em;
  margin: 0.3rem 0;
  white-space: pre-line;
  line-height: 1.4em;
}

.site-links {
  display: flex ;
  justify-content: space-between;
  padding-right: 3rem;
  margin-top: 1rem;
  align-items: center;
}
`

export const ComponentSiteHeader = (() => SiteHeader) satisfies QuartzComponentConstructor
