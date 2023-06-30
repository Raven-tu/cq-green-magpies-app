/*
 * @Author: raventu
 * @Date: 2023-06-30 13:40:45
 * @LastEditors: raventu
 * @LastEditTime: 2023-06-30 18:02:28
 * @FilePath: /cq-green-magpies-app/modules/wsServer.ts
 * @Description: 启动 ws 服务
 */
import { WebSocketServer } from 'ws'
import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  setup(options, nuxt) {
    let wss: InstanceType<typeof WebSocketServer>
    nuxt.hook('listen', (server) => {
      // 关闭
      nuxt.hook('close', () => wss.close())
      // 启动
      console.log('setup nuxt3-websocket')
      wss = new WebSocketServer({ port: 4000 })
      wss.on('connection', (ws) => {
        ws.on('error', console.error)
        // 客户端
        ws.on('message', (data) => {
          console.log('received:', data.toString())
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
    })
    nuxt.hook('nitro:build:before', (nitro) => {
      nitro.options.runtimeConfig.wss = wss
      nitro.options.appConfig.wss = wss
    })
  },
})
