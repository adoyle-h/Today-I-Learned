---
title: URI 转义
created: 2019-01-09T00:36:55+0800
updated: 2019-01-09T00:36:55+0800
---


## 什么是转义

转义的字符会按如下格式来表达

```
escaped     = "%" hex hex
hex         = digit | "A" | "B" | "C" | "D" | "E" | "F" |
                      "a" | "b" | "c" | "d" | "e" | "f"
```

比如 `+` 转义后是 `%2B`。

## 问题

url 里出现的 `;/?:@&=+$,#[]!'()*` 字符串，客户端要不要转义？服务端如何解码？

## 原因

1994 年提出的 [RFC1738][] 定义了 URI 最初的规范，1998 年提出的 [RFC2396][] 有较为完整的规范，2005 年提出的 [RFC3986][] 最终成为主流规范。
其过程对保留字的定义等有所改变，所以存在历史的变（包）迁（袱）。

详见[统一资源标志符 - 标准改良](https://www.wikiwand.com/zh-tw/%E7%BB%9F%E4%B8%80%E8%B5%84%E6%BA%90%E6%A0%87%E5%BF%97%E7%AC%A6#/%E6%A0%87%E5%87%86%E6%94%B9%E8%89%AF)

很多语言的标准库是基于 RFC2396 实现的，留下来很重的包袱，相信很多程序员都踩过这坑。
但也能理解，因为编程语言要向后兼容，语言标准库不可能为了 05 年提出来的规范做出不兼容修改。

比如 JS 的 encodeURI 和 encodeURIComponent。
具体见 [tc39 规范](https://tc39.github.io/ecma262/#sec-uri-syntax-and-semantics)

```js
// 修正 encodeURIComponent 改成 RFC3986 规范
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
function fixedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}
```

又比如 JAVA 标准库里的 [java.net.URLEncoder][]。
又比如 [PHP 的 urlencode][PHP]。

## 区别

| 标准    | 提出年号 | 保留字（需要转义）   | 非保留字（不用转义）    |
|:--------|:---------|:---------------------|-------------------------|
| RFC2396 | 1998     | `;/?:@&=+$,`         | alphanum 和 `-_.~!*'()` |
| RFC3986 | 2005     | `;/?:@&=+$,#[]!'()*` | alphanum 和 `-_.~`      |

## 何时转义

RFC2396 的描述

> 2.4.2. When to Escape and Unescape
>
>   A URI is always in an "escaped" form, since escaping or unescaping a
>   completed URI might change its semantics.  Normally, the only time
>   escape encodings can safely be made is when the URI is being created
>   from its component parts; each component may have its own set of
>   characters that are reserved, so only the mechanism responsible for
>   generating or interpreting that component can determine whether or
>   not escaping a character will change its semantics. Likewise, a URI
>   must be separated into its components before the escaped characters
>   within those components can be safely decoded.
>
>   In some cases, data that could be represented by an unreserved
>   character may appear escaped; for example, some of the unreserved
>   "mark" characters are automatically escaped by some systems.  If the
>   given URI scheme defines a canonicalization algorithm, then
>   unreserved characters may be unescaped according to that algorithm.
>   For example, "%7e" is sometimes used instead of "~" in an http URL
>   path, but the two are equivalent for an http URL.
>
>   Because the percent "%" character always has the reserved purpose of
>   being the escape indicator, it must be escaped as "%25" in order to
>   be used as data within a URI.  Implementers should be careful not to
>   escape or unescape the same string more than once, since unescaping
>   an already unescaped string might lead to misinterpreting a percent
>   data character as another escaped character, or vice versa in the
>   case of escaping an already escaped string.

RFC3986 的描述

> 2.4.  When to Encode or Decode
>
>   Under normal circumstances, the only time when octets within a URI
>   are percent-encoded is during the process of producing the URI from
>   its component parts.  This is when an implementation determines which
>   of the reserved characters are to be used as subcomponent delimiters
>   and which can be safely used as data.  Once produced, a URI is always
>   in its percent-encoded form.
>
>   When a URI is dereferenced, the components and subcomponents
>   significant to the scheme-specific dereferencing process (if any)
>   must be parsed and separated before the percent-encoded octets within
>   those components can be safely decoded, as otherwise the data may be
>   mistaken for component delimiters.  The only exception is for
>   percent-encoded octets corresponding to characters in the unreserved
>   set, which can be decoded at any time.  For example, the octet
>   corresponding to the tilde ("~") character is often encoded as "%7E"
>   by older URI processing implementations; the "%7E" can be replaced by
>   "~" without changing its interpretation.
>
>   Because the percent ("%") character serves as the indicator for
>   percent-encoded octets, it must be percent-encoded as "%25" for that
>   octet to be used as data within a URI.  Implementations must not
>   percent-encode or decode the same string more than once, as decoding
>   an already decoded string might lead to misinterpreting a percent
>   data octet as the beginning of a percent-encoding, or vice versa in
>   the case of percent-encoding an already percent-encoded string.

## 其他坑

### 空格被转成加号

因为早期 url component encode/decode 遵循 application/x-www-form-urlencoded 的转换规则。

> The space character "   " is converted into a plus sign "+".

JAVA 标准库的 [java.net.URLEncoder][]，PHP 标准库的 [urlencode][PHP] 都这样。


[PHP]: https://www.php.net/manual/en/function.urlencode.php
[java.net.URLEncoder]: https://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/net/URLEncoder.html
[RFC1738]: https://www.rfc-editor.org/rfc/rfc1738
[RFC2396]: https://www.rfc-editor.org/rfc/rfc2396
[RFC3986]: https://www.rfc-editor.org/rfc/rfc3986
