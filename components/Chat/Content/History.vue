<!--
 * @Author: raventu
 * @Date: 2023-07-10 14:44:39
 * @LastEditors: raventu
 * @LastEditTime: 2023-08-02 17:31:24
 * @FilePath: /cq-green-magpies-app/components/Chat/Content/History.vue
 * @Description: 消息历史记录
-->
<script lang='ts' setup>
import ChatBubble from '~/components/Chat/Content/ChatBubble.vue'
import { getChatLogs } from '~/api/chat'
import type { PropschatInfo } from '~/type/chat'
import { useUserStore } from '~/store/useUserStore'
import { useChatStore } from '~/store/useChatStore'

const Props = defineProps<{
  chatInfo: PropschatInfo
  sendMsg: number
}>()
const { getLoginInfo } = useUserStore()
const { addOldChatlogs, cleanChatlogs, getHistoryChatlogs } = useChatStore()

const refEl = ref()
const { arrivedState } = useScroll(refEl, { behavior: 'smooth' })
const { bottom } = toRefs(arrivedState)
const chatLogs = computed(() => getHistoryChatlogs())
const loginInfo = computed(() => getLoginInfo())
const reverseChatLogs = computed(() => Object.assign([], chatLogs.value).reverse())

function scrollToBottom(isSmooth = false) {
  if (refEl.value) {
    const scrollHeight = refEl.value.scrollHeight
    refEl.value.scrollTo({
      top: scrollHeight,
      behavior: isSmooth ? 'smooth' : 'auto',
    })
  }
}

// 监听聊天栏目切换
watch(() => Props.chatInfo.id, async () => {
  cleanChatlogs()
  const { data } = await getChatLogs(Props.chatInfo.type, Props.chatInfo.id, 1, 25)
  addOldChatlogs(data.value?.data.rows ?? [])
  await nextTick()
  scrollToBottom()
})
// 监听发送消息
watch(() => Props.sendMsg, async () => {
  await nextTick()
  scrollToBottom(true)
})
// 监听聊天信息长度 如果 滚动条在底部 则滚动到底部
watch(() => chatLogs.value.length, async () => {
  if (bottom.value) {
    await nextTick()
    scrollToBottom(true)
  }
})
</script>

<template>
  <div class="my-2 h-20 w-full flex-1 overflow-hidden">
    <ul ref="refEl" class="h-full overflow-y-scroll px-4">
      <li v-for="(item, index) in reverseChatLogs" :key="index">
        <ChatBubble :chat-info="Props.chatInfo" :chat-logs="item" :login-info="loginInfo" />
      </li>
    </ul>
  </div>
</template>
