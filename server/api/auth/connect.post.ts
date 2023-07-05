/*
 * @Author: raventu
 * @Date: 2023-06-27 18:11:26
 * @LastEditors: raventu 
 * @LastEditTime: 2023-07-05 14:38:46
 * @FilePath: /cq-green-magpies-app/server/api/auth/connect.post.ts
 * @Description:
 */
import Joi from 'joi'
import WebSocket from 'ws'
import { responseJson } from '~/server/utils/helper'
import { testWs2cq } from '~/server/utils/ws/ws2cq'

export default defineEventHandler(async (event) => {
  // 获取 query
  const body = await readBody(event)
  const { host, prefix, port, accessToken } = body
  // 校验数据joi
  const schema = Joi.object({
    host: Joi.string().required()
      .pattern(/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/),
    port: Joi.number().optional().default(6800),
    accessToken: Joi.string().optional().default('').allow(''),
  })
  try {
    await schema.validateAsync(body)
  }
  catch (err: any) {
    return responseJson(400, err.stack, {})
  }

  try {
    const [msg, botInstance] = await testWs2cq(host, port, accessToken)
    // 向 global 中添加 cqBot
    global.cqBot = botInstance
    const ws = new WebSocket('ws://localhost:4000')   
    // 向 global 中添加 nuxt ws
    global.ws = ws

    // ws.onopen = function (mevt) {
    //   console.log('客户端已连接')
    // }

    // ws.onclose = function (mevt) {
    //   console.log('连接关闭')
    // }

    // 设置相互转发
    botInstance.once('message', () => {
      const sendObj = { message: 'nuxt client onmessage', retCode: 200, userAgent: 'nuxt-client' }
      ws.send(JSON.stringify(sendObj))
    })
    // 信息转发
    // botInstance.on('message', (event, ctx) => {
    //   ws.send(JSON.stringify(ctx))
    // })
    // 所有信息转发 用于日志
    botInstance.on('meta_event', (ctx) => {
      ws.send(JSON.stringify(ctx))
    })

    ws.on('message', (data) => {
      try {
        // const wsMsg = JSON.parse(data.toString())
        // console.log('wsMsg', wsMsg)
      }
      catch (e) {
        console.error(e)
      }
    })

    return responseJson(200, 'ok', {
      host,
      msg,
    })
  }
  catch (error: any) {
    return responseJson(400, error as string, {})
  }
})
