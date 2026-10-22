# Commit and release workflow

Run `sh tools/install-hooks.sh` after cloning. Python 3, Git, and an authenticated `grok` CLI are required. Hooks are repository-local and must be installed on each clone.

Each repository owns its own `VERSION` and `Changelog.txt`. The website also synchronizes package.json and package-lock.json. Use Conventional Commits:

- `feat: ...` increases the minor version.
- `fix: ...`, `perf: ...`, and `revert: ...` increase the patch version.
- `feat!: ...` or a `BREAKING CHANGE:` footer increases the major version.
- Other accepted types (`docs`, `style`, `refactor`, `test`, `build`, `ci`, `chore`) retain the version and add a changelog entry.

The commit-msg hook calculates from the last committed version, calls Grok, then stages release metadata and stops the first attempt. Retry the identical commit command: the hook recognizes the prepared tree and permits the commit, including the metadata. This two-pass flow is necessary because Git prepares its commit tree before commit-msg runs. Any staged change or different message requires preparation again. Failed Grok calls block the commit. Retry after fixing authentication or connectivity. Do not manually stage unrelated edits in release metadata. Repeated hook runs calculate from HEAD rather than repeatedly increasing the version. These hooks are intended for new commits; amendments and history rewrites require deliberate release-metadata review.

Grok receives only the scanned commit message and staged diff statistics, in an isolated temporary directory with tools, subagents, and web search disabled. It never receives source diffs. Its existing local login is used; do not put credentials in this repository. Review generated notes after committing and before pushing.

The pre-commit hook scans every indexed blob, rejecting credential paths, private keys, and common token patterns. This is a useful guard, not a guarantee that every possible secret can be detected. Do not bypass hooks. Run `python3 tools/commit_release.py --scan` for a manual scan. Nothing here pushes or publishes changes.

Configure signing locally with your existing signing key and enable `commit.gpgsign`. SSH signing requires registering the public key as a signing key with your Git hosting provider for its verified badge; the private key must stay outside the repository.
