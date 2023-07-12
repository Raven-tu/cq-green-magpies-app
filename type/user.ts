/*
 * @Author: raventu
 * @Date: 2023-07-11 18:11:32
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-11 18:13:57
 * @FilePath: /cq-green-magpies-app/type/user.ts
 * @Description:  用户类型
 */
export interface User {
  id: number
  name: string
  password: string
}

export type UserWithoutPassword = Omit<User, 'password'>
