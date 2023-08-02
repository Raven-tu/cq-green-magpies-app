/*
 * @Author: raventu
 * @Date: 2023-06-30 13:40:45
 * @LastEditors: raventu
 * @LastEditTime: 2023-08-02 10:54:34
 * @FilePath: /cq-green-magpies-app/server/plugins/wsServer.ts
 * @Description: 启动 ws 服务
 */
import { WebSocketServer } from 'ws'
import jwt from 'jsonwebtoken'

export default defineNitroPlugin(() => {
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
    // 第一次连接成功后发送的消息。
    const sendObj = { message: 'connection successful', retCode: 200, userAgent: 'nuxt-server' }
    ws.send(JSON.stringify(sendObj))
  })
  // 向 global 中添加 nuxt ws
  globalThis.wss = wss
})
