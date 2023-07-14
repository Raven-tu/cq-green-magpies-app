<!--
 * @Author: raventu
 * @Date: 2023-07-14 16:51:01
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-14 17:48:44
 * @FilePath: /cq-green-magpies-app/components/Chat/Content/ChatBubble.vue
 * @Description: 聊天气泡
-->
<script lang='ts' setup>
import dayjs from 'dayjs'
import type { LogsChatInfo } from '~/type/CQ'
import { getQQUserAvatar } from '~/utils/qq'

//
import type { PropschatInfo } from '~/type/chat'

const Props = defineProps<{
  chatInfo: PropschatInfo
  chatLogs: LogsChatInfo
}>()

function formatTime(time: string | number | Date) {
  return dayjs(time).format('YYYY/MM/DD HH:mm')
}
</script>

<template>
  <div class="chat-bubble mt-4 flex flex-row justify-start space-x-4">
    <div class="bub-avatar h-10 w-10 overflow-hidden rounded-xl bg-gray-300 dark:bg-gray-600">
      <img :src="getQQUserAvatar(Props.chatLogs.sender_id) " alt="userAvatar">
    </div>

    <div class="bub-content flex flex-1 flex-col justify-start">
      <div class="bub-content-header space-x-4">
        <span class="bub-content-header-name">
          {{ Props.chatLogs.sender_name }}
        </span>
        <span class="bub-content-header-time">
          {{ formatTime(Props.chatLogs.time * 1000) }}
        </span>
      </div>
      <div class="bub-content-body">
        {{ Props.chatLogs.message }}
      </div>
    </div>
  </div>
</template>
