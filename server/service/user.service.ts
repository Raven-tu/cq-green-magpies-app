/*
 * @Author: raventu
 * @Date: 2023-07-10 17:21:46
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-28 16:02:52
 * @FilePath: /cq-green-magpies-app/server/service/user.service.ts
 * @Description: 用户信息 service
 */
import UserModel from '~/server/model/user.model'

interface TypeUserInfo {
  id?: number
  user_name?: string
  password?: string
}

class UserService {
  async createUser(user_name: string, password: string, is_admin = false) {
    const result = await UserModel.create({
      user_name,
      password,
      is_admin,
    })
    return result as unknown as { user_name: string; id: number }
  }

  async getUserInfo({ id, user_name, password }: TypeUserInfo) {
    const opt = {}
    id && Object.assign(opt, { id })
    user_name && Object.assign(opt, { user_name })
    password && Object.assign(opt, { password })
    const result = await UserModel.findOne({
      attributes: ['id', 'user_name', 'password'],
      where: opt,
    })
    return result ? result.dataValues : null
  }

  async updateById(obj: TypeUserInfo) {
    const { user_name, id, password } = obj
    console.log(`user_name: ${user_name}, id : ${id} , userInfo will be changed`)
    const opt = { id }
    const newOpt = {}
    user_name && Object.assign(newOpt, { user_name })
    id && Object.assign(newOpt, { id })
    password && Object.assign(newOpt, { password })

    try {
      const res = await UserModel.update(newOpt, { where: opt })
      console.log(`user_name: ${user_name}, id : ${id} , userInfo is changed`)
      return res
    }
    catch (error) {
      console.error(error)
    }
  }
}

export default new UserService()
