/*
 * @Author: raventu
 * @Date: 2023-07-10 17:00:32
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-24 14:25:05
 * @FilePath: /cq-green-magpies-app/server/api/auth/login.post.ts
 * @Description: 用户注册接口
 */

import Joi from 'joi'
import jwt from 'jsonwebtoken'
import UserService from '~/server/service/user.service'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const schema = Joi.object({
    id: Joi.number().optional().default(0),
    name: Joi.string().required().error(new Error('用户名不能为空')),
    password: Joi.string().required().default('').error(new Error('密码不能为空')),
  })

  try {
    await schema.validateAsync(body)
  }
  catch (err: any) {
    return responseObject(400, err.message, {})
  }
  //
  try {
    const { getUserInfo } = UserService
    const { JWTSECRET } = useRuntimeConfig()
    const { id, name, password } = body
    const res = await getUserInfo({ id, user_name: name, password })

    if (!res)
      return responseObject(400, '用户名或密码错误', {})

    const token = jwt.sign({ name: res.user_name }, JWTSECRET, { expiresIn: '1d' })

    setCookie(event, 'accessToken', token, {
      httpOnly: false,
      maxAge: 60 * 60 * 24,
    })

    return responseObject(200, 'ok', {
      name: res.user_name,
      id: res.id,
      token,
    })
  }
  catch (error: any) {
    if (error.parent?.errno === 19)
      return responseObject(400, '用户名已存在', {})
    else
      return responseObject(500, 'server error', error.message)
  }
})
