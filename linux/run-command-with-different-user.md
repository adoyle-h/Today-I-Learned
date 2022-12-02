## 用别的用户运行命令

```sh
sudo -H -u "$user" "$command"
# 或者
sudo -H -u "$user" "bash -c '$command'"
# 或者
sudo -H su "$user" -s "$script"
# 或者
sudo -H su "$user" -s "bash -c '$command'"
```
