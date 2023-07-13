/*
 * @Author: raventu
 * @Date: 2023-06-30 13:40:45
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-13 17:10:29
 * @FilePath: /cq-green-magpies-app/server/plugins/wsServer.ts
 * @Description: 启动 ws 服务
 */
import { WebSocketServer } from 'ws'
import jwt from 'jsonwebtoken'
import { WSLogs } from '~/server/utils/helper/logsHelper'

export default defineNitroPlugin((nitroApp) => {
  const wss = new WebSocketServer({
    port: 4000,
    verifyClient: ({ req }: any) => {
      const { JWTSECRET } = useRuntimeConfig()
      const accessToken = req.headers.cookie?.split(';').find((c: string) => c.trim().startsWith('accessToken='))
      let user
      console.log('[verifyClient] start validate')
      // 如果token过期会爆TokenExpiredError
      if (accessToken) {
        try {
          const tokenVal = accessToken.split('=')[1]
          user = jwt.verify(tokenVal, JWTSECRET)
        }
        catch (e) {
          return false
        }
      }

      return !!user
    },
  })
  wss.on('connection', (ws) => {
    ws.on('error', console.error)
    // 客户端
    ws.on('message', (data) => {
      // 去掉转义字符
      const s = data.toString()
      WSLogs(s)
      // 服务器广播
      // 广播到所有连接的WebSocket客户端，包括其自身。
      wss.clients.forEach((client) => {
        // 判断当前连接服务端的所有客户端的ws用户。
        // client!==ws 表示不是当前发送的用户[不要自己广播自己]
        if (client !== ws) {
          // binary表示数据是否是二进制。binary:false表示不是二进制
          client.send(data, { binary: false })
        }
      })
    })
    // 第一次连接成功后发送的消息。
    const sendObj = { message: 'connection successful', retCode: 200, userAgent: 'nuxt-server' }
    ws.send(JSON.stringify(sendObj))
  })
  // 向 global 中添加 nuxt ws
  globalThis.wss = wss
})
