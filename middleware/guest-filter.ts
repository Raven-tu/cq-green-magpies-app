/*
 * @Author: raventu
 * @Date: 2023-07-11 18:09:34
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-12 16:20:19
 * @FilePath: /cq-green-magpies-app/middleware/guest-filter.ts
 * @Description: 过滤未登录用户
 */

import { useJwt } from '@vueuse/integrations/useJwt'
import { routerWhiteList } from '~/config/CT'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useCookie('accessToken').value ?? ''
  const { payload } = useJwt(user)
  const val = payload.value as unknown as { name: string; exp: number }
  const isExpired = Date.now() >= (val?.exp ?? 1) * 1000
  const certify = !isExpired && (val?.name as string ?? '').length > 0
  //  白名单
  if (routerWhiteList.includes(to.name as string))
    return

  if (!certify)
    return navigateTo({ name: 'login', replace: true })
})
