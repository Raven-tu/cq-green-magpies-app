/*
 * @Author: raventu
 * @Date: 2023-08-01 17:05:49
 * @LastEditors: raventu
 * @LastEditTime: 2023-08-02 18:00:15
 * @FilePath: /cq-green-magpies-app/store/useNoticeStore.ts
 * @Description: 消息通知store
 */
import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { h } from 'vue'
import { NAvatar, useNotification } from 'naive-ui'
import dayjs from 'dayjs'
import { useClientWsStore } from '~/store/useClientWsStore'
import { useChatStore } from '~/store/useChatStore'
import { ellipsisMsg, getQQGroupAvatar, getQQUserAvatar } from '~/utils/qq'
import type { LogsChatInfo } from '~/type/CQ'

export const useNoticeStore = defineStore('noticeStore', () => {
  const { clientWs, connectFlag } = storeToRefs(useClientWsStore())
  const chatStore = useChatStore()
  const notification = useNotification()

  const sendNotice = (logsInfo: LogsChatInfo) => {
    notification.create({
      title: logsInfo.sender_name,
      description: ellipsisMsg(logsInfo.message, 60),
      // content: logsInfo.message,
      meta: dayjs(logsInfo.time * 1000).format('YYYY-MM-DD HH:mm:ss'),
      keepAliveOnHover: true, // 鼠标悬浮时不关闭
      duration: 3000, // 3s后自动关闭
      avatar: () =>
        h(NAvatar, {
          size: 'small',
          round: true,
          src: logsInfo.message_type === 'private' ? getQQUserAvatar(logsInfo.sender_id) : getQQGroupAvatar(logsInfo.target_id),
        }),
    })
  }

  // 处理消息通知
  const handleWSCMsg = (msg: string) => {
    const msgObj = JSON.parse(msg)
    switch (msgObj.post_type) {
      case 'meta_event':
        break
      case 'message': {
        const [logsInfo] = chatStore.formatCQCtx(msgObj)
        sendNotice(logsInfo)
        if (msgObj.message_type === 'private') {
          const friend = chatStore.getActiveChat('private')
          // 当前聊天窗口是该好友
          if (friend.user_id === msgObj.sender.user_id)
            chatStore.addNewChatlogs([logsInfo])
        }
        else if (msgObj.message_type === 'group') {
          const group = chatStore.getActiveChat('group')
          // 当前聊天窗口是该群
          if (group.group_id === msgObj.group_id)
            chatStore.addNewChatlogs([logsInfo])
        }
        break
      }
      default:
        // debugger
        break
    }
  }

  watchOnce(connectFlag, () => {
    if (clientWs.value?.status === 'OPEN') {
      if (clientWs.value.ws) {
        clientWs.value.ws.onmessage = (event: MessageEvent) => {
          handleWSCMsg(event.data)
        }
      }
    }
  })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useChatStore, import.meta.hot))
