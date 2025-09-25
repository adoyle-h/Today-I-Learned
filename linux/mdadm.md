---
title: mdadm
---


mdadm 用来创建软件 RAID。

## 创建 RAID1

`sudo mdadm --create /dev/md1 --level=1 --raid-devices=2 /dev/sd{b,c}`

## 保存阵列信息

`sudo mdadm -Dsv > sudo tee /etc/mdadm.conf`

## 查看阵列信息

`sudo mdadm -D /dev/md1`
