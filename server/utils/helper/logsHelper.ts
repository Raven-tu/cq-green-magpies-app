/*
 * @Author: raventu
 * @Date: 2023-07-10 09:17:59
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-14 15:52:45
 * @FilePath: /cq-green-magpies-app/server/utils/helper/logsHelper.ts
 * @Description: logs 记录等级
 */
//
import type { LogsChatInfo, MsgCtx } from '~/type/CQ'

export function WSLogs(msg: string) {
  // 去掉特殊字符
  const json = JSON.parse(msg)
  // 忽略心跳检测
  return json.meta_event_type === 'heartbeat'
    ? false
    : console.log(JSON.stringify(json))
}

export function formatCQCtx(msgCtx: Record<string, any>) {
  // 去掉特殊字符
  const logsInfo: LogsChatInfo = {
    message_type: msgCtx.message_type,
    message: msgCtx.message,
    message_raw: msgCtx.raw_message,
    message_id: msgCtx.message_id,
    target_id: msgCtx.message_type === 'private' ? msgCtx.target_id : msgCtx.group_id,
    sender_id: msgCtx.sender.user_id,
    sender_name: msgCtx.sender.nickname,
    time: msgCtx.time,
    isRecall: false,
  }
  return [logsInfo, msgCtx as MsgCtx] as const
}
