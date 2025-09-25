export const config: Record<string, any> = {
  pageTitle: "今天我学了什么",
  pageTitleSuffix: " - 今天我学了什么",
  baseUrl: "til.adoyle.me",
  description: 'ADoyle 的碎片化知识笔记。\n博观而约取，厚积而薄发。',
  ignorePatterns: ['.*', '_doc_builder', '_docs', 'wrangler.toml', 'node_modules', '**/README.md', '404.md'],
  analytics: {
    provider: 'umami',
    host: 'https://u.adoyle.me',
    websiteId: '129fb2e3-4c36-4df1-b639-5e3ed5a12680'
  },
}

export const layout: Record<string, any> = {
  breadcrumbs: {
    rootName: "首页",
    showCurrentPage: false,
  },

  // explorer: {
  //   filterFn: () => true,
  // },

  footer: {
    html: `<p style="font-size: 0.8rem;">
Copyright 2016-Now ADoyle (<a href="mailto:adoyle.h@gmail.com" target="_blank">adoyle.h@gmail.com</a>).
All Rights Reserved. ADoyle 保留所有权力。
<br\>
转载本站文字需要注明署名和来源链接。版权归 ADoyle 所有。如有违反，虽远必诛。
<br\>
本站源码 <a href="https://github.com/adoyle-h/Today-I-Learned" target="_blank">adoyle-h/Today-I-Learned</a>。觉得好请点个 Star。
<br\>
若有意见或问题，请你发到<a href="https://github.com/adoyle-h/Today-I-Learned/discussions/categories/general" target="_blank">讨论区</a>，并遵守<a href="https://rules.adoyle.me" target="_blank">我的交流规约</a>。
</p>`,
  }
}

export const plugins: Record<string, any> = {}
export const transformers = []
export const filters = []
export const emitters = []
export const emitterOpts: Record<string, any> = {
  ContentIndex: {
    robotsIndex: ['cdn-cgi/']
  },
}
