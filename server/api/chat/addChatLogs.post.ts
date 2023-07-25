/*
 * @Author: raventu
 * @Date: 2023-06-27 18:11:26
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-19 10:52:18
 * @FilePath: /cq-green-magpies-app/server/api/chat/addChatLogs.post.ts
 * @Description: 添加聊天记录
 */
import Joi from 'joi'
import ChatService from '~/server/service/chat.service'
import type { LogsChatInfo } from '~/type/CQ'

export default defineEventHandler(async (event) => {
  const body = await readBody(event) as { id: number; type: 'private' | 'group'; chatInfo: LogsChatInfo }

  const schema = Joi.object({
    id: Joi.number().required(),
    type: Joi.string().required().valid('private', 'group').error(new Error('type 只能为 private 或 group')),
    chatInfo: Joi.object<LogsChatInfo>({
      message_type: Joi.string().required().valid('private', 'group').error(new Error('chatInfo.message_type 只能为 private 或 group')),
      message: Joi.string().required(),
      message_raw: Joi.string().required(),
      message_id: Joi.number().required(),
      target_id: Joi.number().required(),
      sender_id: Joi.number().required(),
      sender_name: Joi.string().required(),
      time: Joi.number().required(),
      isRecall: Joi.boolean().required(),
    }).required(),
  })

  try {
    await schema.validateAsync(body)
  }
  catch (err: any) {
    return responseObject(400, err.stack, {})
  }

  try {
    const { id, type, chatInfo } = body
    const res = await ChatService.addChatLog(type, id, chatInfo)

    return responseObject(200, 'ok', {
    })
  }
  catch (error: any) {
    return responseObject(400, error.message, {})
  }
})
