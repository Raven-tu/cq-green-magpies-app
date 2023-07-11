/*
 * @Author: raventu
 * @Date: 2023-07-11 17:40:22
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-11 17:47:30
 * @FilePath: /cq-green-magpies-app/server/utils/helper/configHelper.ts
 * @Description:
 */

import config from '~/server/config/config'

const { whiteRouting } = config
/**
 * @description: 校验是否需要校验 token
 * @param path 请求路径 event.node.req.url
 * @returns {boolean}
 */
export const checkEscapeRouting = (path: string) => whiteRouting.includes(path)
