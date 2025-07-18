#!/usr/bin/env node

/**
 * This file is a pass-through for the actual stately binary. It exists because
 * for two reasons:
 *
 * - Yarn does not allow references to anything other than .js files in the
 *   "bin" field in package.json.
 * - Windows does not allow executing binaries that don't end in .exe, and we
 *   need the package.json "bin" field to point to the same file on all
 *   platforms.
 */

import child_process from "node:child_process";
import path from "node:path";
import process from "node:process";
import url from "node:url";

const ext = process.platform === "win32" ? ".exe" : "";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  child_process.execFileSync(path.resolve(__dirname, "stately" + ext), process.argv.slice(2), {
    stdio: "inherit",
    env: {
      ...process.env,
      // We don't want the CLI to update itself automatically when run from the
      // install script - in this mode, the version is managed by the install
      // wrapper.
      STATELY_SKIP_UPDATE: "true",
    },
  });
} catch (err) {
  if ("status" in err) process.exit(err.status);
  throw err;
}
