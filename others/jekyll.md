---
title: Jekyll
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


不要靠近 Jekyll，否则会变得不幸。

## 缺点

1. Jekyll 的 markdown 解析器是 [kramdown](https://github.com/gettalong/kramdown)。
  - GFM parser 不支持现在 Github 的 markdown 语法。比如 Automatic URL Linking（见下文），以及内嵌在 `<details>` 标签里的 markdown 语法。
  - kramdown 默认使用 [GFM parser](https://github.com/kramdown/parser-gfm)，但最后维护时间是 2021 年。kramdown 的维护也不活跃。
2. Jekyll 可以通过 `markdown: GFM` 来切换 markdown 解析器，但是这个解析器也有问题。当 heading 包含中文，生成的 `<a>` 标签里的锚点不是中文。
3. `markdown: CommonMarkGhPages` 跟 `markdown: GFM` 效果基本一样，问题相同。
3. Github Page 目前使用的 Jekyll 3。而 Jekyll 最新都出到 4 了。而且 [Github Page 维护者说不会升级](https://github.com/github/pages-gem/issues/651#issuecomment-1208290235)。
4. 在 md 文件里写 `{{...}}`，最后渲染是空的。

## 如何改变 url path 格式

这跟 `_config.yml` 的 [permalink](https://jekyllrb.com/docs/permalinks/) 选项相关。

懒人选项：

- `permalink: pretty`，url 是 `/title/`。
- `permalink: none`，url 是 `/title.html`。

## url 没有渲染成链接

bare url 渲染成链接的功能属于 Markdown 扩展语法 (Extended Syntax)，即  [Automatic URL Linking](https://www.markdownguide.org/extended-syntax/#automatic-url-linking)，

jekyll 使用的 kramdown 来处理 markdown。虽然它说[支持 Automatic URL Linking](https://www.markdownguide.org/tools/jekyll/)，但实际上从 [2016 年起](https://github.com/gettalong/kramdown/issues/306)到 2023 年 2 月，实际上它都不支持。参考这个 [Issue](https://github.com/kramdown/parser-gfm/issues/17) 和这个 [Issue](https://github.com/barryclark/jekyll-now/issues/459#issuecomment-561336350)。

有两种解决方法

1. `_config.yml` 设置 `markdown: GFM`，使用 Github 的 markdown 处理器来处理。
2. 用 `<url>` 或者 `[url](url)`。这是 markdown 的[基础语法](https://www.markdownguide.org/basic-syntax/#links)，也是 [kramdown 支持的语法](https://kramdown.gettalong.org/syntax.html#automatic-links)。

## pages-gem

因为 Github Page 默认使用 Jekyll 来编译。
Github 提供了 [pages-gem](https://github.com/github/pages-gem) 来一键安装 Github Page 编译依赖。

然而 pages-gem 可能存在一个问题，导致在本地 `jekyll build` 以及 `jekyll serve` 得到的 index.html 格式不对。
详见 https://github.com/github/pages-gem/issues/657

## `{{...}}` 渲染为空的问题

实际上 jekyll 编译时会报警告 `Liquid Warning: Liquid syntax ... is not a valid expression ...`。然后 `{{...}}` 部分渲染为空。

具体参考[这篇文章](https://redgreenrepeat.com/2020/10/23/how-to-display-double-curly-braces-code-in-jekyll/)。

解决方法：用 [raw tag](https://shopify.github.io/liquid/tags/template/#raw) 包裹。

```markdown
<!-- {% raw %} -->
`docker container ls --format='{{json .}}'`
<!-- {% endraw %} -->
```
