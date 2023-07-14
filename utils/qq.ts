/*
 * @Author: raventu
 * @Date: 2023-07-14 16:56:15
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-14 16:59:06
 * @FilePath: /cq-green-magpies-app/utils/qq.ts
 * @Description: 工具函数
 */

export function getQQUserAvatar(user_id: string | number) {
  return `https://q1.qlogo.cn/g?b=qq&s=0&nk=${user_id}`
}

export function getQQGroupAvatar(group_id: string | number) {
  return `https://p.qlogo.cn/gh/${group_id}/${group_id}/0`
}
