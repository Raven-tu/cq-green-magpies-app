<!--
 * @Author: raventu
 * @Date: 2023-07-10 14:44:39
 * @LastEditors: raventu
 * @LastEditTime: 2023-08-02 16:24:02
 * @FilePath: /cq-green-magpies-app/components/Chat/Content/Input.vue
 * @Description: 消息输入框
-->
<script lang='ts' setup>
import type { PropschatInfo } from '~/type/chat'
import type { TypeMessageItem } from '~/api/cq/index'
import { addChatLogs } from '~/api/chat/index'
import { getMessages, sendGroupMsg, sendPrivateMsg } from '~/api/cq/index'
import type { LogsChatInfo } from '~/type/CQ'
import { useChatStore } from '~/store/useChatStore'

const Props = defineProps<{
  chatInfo: PropschatInfo
}>()
const emit = defineEmits(['onSendMsg'])
const { addNewChatlogs } = useChatStore()
const msgInput = ref('')

function trans2ChatLogs(msgInfo: TypeMessageItem, target_id: number) {
  const transMsg: LogsChatInfo = {
    message_type: msgInfo.message_type as 'private' | 'group',
    message: msgInfo.message,
    message_raw: msgInfo.message,
    message_id: msgInfo.message_id,
    target_id,
    sender_id: msgInfo.sender.user_id,
    sender_name: msgInfo.sender.nickname,
    time: msgInfo.time,
    isRecall: false,
  }
  return transMsg
}

async function sendMsg() {
  const { data: sentMsg } = Props.chatInfo.type === 'group' ? await sendGroupMsg(Props.chatInfo.id, msgInput.value) : await sendPrivateMsg(Props.chatInfo.id, msgInput.value)
  // 发送消息 失败return
  if (!sentMsg.value)
    return console.error('发送消息失败')

  const { data: receivedMsg } = await getMessages(sentMsg.value?.data.message_id)
  // 获取消息失败则 失败return
  if (!receivedMsg.value)
    return console.error('获取消息失败')

  const transMsg = trans2ChatLogs(receivedMsg.value?.data, Props.chatInfo.id)
  // 添加到聊天记录 首位
  addNewChatlogs([transMsg])
  addChatLogs(transMsg.target_id, transMsg.message_type, transMsg)
  msgInput.value = ''
  emit('onSendMsg')
}

function handleKeyUp(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey)
    sendMsg()
  else if (e.key === 'Enter' && e.shiftKey)
    msgInput.value += '\n'
}
</script>

<template>
  <div class="w-full flex flex-center flex-row rounded-2xl bg-gray-200 p-2 space-x-2 dark:bg-gray-700">
    <!-- 输入框 -->
    <n-input
      v-model:value="msgInput"
      placeholder=""
      autofocus
      round
      clearable
      type="textarea"
      :autosize="{
        minRows: 2,
        maxRows: 5,
      }"
      @keyup="handleKeyUp"
    />
    <!-- 发送按钮 -->
    <button
      class="flex-center"
      rounded-xl
      @click="sendMsg"
    >
      <div class="i-material-symbols-send-outline dark:i-material-symbols-send h-5 w-5" />
    </button>
  </div>
</template>
