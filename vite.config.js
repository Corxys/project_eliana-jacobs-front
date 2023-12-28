import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// See: https://vitejs.dev/config/
export default defineConfig({
	build: {
		chunkSizeWarningLimit: 2000,
	},
	plugins: [vue()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	server: {
		base: "/",
		host: "127.0.0.1",
	},
});
