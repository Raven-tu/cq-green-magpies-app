/*
 * @Author: raventu
 * @Date: 2023-07-20 17:07:58
 * @LastEditors: raventu
 * @LastEditTime: 2023-08-02 17:01:58
 * @FilePath: /cq-green-magpies-app/store/useChatStore.ts
 * @Description:  聊天 store
 */
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { TypeFriendItem, TypeGroupItem } from '@/api/cq'
import type { LogsChatInfo, MsgCtx } from '~/type/CQ'

type TypeChatInfo = TypeFriendItem | TypeGroupItem

// 聊天 store
export const useChatStore = defineStore('chatStore', () => {
  const activeChat = ref<TypeChatInfo | null>(null)
  // 聊天对话框
  const activeChatSet = ref<Set<TypeChatInfo>>(new Set())
  // 历史记录
  const historyChatlogs = ref<LogsChatInfo[]>([])

  const activeChatType = computed(() => {
    if (!activeChat.value)
      return 'empty'
    else
      return 'group_id' in activeChat.value ? 'group' : 'private'
  })

  const getActiveChat = <T extends 'group' | 'private'>(_type: T) => {
    if (activeChat.value)
      activeChatSet.value.add(activeChat.value)

    return (activeChat.value ?? {}) as (T extends 'group' ? TypeGroupItem : TypeFriendItem)
  }

  const setActiveChat = (chat: TypeChatInfo) => activeChat.value = chat

  const formatCQCtx = (msgCtx: Record<string, any>) => {
    // 去掉特殊字符
    const logsInfo: LogsChatInfo = {
      message_type: msgCtx.message_type,
      message: msgCtx.message,
      message_raw: msgCtx.raw_message,
      message_id: msgCtx.message_id,
      target_id: msgCtx.message_type === 'private' ? msgCtx.target_id : msgCtx.group_id,
      sender_id: msgCtx.sender.user_id,
      sender_name: msgCtx.sender.nickname,
      time: msgCtx.time,
      isRecall: false,
    }
    return [logsInfo, msgCtx as MsgCtx] as const
  }

  /** 添加历史聊天记录 */
  const addOldChatlogs = (oldLogs: LogsChatInfo[]) => {
    const reactiveLogs = reactive(oldLogs)
    historyChatlogs.value.push(...reactiveLogs)
  }
  /** 添加新的聊天记录 */
  const addNewChatlogs = (newLogs: LogsChatInfo[]) => {
    const reactiveLogs = reactive(newLogs)
    historyChatlogs.value = [...reactiveLogs, ...historyChatlogs.value]
  }

  return {
    activeChat,
    activeChatSet,
    activeChatType,
    activeChatlogs: historyChatlogs,
    setActiveChat,
    getActiveChat,
    formatCQCtx,
    getHistoryChatlogs: () => historyChatlogs.value, // 获取历史聊天记录
    cleanChatlogs: () => historyChatlogs.value = [], // 清空聊天记录
    addOldChatlogs, // 添加历史聊天记录
    addNewChatlogs, // 添加新的聊天记录
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useChatStore, import.meta.hot))
