---
title: 用环境变量替换文本内容 envsubst
---


`envsubst` 用于将文件中出现的 `${var}` `$var` 用环境变量替换掉。

`envsubst` 是 GNU 的 [`gettext`][gettext] 软件包的一部分。`gettext` 是用来做 i18n 的翻译工具。

官方文档: https://www.gnu.org/software/gettext/manual/html_node/envsubst-Invocation.html#envsubst-Invocation

用法:

- `envsubst <<<'hello $USER'`
  - `<<<` 的用法参见 [Here Strings and Here Documents](./here-strings-and-here-documents.md)
- `echo 'hello $USER' | envsubst`

[gettext]: https://www.gnu.org/software/gettext/
