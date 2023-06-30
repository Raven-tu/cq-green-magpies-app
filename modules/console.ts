/*
 * @Author: raventu
 * @Date: 2023-06-30 13:40:45
 * @LastEditors: raventu
 * @LastEditTime: 2023-06-30 14:41:43
 * @FilePath: /cq-green-magpies-app/modules/console.ts
 * @Description: 启动 pino 日志服务
 */
import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  setup(options, nuxt) {
    const getTime = () => new Date().toLocaleString()
    const { log, warn, error } = console
    console.log = (...args) => log(getTime(), ...args)
    console.warn = (...args) => warn(getTime(), ...args)
    console.error = (...args) => error(getTime(), ...args)
  },
})
