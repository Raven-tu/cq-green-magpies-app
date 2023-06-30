/*
 * @Author: raventu
 * @Date: 2023-06-30 11:06:22
 * @LastEditors: raventu
 * @LastEditTime: 2023-06-30 17:44:38
 * @FilePath: /cq-green-magpies-app/server/utils/ws/ws2cq.ts
 * @Description:  用于测试 cq-websocket 的连接
 */
// momocow/node-cq-websocket 配置，请参考 https://github.com/Tsuk1ko/node-cq-websocket/blob/master/docs/api/CQWebSocket.md#isready
import { CQWebSocket } from '@tsuk1ko/cq-websocket'

const defultConfig = {
  host: '127.0.0.1',
  // "host": "127.0.0.1",
  port: 6800,
  enableAPI: true,
  enableEvent: true,
  accessToken: '',
  reconnection: false,
  reconnectionAttempts: 3,
  reconnectionDelay: 3500,
}

function testWs2cq(host: string, port: number, accessToken = ''): Promise<[string, CQWebSocket]> {
  const bot = new CQWebSocket({
    ...defultConfig,
    host,
    port,
    accessToken,
  })

  bot.connect()

  return new Promise((resolve, reject) => {
    bot
      .on('socket.connect', (wsType, sock, attempts) => {
        console.log(`连接成功[${wsType}]#${attempts}`)
        resolve([`连接成功[${wsType}]#${attempts}`, bot])
      })
      .on('socket.failed', (wsType, attempts) => {
        console.log(`连接失败[${wsType}]#${attempts}`)
        reject(new Error(`连接失败[${wsType}]#${attempts}`))
      })
  })
}

export {
  testWs2cq,
}
