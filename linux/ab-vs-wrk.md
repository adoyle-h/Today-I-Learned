---
title: ab 与 wrk 比较
created: 2016-03-03T23:27:52+0800
updated: 2016-03-03T23:27:52+0800
---


## 线程数

- 根据 [ab 的 wiki](https://en.wikipedia.org/wiki/ApacheBench#Concurrency_versus_Threads)，ab 只有一个线程运行。这可能会是压测请求的瓶颈。
- 而 wrk 可以根据 `-t <thread-number>` 来设置使用多少个线程发请求，又因为每个请求都是不阻塞线程的，所以一般线程数设置为 cpu 核数即可。
  - 因为 wrk 借用了 redis 的 ae 实现，参见[源码](https://github.com/wg/wrk/blob/master/src/ae.h)，利用 epoll 等 IO 多路复用技术来实现非阻塞线程的请求。

## keep-alive

- ab 需要使用 `-k` 参数来开启，默认关闭。
- wrk 默认是开启 keep-alive 的，根据[这个 issue](https://github.com/wg/wrk/issues/197) 可知。

keep-alive 的开启与否，会很大影响到 QPS 结果。

## 默认配置

- ab
    - 超时时间 `-s` 默认 30 秒；
    - 持续时间 `-t` 默认无限制；
- wrk
    - 超时时间 `-T` 默认 2 秒；
    - 持续时间 `-d` 默认 10 秒；
    - 线程 2 个；
    - 并发数 10 个；
    - 参见[源码](https://github.com/wg/wrk/blob/50305ed1d89408c26067a970dcd5d9dbea19de9d/src/wrk.c#L489)

建议每次都根据自己的情况设置持续时间与超时时间。

## 坑

ab 需要把地址写完整，比如不能是 `http://localhost:8080`，得是 `http://locahost:8080/`
