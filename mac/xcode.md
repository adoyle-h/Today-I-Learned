---
title: xcode 重新安装
created: 2020-03-10T22:47:46+0800
updated: 2020-03-10T22:47:46+0800
---


echo $(xcode-select --print-path)
sudo rm -rf /Library/Developer/CommandLineTools
xcode-select --install
