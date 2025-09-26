---
title: 命令行中提示用户 Yes/No
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


```sh
#!/usr/bin/env bash

read -rp "Prompt text? (y/n [default yes])" answer
case $answer in
    Y|y|Yes|yes|YES)
        echo Yes
        answer=yes
        ;;
    N|n|No|no|NO)
        echo No
        answer=no
        ;;
    *)
        echo Yes
        answer=yes
        ;;
esac

if [[ $answer == yes ]]; then
    echo "Answer: $answer"
else
    echo "Answer: $answer"
fi
```
