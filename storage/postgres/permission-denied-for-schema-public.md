# permission denied for schema public

当 Postgres 从 14 升级到 15 后，大概率会遇到这个错误。这是因为在 PG 15 中，只要不是超级用户或者 pg_database_owner 中指定的用户，都不能在默认的 schema public 中创建对象。这是 PG 为了督促用户控制权限的精细度，提高安全性。

具体请看官方文档的 [secure schema usage](https://www.postgresql.org/docs/17/ddl-schemas.html#DDL-SCHEMAS-PATTERNS) 以及 [Connecting to the Database Server](https://www.postgresql.org/docs/17/ecpg-connect.html#ECPG-CONNECTING)。

有两种解决方法：

## 给用户创建新的 Schema

推荐这种方法。

1. 登录到对应的数据库。
2. 执行命令 `CREATE SCHEMA AUTHORIZATION user1;` 将会创建与用户同名的 schema，并授权该用户访问。

程序连接数据库时，在 DATABASE_URL 中使用 `options=-c search_path=myschema` 来指定当前会话的默认 schema。

`DATABASE_URL=postgresql://user:password@host:port/database?options=-c%20search_path%3Dmyschema`

## 给用户授予权限

`GRANT ALL ON SCHEMA public TO user1;`

不推荐这种方法。仅限个别场景中使用。
