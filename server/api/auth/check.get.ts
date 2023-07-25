/*
 * @Author: raventu
 * @Date: 2023-06-27 18:11:26
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-25 12:18:10
 * @FilePath: /cq-green-magpies-app/server/api/auth/check.get.ts
 * @Description: 连接到 nuxt ws
 */
import jwt_decode from 'jwt-decode'
import UserService from '~/server/service/user.service'

export default defineEventHandler(async (event) => {
  // 请求头中获取  accessToken
  const reqAccessToken = getHeader(event, 'Authorization')

  try {
    const { name } = jwt_decode(reqAccessToken ?? '') as { name: string }

    const { getUserInfo } = UserService

    const res = await getUserInfo({ user_name: name })

    const AccessToken = reqAccessToken?.split(' ')[1] ?? ''

    await $fetch('/api/auth/connect', { headers: { Authorization: reqAccessToken ?? '' } })

    return responseObject(200, 'ok', {
      id: res.id,
      name: res.user_name,
      token: AccessToken,
    })
  }
  catch (error: any) {
    return responseObject(400, error.message, {})
  }
})
