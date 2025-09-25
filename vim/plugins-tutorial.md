---
title: vim 插件教程
---

## [EasyAlign](https://github.com/junegunn/vim-easy-align)

### 如何对齐 `//`

普通方法是不行的。只有先按 `Ctrl-g`，再按两次 `/` 才可以对齐。

参考 [issue](https://github.com/junegunn/vim-easy-align/issues/53)


## [unite.vim](https://github.com/Shougo/unite.vim)

### file_rec/async 因为没有刷新缓存而找不到文件

两种解决方案：

1. 在 unite 面板中按 `ctrl-l` 来刷新缓存
2. 使用 `-force-redaw` 参数来强制刷新缓存，比如 `nnoremap <leader>t :<C-u>Unite -no-split -buffer-name=files   -start-insert -force-redraw file_rec/async:\`projectroot#guess()\` <cr>`

参考这个 [issue 的答案](https://github.com/Shougo/unite.vim/issues/930#issuecomment-220190238)。


## [indentLine](https://github.com/Yggdroot/indentLine)

### 自定义符号

indentLine 插件可以[自定义缩进字符][1]。

如图所示

![img](https://camo.githubusercontent.com/8e0f6822f859a9a8a7069219f6816174a4737f8e/687474703a2f2f692e696d6775722e636f6d2f325a41376f615a2e706e67)

然而要达到这个效果要费不少功夫。

首先，我的操作环境是：

- 系统：mac osx 10.11.5
- vim: NVIM v0.1.5-803-g006f9c0
- Yggdroot/indentLine: 4b654ec
- fontforge: 最新即可
- XQuartz: 最新，fontforge 基于 XQuartz
- 字体: [DejaVuSansMonoForPowerline Nerd Font Book](https://github.com/ryanoasis/nerd-fonts)

1. 安装 FontForge. 可用 `brew cask install fontforge`，或者直接去官网下载。
2. 用 FontForge 打开要打补丁的字体
3. 点击菜单栏 `View - Goto`，在输入框里输入或者选择 `Private Use Area`，确定。
4. 会自动调到一个 `private use` 区域，选择双击一个空白的格子，然后会跳出一个新的窗口。
5. 点击菜单栏 `File - Import...`，选择要打的补丁，即 [`indentLine-dotted-guide.eps` 文件](https://github.com/Yggdroot/indentLine/blob/master/glyph/indentLine-dotted-guide.eps)。
6. 完成后，回到主窗口。点击菜单栏 `Element - Font Info...`，建议把 `PS Names` 和 `TTF Names` 的相关信息改掉，要不然跟原生字体在同一个字体族就不好了。
7. 完成后，回到主窗口。点击菜单栏 `File - Generate`，导出字体文件。我导出的是 `TrueType`，但是导出过程会发现格式不对。不过忽略它继续导出，还是可以用的。
8. 完成后，回到主窗口。右键点击你导入的符号，点击 `Glyph Info...`，在 `Unicode` 中，复制 `Unicode Char` 对应的值，这个才是 vim 配置要用的符号，`Unicode Value` 是无用的。
9. 在你的 vim 配置中设置 `let g:indentLine_char = '刚复制的符号'`。
10. 设置你的 terminal 程序，将字体设置为刚刚导出的字体。
11. 重启，生效。

该步骤主要参考[官方教程][1]以及这个 [issue 的回答](https://github.com/Yggdroot/indentLine/issues/98#issuecomment-140926831)

[1]: https://github.com/Yggdroot/indentLine#font-patching
