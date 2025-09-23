include ./makefile-utils/*.mk
.DEFAULT_GOAL := help

GH_PAGE_IMAGE=ghcr.io/adoyle-h/jekyll-build-pages:v1.0.7-ad-7

# 本地编辑与浏览（不用先执行 make build，会自动构建，支持热更新）
.PHONY: serve
serve:
	echo "You should press 'ctrl-c' when \"Auto-regeneration: enabled for '/src/site'\" appeared."
	docker run -it --rm -p 4000:4000 -v "${PWD}:/src/site" ${GH_PAGE_IMAGE}

.PHONY: readme-update
readme-update:
	@node ./_doc_builder/update-readme.mjs

.PHONY: meta-update
meta-update:
	@node ./_doc_builder/update-meta.mjs

.PHONY: index-update
index-update:
	@node ./_doc_builder/update-index-md.mjs

# 本地构建
.PHONY: build
build:
	docker run -it --rm -v "${PWD}:/src/site" ${GH_PAGE_IMAGE} \
		build --verbose

.PHONY: build-gh
build-gh:
	docker run -it --rm -v "${PWD}:/src/site" --entrypoint github-pages ${GH_PAGE_IMAGE} \
		build --verbose

sh:
	docker run -it --rm -p 4000:4000 --entrypoint sh -v "${PWD}:/src/site" ${GH_PAGE_IMAGE}

# 本地浏览（要先执行 make build）
.PHONY: http
http:
	docker run --rm -it -p 4000:80 \
		-v "${PWD}/_doc_builder/Caddyfile:/etc/caddy/Caddyfile" \
		-v "${PWD}/_site:/usr/share/caddy:ro" caddy:2.6.3-alpine

.PHONY: debug-gh-pages
debug-gh-pages:
	docker run -it --rm -p 4000:4000 -v "${PWD}:/src/site" \
		--entrypoint bash -w /src/site \
		${GH_PAGE_IMAGE}

.PHONY: clean-index-md
clean-index-md:
	fd '^index.md' ./*/ | xargs rm -i
