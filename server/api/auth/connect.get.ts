/*
 * @Author: raventu
 * @Date: 2023-06-27 18:11:26
 * @LastEditors: raventu
 * @LastEditTime: 2023-08-09 13:37:55
 * @FilePath: /cq-green-magpies-app/server/api/auth/connect.get.ts
 * @Description: 连接到 nuxt ws
 */
import { resolve } from 'node:path'
import WebSocket from 'ws'
import { jsonc } from 'jsonc'

export default defineEventHandler(async (event) => {
  // 请求头中获取  accessToken
  const reqAccessToken = getHeader(event, 'Authorization')
  // 读取配置文件
  const __dirname = resolve()
  const CONF_PATH = resolve(__dirname, './server/config/CQ.jsonc')
  const CQ_CONF = jsonc.readSync(CONF_PATH)
  const { host } = CQ_CONF
  const wssPort = useAppConfig().wsServerPort
  // 已经连接转发ws
  if (globalThis.ws)
    return responseObject(200, 'is ready', {})

  try {
    const wsQuery = () => {
      const accessToken = ((reqAccessToken ?? '').replace('Bearer ', ''))
      return `?accessToken=${accessToken}`
    }
    const wsPath = `ws://127.0.0.1:${wssPort}/${wsQuery()}`
    const ws = new WebSocket(wsPath)
    // 向 global 中添加 nuxt ws
    globalThis.ws = ws
    const botInstance = globalThis.cqBot

    // nuxt api 转发消息
    ws.on('message', (data) => {
      try {
        const wsMsg = JSON.parse(data.toString())
        if (wsMsg.from === 'nt-server') {
          const { action, params, echo } = wsMsg
          botInstance?.call(action, action, params)
            .then((res) => {
              ws.send(JSON.stringify({ ...res, echo }))
            }).catch((err) => {
              ws.send(JSON.stringify(err))
            })
        }
      }
      catch (e) {
        console.error(e)
      }
    })

    return responseObject(200, 'ok', {
      host,
    })
  }
  catch (error: any) {
    return responseObject(400, error.message, {})
  }
})
