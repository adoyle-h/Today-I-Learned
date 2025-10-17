import { PageLayout, SharedLayout } from "./quartz/cfg"
import { FileTrieNode } from "./quartz/components/Explorer.tsx"
import * as Component from "./quartz/components"
import { QuartzPluginData } from "./quartz/plugins/vfile"
import { layout } from './quartz.my'
import { ComponentSiteHeader } from './quartz/components/my/site-header'

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(layout.head),
  header: [],
  beforeBody: [
    Component.Banner(),
  ],
  afterBody: [],
  footer: Component.Footer(layout.footer),
}

const breadcrumbs = Component.Breadcrumbs(layout.breadcrumbs)
const onlyHomepageAndFolder = (page) => page.fileData.slug.endsWith('/index') || (page.fileData.slug === 'index')

const explorer = Component.Explorer({
  filterFn: (node: FileTrieNode) => {
    // hide "databse" folder in explorer
    if (['database/index'].includes(node.slug)) {
      return false
    }
    return node.isFolder || !node.slug.includes('/')
  },
  ...layout.explorer,
});

const recnetNotes = Component.ConditionalRender({
  component: Component.RecentNotes({
    limit: 10,
    showTags: false,
    filter: (d: QuartzPluginData) => {
      // not show contentpage index in folder
      // console.log('d=%O', d)
      return !d.slug.endsWith('/index') && (d.slug !== 'index')
    },
    sort: (f1, f2) => {
      if (f1.dates && f2.dates) {
        // sort descending
        const d = f2.dates?.modified!.getTime() - f1.dates?.modified!.getTime()
        if (d > 0.1) {
          return d
        } else {
          return f2.dates?.created!.getTime() - f1.dates?.created!.getTime()
        }
      } else if (f1.dates && !f2.dates) {
        // prioritize files with dates
        return -1
      } else if (!f1.dates && f2.dates) {
        return 1
      }
    },
    ...layout.recnetNotes,
  }),
  // only show recent notes in homepage and folder
  condition: layout.recnetNotesCondition || onlyHomepageAndFolder,
})

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: breadcrumbs,
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      // not show meta in homepage and folder
      condition: (page) => page.fileData.slug !== 'index',
    }),
    Component.TagList(),
    Component.MetaCard(),
  ],

  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Newline()),
    ComponentSiteHeader(),
    Component.MobileOnly(Component.Newline()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    explorer,
    Component.ConditionalRender({
      component: Component.DesktopOnly(Component.Graph()),
      // not show graph in homepage
      condition: ((page) => page.fileData.slug !== 'index'),
    })
  ],

  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.ConditionalRender({
      component: Component.Backlinks(),
      // not show backlinks in homepage
      condition: (page) => page.fileData.slug !== 'index',
    }),
    recnetNotes,
    Component.MobileOnly(Component.Graph()),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    breadcrumbs,
    Component.ArticleTitle(),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => !page.fileData.slug.endsWith('/index'),
    }),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Newline()),
    ComponentSiteHeader(),
    Component.MobileOnly(Component.Newline()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    explorer,
  ],
  right: [
    recnetNotes,
  ],
}
