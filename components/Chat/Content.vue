<!--
 * @Author: raventu
 * @Date: 2023-07-10 09:29:53
 * @LastEditors: raventu
 * @LastEditTime: 2023-08-02 16:12:36
 * @FilePath: /cq-green-magpies-app/components/Chat/Content.vue
 * @Description: 聊天窗口
-->
<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import Title from '~/components/Chat/Content/Title.vue'
import Input from '~/components/Chat/Content/Input.vue'
import History from '~/components/Chat/Content/History.vue'
import { useChatStore } from '~/store/useChatStore'

const { activeChatType } = storeToRefs(useChatStore())
const { getActiveChat } = useChatStore()

const sendMsgCount = useState<number>('sendMsgCount', () => 0)

const chatInfo = computed(() => {
  return {
    type: activeChatType.value !== 'empty' ? activeChatType.value : 'private' as 'private' | 'group',
    avatar: activeChatType.value === 'group' ? `https://p.qlogo.cn/gh/${getActiveChat('group').group_id}/${getActiveChat('group').group_id}/0` : `https://q1.qlogo.cn/g?b=qq&s=0&nk=${getActiveChat('private').user_id}`,
    title: activeChatType.value === 'group' ? getActiveChat('group').group_name : getActiveChat('private').nickname,
    id: activeChatType.value === 'group' ? getActiveChat('group').group_id : getActiveChat('private').user_id,
  }
})
</script>

<template>
  <div class="h-[calc(100vh-30px)] w-full flex flex-1 overflow-hidden">
    <!-- 非空 -->
    <div v-show="activeChatType !== 'empty'" class="flex flex-1 flex-col overflow-hidden p-4">
      <!-- 头部信息 -->
      <Title :chat-info="chatInfo" />
      <!-- 聊天记录 -->
      <History :chat-info="chatInfo" :send-msg="sendMsgCount" />
      <!-- 输入框 -->
      <Input :chat-info="chatInfo" @on-send-msg="sendMsgCount++" />
    </div>
    <!-- 空 -->
    <div v-show="activeChatType === 'empty'" class="flex flex-1 flex-col items-center justify-center">
      <div class="i-material-symbols-chat-empty h-20 w-20" />
      <div class="mt-2 text-sm text-gray-400 dark:text-gray-500">
        暂无聊天
      </div>
    </div>
  </div>
</template>

<style lang='less' scoped>
</style>
