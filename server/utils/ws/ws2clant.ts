/*
 * @Author: raventu
 * @Date: 2023-06-30 10:09:29
 * @LastEditors: raventu
 * @LastEditTime: 2023-06-30 11:05:09
 * @FilePath: /cq-green-magpies-app/server/utils/ws/ws.ts
 * @Description:
 */
import WebSocket from 'ws'

const messageList = [
  {
    id: 1,
    msg: '你好啊小卡冷静下来就想啊想啊睡了多久啊索朗多吉啦设计达拉斯就到啦世界的理解啦啦啦啊但是',
    to: 'MDQ6VXNlcjE=',
    from: 'MDQ6VXNlcjI=',
    updateTime: '15:23',
  },
]

class WS {
  online: number
  ws: null | WebSocket.Server
  constructor() {
    this.online = 0
    this.ws = null
  }

  init(server) {
    // 创建实例
    this.ws = new WebSocket.Server({ port: 9000 })
    this.ws.on('connection', async (ws, request) => {
      ws.on('message', async (msg) => {
        console.log(`客户端发送数据给服务端了: ${msg}`)
        const newMsg = JSON.parse(msg)
        messageList.push(newMsg)
        const sendObj = { message: '连接成功', retCode: 200, messageList }
        ws.send(JSON.stringify(sendObj))
        this.ws?.clients.forEach((client) => {
          client.send(JSON.stringify(sendObj))
        })
      })
      if (!(request.url?.includes('?id=')))
        return ws.close()

      this.online = this.ws?._server._connections ?? 0
      console.log(`socket当前在线${this.online}个连接`)

      // const {
      //   id,
      // } = qs.parse(qs.parse(request.url.slice(2)))

      // if (!id)
      //   return ws.close()

      try {
        // do something
        ws.id = id // 添加ws实例的唯一标识
        const obj = {
          message: '连接成功', retCode: 200, messageList,
        }
        ws.send(JSON.stringify(obj))
      }
      catch (error) {
        console.log('websocket connection error', error)
        return ws.close()
      }
    })
  }

  // 发送客户端数据
  sendToCliect(Data) {
    let iskeep = false // 加个变量做下发成功判断
    if (!(this.ws instanceof WebSocket.Server))
      return iskeep

    const { id } = Data
    this.ws.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN && client.id === id) {
        // 发送给指定匹配id
        client.send(JSON.stringify(Data))
        iskeep = true
      }
    })
    return iskeep
  }
}

export default new WS()
