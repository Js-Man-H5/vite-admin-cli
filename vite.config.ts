/*
 * @Author: jack.hai
 * @Date: 2022-11-22 10:22:48
 * @LastEditTime: 2023-04-19 16:30:39
 * @Description:
 */
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
import { getVersion } from "./src/workers/worker";
// import vitePluginSentryCli from "rollup-plugin-sentry";
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    // console.log(env);
    return {
        build: {
            sourcemap: false,
            reportCompressedSize: false,
            rollupOptions: {
                output: {
                    manualChunks: {
                        vue: ["vue", "vue-router", "pinia", "pinia-plugin-persistedstate"],
                        antDesignVue: ["ant-design-vue", "@ant-design/icons-vue"],
                    },
                },
            },
        },
        define: {
            __APP_VERSION__: env.NODE_ENV === "development" ? "0" : JSON.stringify(getVersion()),
        },
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
        optimizeDeps: {
            include: [
                "ant-design-vue/es/date-picker/style",
                "ant-design-vue/es/form/style",
                "ant-design-vue/es/upload/style",
                "ant-design-vue/es/modal/style",
                "ant-design-vue/es/radio/style",
                "ant-design-vue/es/input/style",
                "ant-design-vue/es/image/style",
                "ant-design-vue/es/card/style",
                "ant-design-vue/es/button/style",
                "ant-design-vue/es/table/style",
                "ant-design-vue/es/tooltip/style",
                "ant-design-vue/es/select/style",
                "ant-design-vue/es/popconfirm/style",
                "ant-design-vue/es/divider/style",
                "ant-design-vue/es/tag/style",
                "ant-design-vue/es/switch/style",
                "ant-design-vue/es/empty/style",
                "ant-design-vue/es/slider/style",
                "lodash/throttle",
                "ant-design-vue/es/tabs/style",
                "echarts",
            ],
        },
        plugins: [
            vue(),
            // vitePluginSentryCli({
            //     url: "https://ideas.ibaiqiu.com/",
            //     authToken: "bdfe0d50944b4a6bad981e6c7f79cd77e95ed0f3d65c44249b1fdc6533d55e2a",
            //     org: "sentry",
            //     project: "test",
            //     release: "TEST-UAT",
            //     include: ["dist/assets"],
            //     ignore: ["node_modules", "vite.config.ts"],
            //     urlPrefix: "~/assets",
            //     cleanArtifacts: true,
            //     vscRemote: false,
            // }),

            AutoImport({
                include: [
                    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                    /\.vue$/,
                    /\.vue\?vue/, // .vue
                    /\.md$/, // .md
                ],
                imports: ["vue", "vue-router", "pinia", { "@/api/index": [["*", "api"]] }, { "@/store": [["default", "store"]] }],
                resolvers: [AntDesignVueResolver()],
                dirs: ["./src/hooks"],
                dts: "./src/auto-imports.d.ts",
                eslintrc: {
                    enabled: false,
                    filepath: "./.eslintrc-auto-import.json",
                    globalsPropValue: true,
                },
            }),
            Components({
                dts: "./src/components.d.ts",
                dirs: ["./src/components"],
                resolvers: [AntDesignVueResolver({ importStyle: "less", resolveIcons: true })],
            }),
        ],
        resolve: {
            alias: [
                {
                    find: "@",
                    replacement: resolve(__dirname, "src"),
                },
                {
                    find: "public",
                    replacement: resolve(__dirname, "public"),
                },
            ],
        },
    };
});
