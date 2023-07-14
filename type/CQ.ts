/*
 * @Author: raventu
 * @Date: 2023-07-14 15:05:56
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-14 15:53:53
 * @FilePath: /cq-green-magpies-app/type/CQ.ts
 * @Description: CQ 类型
 */
export interface Sender {
  age: number
  nickname: string
  sex: string
  user_id: number
}
/** CQ event 返回 ctx 类型 */
export interface MsgCtx {
  post_type: string
  message_type: 'private' | 'group'
  time: number
  self_id: number
  sub_type: string
  message_id: number
  user_id: number
  target_id: number
  message: string
  raw_message: string
  font: number
  sender: Sender
}
/** sql 记录类型 */
export interface LogsChatInfo {
  message_type: 'private' | 'group'
  message: string
  message_raw: string
  message_id: number
  target_id: number
  sender_id: number
  sender_name: string
  time: number
  isRecall: boolean
}
