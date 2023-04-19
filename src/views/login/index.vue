<!--
 * @Author: jack.hai
 * @Date: 2022-11-23 14:45:58
 * @LastEditTime: 2023-04-19 16:31:10
 * @Description:
-->
<template>
    <div>
        11111
        <div class="test">{{ data }}{{ user.name }}</div>
        <a-button type="primary">Primary Button</a-button>
        <a-button type="primary">Primary Button</a-button>

        <step-backward-outlined />

        <HelloWorld msg="1"></HelloWorld>
        {{ name }}{{ userInfo }}
    </div>
</template>
<script setup lang="ts">
const { name } = testHook();
const { userInfo } = userInfoHook();
const { user } = store();
const data = ref(1);
</script>
<style scoped lang="scss">
@import "./style.scss";
</style>
