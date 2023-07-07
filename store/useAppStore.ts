/*
 * @Author: raven 80778915raventu@gmail.com
 * @Date: 2022-07-25 17:42:23
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-07 11:23:03
 * @FilePath: /cq-green-magpies-app/store/useAppStore.ts
 * @Description:  全局 store
 */
import { defineStore } from 'pinia'

// 全局 store
export const useAppStore = defineStore('appStore', () => {
  const connectFlag = ref(false)
  const wsc = ref<InstanceType<typeof WebSocket> | null>(null)

  const setWsc = (ws: InstanceType<typeof WebSocket>) => {
    wsc.value = ws
    connectFlag.value = true
  }

  return {
    wsc,
    connectFlag,
    setWsc,
  }
})
