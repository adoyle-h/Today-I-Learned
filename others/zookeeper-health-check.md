---
title: zookeeper 健康检查
---


建议使用这个脚本: `[[ $(echo ruok | nc localhost 2181) == imok ]]`。

如果使用 `nc -z localhost 2181`，健康检查脚本会频繁地引起以下 WARNING:

```
WARN  [NIOServerCxn.Factory:0.0.0.0/0.0.0.0:2181:NIOServerCnxn@368] - caught end of stream exception
EndOfStreamException: Unable to read additional data from client sessionid 0x0, likely client has closed socket
       at org.apache.zookeeper.server.NIOServerCnxn.doIO(NIOServerCnxn.java:239)
       at org.apache.zookeeper.server.NIOServerCnxnFactory.run(NIOServerCnxnFactory.java:203)
       at java.lang.Thread.run(Thread.java:748)
```
