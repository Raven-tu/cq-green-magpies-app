<!--
 * @Author: raventu
 * @Date: 2023-07-10 14:31:33
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-10 14:50:48
 * @FilePath: /cq-green-magpies-app/components/Chat/Content/title.vue
 * @Description: 聊天窗口标题
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
  <div class="flex flex-row items-center justify-between">
    <div
      class="w-full flex flex-row items-center justify-start rounded-2xl p-4 space-x-2 space-x-4"
      bg="gray-200 dark:gray-700"
    >
      <div class="h-10 w-10 overflow-hidden rounded-xl bg-gray-300 dark:bg-gray-600">
        <img :src="Props.chatInfo?.avatar" alt="chatAvatar">
      </div>
      <div class="flex flex-col items-start justify-center">
        <span class="text-lg font-bold">{{ Props.chatInfo?.title }}</span>
        <span class="text-sm">{{ Props.chatInfo?.id }}</span>
      </div>
    </div>
  </div>
</template>
