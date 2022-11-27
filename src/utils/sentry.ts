/*
 * @Author: jack.hai
 * @Date: 2022-11-03 15:41:15
 * @LastEditTime: 2022-11-27 18:47:56
 * @Description:
 */
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";
import type { App } from "vue";
import type { Router } from "vue-router";

// import viteSentry from "vite-plugin-sentry";
export const errorHandler = (app: App<Element>, router: Router) => {
    if (import.meta.env.MODE !== "production") {
        return false;
    }
    // const userInfo = localStorage.getItem("bi-userInfo") ? JSON.parse(localStorage.getItem("bi-userInfo")) : null;
    // Sentry.setUser({
    //     name: userInfo?.nickName,
    //     username: userInfo?.username,
    //     email: userInfo?.email,
    // });

    Sentry.init({
        app,
        dsn: "https://fcee42e493194b7190d11620cf0c23a2@ideas.ibaiqiu.com/6",
        integrations: [
            new BrowserTracing({
                routingInstrumentation: Sentry.vueRouterInstrumentation(router),
            }),
        ],
        beforeSend: (event) => {
            // const url = window.location.href.split("/").pop();
            // const routes = router.options.routes;
            // const currentRouter = routes.find((item) => item.path === "/" + url);
            // if (currentRouter) {
            //     event.tags = {
            //         page: currentRouter.meta.title,
            //         ...event.tags,
            //     };
            // }
            return event;
        },
        ignoreErrors: [
            /ResizeObserver loop limit exceeded/i,
            /Non-Error promise rejection captured with keys: errorFields, outOfDate, values/i,
            /ResizeObserver loop completed with undelivered notifications/i,
        ],
        environment: process.env.VUE_APP_BASE_ERR_ENV,
        //  是否开启堆栈跟踪，开启后跟着消息一起收集
        attachStacktrace: true,
        tracesSampleRate: 1.0,
        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
    });
};
