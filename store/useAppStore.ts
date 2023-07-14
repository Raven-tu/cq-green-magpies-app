/*
 * @Author: raven 80778915raventu@gmail.com
 * @Date: 2022-07-25 17:42:23
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-14 11:13:02
 * @FilePath: /cq-green-magpies-app/store/useAppStore.ts
 * @Description:  全局 store
 */
import { acceptHMRUpdate, defineStore } from 'pinia'

// 全局 store
export const useAppStore = defineStore('appStore', () => {
  return {

  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
