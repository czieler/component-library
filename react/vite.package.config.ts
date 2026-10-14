import { defineConfig } from "vite";
import { resolve } from "node:path";
export default defineConfig({
  build: {
    outDir: "dist-package", emptyOutDir: false,
    lib: { entry: resolve(import.meta.dirname, "src/index.ts"), formats: ["es"], fileName: () => "index.js" },
    rollupOptions: { external: ["react", "react-dom", "react/jsx-runtime", "lucide-react"] },
  },
});
