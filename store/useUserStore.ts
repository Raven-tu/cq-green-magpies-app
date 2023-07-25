/*
 * @Author: raven 80778915raventu@gmail.com
 * @Date: 2022-07-25 17:42:23
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-25 11:08:26
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
const CookieKit = {
  set: (name: string, value: string, opt: { path?: string; age?: number }) => {
    document.cookie = `${name}=${value}; path=${opt.path ?? '/'}; max-age=${opt.age ?? '0'}`
  },
  get: (name: string) => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
    if (match)
      return match[2]
    return null
  },
  delete: (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
  },
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
