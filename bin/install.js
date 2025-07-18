#!/usr/bin/env node
import child_process from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function installUnix() {
  const installScriptURL = "https://stately.cloud/install";
  const installScriptPath = path.join(__dirname, "install-stately.sh");

  const packageJson = JSON.parse(
    (await fs.readFile(new URL("../package.json", import.meta.url))).toString("utf8"),
  );

  const res = await fetch(installScriptURL);
  await fs.writeFile(installScriptPath, res.body, { mode: 0o755 });

  try {
    child_process.execFileSync(installScriptPath, [], {
      stdio: "inherit",
      env: {
        STATELY_VERSION_OVERRIDE: `v${packageJson.version}`,
        INSTALL_DIR: "./bin",
      },
    });
  } finally {
    await fs.rm(installScriptPath);
  }
}

async function install() {
  if (process.platform === "win32") {
    console.warn(
      "Stately CLI is not supported on Windows yet. Please use the Stately CLI via WSL or on a Unix-based system.",
    );
    process.exit(1);
  } else {
    await installUnix();
  }
}

void install();
