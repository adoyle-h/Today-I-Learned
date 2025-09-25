---
title: mysqldump
---

## --opt

默认开启一系列 dump 优化选项

```
--opt               Same as --add-drop-table, --add-locks, --create-options,
                      --quick, --extended-insert, --lock-tables, --set-charset,
                      and --disable-keys. Enabled by default, disable with
                      --skip-opt.
```

## --disable-keys / --skip-disable-keys

默认是 `--disable-keys`。用来避免导入数据的时候，每条记录都刷新一遍索引，在最后才重建索引。

```
  -K, --disable-keys  '/*!40000 ALTER TABLE tb_name DISABLE KEYS */; and
                      '/*!40000 ALTER TABLE tb_name ENABLE KEYS */; will be put
                      in the output.
                      (Defaults to on; use --skip-disable-keys to disable.)
```

## --add-locks

在每个导出的表之前增加 LOCK TABLES 且之后 UNLOCK TABLE。为了在恢复数据的时候更快地插入数据。

```
  --add-locks         Add locks around INSERT statements.
                      (Defaults to on; use --skip-add-locks to disable.)
```
