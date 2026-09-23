# Shortcuts for the site. Recipes use only npm/node so they work the same
# in cmd, PowerShell, Git Bash and CI.

PORT ?= 4173

.PHONY: help install dev build serve serve-build preview test media cv clean

help:
	@echo make install  - install dependencies
	@echo make dev      - development server with hot reload, http://localhost:5173
	@echo make build    - production build in dist/
	@echo make serve    - development server with hot reload, http://localhost:$(PORT)
	@echo make serve-build - build, then serve dist/ like GitHub Pages, http://localhost:$(PORT)
	@echo make preview  - serve the existing dist/ without rebuilding
	@echo make test     - build, then check pages, media, CV and IT/EN texts
	@echo make media    - regenerate thumbnails and portrait
	@echo make cv       - regenerate the CV PDFs
	@echo make clean    - remove dist/

install:
	npm install

dev:
	npm run dev

build:
	npm run build

serve:
	npm run dev -- --port $(PORT)

serve-build: build preview

preview:
	npx vite preview --port $(PORT)

test: build
	node scripts/smoke-test.mjs

media:
	npm run media

cv:
	npm run generate:cv

clean:
	node -e "require('fs').rmSync('dist', { recursive: true, force: true })"
