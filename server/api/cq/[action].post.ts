/*
 * @Author: raventu
 * @Date: 2023-06-27 18:11:26
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-07 17:12:11
 * @FilePath: /cq-green-magpies-app/server/api/cq/[action].post.ts
 * @Description:
 */
import WebSocket from 'ws'
import Joi from 'joi'
import { genEchoStr, responseJson } from '~/server/utils/helper'

export default defineEventHandler(async (event) => {
  const actionName = getRouterParam(event, 'action')
  const body = await readBody(event)

  // 校验数据joi
  const { action, params } = body
  const schema = Joi.object({
    action: Joi.string().optional().allow(`${actionName}`),
    params: Joi.object().required(),
  }).optional()
  try {
    await schema.validateAsync(body)
  }
  catch (err: any) {
    return responseJson(400, err.stack, {})
  }

  const ws = new WebSocket('ws://localhost:4000')
  const echoStr = genEchoStr()

  return new Promise((resolve) => {
    // 发送实际  websocket 请求
    ws.on('open', () => {
      ws.on('message', (msg) => {
        try {
          const { echo, message, status, data } = JSON.parse(msg.toString())
          if (echo === echoStr) {
            ws.close()
            return resolve(responseJson(200, 'ok', {
              message,
              status,
              data,
            }))
          }
        }
        catch (e) {
          return resolve(responseJson(400, e as string, {}))
        }
      })

      // 5s 超时
      setTimeout(() => {
        ws.close()
        return resolve(responseJson(400, 'CQ API time out', {}))
      }, 5000)

      ws.send(JSON.stringify({
        action,
        params,
        echo: echoStr,
        from: 'nt-server',
      }))
    })
  })
})
