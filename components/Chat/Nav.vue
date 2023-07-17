<!--
 * @Author: raventu
 * @Date: 2023-07-07 13:12:37
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-17 15:50:44
 * @FilePath: /cq-green-magpies-app/components/Chat/Nav.vue
 * @Description: 聊天侧边栏
-->
<script lang='ts' setup>
import Dialog from '~/components/Chat/Nav/Dialog.vue'
import Friend from '~/components/Chat/Nav/Friend.vue'

const filter = ref('')
</script>

<template>
  <div
    class="flex-0 h-[calc(100vh-30px)] w-300PX flex flex-col items-stretch justify-start overflow-y-auto p-4 space-y-4"
    bg="gray-200 dark:gray-700"
  >
    <!-- 搜索 -->
    <div class="w-full rounded-2xl space-y-4">
      <div class="w-full flex flex-center flex-row rounded-2xl bg-gray-200 p-2 space-x-2 dark:bg-gray-700">
        <!-- 输入框 -->
        <div class="i-material-symbols-search h-5 w-5" />
        <input v-model="filter" class="h-8 w-full resize-y rounded-xl p-4 outline-none" bg="gray-300 dark:gray-600" type="text">
      </div>
    </div>
    <!-- 保留对话 -->
    <Dialog :filter="filter" />
    <!-- 好友列表 -->
    <Friend :filter="filter" />
  </div>
</template>
