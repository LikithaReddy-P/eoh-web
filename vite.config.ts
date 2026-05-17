// @lovable.dev/vite-tanstack-config already includes:
// - tanstackStart, viteReact, tailwindcss, tsConfigPaths
// - componentTagger (dev-only), VITE_* env injection
// - @ path alias, React/TanStack dedupe
// - error logger plugins, sandbox detection (port/host/strictPort)

import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "./src/server.ts" },
  },
  vite: {
    // Add custom vite config here if needed
    ssr: {
      noExternal: ["sonner"],
    },
  },
});
