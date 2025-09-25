---
title: Transaction 与 autocommit
---

有些 ORM 框架（比如 sequelize [这个坑][issue]），在 `start transaction` 后提供 `set autocommit = 0` 的操作。
但是事务结束后 ORM 并没有恢复 autocommit，那么在同一个 mysql 线程上，由于后续 SQL 请求没有主动 commit，导致各种问题。

两个知识点：

1. mysql 的一个线程对应一个 Session
2. autocommit 的 scope 是 Global 或 Session 级别的，详见[官方文档](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_autocommit)

[issue]: https://github.com/sequelize/sequelize/pull/9921
