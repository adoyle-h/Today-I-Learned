---
title: 文件命名，下划线还是中划线？
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


> 当文件名包含多个单词，应该用什么作分隔符？

首先肯定不能使用空格。然后一般在中划线（或称连字符） `-` 和下划线 `_` 中做选择。

考虑的因素主要在于使用环境：

## 文件是否需要被搜索引擎搜索

通常公布到网络时文件名作为 url 的一部分。

然而 Google 搜索引擎会将 `_` 连接的单词作为一个单词。比如搜索 `web_site` 实际上只会找关键词 `website`。
只有 `web-site` 会分为 `web` 和 `site` 来查找。即：

- This_is_a_single_word
- This-is-a-sentence-with-multiple-words

所以这是个 SEO 问题。如果要考虑到搜索引擎，那么就用 `-`

## 文件名能否被环境解析

比如 Java、Python、Go 语言：

> 命名源文件和目录不可以用连字符（减号），否则不能被 Python 或 Java import，因为他们要求目录和文件名都是像变量名那样的标识符。命名变量当然也不可以用连字符（减号）。所以其实是统一的。

> 这就是为什么 Go 语言的 import 要用字符串 "fmt" 的原因了。

> 对于 Java，这进一步影响了公司的域名，例如 com.chenshuo.rpc 是合法的 package 名字，但是 com.china-pub.rpc 和 com.163.rpc 就不合法了。再引申一下，如果目录名是域名的一部分，恐怕也应该避免下划线，因为域名里通常没有下划线。

比如 LaTeX：

> LaTeX 的源文件（包括图片）不要有下划线，否则 include 会出错。

此条源自[陈硕的知乎回答](https://www.zhihu.com/question/50471847/answer/137202976)。

## 英文文法

如果既不需要关心搜索引擎，也不需要关心编程语言环境的问题。那么就考虑英文文法。
连字符在英文里是有意义的，比如复合词，例如

- upper-case letter
- non-English-speaking peoples
- the post–World War II years
- a hospital–nursing home connection
- a nursing home–home care policy
- a quasi-public–quasi-judicial body

为了保留连字符在复合词的作用，那么文件命名时，就应该使用下划线来代替空格。

## 结论

不同场景结论会不一样，根据以上三个判断来决定用 `-` 还是 `_`。

## 注意点

1. 正则表达式 `\w` 不会识别 `-`，但是会识别 `_`

## 参考

- [CODING HORROR - Of Spaces, Underscores and Dashes](https://blog.codinghorror.com/of-spaces-underscores-and-dashes/) ([链接备份](https://web.archive.org/web/20230118115432/https://blog.codinghorror.com/of-spaces-underscores-and-dashes/))
- [dashes-versus_underscores; The Definitive Guide](https://x-equals.com/dashes-versus-underscores/) ([链接备份](https://web.archive.org/web/20221209071335/https://x-equals.com/dashes-versus-underscores/))
- [知乎 - 在命名文件或者变量时，你会使用下划线还是连字符，为什么](https://www.zhihu.com/question/50471847)
