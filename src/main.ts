/*
 * @Author: jack.hai
 * @Date: 2022-11-22 10:22:48
 * @LastEditTime: 2022-11-24 15:29:45
 * @Description:
 */
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createPinia } from "pinia";
import router from "./router/";
import "ant-design-vue/dist/antd.less";
const store = createPinia();
store.use(piniaPluginPersistedstate);
const app = createApp(App);
app.use(store).use(router).mount("#app");
