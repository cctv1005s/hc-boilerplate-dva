VERSION = $(shell node -e "console.log(require('./package.json').version)")
BUILD_NO = $(shell node -e "console.log(require('./package.json').build)")
APP_NAME = $(shell node -e "console.log(require('./package.json').name)")

install:
	@yarn install --registry=https://registry.npm.taobao.org
	@cd assets && yarn install --registry=https://registry.npm.taobao.org

release: front
	@echo "env: ${env}"
	@mkdir -p out/release
	@if [ -d assets/.package ]; then\
		rsync -av . out/release --exclude .git --exclude node_modules --exclude out --exclude test --exclude assets;\
		mv assets/.package out/release/assets;\
	else\
		rsync -av . out/release --exclude .git --exclude node_modules --exclude out --exclude test;\
	fi
	@cd out/release && NODE_ENV=${env} yarn install --registry=https://registry.npm.taobao.org
	@if [ -f out/release/config/config_${env}.js ]; then\
		cp out/release/config/config_${env}.js out/release/config/config.js;\
	fi

package: release
	@cd out/release/config && cat config_production.js > config.js
	@cd out && mv release ${APP_NAME}_$(VERSION)_$(BUILD_NO)
	@cd out && tar -czf ${APP_NAME}_$(VERSION)_$(BUILD_NO).tgz ${APP_NAME}_$(VERSION)_$(BUILD_NO)


front:
	@echo "building assets..."
	@yarn install --registry=https://registry.npm.taobao.org
	@cd assets && NODE_ENV=development yarn install --registry=https://registry.npm.taobao.org
	@cd assets && ../node_modules/.bin/honeypack build
	@if [ -d assets/static ]; then\
		cp -r assets/static assets/.package/static;\
	fi
	@echo "assets build done\n"

cover:
	@node_modules/.bin/istanbul cover node_modules/.bin/_mocha -- $(shell find test -name *.test.js)

clean:
	@rm -rf node_modules assets/node_modules

.PHONY: install release front test cover clean
