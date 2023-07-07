<!--
 * @Author: raventu
 * @Date: 2023-06-26 17:38:51
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-07 12:44:01
 * @FilePath: /cq-green-magpies-app/components/Login/WS.vue
 * @Description: 登录框
-->
<script lang='ts' setup>
import { useAppStore } from '~/store/useAppStore'

const wsPath = ref<string>('192.168.1.218')
const port = ref<number>(6800)
const passwd = ref<string>('')
const checkBoxVal = ref<string[]>([])
const connectLoading = ref<boolean>(false)
const { setWsc } = useAppStore()

function handleConnect() {
  connectLoading.value = true
  useFetch('/api/auth/connect', {
    method: 'POST',
    body: {
      host: wsPath.value,
      port: port.value,
      accessToken: passwd.value,
    },
  })
    .then((res) => {
      const path = `ws://${wsPath.value}:${port.value}`
      const wsc = new WebSocket(path)
      setWsc(wsc)
      connectLoading.value = false
    })
    .catch((err) => {
      console.log(err)
      connectLoading.value = false
    })
}
</script>

<template>
  <!-- h-120 w-90  TODO:美化登录 -->
  <div
    class="box-border h-80 w-90 flex flex-col items-center justify-around border-2 rounded-2xl bg-gray-200 p-4 card-shadow"
    dark="bg-gray-700"
  >
    <p class="text-2xl">
      连接
    </p>

    <n-input-group class="flex-center">
      <n-input v-model:value="wsPath" placeholder="127.0.0.1" round :style="{ width: '80%' }" />
      <n-space align="center" :style="{ width: '20%' }">
        <n-input-number v-model:value="port" :show-button="false" />
      </n-space>
    </n-input-group>

    <n-input v-model:value="passwd" type="password" show-password-on="click" placeholder="passwd" round>
      <template #prefix>
        <div class="i-carbon-locked" />
      </template>
    </n-input>

    <!-- 复选框 -->
    <div>
      <n-checkbox-group v-model:value="checkBoxVal">
        <n-space item-style="display: flex;">
          <n-checkbox value="autoLogin" label="自动登录" />
          <n-checkbox value="savePasswd" label="保存密码" />
        </n-space>
      </n-checkbox-group>
    </div>

    <n-button type="primary" strong secondary round block :loading="connectLoading" @click="handleConnect">
      GO
    </n-button>
  </div>
</template>

<style lang='less' scoped>
</style>
