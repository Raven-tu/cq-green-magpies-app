/*
 * @Author: raventu
 * @Date: 2023-07-12 10:10:58
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-12 10:42:17
 * @FilePath: /cq-green-magpies-app/plugins/dynamicMid.ts
 * @Description:  动态中间件 全局注册
 */
import guestFilter from '~/middleware/guest-filter'

export default defineNuxtPlugin(() => {
  // 未登录用户过滤
  addRouteMiddleware('guest-filter', guestFilter, { global: true })
})
