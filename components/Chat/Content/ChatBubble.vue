<!--
 * @Author: raventu
 * @Date: 2023-07-14 16:51:01
 * @LastEditors: raventu
 * @LastEditTime: 2023-08-11 16:57:53
 * @FilePath: /cq-green-magpies-app/components/Chat/Content/ChatBubble.vue
 * @Description: 聊天气泡
-->
<script lang='ts' setup>
import dayjs from 'dayjs'
import CQRender from '~/components/Chat/Content/CQRender.vue'
import type { LogsChatInfo } from '~/type/CQ'
import { getQQUserAvatar } from '~/utils/qq'
import type { PropschatInfo } from '~/type/chat'
import type { TypeLoginInfo } from '~/store/useUserStore'
import { parseCQObj } from '~/utils/CQcode'

const Props = defineProps<{
  chatInfo: PropschatInfo
  chatLogs: LogsChatInfo
  loginInfo: TypeLoginInfo | null
}>()

const isMysend = computed(() => Props.chatLogs.sender_id === Props.loginInfo?.user_id)

const parseCQMsg = computed(() => {
  const msg = Props.chatLogs.message_raw
  return parseCQObj(msg)
})

function formatTime(time: string | number | Date) {
  return dayjs(time).format('YYYY/MM/DD HH:mm')
}
</script>

<template>
  <div class="chat-bubble mt-4 flex flex-row space-x-4" :class="isMysend ? '' : 'justify-start'">
    <div
      class="bub-avatar h-10 w-10 overflow-hidden rounded-xl bg-gray-300 dark:bg-gray-600"
      :class="isMysend ? 'order-2 ml-4' : ''"
    >
      <img :src="getQQUserAvatar(Props.chatLogs.sender_id)" alt="userAvatar">
    </div>

    <div class="bub-content flex flex-1 flex-col justify-start" :class="isMysend ? 'order-1 text-right' : ''">
      <div class="bub-content-header space-x-4">
        <span class="bub-content-header-name">
          {{ Props.chatLogs.sender_name }}
        </span>
        <span class="bub-content-header-time">
          {{ formatTime(Props.chatLogs.time * 1000) }}
        </span>
      </div>
      <div class="bub-content-body">
        <CQRender v-if="parseCQMsg.length > 0" :parse-msg="parseCQMsg" />
      </div>
    </div>
  </div>
</template>
