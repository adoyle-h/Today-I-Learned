# sudo 找不到可执行文件

举个例子，如果你使用 [snap](https://snapcraft.io/) 安装软件，它把可执行文件放在 `/snap/bin` 目录里。
即使你把 `/snap/bin` 路径加到 PATH，当使用 sudo，依然找不到命令。

## 解决方法

几种解决方法。

1. `sudo "PATH=$PATH" cmd` (如果 PATH 中带有 `=`，你需要这么写 `sudo env "PATH=$PATH" cmd`)
2. 编辑 `/etc/sudoers` 的 `secure_path`。sudo 寻找的 PATH 就是 `secure_path` 的值。
  - Debian 默认的是 `Defaults  secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"`
  - 你可以使用 `sudo EDITOR=vim visudo` 来修改。改成 `Defaults secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin"`
3. 在 PATH 里的某个目录里创建软链接，指向 `/snap/bin` 里的文件。(每个文件都要手动创建，就很麻烦)
