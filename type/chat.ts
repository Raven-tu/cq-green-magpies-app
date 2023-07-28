/*
 * @Author: raventu
 * @Date: 2023-07-14 17:01:52
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-14 17:03:20
 * @FilePath: /cq-green-magpies-app/type/chat.ts
 * @Description: chat type
 */
// 聊天信息 Props
export interface PropschatInfo {
  avatar: string
  title: string
  id: number
  type: 'group' | 'private'
}
