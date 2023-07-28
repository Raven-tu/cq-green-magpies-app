/*
 * @Author: raventu
 * @Date: 2023-06-27 18:11:26
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-25 11:28:59
 * @FilePath: /cq-green-magpies-app/server/api/cq/[action].post.ts
 * @Description:
 */
import WebSocket from 'ws'
import Joi from 'joi'
import { genEchoStr, responseObject } from '~/server/utils/helper'

export default defineEventHandler(async (event) => {
  // 请求头中获取  accessToken
  const reqAccessToken = getHeader(event, 'Authorization')
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
    return responseObject(400, err.stack, {})
  }
  const wsQuery = () => {
    const accessToken = ((reqAccessToken ?? '').replace('Bearer ', ''))
    return `?accessToken=${accessToken}`
  }
  const wsPath = `ws://127.0.0.1:4000/${wsQuery()}`
  const ws = new WebSocket(wsPath)
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
          return resolve(responseObject(400, e as string, {}))
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
