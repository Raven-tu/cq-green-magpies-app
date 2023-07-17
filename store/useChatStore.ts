/*
 * @Author: raven 80778915raventu@gmail.com
 * @Date: 2022-07-25 17:42:23
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-17 15:18:12
 * @FilePath: /cq-green-magpies-app/store/useChatStore.ts
 * @Description:  聊天 store
 */
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { TypeFriendItem, TypeGroupItem } from '@/api/cq'

type TypeChatInfo = TypeFriendItem | TypeGroupItem

// 聊天 store
export const useChatStore = defineStore('chatStore', () => {
  const activeChat = ref<TypeChatInfo | null>(null)

  const activeChatSet = ref<Set<TypeChatInfo>>(new Set())

  const activeChatType = computed(() => {
    if (!activeChat.value)
      return 'empty'
    else
      return 'group_id' in activeChat.value ? 'group' : 'private'
  })

  const getActiveChat = <T extends 'group' | 'private'>(type: T) => {
    if (activeChat.value)
      activeChatSet.value.add(activeChat.value)

    return (activeChat.value ?? {}) as (T extends 'group' ? TypeGroupItem : TypeFriendItem)
  }

  const setActiveChat = (chat: TypeChatInfo) => activeChat.value = chat

  return {
    activeChat,
    activeChatSet,
    activeChatType,
    setActiveChat,
    getActiveChat,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useChatStore, import.meta.hot))
