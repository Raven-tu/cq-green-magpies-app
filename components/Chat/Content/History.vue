<!--
 * @Author: raventu
 * @Date: 2023-07-10 14:44:39
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-18 18:21:28
 * @FilePath: /cq-green-magpies-app/components/Chat/Content/History.vue
 * @Description: 消息历史记录
-->
<script lang='ts' setup>
import ChatBubble from '~/components/Chat/Content/ChatBubble.vue'
import { getChatLogs } from '~/api/chat'
import type { LogsChatInfo } from '~/type/CQ'
import type { PropschatInfo } from '~/type/chat'

const Props = defineProps<{
  chatInfo: PropschatInfo
}>()

const chatLogs = inject<Ref<LogsChatInfo[]>>('chatLogs', useState<LogsChatInfo[]>('chatLogs', () => []))
const reverseChatLogs = computed(() => Object.assign([], chatLogs.value).reverse())

// 监听聊天栏目切换
watch(() => Props.chatInfo.id, async () => {
  chatLogs.value = []
  const res = await getChatLogs(Props.chatInfo.type, Props.chatInfo.id, 1, 10)
  chatLogs.value.push(...res.data.rows)
})
</script>

<template>
  <div class="h-20 w-full flex-1 overflow-hidden">
    <ul class="h-full overflow-y-auto py-4">
      <li v-for="(item, index) in reverseChatLogs" :key="index">
        <ChatBubble :chat-info="Props.chatInfo" :chat-logs="item" />
      </li>
    </ul>
  </div>
</template>

<style lang='less' scoped></style>
