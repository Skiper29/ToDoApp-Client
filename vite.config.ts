import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@models": path.resolve(__dirname, "src/models"),
            "@components": path.resolve(__dirname, "src/components"),
            "@api": path.resolve(__dirname, "src/api"),
            "@utils": path.resolve(__dirname, "src/utils"),
            "@hooks": path.resolve(__dirname, "src/hooks"),
            "@constants": path.resolve(__dirname, "src/constants"),
            "@pages": path.resolve(__dirname, "src/pages"),
            "@theme": path.resolve(__dirname, "src/theme"),
            "@store": path.resolve(__dirname, "src/store"),
            "@assets": path.resolve(__dirname, "src/assets"),
            "@features": path.resolve(__dirname, "src/features"),
        },
    },
});