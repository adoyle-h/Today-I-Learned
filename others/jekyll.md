# Jekyll

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
