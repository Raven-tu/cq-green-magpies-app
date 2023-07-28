<!--
 * @Author: raventu
 * @Date: 2023-07-12 10:55:02
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-24 16:38:10
 * @FilePath: /cq-green-magpies-app/components/Login/Passwd.vue
 * @Description: 登录窗口
-->
<script lang='ts' setup>
import { checkConnect, userLogin } from '~/api/user/index'
import { useUserStore } from '~/store/useUserStore'
import { xorStrings } from '~/utils/encrypt'

const name = ref<string>('')
const passwd = ref<string>('')
const checkBoxVal = ref<string[]>([])
const connectLoading = ref<boolean>(false)

const userStore = useUserStore()

const state = ref('{}')

function handleLoginSuccess() {
  // 保存账户和密码
  const userInfo = {
    name64: name.value,
    passwd64: passwd.value,
    autologin: checkBoxVal.value.includes('autoLogin'),
    savepasswd: checkBoxVal.value.includes('savePasswd'),
  }
  const OXRUserInfo = xorStrings(JSON.stringify(userInfo), 'SecretKey')
  localStorage.setItem('userInfo64', OXRUserInfo)

  navigateTo('/chat')
}

function handleConnect() {
  connectLoading.value = true
  userLogin({
    name: name.value,
    password: passwd.value,
  })
    .then((res) => {
      if (res.data.value?.code === 200)
        userStore.setUserInfo(res.data.value.data)
      else throw new Error('登录失败')
    })
    .then(async () => {
      const { data } = await checkConnect()
      if (data.value?.code === 200)
        handleLoginSuccess()
      else
        throw new Error('连接失败')
    })
    .catch((err) => {
      console.error(err)
      userStore.cleanUserInfo()
    }).finally(() => {
      connectLoading.value = false
    })
}

function checkStorage() {
  const { name64, passwd64, autologin, savepasswd } = JSON.parse(state.value || '{}')

  if (name64 && passwd64) {
    name.value = name64
    passwd.value = passwd64
    if (autologin)
      checkBoxVal.value.push('autoLogin')
    if (savepasswd)
      checkBoxVal.value.push('savePasswd')
  }
}

function checkAutoLogin() {
  const { autologin } = JSON.parse(state.value || '{}')

  if (autologin)
    handleConnect()
}

onMounted(() => {
  state.value = xorStrings(localStorage.getItem('userInfo64') || '{}', 'SecretKey')
  checkStorage()
  checkAutoLogin()
})
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

    <n-input v-model:value="name" placeholder="username" round>
      <template #prefix>
        <div class="i-material-symbols-account-circle" />
      </template>
    </n-input>

    <n-input v-model:value="passwd" type="password" show-password-on="click" placeholder="passwd" round>
      <template #prefix>
        <div class="i-material-symbols-lock" />
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

    <n-button type="primary" round strong secondary block :loading="connectLoading" @click="handleConnect">
      GO
    </n-button>
  </div>
</template>
