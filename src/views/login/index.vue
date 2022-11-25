<!--
 * @Author: jack.hai
 * @Date: 2022-11-23 14:45:58
 * @LastEditTime: 2022-11-25 13:55:21
 * @Description:
-->
<template>
    <div>
        11111
        {{ data }}{{ user.name }}
        <a-button type="primary">Primary Button</a-button>
        <HelloWorld msg="1"></HelloWorld>
    </div>
</template>
<script setup lang="ts">
const { user } = store();
const data = ref(1);
</script>
