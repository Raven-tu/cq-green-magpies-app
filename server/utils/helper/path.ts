/*
 * @Author: raventu
 * @Date: 2023-08-09 10:07:43
 * @LastEditors: raventu
 * @LastEditTime: 2023-08-09 10:07:53
 * @FilePath: /cq-green-magpies-app/server/utils/helper/path.ts
 * @Description: 获取当前文件所在目录
 */
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { URL } from 'node:url'

// 获取当前文件所在目录
export const getDirname = (importMetaUrl: string | URL) => dirname(fileURLToPath(importMetaUrl))
// 获取当前文件所在目录
export const resolveByDirname = (importMetaUrl: string | URL, path: string) => resolve(getDirname(importMetaUrl), path)
