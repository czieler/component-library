import { readdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

async function collectJavaScriptFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectJavaScriptFiles(path)));
    } else if (extname(entry.name) === ".js") {
      files.push(path);
    }
  }

  return files;
}

const files = await collectJavaScriptFiles(fileURLToPath(new URL("../src", import.meta.url)));
let failed = false;

for (const file of files) {
  const result = spawnSync(process.execPath, ["--check", file], { stdio: "inherit" });
  if (result.status !== 0) failed = true;
}

if (failed) process.exit(1);
console.log(`Checked ${files.length} JavaScript files.`);
