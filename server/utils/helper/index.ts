/*
 * @Author: raventu
 * @Date: 2023-06-29 17:39:24
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-13 17:39:51
 * @FilePath: /cq-green-magpies-app/server/utils/helper/index.ts
 * @Description: 常用工具函数 服务端
 */

/**
 * @description: 常规返回格式
 * @param code 状态码
 * @param msg 信息
 * @param data 数据
 * @returns
 */
export function responseJson(code: number, msg: string, data: object) {
  const resp = { code, msg, data }
  return JSON.stringify(resp)
}

export function responseObject(code: number, msg: string, data: object) {
  const resp = { code, msg, data }
  return resp
}

// 获取当前时间
export function genTitle() {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = (`0${currentDate.getMonth() + 1}`).slice(-2)
  const day = (`0${currentDate.getDay()}`).slice(-2)
  return `${year}-${month}-${day}`
}

// 生成随机10位字符串
export const genEchoStr = () => Math.random().toString(36).substring(2, 7)
