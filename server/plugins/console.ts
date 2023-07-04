/*
 * @Author: raventu
 * @Date: 2023-06-30 13:40:45
 * @LastEditors: raventu 
 * @LastEditTime: 2023-07-04 17:55:52
 * @FilePath: /cq-green-magpies-app/server/plugins/console.ts
 * @Description: 启动 pino 日志服务
 */

import { createLogger, format, transports } from 'winston'

export default defineNitroPlugin(() => {
  const customFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.align(),
    // format.printf(i => `${i.level}: ${[dayjs(i.timestamp).format('YYYY-MM-DD HH:mm:ss')]}: ${i.message}`),
    format.printf(i => `${i.level}: ${[i.timestamp]}: ${i.message}`),
  )

  const logger = createLogger({
    transports: [
      new transports.Console(),
      new transports.File({
        filename: 'logs/server.log',
        level: 'info',
        maxsize: 102400,
        format: customFormat,
      }),
      new transports.File({
        filename: 'logs/error.log',
        level: 'error',
        maxsize: 102400,
        format: customFormat,
      }),
    ],
  })

  global.console.log = (...args) => logger.info(...args)
  global.console.warn = (...args) => logger.warn(...args)
  global.console.error = (...args) => logger.error(...args)

  // const getTime = () => new Date().toLocaleString()
  // const { log, warn, error } = console
  // console.log = (...args) => log(getTime(), ...args)
  // console.warn = (...args) => warn(getTime(), ...args)
  // console.error = (...args) => error(getTime(), ...args)
})
