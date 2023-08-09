/*
 * @Author: raventu
 * @Date: 2023-07-10 17:08:37
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-14 13:36:56
 * @FilePath: /cq-green-magpies-app/server/utils/db/logsDbManger.ts
 * @Description:
 */

import * as path from 'node:path'
import { Sequelize } from 'sequelize'
import 'sqlite3'

const __dirname = path.resolve()
const sqlPath = path.resolve(__dirname, './server/db/logs.db')

// ~/server/db/logs.db
console.log(`日志数据库路径：${sqlPath}`)

const seq = new Sequelize({
  dialect: 'sqlite',
  storage: sqlPath,
})

seq.authenticate().then(() => {
  console.log('日志数据库连接成功')
}).catch((err) => {
  console.log(err, '日志数据库连接失败')
})

export default seq
