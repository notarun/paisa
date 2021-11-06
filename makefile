NPM = npm
OUT = dist
SRC = $(shell find src/*)

COMMIT_HASH = $(shell git rev-parse HEAD)
GIT_USER    = $(shell git config user.name)
GIT_EMAIL   = $(shell git config user.email)
GIT_REPO    = $(shell git config remote.origin.url)

.PHONY: $(OUT)
$(OUT): node_modules $(SRC)
	@echo "Generating output"
	mkdir -p $(OUT)
	npm run build

$(OUT)/CNAME:
	echo "paisa.ragingpointer.com" > $@

.PHONY: node_modules
node_modules: package.json
	@echo "Installing dependencies"
	$(NPM) install

.PHONY: clean
clean:
	@echo "Cleaning"
	rm -rf $(OUT) node_modules

# adapted from https://blog.bloomca.me/2017/12/15/how-to-push-folder-to-github-pages.html
.PHONY: deploy
deploy: clean $(OUT) $(OUT)/CNAME
	@echo "Deploying: $(COMMIT_HASH)"
	cd $(OUT) \
	&& git init \
	&& git config user.name "$(GIT_USER)" \
	&& git config user.email "$(GIT_EMAIL)" \
	&& git add -A \
	&& git commit -m "Deploy to gh-pages @ $(COMMIT_HASH)" \
	&& git remote add origin $(GIT_REPO) \
	&& git push --force origin master:gh-pages
