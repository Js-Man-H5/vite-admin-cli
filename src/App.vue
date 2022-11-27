<!--
 * @Author: jack.hai
 * @Date: 2022-11-22 10:22:48
 * @LastEditTime: 2022-11-27 15:39:06
 * @Description:
-->

<template>
    <div class="container">
        <router-view></router-view>
    </div>
</template>

<script lang="ts" setup>
// let { user } = store();
console.log(import.meta.env);
</script>
<style scoped lang="scss">
.container {
    color: red;
    font-size: 20px;
    .item {
        color: blue;
        font-size: 15px;
    }
}
</style>
