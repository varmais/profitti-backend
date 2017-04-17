#!/usr/bin/env bash
mocha --require test-setup.js --compilers js:babel-core/register --watch `find . -path ./node_modules -prune -o -name "$1.spec.js" | xargs`