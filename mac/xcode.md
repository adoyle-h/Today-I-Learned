---
title: xcode 重新安装
---


echo $(xcode-select --print-path)
sudo rm -rf /Library/Developer/CommandLineTools
xcode-select --install
