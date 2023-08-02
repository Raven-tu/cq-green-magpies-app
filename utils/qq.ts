/*
 * @Author: raventu
 * @Date: 2023-07-14 16:56:15
 * @LastEditors: raventu
 * @LastEditTime: 2023-08-02 15:48:03
 * @FilePath: /cq-green-magpies-app/utils/qq.ts
 * @Description: 工具函数
 */

export function getQQUserAvatar(user_id: string | number) {
  return `https://q1.qlogo.cn/g?b=qq&s=0&nk=${user_id}`
}

export function getQQGroupAvatar(group_id: string | number) {
  return `https://p.qlogo.cn/gh/${group_id}/${group_id}/0`
}
/**
 * 省略消息
 * @param msg  消息
 * @param length 长度
 */
export function ellipsisMsg(msg: string | number, length = Number.POSITIVE_INFINITY) {
  return msg.toString().length > length ? `${msg.toString().slice(0, length)}...` : `${msg}`
}
