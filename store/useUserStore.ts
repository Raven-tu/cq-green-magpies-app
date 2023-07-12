/*
 * @Author: raven 80778915raventu@gmail.com
 * @Date: 2022-07-25 17:42:23
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-12 15:34:11
 * @FilePath: /cq-green-magpies-app/store/useUserStore.ts
 * @Description: 用户 store
 */
import { acceptHMRUpdate, defineStore } from 'pinia'

import type { UserInfo } from 'type/user'

// 聊天 store
export const useUserStore = defineStore('userStore', () => {
  const userInfo = useState<UserInfo | null>('userInfo', () => null)

  const setUserInfo = (info: UserInfo) => userInfo.value = info

  const getUserInfo = () => userInfo.value

  const getAccessToken = () => useCookie('accessToken').value

  return {
    userInfo,
    setUserInfo,
    getUserInfo,
    getAccessToken,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useChatStore, import.meta.hot))
