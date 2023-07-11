/*
 * @Author: raventu
 * @Date: 2023-07-11 16:34:29
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-11 17:46:50
 * @FilePath: /cq-green-magpies-app/server/middleware/token.ts
 * @Description: 权限校验
 */

import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  console.log(`New request: ${event.node.req.url}`)

  const reqUrl = event.node.req.url
  if (checkEscapeRouting(reqUrl ?? ''))
    return

  const { JWTSECRET } = useRuntimeConfig()

  // header中获取token
  try {
    const authorization = getHeader(event, 'authorization')
    const token = (authorization || '').replace('Bearer ', '')
    const verify = jwt.verify(token, JWTSECRET)
    if (verify)
      event.context.user = verify
  }
  catch (error: any) {
    console.log(`token verify error ${error.name}`)
    switch (error.name) {
      case 'TokenExpiredError':
        return responseObject(500, 'User login has expired', {})
      case 'JsonWebTokenError':
        return responseObject(500, 'Invalid Token', {})
      default:
        return responseObject(500, 'Invalid Token', {})
    }
  }
})
