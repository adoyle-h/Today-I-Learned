---
title: MQTT
---


## EMQX

EMQX Broker 监听端口

- 协议接入
  - 1883 MQTT/TCP 协议端口
  - 8083 MQTT/WS/HTTP 协议端口
  - 8084 MQTT/WSS/HTTPS 协议端口
  - 8883 MQTT/SSL 协议端口
  - 5683 LwM2M 端口
  - 11883 MQTT/TCP 协议内部端口，仅用于本机客户端连接
- 管理监控
  - 8081  HTTP API 端口
  - 18083	Dashboard 管理控制台端口
- 集群通信
  - 4370 (4369-4380) default Erlang distrbution port
  - 5369 (5370-5380) for backplain gen_rpc
