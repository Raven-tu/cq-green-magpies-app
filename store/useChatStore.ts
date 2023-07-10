/*
 * @Author: raven 80778915raventu@gmail.com
 * @Date: 2022-07-25 17:42:23
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-10 15:25:56
 * @FilePath: /cq-green-magpies-app/store/useChatStore.ts
 * @Description:  聊天 store
 */
import { defineStore } from 'pinia'
import type { TypeFriendItem, TypeGroupItem } from '@/api/cq'

type TypeChatInfo = TypeFriendItem | TypeGroupItem

// 聊天 store
export const useChatStore = defineStore('chatStore', () => {
  const activeChat = ref<TypeChatInfo | null>(null)

  const activeChatType = computed(() => {
    if (!activeChat.value)
      return 'empty'
    else
      return 'group_id' in activeChat.value ? 'group' : 'private'
  })

  const getActiveChat = <T extends 'group' | 'private'>(type: T) => {
    return (activeChat.value ?? {}) as (T extends 'group' ? TypeGroupItem : TypeFriendItem)
  }

  const setActiveChat = (chat: TypeChatInfo) => activeChat.value = chat

  return {
    activeChat,
    activeChatType,
    setActiveChat,
    getActiveChat,
  }
})
