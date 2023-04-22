import { resolve } from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import pages from "vite-plugin-pages";

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "~": resolve(__dirname, "./src"),
        },
    },
    plugins: [
        react(),
        pages({
            dirs: "./src/routes",
            importMode: "sync",
            routeStyle: "remix",
            exclude: ["**/models/**"],
        }),
    ],
    server: {
        proxy: {
            "/api": {
                target: "http://127.0.0.1:8000",
                changeOrigin: true,
            },
            "/ws": {
                target: "http://127.0.0.1:8000",
                changeOrigin: true,
                ws: true,
            },
        },
    },
});
