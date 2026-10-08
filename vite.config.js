import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({ base: "/date-countdown-tool/", build: { sourcemap: false }, plugins: [react()] });
