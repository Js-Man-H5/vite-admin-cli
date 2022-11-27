<!--
 * @Author: jack.hai
 * @Date: 2022-11-22 10:22:48
 * @LastEditTime: 2022-11-26 21:12:24
 * @Description: 
-->
# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

-   [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:


## vsCode安装插件

esLint、styleLint

## 安装依赖

yarn


## 安装husky

yarn prepare

## eslint不生效？

yarn lint

## 项目启动

yarn dev

## 组件格式
    └── 组件名称 xxxx
        ├── components ---子组件
        ├── hooks ---hooks
        ├── index.vue ---默认都为index
        ├── style.scss ---样式文件
        └── type.ts ---ts类型文件