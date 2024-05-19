include ./makefile-utils/*.mk
.DEFAULT_GOAL := help

GH_PAGE_IMAGE=adoyle/gh-pages:v231.1

# 本地编辑与浏览（不用先执行 make build，会自动构建，支持热更新）
.PHONY: serve
serve:
	echo "You should press 'ctrl-c' when \"Auto-regeneration: enabled for '/src/site'\" appeared."
	docker run -it --rm -p 4000:4000 -v "${PWD}:/src/site" ${GH_PAGE_IMAGE}

.PHONY: update-readme
update-readme:
	@node ./_doc_builder/update-readme.mjs

.PHONY: update-meta
update-meta:
	@node ./_doc_builder/update-meta.mjs

# 本地构建
.PHONY: build
build:
	docker run -it --rm -v "${PWD}:/src/site" ${GH_PAGE_IMAGE} \
		build --verbose

.PHONY: build-gh
build-gh:
	docker run -it --rm -v "${PWD}:/src/site" --entrypoint github-pages ${GH_PAGE_IMAGE} \
		build --verbose

# 本地浏览（要先执行 make build）
.PHONY: http
http:
	docker run --rm -it -p 4000:80 \
		-v "${PWD}/_doc_builder/Caddyfile:/etc/caddy/Caddyfile" \
		-v "${PWD}/_site:/usr/share/caddy:ro" caddy:2.6.3-alpine

.PHONY: debug-gh-pages
debug-gh-pages:
	docker run -it --rm -p 4000:4000 -v "${PWD}:/src/site" \
		--entrypoint ash \
		${GH_PAGE_IMAGE}

.PHONY: clean-index-md
clean-index-md:
	fd '^index.md' ./*/ | xargs rm -i
