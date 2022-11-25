/*
 * @Author: jack.hai
 * @Date: 2022-11-22 10:22:48
 * @LastEditTime: 2022-11-25 13:55:00
 * @Description:
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
export default defineConfig({
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                modifyVars: {
                    "@primary-color": "#000000", // 全局主色
                    "@font-size-base": "12px", // 主字号
                    "@card-head-padding": "14px", // 卡片
                    "@card-head-font-size": "12px", // 卡片字体大小
                    "@btn-height-base": "30px",
                    "@card-radius": "4px",
                    "@table-padding-vertical": "10px",
                    "@table-padding-horizontal": "18px",
                    "@background-color-light": "#F2F6FC",
                    "@input-padding-vertical-base": "5px",
                },
            },
        },
    },
    plugins: [
        vue(),
        AutoImport({
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/,
                /\.vue\?vue/, // .vue
                /\.md$/, // .md
            ],
            imports: ["vue", "vue-router", "pinia", { "@/api/index": [["*", "api"]] }, { "@/store": [["default", "store"]] }],
            resolvers: [AntDesignVueResolver()],
            dts: "src/auto-imports.d.ts",
            eslintrc: {
                enabled: false,
                filepath: "./.eslintrc-auto-import.json",
                globalsPropValue: true,
            },
        }),
        Components({
            dts: "./src/components.d.ts",
            dirs: ["./src/components", "./src/hooks"],
            resolvers: [AntDesignVueResolver({ importStyle: "less" })],
        }),
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
});
