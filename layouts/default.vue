<!--
 * @Author: raventu
 * @Date: 2023-05-21 20:06:47
 * @LastEditors: raventu
 * @LastEditTime: 2023-08-14 14:05:37
 * @FilePath: /cq-green-magpies-app/layouts/default.vue
 * @Description: 默认布局
-->

<script lang="ts" setup>
import StatusButtonBar from '~/components/Status/ButtonBar.vue'
import { useUserStore } from '~/store/useUserStore'
import { checkUserInfo } from '~/api/user/index'
import { useClientWsStore } from '~/store/useClientWsStore'
import { getLoginInfo } from '~/api/cq'
import Notification from '~/components/Notification.vue'

const userStore = useUserStore()
const clientWsStore = useClientWsStore()

async function checkCookie() {
  const { data } = await checkUserInfo()
  if (data.value?.code === 402) {
    // 无用户信息引导到注册
    userStore.cleanUserInfo()
    navigateTo('/setup', { replace: true })
  }
  else if (data.value?.code === 200) {
    userStore.setUserInfo(data.value.data)
    return true
  }
  else { userStore.cleanUserInfo() }
  return data.value?.code === 200
}

onMounted(async () => {
  const accessToken = useCookie('accessToken')
  const checkFlag = accessToken.value ? await checkCookie() : false
  if (checkFlag) {
    clientWsStore.initClientWs()
    // 获取登录信息
    const { data: loginData } = await getLoginInfo()
    if (loginData.value)
      userStore.setLoginInfo(loginData.value?.data)
  }
})
</script>

<template>
  <main class="main-layout flex">
    <!-- left -->
    <MainNav />

    <!-- right -->
    <div class="layout-content flex flex-1 flex-col">
      <div class="h-auto w-full flex-1 overflow-hidden">
        <slot />
      </div>
      <!-- 底部状态条 -->
      <StatusButtonBar />
    </div>

    <!-- <Footer /> -->
    <!-- 消息通知 -->
    <Notification />
  </main>
</template>
