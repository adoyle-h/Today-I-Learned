---
title: 终端无法识别的键盘组合键
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


终端无法区分某些键盘组合键，因为按下它们，终端收到是相同的 escape sequence 代码。

- 终端无法区分：
  - `Ctrl+字母` 与 `Ctrl+Shift+字母`。但可以区分 `Alt+字母` 与 `Alt+Shift+字母`。
  - `Ctrl+Tab` 与 `Ctrl+Shift+Tab`。
  - `Ctrl+=` 与 `=`。但可以区分 `Alt+=` 与 `=`。
  - `Ctrl+j` 与 `Enter`。
  - `Ctrl+i` 与 `Tab`。
- 某些终端不支持：
  - `Ctrl+Alt+字母`
- 完全无效：
  - `Ctrl+Alt+Shift+字母`

（以上可能存在错误，我只在 iTerm2 和 MacOS 内置的终端里测试了）

## 测试终端能否识别某组合

shell 里运行 `cat` 然后按下组合键。
