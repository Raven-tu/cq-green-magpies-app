/*
 * @Author: raven 80778915raventu@gmail.com
 * @Date: 2022-07-25 17:42:23
 * @LastEditors: raventu
 * @LastEditTime: 2023-08-23 15:11:40
 * @FilePath: /cq-green-magpies-app/store/useAppStore.ts
 * @Description:  全局 store
 */
import { acceptHMRUpdate, defineStore } from 'pinia'

interface TypeKeyBoolean {
  title: string
  val: boolean
}

interface TypeAppState {
  message_notification: TypeKeyBoolean // 消息通知
  message_web_notification: TypeKeyBoolean //  web 消息通知
}

// 全局 store
export const useAppStore = defineStore('appStore', () => {
  // 设置
  const chatSettings: TypeAppState = {
    message_notification: {
      title: '消息通知',
      val: true,
    },
    //  web 消息通知
    message_web_notification: {
      title: 'web 消息通知',
      val: true,
    },
  }

  return {
    chatSettings,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
