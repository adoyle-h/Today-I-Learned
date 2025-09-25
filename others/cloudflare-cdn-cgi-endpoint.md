# Cloudflare /cdn-cgi 路由

所有托管在 Cloudflare 的网站，CF 都会自动添加一个 `/cdn-cgi/*` 开头的路由。用来提供一些功能。该操作无法关闭。
详见[这里](https://developers.cloudflare.com/fundamentals/reference/cdn-cgi-endpoint/)。

建议在 robots.txt 里增加一行 `Disallow: /cdn-cgi/` 避免机器人抓取。
