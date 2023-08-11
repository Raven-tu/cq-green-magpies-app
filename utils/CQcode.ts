/*
 * @Author: raventu
 * @Date: 2023-08-11 13:18:04
 * @LastEditors: raventu
 * @LastEditTime: 2023-08-11 16:52:32
 * @FilePath: /cq-green-magpies-app/utils/CQcode.ts
 * @Description: CQ码相关工具
 */

import { filter, transform } from 'lodash-es'

/**
 * 判断消息是否有图片
 *
 * @param {string} msg 消息
 * @returns 有则返回true
 */
export function hasImage(msg: string | string[]) {
  return msg.includes('[CQ:image')
}

/**
   * 转义
   * @template T
   * @param {T} str 欲转义的字符串
   * @param {boolean} [insideCQ=false] 是否在CQ码内
   * @return {T}
   */
export function escape(str: string, insideCQ = false) {
  if (typeof str !== 'string')
    return str
  const result = str.replace(/&/g, '&amp;').replace(/\[/g, '&#91;').replace(/\]/g, '&#93;')
  if (!insideCQ)
    return result
  return result
    .replace(/,/g, '&#44;')
    .replace(/(\uD83C[\uDF00-\uDFFF])|(\uD83D[\uDC00-\uDE4F\uDE80-\uDEFF])|[\u2600-\u2B55]/g, ' ')
}

/**
   * 反转义
   * @template T
   * @param {T} str 欲反转义的字符串
   * @return {T}
   */
export function unescape(str: string) {
  if (typeof str !== 'string')
    return str
  return str.replace(/&#44;/g, ',').replace(/&#91;/g, '[').replace(/&#93;/g, ']').replace(/&amp;/g, '&')
}

/**
 * @param {string} str
 */
export function from(str: string) {
  const reg = /\[CQ:([^,[\]]+)((?:,[^,=[\]]+=[^,[\]]*)*)\]/g
  const result: [string, { [key: string]: string }][] = [] // add index signature to the object type
  let match = reg.exec(str)
  while (match) {
    const [, type, dataStr] = match
    const data: { [key: string]: string } = transform(
      filter(dataStr.split(',')),
      (obj: { [key: string]: string }, kv) => {
        const [key, ...value] = kv.split('=')
        obj[unescape(key)] = unescape(value.join('='))
      },
      {},
    )
    result.push([type, data])
    match = reg.exec(str)
  }
  return result
}

/**
   * 在CQ码内转义
   * @template T
   * @param {T} str 欲转义的字符串
   */
export function escapeInsideCQ(str: string) {
  return escape(str, true)
}

// CQ 码消息对象
export interface TypeCQMsgObj {
  type: string
  file: string
  subType: string
  url: string
  text: string
}

/**
 * 替换 具体 CQCode 为文本
 * @param msg
 */
export function purificationMsg(originMsg: string) {
  const CQList = parseCQObj(originMsg)
  const result = CQList.map((item) => {
    switch (item.type) {
      case 'image':
        return '[图片]'
      case 'face':
        return '[表情]'
      case 'record':
        return '[语音]'
      case 'at':
        return '[艾特]'
      case 'text':
        return item.text
    }
  })
  return result.join('')
}

/**
 * 将扁平的 CQCode 消息处理成消息对象
 * @param msg CQCode 消息
 * @returns 消息对象
 */
export function parseCQObj(originMsg: string) {
  let { reg, list } = parseCQStr(originMsg)
  // 处理为 object
  const back: { [ket: string]: any }[] = []
  reg = /\[CQ:([^,]+),(.*)\]/g
  if (list !== null) {
    list.forEach((item) => {
      if (item.match(reg) !== null) {
        const info: { [key: string]: any } = { type: RegExp.$1 }
        RegExp.$2.split(',').forEach((key) => {
          const kv = []
          kv.push(key.substring(0, key.indexOf('=')))
          // 对 html 转义字符进行反转义
          const a = document.createElement('a')
          a.innerHTML = key.substring(key.indexOf('=') + 1)
          kv.push(a.innerText)
          info[kv[0]] = kv[1]
        })
        // 对文本消息特殊处理
        if (info.type === 'text') {
          info.text = RegExp.$2
            .substring(RegExp.$2.lastIndexOf('=') + 1)
            .replaceAll('\\n', '\n')
          // 对 html 转义字符进行反转义
          const a = document.createElement('a')
          a.innerHTML = info.text
          info.text = a.innerText
        }
        back.push(info)
      }
    })
  }
  // logger.debug(`${app.config.globalProperties.$t('log_cq_msg_parsed')}: ${JSON.stringify(back)}`)
  return back as TypeCQMsgObj[]
}
function parseCQStr(originMsg: string) {
  let msg = originMsg as string
  // 将纯文本也处理为 CQCode 格式
  let reg = /^[^\]]+?\[|\].+\[|\][^[]+$|^[^[\]]+$/g
  const textList = msg.match(reg)
  if (textList !== null) {
    textList.forEach((item) => {
      item = item.replace(']', '').replace('[', '')
      msg = msg.replace(item, `[CQ:text,text=${item}]`)
    })
  }
  // 拆分 CQCode
  reg = /\[.+?\]/g
  msg = msg.replaceAll('\n', '\\n')
  const list = msg.match(reg)
  return { reg, list }
}
