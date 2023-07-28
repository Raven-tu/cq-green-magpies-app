/*
 * @Author: raventu
 * @Date: 2023-07-10 17:00:32
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-28 16:02:16
 * @FilePath: /cq-green-magpies-app/server/api/auth/register.post.ts
 * @Description: 用户登录信息
 */

import Joi from 'joi'

import UserService from '~/server/service/user.service'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const schema = Joi.object({
    username: Joi.string().required().error(new Error('用户名不能为空')),
    password: Joi.string().required().min(8).max(30).error(new Error('密码长度必须为8位')),
    admin: Joi.boolean().optional().default(false),
  })

  try {
    await schema.validateAsync(body)
  }
  catch (err: any) {
    return responseObject(400, err.message, {})
  }
  //
  try {
    const { createUser } = UserService
    const { username, password, admin } = body
    const res = await createUser(username, password, admin)
    return responseObject(200, 'ok', { username: res.user_name, id: res.id })
  }
  catch (error: any) {
    if (error.parent.errno === 19)
      return responseObject(400, '用户名已存在', {})
    else
      return responseObject(500, error.parent.message, {})
  }
})
