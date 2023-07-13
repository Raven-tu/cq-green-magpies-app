/*
 * @Author: raventu
 * @Date: 2023-06-27 18:11:26
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-10 13:25:10
 * @FilePath: /cq-green-magpies-app/server/api/cq/[action].post.ts
 * @Description:
 */
import WebSocket from 'ws'
import Joi from 'joi'
import { genEchoStr, responseJson, responseObject } from '~/server/utils/helper'

export default defineEventHandler(async (event) => {
  const reqAccessToken = getCookie(event, 'accessToken')
  const actionName = getRouterParam(event, 'action')
  const body = await readBody(event)
  // 校验数据joi
  const { action, params } = body
  const schema = Joi.object({
    action: Joi.string().required().allow(`${actionName}`),
    params: Joi.object().optional(),
  }).optional()
  try {
    await schema.validateAsync(body)
  }
  catch (err: any) {
    return responseJson(400, err.stack, {})
  }

  const ws = new WebSocket('ws://localhost:4000', { headers: { cookie: `accessToken=${reqAccessToken}` } })
  const echoStr = genEchoStr()

  return new Promise((resolve) => {
    // 发送实际  websocket 请求
    ws.on('open', () => {
      ws.on('message', (msg) => {
        try {
          const { echo, message, status, data } = JSON.parse(msg.toString())
          if (echo === echoStr) {
            ws.close()
            return resolve(responseObject(200, `${status}-${message}`, data))
          }
        }
        catch (e) {
          return resolve(responseJson(400, e as string, {}))
        }
      })

      //  超时
      setTimeout(() => {
        ws.close()
        return resolve(responseObject(400, 'CQ API time out', {}))
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
