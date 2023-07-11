/*
 * @Author: raventu
 * @Date: 2023-07-11 17:32:26
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-11 17:48:02
 * @FilePath: /cq-green-magpies-app/server/config/config.ts
 * @Description: server 服务端配置文件
 */

/** 不校验 token api */
export const whiteRouting = [
  '/api/auth/login',
  '/api/auth/register',
]

export default {
  whiteRouting,
}
