import * as fs from 'node:fs'
import * as path from 'node:path'

// 文章目录
const postsDir = path.join(process.cwd(), 'content')

export default defineEventHandler(async (event) => {
  const fileName = `${getRouterParam(event, 'name1')}.md`
  // 获取文章内容
  const fullPath = path.join(postsDir, fileName)
  try {
    fs.accessSync(fullPath)
    // ...省略读取文章内容部分代码
  }
  catch (err) {
    // 没有此文件或没有访问权限
    throw createError({
      statusCode: 404,
      statusMessage: '文章不存在',
    })
  }

  return {
    title: '文章详情',
    content: '文章内容',
  }
})
