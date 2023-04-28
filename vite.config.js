import {fileURLToPath, URL} from "node:url";

import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  "plugins": [vue()],
  "resolve": {
    "alias": {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  "server": {
    "base": import.meta.env.DEV ? import.meta.env.VITE_DEV_BASE_URL : import.meta.env.VITE_PROD_BASE_URL,
    "host": "0.0.0.0"
  }
});
