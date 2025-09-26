---
title: diff 与 patch
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## 制作补丁

`diff -u $old_file $new_file > patch_file` 根据单个文件制作补丁。

`diff -ru $old_dir $new_dir > patch_file` 根据目录制作补丁。

文件路径可以是绝对路径或者相对路径，根据场景选择。

## 应用补丁

`patch < patch_file` 应用到当前目录。

`patch path/to/file < patch_file` 应用到指定文件或目录。

`patch -p1 < patch_file` 应用到当前目录。`-pN` 代表跳过 patch 文件路径的前 N 层。

例如，假如文件路径为 `/u/howard/src/blurfl/blurfl.c`，

- `-p0` 对应 `/u/howard/src/blurfl/blurfl.c`
- `-p1` 对应 `u/howard/src/blurfl/blurfl.c`
- `-p4` 对应 `blurfl/blurfl.c`

## 处理冲突

冲突会有提示，会产生当前文件、源文件、冲突文件三个文件，你需要手动处理。跟 git 冲突处理一致。

## 重复 patch

重复 patch 会提示该 patch 已经应用过。

## 参考资料

- https://www.pair.com/support/kb/paircloud-diff-and-patch/
- https://www.gnu.org/software/diffutils/manual/html_mono/diff.html
