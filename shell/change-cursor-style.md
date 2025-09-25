---
title: shell 中改变光标样式
---


对于 XTerm，可使用 XTerm Control Sequences。
在 shell 中执行 `printf -- '\x1b[6 q'` 可将光标改成细长的。`printf -- '\x1b[1 q'` 可将光标改成方块。

解释:

```

CSI Ps SP q
          Set cursor style (DECSCUSR), VT520.
            Ps = 0  ⇒  blinking block.
            Ps = 1  ⇒  blinking block (default).
            Ps = 2  ⇒  steady block.
            Ps = 3  ⇒  blinking underline.
            Ps = 4  ⇒  steady underline.
            Ps = 5  ⇒  blinking bar, xterm.
            Ps = 6  ⇒  steady bar, xterm.
```

对于 `\x1b[6 q`，`\x1b[` = CSI，`6` = Ps，`空格` = SP，q 就是 q。

CSI 写成 `\033[` 也行。

https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h4-Functions-using-CSI-_-ordered-by-the-final-character-lparen-s-rparen:CSI-Ps-SP-q.1D81
