/*
 * @Author: raventu
 * @Date: 2023-06-26 14:59:21
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-07 13:54:43
 * @FilePath: /cq-green-magpies-app/server/api/posts/index.get.ts
 * @Description:
 */
import * as fs from 'node:fs'
import * as path from 'node:path'

const postsDir = path.join(process.cwd(), 'content')

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const page = Number(query.page)
  const size = Number(query.size)
  const fileNames = fs.readdirSync(postsDir)
  const posts = fileNames.map((fileName) => {
    const id = fileName.replace(/.md$/, '')
    const fullPath = path.join(postsDir, fileName)

    const fileInfo = fs.statSync(fullPath)
    return {
      id,
      title: '文章标题',
      date: fileInfo.ctime,
    }
  })
  const start = (page - 1) * size
  const end = start + size
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1)).slice(start, end)
})
