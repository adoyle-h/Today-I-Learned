# 构建 github page

## 使用 github action

例子

```yaml
name: Deploy GitHub Pages

on:
  schedule:
    - cron:  '0 0 * * *'

  # Runs on pushes targeting the default branch
  # push:
  #   branches: ["master"]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow one concurrent deployment
concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:

  # check files changed
  changes:
    runs-on: ubuntu-latest
    outputs:
      md: ${{ steps.changes.outputs.md }}
    steps:
      - uses: actions/checkout@v3
      - uses: dorny/paths-filter@v2
        id: changes
        with:
          filters: |
            md:
              - '**/*.md'

  # Build job
  build:
    runs-on: ubuntu-latest
    needs: changes
    if: needs.changes.outputs.md == 'true'
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Pages
        uses: actions/configure-pages@v3

      - name: Build with Jekyll
        uses: adoyle-h/jekyll-build-pages@v1.0.7-ad-4
        with:
          source: ./
          destination: ./_site

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1

  # Deployment job
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v1
```


看这里的 `adoyle-h/jekyll-build-pages@v1.0.7-ad-4` 是我根据 [`actions/jekyll-build-pages@v1.0.7`](https://github.com/actions/jekyll-build-pages) 修改的。

改动的原因：因为 actions/jekyll-build-pages 使用的是 [github-pages gem](https://github.com/github/pages-gem) 来生成 jekyll page 的。原生的 github page 也是用的这个 gem。但它的缺点是只允许使用这个 gem 里自带的 jekyll 插件，用户无法使用其他插件。

改动的地方：
1. [修改 page-gems 源码](https://github.com/github/pages-gem/compare/master...adoyle-h:pages-gem:adoyle)。发布新的 gem。
2. 打 git tag，触发 github action 构建 jekyll-build-pages 镜像。
2. 把 action.yml 的镜像改成 `当前项目名@tag`。

具体可参考[我的 jekyll-build-pages](https://github.com/adoyle-h/jekyll-build-pages)。

构建并发布自己的 jekyll-build-pages 镜像:

1. fork 项目，修改代码。
2. 打开 github action 页面，允许运行 workflow。并在 github 项目设置 workflow 可写权限。
3. 修改代码，打 git tag 并推送到 github。就会自动触发 action，自动构建 docker 镜像，并推送到 github container registry。
