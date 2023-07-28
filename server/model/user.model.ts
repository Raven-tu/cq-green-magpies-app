/*
 * @Author: raventu
 * @Date: 2023-07-10 17:17:27
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-11 09:56:45
 * @FilePath: /cq-green-magpies-app/server/model/user.model.ts
 * @Description: 用户信息 model
 */

import { DataTypes } from 'sequelize'
import seq from '~/server/utils/db/dataDbManger'

const User = seq.define('User', {
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '用户名',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    comment: '密码',
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '是否为管理员,0普通人员,1是管理员',
  },
})

User.sync({})

export default User
