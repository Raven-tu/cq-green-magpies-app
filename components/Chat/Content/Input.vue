<!--
 * @Author: raventu
 * @Date: 2023-07-10 14:44:39
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-10 15:21:57
 * @FilePath: /cq-green-magpies-app/components/Chat/Content/Input.vue
 * @Description: 消息输入框
-->
<script lang='ts' setup>
const Props = defineProps<{
  chatInfo: {
    avatar: string
    title: string
    id: number
  }
}>()
</script>

<template>
  <div class="w-full flex flex-center flex-row rounded-2xl bg-gray-200 p-2 space-x-2 dark:bg-gray-700">
    <!-- 输入框 -->
    <input class="h-8 w-full resize-y rounded-xl p-4 outline-none" bg="gray-300 dark:gray-600" type="text">
    <!-- 发送按钮 -->
    <button
      class="flex-center"
      rounded-xl
    >
      <div class="i-material-symbols-send-outline dark:i-material-symbols-send h-5 w-5" />
    </button>
  </div>
</template>
