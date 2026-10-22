"""Tests run against disposable repositories and a fake Grok executable."""
import importlib.util
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest

SOURCE = Path(__file__).with_name('commit_release.py')
spec = importlib.util.spec_from_file_location('release', SOURCE)
release = importlib.util.module_from_spec(spec)
spec.loader.exec_module(release)


class Rules(unittest.TestCase):
    def test_versions(self):
        for message, expected in [('feat: add', '1.3.0'), ('fix(ui): repair', '1.2.4'),
                                  ('perf: improve', '1.2.4'), ('docs: clarify', '1.2.3'),
                                  ('feat!: remove', '2.0.0'),
                                  ('fix: repair\n\nBREAKING CHANGE: changed format', '2.0.0')]:
            self.assertEqual(release.release_version(message, '1.2.3'), expected)
        with self.assertRaises(ValueError):
            release.release_version('random message', '1.2.3')

    def test_credentials(self):
        for name, data in [('.env.local', b'foo'), ('private.pem', b'foo'),
                           ('x', b'-----BEGIN ' + b'OPENSSH PRIVATE KEY-----'),
                           ('x', b'xai-' + b'a' * 32)]:
            with self.assertRaises(ValueError):
                release.scan(name, data)
        release.scan('README.md', b'Read credentials from the environment.')

    def test_hook_transaction_and_retry(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            def git(*args):
                return subprocess.run(['git', *args], cwd=root, check=True, capture_output=True)
            git('init', '-b', 'main')
            git('config', 'user.name', 'Hook Test')
            git('config', 'user.email', 'test@example.invalid')
            git('config', 'commit.gpgsign', 'false')
            (root / 'VERSION').write_text('0.1.0\n')
            git('add', 'VERSION'); git('commit', '-m', 'feat: baseline')
            shutil.copy(SOURCE, root / 'release.py')
            executable = root / 'bin'; executable.mkdir()
            grok = executable / 'grok'
            grok.write_text('#!/bin/sh\nprintf "%s\\n" "- Test release note."\n')
            grok.chmod(0o755)
            env = dict(os.environ, PATH=str(executable) + os.pathsep + os.environ['PATH'])
            (root / 'message').write_text('feat: new feature')
            (root / 'feature.txt').write_text('Hello')
            git('add', 'feature.txt')
            def run():
                return subprocess.run(['python3', 'release.py', 'message'], cwd=root, env=env, capture_output=True)
            self.assertEqual(run().returncode, 0)
            self.assertEqual((root / 'VERSION').read_text(), '0.2.0\n')
            self.assertEqual(run().returncode, 0)
            self.assertEqual((root / 'Changelog.txt').read_text().count('Test release note'), 1)
            before = (root / 'Changelog.txt').read_bytes()
            grok.write_text('#!/bin/sh\nexit 1\n')
            self.assertNotEqual(run().returncode, 0)
            self.assertEqual((root / 'Changelog.txt').read_bytes(), before)
            (root / '.env.local').write_text('secret')
            git('add', '-f', '.env.local')
            self.assertNotEqual(run().returncode, 0)


if __name__ == '__main__':
    unittest.main()
