# Jekyll

## 如何改变 url path 格式

这跟 `_config.yml` 的 [permalink](https://jekyllrb.com/docs/permalinks/) 选项相关。

懒人选项：

- `permalink: pretty`，url 是 `/title/`。
- `permalink: none`，url 是 `/title.html`。

## url 不是链接是纯文本

jekyll 使用的 kramdown 不像 Github 那样可以自动把 url 显示成链接。它只会显示纯文本。

解决方法是用 `<url>` 或者 `[url](url)` 才行。这也是 markdown 的基础语法。

参考 https://kramdown.gettalong.org/syntax.html#automatic-links
