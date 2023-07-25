/*
 * @Author: raventu
 * @Date: 2023-06-30 13:40:45
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-25 12:20:07
 * @FilePath: /cq-green-magpies-app/server/plugins/wsServer.ts
 * @Description: 启动 ws 服务
 */
import { WebSocketServer } from 'ws'
import jwt from 'jsonwebtoken'
import { WSLogs } from '~/server/utils/helper/logsHelper'

export default defineNitroPlugin((nitroApp) => {
  const wsServerPort = useAppConfig().wsServerPort
  const wss = new WebSocketServer({
    port: wsServerPort,
    verifyClient: ({ req }: any) => {
      const { JWTSECRET } = useRuntimeConfig()

      const queryArr = req.url?.split('?')[1].split('&').map((item: string) => {
        const [key, value] = item.split('=')
        return { [key]: value }
      })

      const accessToken = queryArr.find((item: any) => item.accessToken)?.accessToken ?? ''
      let user
      console.log('[verifyClient] start validate')
      // 如果token过期会TokenExpiredError
      if (accessToken) {
        try {
          user = jwt.verify(accessToken, JWTSECRET)
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
