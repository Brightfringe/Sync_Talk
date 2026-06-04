import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    define: {
      global: {},
    },
    server: {
      port: 8081,  // ← add this
    },
  },
});