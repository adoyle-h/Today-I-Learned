# permission denied for schema public

当 Postgres 从 14 升级到 15 后，大概率会遇到这个错误。这是因为在 PG 15 中，只要不是 pg_database_owner 中指定的用户，包超级用户在内都不能在默认的 schema public 中创建对象。

解决方法是给用户创建一个用户模式。

1. 登录到对应的数据库。
2. 执行命令 `CREATE SCHEMA AUTHORIZATION user1;` 将会创建与用户名同名的 schema。
