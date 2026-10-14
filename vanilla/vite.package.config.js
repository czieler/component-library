import { defineConfig } from "vite";
import { resolve } from "node:path";
export default defineConfig({
  build: {
    outDir: "dist-package", emptyOutDir: false,
    lib: { entry: resolve(import.meta.dirname, "src/index.js"), formats: ["es"], fileName: () => "index.js" },
  },
});
