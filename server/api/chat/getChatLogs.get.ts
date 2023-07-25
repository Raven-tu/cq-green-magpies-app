/*
 * @Author: raventu
 * @Date: 2023-06-27 18:11:26
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-14 16:41:22
 * @FilePath: /cq-green-magpies-app/server/api/chat/getChatLogs.get.ts
 * @Description: 获取聊天记录
 */
import Joi from 'joi'
import ChatService from '~/server/service/chat.service'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { type, id, page, pageSize } = query

  const schema = Joi.object({
    id: Joi.number().required(),
    type: Joi.string().required().valid('private', 'group').error(new Error('type 只能为 private 或 group')),
    page: Joi.string().optional().default(1),
    pageSize: Joi.string().optional().default(10),
  })

  try {
    await schema.validateAsync(query)
  }
  catch (err: any) {
    return responseObject(400, err.stack, {})
  }

  try {
    const res = await ChatService.getChatLogs(type as 'private' | 'group', Number(id), Number(page), Number(pageSize))
    return responseObject(200, 'ok', {
      ...res,
    })
  }
  catch (error: any) {
    return responseObject(400, error.message, {})
  }
})
