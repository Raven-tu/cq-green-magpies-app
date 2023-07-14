/*
 * @Author: raventu
 * @Date: 2023-07-10 17:17:27
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-14 14:15:44
 * @FilePath: /cq-green-magpies-app/server/model/chatLogs.model.ts
 * @Description: 用户聊天记录 model
 */

import type { Model, ModelCtor } from 'sequelize'
import { DataTypes } from 'sequelize'
import seq from '~/server/utils/db/logsDbManger'

const chatLogs: Record<string, ModelCtor<Model<any, any>>> = {}

function getChatLogs(type: 'group' | 'private', id: number) {
  const tableName = `${type}_${id}`
  if (chatLogs[tableName])
    return chatLogs[tableName]

  const chatLog = seq.define(tableName, {
  //   CREATE TABLE group_1111111 (
  //     col          INTEGER       PRIMARY KEY ASC AUTOINCREMENT,
  //     message      VARCHAR(255),
  //     message_raw  VARCHAR(255),
  //     message_id   INTEGER,
  //     message_type VARCHAR(255),
  //     target_id    INTEGER,
  //     sender_id    INTEGER,
  //     sender_name  VARCHAR (255),
  //     time         TIME,
  //     isRecall     BOOLEAN       DEFAULT (false)
  // );

    col: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      primaryKey: true,
      autoIncrement: true,
      comment: '主键',
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      comment: '消息',
    },
    message_raw: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      comment: '消息原文',
    },
    message_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      comment: '消息id',
    },
    message_type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      comment: '消息类型',
    },
    target_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      comment: '目标id',
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      comment: '发送者id',
    },
    sender_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      comment: '发送者昵称',
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
      unique: false,
      comment: '时间戳',
    },
    isRecall: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      unique: false,
      defaultValue: false,
      comment: '是否撤回',
    },

  })
  chatLogs[tableName] = chatLog
  chatLog.sync({})
  return chatLog
}

export default {
  chatLogs,
  getChatLogs,
}
