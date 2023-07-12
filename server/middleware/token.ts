/*
 * @Author: raventu
 * @Date: 2023-07-11 16:34:29
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-12 16:23:25
 * @FilePath: /cq-green-magpies-app/server/middleware/token.ts
 * @Description: 权限校验
 */

import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const reqUrl = event.node.req.url
  const isApi = reqUrl?.startsWith('/api')

  if (checkEscapeRouting(reqUrl ?? '') || !isApi)
    return
  console.log(`New request: ${event.node.req.url}`)

  const { JWTSECRET } = useRuntimeConfig()

  // header中获取token
  try {
    // const authorization = getHeader(event, 'authorization')
    // const token = (authorization || '').replace('Bearer ', '')
    const token = getCookie(event, 'accessToken')
    const verify = jwt.verify(token ?? '', JWTSECRET)
    if (verify)
      event.context.user = verify
  }
  catch (error: any) {
    console.log(`token verify error ${error.name}`)
    switch (error.name) {
      case 'TokenExpiredError':
        return responseObject(401, 'User login has expired', {})
      case 'JsonWebTokenError':
        return responseObject(401, 'Invalid Token', {})
      default:
        return responseObject(401, error.message, {})
    }
  }
})
