/*
 * @Author: raventu
 * @Date: 2023-07-20 18:10:36
 * @LastEditors: raventu
 * @LastEditTime: 2023-08-29 14:54:41
 * @FilePath: /cq-green-magpies-app/server/plugins/CQconnect.ts
 * @Description: CQ websocket 连接 消息处理
 */
import process from 'node:process'
import { resolve } from 'node:path'
import type { APIResponse, Events } from '@tsuk1ko/cq-websocket'
import type { WebSocket } from 'ws'
import { jsonc } from 'jsonc'
import ChatService from '~/server/service/chat.service'
import { formatCQCtx } from '~/server/utils/helper/logsHelper'
import { groupMsg, privateAndAtMsg } from '~/server/utils/ws/cqMsg'
import { testWs2cq } from '~/server/utils/ws/ws2cq'
import { toCQString } from '~/utils/CQcode'
import type { LogsChatInfo } from '~/type/CQ'

export default defineNitroPlugin(async () => {
  // 读取配置文件
  const __dirname = resolve()
  const CONF_PATH = resolve(__dirname, './server/config/CQ.jsonc')
  const CQ_CONF = jsonc.readSync(CONF_PATH)
  const { host, port, accessToken } = CQ_CONF
  //  连接 cq-websocket
  const [msg, botInstance] = await testWs2cq(host, Number(port), accessToken)
  // TODO: 连接失败退出 nuxt 服务
  if (msg !== 'ok') {
    console.error('cq-websocket 连接失败')
    process.exit() // 失效 无法退出
  }
  // 向 global 中添加 cqBot
  globalThis.cqBot = botInstance

  const wss = globalThis.wss

  type cWebsocket = WebSocket & { name: string }
  // 设置相互转发
  const forwardTheMessage = (data: string) => {
    wss.clients.forEach((client) => {
      const _client = client as cWebsocket
      //   // binary表示数据是否是二进制。binary:false表示不是二进制
      _client.send(data, { binary: false })
    })
  }
  // momocow/node-cq-websocket 配置，请参考 https://github.com/Tsuk1ko/node-cq-websocket/blob/master/docs/api/CQWebSocket.md#isready
  // 所有信息转发 用于日志
  botInstance?.on('meta_event', (ctx) => {
    forwardTheMessage(JSON.stringify(ctx))
  })

  // 保存聊天记录
  botInstance.on('message', (_e, ctx) => {
    const [logsInfo] = formatCQCtx(ctx)
    const { message_type, target_id, sender_id } = logsInfo
    // 不处处理讨论组与频道消息
    if (['discuss', 'guild'].includes(message_type))
      return

    // 保存 到 db
    message_type === 'group'
      ? ChatService.addChatLog(message_type, target_id, logsInfo)
      : ChatService.addChatLog(message_type, sender_id, logsInfo)
    // 转发 CQ 消息
    forwardTheMessage(JSON.stringify(ctx))
  })

  // 信息转发
  const actionArr: Events[] = ['message.private', 'message.group', 'message.group.@.me']

  actionArr.forEach(name => botInstance.off(name))
  // 管理员消息
  // botInstance.on('message.private', () => ())
  // 私聊
  botInstance.on('message.private', privateAndAtMsg)
  // 群组@
  botInstance.on('message.group.@.me', groupMsg)
  // 群组
  botInstance.on('message.group', groupMsg)

  const noticeArr: Events[] = ['message.private', 'message.group', 'message.group.@.me']
  noticeArr.forEach(name => botInstance.off(name))
  // notice 转发
  // 群文件上傳。
  botInstance.on('notice.group_upload', async (ctx) => {
    // 获取群成员信息
    const groupMemberInfo = await botInstance('get_group_member_info', {
      group_id: ctx.group_id,
      user_id: ctx.user_id,
      no_cache: false,
    }) as APIResponse<{
      user_id: number
      nickname: string
    }>

    const user_id = groupMemberInfo.data.user_id
    const nickname = groupMemberInfo.data.nickname

    const fakeFileCQ = {
      type: 'file',
      data: {
        id: ctx.file.id, // 文件 ID
        name: ctx.file.name, // 文件名
        size: ctx.file.size, // 文件大小（字节数）
        busid: ctx.file.busid, // busid ( 目前不清楚有什么作用 )
        url: ctx.file.url,
      },
    }

    const fileMsg: LogsChatInfo = {
      message_type: 'group',
      message: '[群文件上传]',
      message_raw: toCQString(fakeFileCQ.type, fakeFileCQ.data),
      message_id: Math.floor(Math.random() * 100000),
      target_id: ctx.group_id,
      sender_id: user_id,
      sender_name: nickname,
      time: ctx.time,
      isRecall: false,
    }
    // 保存 到 db
    ChatService.addChatLog('group', ctx.group_id, fileMsg)
    // 转发 CQ 消息
    forwardTheMessage(JSON.stringify(ctx))
  })
})
