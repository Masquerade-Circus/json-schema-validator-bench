import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const suiteLicense = `Copyright (c) 2012 Julian Berman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.`;

test("public package metadata declares Apache-2.0 and blocks accidental publication", async () => {
  const packageJson = JSON.parse(await readFile(new URL("package.json", root), "utf8"));

  assert.equal(packageJson.license, "Apache-2.0");
  assert.equal(packageJson.private, true);
  for (const field of ["author", "owner", "repository", "homepage"]) {
    assert.equal(Object.hasOwn(packageJson, field), false, field);
  }
});

test("third-party notices preserve the locked JSON Schema Test Suite license", async () => {
  const lock = JSON.parse(await readFile(new URL("suite-lock.json", root), "utf8"));
  const notices = await readFile(new URL("THIRD_PARTY_NOTICES", root), "utf8");

  assert.match(notices, new RegExp(`Commit: ${lock.commit}`));
  assert.equal(notices.includes(suiteLicense), true);
  assert.match(notices, /metaschemas\/NOTICE-AJV/);
  assert.match(notices, /metaschemas\/NOTICE-REDOCLY-AJV/);
});
