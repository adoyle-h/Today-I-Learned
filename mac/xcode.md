---
title: xcode 重新安装
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


echo $(xcode-select --print-path)
sudo rm -rf /Library/Developer/CommandLineTools
xcode-select --install
