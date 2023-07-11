/*
 * @Author: raventu
 * @Date: 2023-07-10 09:17:59
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-11 17:42:33
 * @FilePath: /cq-green-magpies-app/server/utils/helper/logsHelper.ts
 * @Description: logs 记录等级
 */
//
export function WSLogs(msg: string) {
  // 去掉特殊字符
  const json = JSON.parse(msg)
  // 忽略心跳检测
  return json.meta_event_type === 'heartbeat'
    ? false
    : console.log(JSON.stringify(json))
}
