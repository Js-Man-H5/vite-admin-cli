<!--
 * @Author: jack.hai
 * @Date: 2022-11-22 10:22:48
 * @LastEditTime: 2022-11-25 15:02:13
 * @Description:
-->

<template>
    <div class="container">
        <router-view></router-view>
        {{ name }}
    </div>
</template>

<script lang="ts" setup>
// let { user } = store();
const name = ref("jack");
</script>
<style scoped lang="less">
.container {
    color: red;
    font-size: 20px;
    .item {
        color: blue;
        font-size: 15px;
    }
}
</style>
