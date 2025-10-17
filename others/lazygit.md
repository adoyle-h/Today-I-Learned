---
title: lazygit
created: 2025-10-18T04:30:55+0800
updated: 2025-10-18T04:31:01+0800
---

lazygit 是操作 git 的 TUI 程序。

## 配置
### 配置模板

从[这里](https://github.com/jesseduffield/lazygit/blob/master/docs/Config.md#default)获取。

### 我推荐的个性化配置

```yaml
log:
  showWholeGraph: true

os:
  editPreset: nvim

gui:
  timeFormat: "2006-01-02 15:04:05"
```

### 在终端编辑文件

如果在 lazygit 使用 vim/nvim 等终端编辑器，如果没有设置 `editInTerminal: true` 则会无限卡住。

```yaml
os:
  editInTerminal: true
```

推荐设置

```yaml
os:
  editPreset: vim
```

这样默认设置就会使用 vim 了。

详见[文档](https://github.com/jesseduffield/lazygit/blob/master/docs/Config.md#configuring-file-editing)。

## 快捷键

常用快捷键

- `0-5` 数字切换面板。`[` 和 `]` 切换面板里的 Tab。
- 在 `0` 面板里按 `<Tab>` 切换 Patch 和 Custom Patch 的当前窗口。
- `,` 和 `.` 对当前窗口进行翻页。`<` 和 `>` 翻到最前和最后。
- `<C-f>` 和 `<C-d>` 对内容窗口进行翻页。
- `_` 和 `+` 缩小和放大面板。

## 使用技巧

### lazygit 中实现 rebase --onto

1. 在分支视图里选定要移动的分支
2. 在提交视图里移到要移动的 commit，按 B 设置 rebase commit 的起点。
3. 到分支视图里移到要 onto 的分支，按 r。然后根据提示选择 s 或 i，一般选 s 简单变基。
