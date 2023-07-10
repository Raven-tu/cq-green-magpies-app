<!--
 * @Author: raventu
 * @Date: 2023-07-07 13:12:37
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-10 14:37:54
 * @FilePath: /cq-green-magpies-app/components/Chat/Nav.vue
 * @Description: 聊天侧边栏
-->
<script lang='ts' setup>
import Dialog from '~/components/Chat/Nav/Dialog.vue'
import Friend from '~/components/Chat/Nav/Friend.vue'
</script>

<template>
  <div
    class="h-full w-300PX flex flex-col items-center justify-start p-4 space-y-4" bg="gray-200 dark:gray-700"
  >
    <!-- 好友列表 -->
    <Friend />
    <!-- 保留对话 -->
    <Dialog />
  </div>
</template>
