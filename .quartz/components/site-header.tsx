import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { classNames } from "../../util/lang"

const SiteHeader: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const description = cfg?.description

  if (!description) {
    return null
  }

  return <div class={classNames(displayClass, "site-header")}>
    <p class={classNames(displayClass, "site-description")}>{description}</p>
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
`

export const ComponentSiteHeader = (() => SiteHeader) satisfies QuartzComponentConstructor
