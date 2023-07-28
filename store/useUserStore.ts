/*
 * @Author: raven 80778915raventu@gmail.com
 * @Date: 2022-07-25 17:42:23
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-28 17:50:19
 * @FilePath: /cq-green-magpies-app/store/useUserStore.ts
 * @Description: 用户 store
 */
import { acceptHMRUpdate, defineStore } from 'pinia'

import type { UserInfo } from 'type/user'

export interface TypeLoginInfo {
  nickname: string
  user_id: number
}

export const useUserStore = defineStore('userStore', () => {
  const userInfo = useState<UserInfo | null>('userInfo', () => null)
  const LoginInfo = useState<TypeLoginInfo | null>('LoginInfo', () => null)
  const accessToken = useState<string >('accessToken', () => '')
  const cookieToken = useCookie('accessToken', { maxAge: 60 * 60 * 24, path: '/' })

  const cleanUserInfo = () => {
    userInfo.value = null
    cookieToken.value = null
    accessToken.value = ''
    useCookie('accessToken')
    navigateTo('/login')
  }

  const setUserInfo = (info: UserInfo) => {
    userInfo.value = info
    accessToken.value = info.token
    cookieToken.value = info.token
  }

  return {
    setUserInfo,
    getUserInfo: () => userInfo.value,
    getAccessToken: () => accessToken.value,
    getLoginInfo: () => LoginInfo.value,
    setLoginInfo: (info: TypeLoginInfo) => (LoginInfo.value = info),
    cleanUserInfo,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useChatStore, import.meta.hot))
