/*
 * @Author: raventu
 * @Date: 2023-07-11 18:09:34
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-12 10:29:19
 * @FilePath: /cq-green-magpies-app/middleware/guest-filter.ts
 * @Description: 过滤未登录用户
 */

import type { UserWithoutPassword } from '~/type/user'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useState<UserWithoutPassword | null>('user', () => null)

  if (to.name === 'login')
    return

  if (!user.value)
    return navigateTo({ name: 'login', replace: true })
})
