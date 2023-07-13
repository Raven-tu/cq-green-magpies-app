<!--
 * @Author: raventu
 * @Date: 2023-07-12 10:55:02
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-13 18:30:50
 * @FilePath: /cq-green-magpies-app/components/Login/Passwd.vue
 * @Description: 登录窗口
-->
<script lang='ts' setup>
import { userLogin } from '~/api/user/index'
import { useUserStore } from '~/store/useUserStore'

const name = ref<string>('d80778915')
const passwd = ref<string>('dd80778915')
const checkBoxVal = ref<string[]>([])
const connectLoading = ref<boolean>(false)

const userStore = useUserStore()

function handleConnect() {
  connectLoading.value = true
  userLogin({
    name: name.value,
    password: passwd.value,
  })
    .then((res) => {
      if (res.code === 200)
        userStore.setUserInfo(res.data)
    })
    .then(async () => {
      const { code } = await $fetch('/api/auth/connect', {
        method: 'GET',
      })
      if (code === 200)
        navigateTo('/chat')
      else
        throw new Error('连接失败')
    })
    .catch((err) => {
      console.log(err)
      userStore.cleanUserInfo()
    }).finally(() => {
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
      登录
    </p>

    <n-input v-model:value="name" placeholder="127.0.0.1" round />

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
