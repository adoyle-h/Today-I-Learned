---
title: CSS Selector list invalidation
---


MDN 里有[这么一段](https://developer.mozilla.org/en-US/docs/Web/CSS/Selector_list):

> A downside to using selector lists is that the following aren't equivalent:
>
> ```css
> h1 { font-family: sans-serif }
> h2:maybe-unsupported { font-family: sans-serif }
> h3 { font-family: sans-serif }
> ```
>
> ```css
> h1, h2:maybe-unsupported, h3 { font-family: sans-serif }
> ```
>
> This is because a single unsupported selector in a selector list invalidates the whole rule.

这在 W3C 里也有定义，见 [4.1. Selector Lists](https://www.w3.org/TR/selectors-4/#grouping)

## 解决方案

MDN 也提出一个变通办法，用 `:is()`。

> A way to remedy this us to use the :is() selector, which simply ignores invalid selectors in its arguments, but at the cost of all selectors having the same specificity, because of how :is() calculates specificity.
>
> ```css
> :is(h1, h2:maybe-unsupported, h3) { font-family: sans-serif }
> ```

不过这个功能没在 W3C 里定义，应该是浏览器自己的实现。
