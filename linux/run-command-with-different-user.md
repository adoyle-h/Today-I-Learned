---
title: 用别的用户运行命令
created: 2022-12-02T22:53:19+0800
updated: 2022-12-02T22:53:19+0800
---


```sh
sudo -H -u "$user" "$command"

# 或者

sudo -H -u "$user" "bash -c '$command'"
# 或者
sudo -H su "$user" -s "$script"
# 或者
sudo -H su "$user" -s "bash -c '$command'"
```
