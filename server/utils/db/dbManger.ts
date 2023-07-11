/*
 * @Author: raventu
 * @Date: 2023-07-10 17:08:37
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-11 13:22:30
 * @FilePath: /cq-green-magpies-app/server/utils/db/dbManger.ts
 * @Description:
 */

import * as path from 'node:path'
import { Sequelize } from 'sequelize'

const __dirname = path.resolve()
const sqlPath = path.resolve(__dirname, './server/db/data.db')

// ~/server/db/data.db
console.log(`数据库路径：${sqlPath}`)

const seq = new Sequelize({
  dialect: 'sqlite',
  storage: sqlPath,
})

seq.authenticate().then(() => {
  console.log('数据库连接成功')
}).catch((err) => {
  console.log(err, '数据库连接失败')
})

export default seq
