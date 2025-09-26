---
title: vim textwidth=78 的约定
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


[解答](http://stackoverflow.com/questions/28026110/what-is-the-reason-origin-of-textwidth-78-rather-than-80)

> 2.1.1. Line Length Limits
>
>  There are two limits that this standard places on the number of
>  characters in a line. Each line of characters MUST be no more than
>  998 characters, and SHOULD be no more than 78 characters, excluding
>  the CRLF.
>
>  The 998 character limit is due to limitations in many implementations
>  which send, receive, or store Internet Message Format messages that
>  simply cannot handle more than 998 characters on a line. Receiving
>  implementations would do well to handle an arbitrarily large number
>  of characters in a line for robustness sake. However, there are so
>  many implementations which (in compliance with the transport
>  requirements of [RFC2821]) do not accept messages containing more
>  than 1000 character including the CR and LF per line, it is important
>  for implementations not to create such messages.
>
>  The more conservative 78 character recommendation is to accommodate
>  the many implementations of user interfaces that display these
>  messages which may truncate, or disastrously wrap, the display of
>  more than 78 characters per line, in spite of the fact that such
>  implementations are non-conformant to the intent of this
>  specification (and that of [RFC2821] if they actually cause
>  information to be lost). Again, even though this limitation is put on
>  messages, it is encumbant upon implementations which display messages

https://www.rfc-editor.org/rfc/rfc2822

其实无卵用。

