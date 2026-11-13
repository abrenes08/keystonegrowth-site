#!/bin/sh
# Prepare an ignored static preview without changing the production hosting setup.
set -eu
mkdir -p dist
cp index.html privacy.html terms.html thank-you.html swipe-file.html favicon.svg favicon.ico 404.html sitemap.xml robots.txt dist/
cp -R assets en es dist/
