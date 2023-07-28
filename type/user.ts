/*
 * @Author: raventu
 * @Date: 2023-07-11 18:11:32
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-12 11:03:51
 * @FilePath: /cq-green-magpies-app/type/user.ts
 * @Description:  用户类型
 */

export interface UserInfo {
  id: number
  name: string
  token: string
}

export interface UserWithPasswd extends UserInfo {
  password: string
}

export type UserWithoutPassword = Omit<UserWithPasswd, 'password'>
