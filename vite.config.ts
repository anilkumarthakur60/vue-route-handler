import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from "vite-plugin-dts";
import path from 'path';

import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({

    plugins: [
        vue(),
        vueJsx(),
        VueDevTools(),
        dts()
    ],
    build: {
        copyPublicDir: false,
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "dialoguePlugin",
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            external: ["vue"],
            output: {
                globals: {
                    vue: "Vue",
                },
            },
        },
        sourcemap: true,
        emptyOutDir: true,
        cssCodeSplit: true,
    },
    // css: {
    //     preprocessorOptions: {
    //         scss: {
    //             additionalData: `@import "./src/assets/scss/global.scss";`
    //         }
    //     }
    // },

})
