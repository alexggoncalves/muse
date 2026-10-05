import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "/",
    server: {
        proxy: {
            "/aic-img": {
                target: "https://www.artic.edu",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/aic-img/, "/iiif/2"),
                headers: {
                    "AIC-User-Agent":
                        "MUSE (https://github.com/alexggoncalves/muse)",
                },
            },
        },
    },
});
