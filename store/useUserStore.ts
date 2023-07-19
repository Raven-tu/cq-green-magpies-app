/*
 * @Author: raven 80778915raventu@gmail.com
 * @Date: 2022-07-25 17:42:23
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-19 11:14:01
 * @FilePath: /cq-green-magpies-app/store/useUserStore.ts
 * @Description: 用户 store
 */
import { acceptHMRUpdate, defineStore } from 'pinia'

import type { UserInfo } from 'type/user'

export interface TypeLoginInfo {
  nickname: string
  user_id: number
}
// 聊天 store
export const useUserStore = defineStore('userStore', () => {
  const userInfo = useState<UserInfo | null>('userInfo', () => null)
  const LoginInfo = useState<TypeLoginInfo | null>('LoginInfo', () => null)

  const cleanUserInfo = () => {
    userInfo.value = null
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
    navigateTo('/login')
  }

  return {
    setUserInfo: (info: UserInfo) => userInfo.value = info,
    getUserInfo: () => userInfo.value,
    getAccessToken: () => useCookie('accessToken').value,
    getLoginInfo: () => LoginInfo.value,
    setLoginInfo: (info: TypeLoginInfo) => LoginInfo.value = info,
    cleanUserInfo,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useChatStore, import.meta.hot))
