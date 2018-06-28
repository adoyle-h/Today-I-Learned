## 奇怪的 parse html

随便写一个 html 文件，然后在 chrome 浏览器（隐身模式，不带任何插件）打开这个本地 html 文件，查看 performance 的时候发现在下载本地 html 文件之前，就有一个 parse html 的行为。这个 html 是哪来的呢？

![parse_html.jpeg](http://7xniyb.com1.z0.glb.clouddn.com/TIL/parse_html_20180628_210640.jpeg)

### 答案

是刷新页面导致的，页面刷新之前还会触发一次 parse html。我不应该用 devtools 的中间这个按钮，应该打开新的标签后直接开始录制，然后直接在搜索框里打开本地文件的路径，避免触发页面刷新。

![devtools_record.jpeg](http://7xniyb.com1.z0.glb.clouddn.com/TIL/devtools_record_20180628_210640.jpeg)
