/*
 * @Author: jack.hai
 * @Date: 2022-11-23 13:43:29
 * @LastEditTime: 2022-11-23 14:49:08
 * @Description:
 */
import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
const routes: RouteRecordRaw[] = [{ path: "/", component: () => import(/* webpackChunkName: "login" */ "@/views/login/index.vue") }];
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { top: 0 };
    },
});
export default router;
