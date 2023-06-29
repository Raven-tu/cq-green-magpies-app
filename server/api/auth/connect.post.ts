/*
 * @Author: raventu
 * @Date: 2023-06-27 18:11:26
 * @LastEditors: raventu
 * @LastEditTime: 2023-06-29 18:21:13
 * @FilePath: /cq-green-magpies-app/server/api/auth/connect.post.ts
 * @Description:
 */
import Joi from 'joi'
import { responseJson } from '~/server/utils/helper'

// import WebSocket from 'ws';

export default defineEventHandler(async (event) => {
  // 获取 query
  const body = await readBody(event)
  // 校验数据joi
  const schema = Joi.object({
    wsPath: Joi.string().required().pattern(/^(ws|wss):\/\/[^\s/$.?#].[^\s]*$/),
    passwd: Joi.string().optional().default('').allow(''),
  })

  try {
    await schema.validateAsync(body)
  }
  catch (err: any) {
    return responseJson(400, err.stack, {})
  }
  const { wsPath, passwd } = body

  return responseJson(200, 'ok', {
    wsPath,
    passwd,
  })
})
