/*
 * @Author: raventu
 * @Date: 2023-07-17 18:24:14
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-17 19:44:23
 * @FilePath: /cq-green-magpies-app/utils/encrypt.ts
 * @Description: 加密工具
 */
export function xorStrings(str1: string, str2: string): string {
  // 检查输入参数是否为字符串
  if (typeof str1 !== 'string' || typeof str2 !== 'string')
    throw new Error('输入参数必须是字符串')

  let result = ''
  let str2Index = 0
  for (let i = 0; i < str1.length; i++) {
    // 如果 str2 达到末尾，则重新开始循环
    if (str2Index === str2.length)
      str2Index = 0

    // 异或运算符只能用于数值类型，需要使用charCodeAt()方法将字符转换为Unicode编码
    const charCode1 = str1.charCodeAt(i)
    const charCode2 = str2.charCodeAt(str2Index)

    // 执行异或操作
    const xorValue = charCode1 ^ charCode2

    // 将异或结果转换回字符
    const xorChar = String.fromCharCode(xorValue)

    result += xorChar

    // 增加 str2 的索引
    str2Index++
  }

  return result
}
