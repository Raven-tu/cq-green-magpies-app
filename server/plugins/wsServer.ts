/*
 * @Author: raventu
 * @Date: 2023-06-30 13:40:45
 * @LastEditors: raventu 
 * @LastEditTime: 2023-07-05 13:47:00
 * @FilePath: /cq-green-magpies-app/server/plugins/wsServer.ts
 * @Description: 启动 ws 服务
 */
import { WebSocketServer } from 'ws'

export default defineNitroPlugin((nitroApp) => {
  const wss = new WebSocketServer({ port: 4000 })
  wss.on('connection', (ws) => {
    ws.on('error', console.error)
    // 客户端
    ws.on('message', (data) => {
      // 去掉转义字符
      let s = data.toString()
      s = s.replace(/[\'\"\\\/\b\f\n\r\t]/g, '')
      // 去掉特殊字符
      console.log(`received:${s}`)
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
  global.wss = wss
})
