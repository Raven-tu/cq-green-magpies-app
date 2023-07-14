/*
 * @Author: raventu
 * @Date: 2023-06-27 18:11:26
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-14 09:43:04
 * @FilePath: /cq-green-magpies-app/server/api/auth/check.get.ts
 * @Description: 连接到 nuxt ws
 */
import jwt_decode from 'jwt-decode'
import UserService from '~/server/service/user.service'

export default defineEventHandler(async (event) => {
  // 请求头中获取 cookie 中的 accessToken
  const reqAccessToken = getCookie(event, 'accessToken')

  try {
    const { name } = jwt_decode(reqAccessToken ?? '') as { name: string }

    const { getUserInfo } = UserService

    const res = await getUserInfo({ user_name: name })

    await $fetch('/api/auth/connect', { headers: { cookie: `accessToken=${reqAccessToken}` } })

    return responseObject(200, 'ok', {
      id: res.id,
      name: res.user_name,
      token: reqAccessToken,
    })
  }
  catch (error: any) {
    return responseObject(400, error.message, {})
  }
})
