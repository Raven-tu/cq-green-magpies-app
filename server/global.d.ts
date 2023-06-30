/*
 * @Author: raventu
 * @Date: 2023-06-30 13:14:16
 * @LastEditors: raventu 
 * @LastEditTime: 2023-06-30 18:03:42
 * @FilePath: /cq-green-magpies-app/server/global.d.ts
 * @Description:  global extra type
 */


import { CQWebSocket } from '@tsuk1ko/cq-websocket'
import { WebSocketServer } from 'ws'
import WebSocket from 'ws'
declare global {
  var cqBot : CQWebSocket | undefined
  var wss :  InstanceType<typeof WebSocketServer> 
  var ws :  InstanceType<typeof WebSocket>   
}
