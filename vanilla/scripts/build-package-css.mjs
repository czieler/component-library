import { mkdtemp, rm, unlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { build } from "vite";

const extension = process.argv[2] || "css";
const stylePath = resolve(`src/package-styles.${extension}`);
const tempDirectory = await mkdtemp(join(tmpdir(), "component-library-styles-"));
const entryPath = join(tempDirectory, "entry.js");

try {
  await writeFile(entryPath, `import ${JSON.stringify(stylePath)};\n`);
  await build({
    configFile: false,
    build: {
      outDir: "dist-package",
      emptyOutDir: false,
      lib: {
        entry: entryPath,
        formats: ["es"],
        fileName: () => "_style-entry.js",
        cssFileName: "styles",
      },
    },
  });
  await unlink(resolve("dist-package/_style-entry.js"));
} finally {
  await rm(tempDirectory, { recursive: true, force: true });
}
