/*
 * @Author: raven 80778915raventu@gmail.com
 * @Date: 2022-07-25 17:42:23
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-14 11:13:27
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

  const cleanUserInfo = () => {
    userInfo.value = null
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
    navigateTo('/login')
  }

  return {
    userInfo,
    setUserInfo,
    getUserInfo,
    getAccessToken,
    cleanUserInfo,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useChatStore, import.meta.hot))