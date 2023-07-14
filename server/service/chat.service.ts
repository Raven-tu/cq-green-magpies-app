/*
 * @Author: raventu
 * @Date: 2023-07-10 17:21:46
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-14 15:35:01
 * @FilePath: /cq-green-magpies-app/server/service/chat.service.ts
 * @Description: 用户信息 service
 */
import ChatModel from '~/server/model/chatLogs.model'

import type { LogsChatInfo } from '~/type/CQ'

type PartialTypeChatInfo = Partial<LogsChatInfo>

class ChatService {
  async addChatLog(type: 'group' | 'private', id: number, chatInfo: PartialTypeChatInfo) {
    const result = await ChatModel.getChatLogs(type, id).create(chatInfo)
    return result as unknown as LogsChatInfo
  }

  async getChatLog(type: 'group' | 'private', id: number, page = 1, pageSize = 10) {
    const result = await ChatModel.getChatLogs(type, id).findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [['time', 'DESC']],
    })
    return result as unknown as LogsChatInfo[]
  }

  async setRecall(type: 'group' | 'private', id: number, message_id: number) {
    const result = await ChatModel.getChatLogs(type, id).update(
      { isRecall: true },
      { where: { message_id } },
    )
    return result as unknown as LogsChatInfo[]
  }

  async getRecall(type: 'group' | 'private', id: number, page = 1, pageSize = 10) {
    const result = await ChatModel.getChatLogs(type, id).findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [['time', 'DESC']],
      where: { isRecall: true },
    })
    return result as unknown as LogsChatInfo[]
  }
}

export default new ChatService()
