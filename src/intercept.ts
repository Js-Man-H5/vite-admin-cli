/*
 * @Author: jack.hai
 * @Date: 2022-12-26 16:53:04
 * @LastEditTime: 2023-04-19 16:03:29
 * @Description:
 */
import router from "./router/index";
import axios from "axios";
import * as Sentry from "@sentry/vue";
import { message } from "ant-design-vue";
import { removeSession } from "@/utils/auth";
import { quitLogin, filterObjectEmpty } from "@/utils/tool";
import versionCheckWorker from "./workers/versionCheckWorker?worker";

let checkWorker: Worker | undefined;
const appVersion = __APP_VERSION__;
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

router.beforeEach((to, from, next) => {
    if (window.location.hostname !== "localhost") {
        versionCheck(to.fullPath);
    }
    next();
});

axios.interceptors.request.use(
    function (config) {
        const { loading } = store();
        loading.setLoadingStart();
        if (config.method == "get") {
            config.params = filterObjectEmpty(config.params);
        } else {
            config.data = filterObjectEmpty(config.data);
        }
        return config;
    },
    function (error) {
        message.error("接口异常,请联系管理员", 3, () => {
            quitLogin();
        });
        // 对请求错误做些什么
        return Promise.reject(error);
    },
);

// 添加响应拦截器
axios.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么
        const { loading } = store();
        const { data } = response;
        loading.setHideLoading();
        let result;
        // 处理blob异常
        const type = Object.prototype.toString.call(data).replace(/(\[object )|]/g, "");
        if (type === "Blob") {
            verifyBlob(data);
        }
        if (data.code) {
            switch (data.code) {
                case 200:
                    result = data.result ?? null;
                    break;
                case 401:
                    {
                        result = "-";
                        source.cancel("登录过期，请重新登录");
                        removeSession("token");
                        Sentry.captureMessage("登录过期，请重新登录");
                        message.warning("登录过期，请重新登录", 3, () => {
                            quitLogin();
                        });
                    }
                    break;
                case 402:
                    {
                        result = "-";
                        source.cancel("没有权限请联系运维同事或管理员开通");
                        Sentry.captureMessage("没有权限请联系运维同事或管理员开通");
                        message.warning("没有权限请联系运维同事或管理员开通", 3, () => {
                            quitLogin();
                            removeSession("token");
                        });
                    }
                    break;
                case 400:
                    break;

                case 500:
                    result = "-";
                    Sentry.captureMessage(data.message);
                    message.warning(data.message);
                    break;
                case 501:
                    result = "-";
                    message.warning(data.message);
                    break;
                default:
                    result = data;
                    break;
            }
            return result;
        } else {
            return data;
        }
    },
    function (error) {
        if (error && error.response && error.response.status === 401) {
            source.cancel("登录过期，请重新登录");
            removeSession("token");
            Sentry.captureMessage("登录过期，请重新登录");
            message.warning("登录过期，请重新登录", 3, () => {
                quitLogin();
            });
        }
        if (error.code === "ERR_NETWORK") {
            source.cancel("网络异常");
            message.warning("网络异常", 3, () => {
                quitLogin();
            });
        }
        const { loading } = store();
        loading.setHideLoading();
        // 对响应错误做点什么
        return Promise.reject(error);
    },
);

// 验证blob
const verifyBlob = (blob: Blob) => {
    if (blob.type !== "application/json") return;
    const reader = new FileReader(); // 创建读取文件对象
    reader.addEventListener("loadend", function () {
        const res = JSON.parse(reader.result as string); // 返回的数据
        message.warning(res.message);
    });
    reader.readAsText(blob, "utf-8");
};

/**
 * 通过web worker检测版本发布，以修复版本发布时，用户长时间停留页面导致无法跳转的问题
 */
if (!checkWorker && window.location.hostname !== "localhost") {
    checkWorker = new versionCheckWorker();
    checkWorker.onmessage = async (e) => {
        const url = location.origin + "/ci-web/";
        const versionFileUrl = `${url}version.txt`;
        const data = await fetch(versionFileUrl, { headers: { "Cache-Control": "no-cache", "Content-Type": "text" }, method: "GET" });
        const text = await data.text();
        if (text !== appVersion) {
            window.location.assign(`${import.meta.env.VITE_APP_BASE_URL}${e.data.toPath}`);
        }
    };
    checkWorker.onmessageerror = (e) => {
        checkWorker?.terminate();
        console.error("worker异常", e);
    };
}

/**
 * 版本检查
 */
const versionCheck = (toPath: string) => {
    if (checkWorker) {
        checkWorker.postMessage({ currentVersion: appVersion, toPath });
    }
};
