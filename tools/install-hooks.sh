#!/bin/sh
set -eu
cd "$(git rev-parse --show-toplevel)"
git config --local core.hooksPath .githooks
printf '%s\n' 'Installed credential scan and Conventional Commit release hooks.'
