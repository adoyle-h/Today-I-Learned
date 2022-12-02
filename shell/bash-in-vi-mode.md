## bash 开启 vi 模式

bash 默认使用的是 `emacs mode`。

执行 `set -o vi` 就可以在当前 shell 中开启 vi 模式。

按 `ESC` 退到 `normal` 模式，按 i 进入编辑模式。

对于快速跳转很有用，比如 `f1` 就快速跳转到 `1` 出现的位置。而 emacs mode 只能跳到行首/尾或者按单词跳。
