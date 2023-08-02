/*
 * @Author: raventu
 * @Date: 2023-06-27 18:11:26
 * @LastEditors: raventu
 * @LastEditTime: 2023-08-02 14:47:42
 * @FilePath: /cq-green-magpies-app/server/api/cq/[action].post.ts
 * @Description: 处理 cq api 请求
 */
import Joi from 'joi'
import { responseObject } from '~/server/utils/helper'

export default defineEventHandler(async (event) => {
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
  const botInstance = globalThis.cqBot
  if (!botInstance)
    return responseObject(400, 'CQ API not connected', {})

  return new Promise((resolve) => {
    //  超时
    setTimeout(() => {
      ws.close()
      return resolve(responseObject(400, 'CQ API time out', {}))
    }, 5000)

    botInstance(action, params)
      .then((res) => {
        const { retcode, status, data } = res
        return resolve(responseObject(200, `${status}-${retcode}`, data as any))
      })
      .catch((err) => {
        return resolve(responseObject(400, err as string, {}))
      })
  })
})
