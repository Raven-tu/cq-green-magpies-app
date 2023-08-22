<!--
 * @Author: raventu
 * @Date: 2023-05-21 20:06:47
 * @LastEditors: raventu
 * @LastEditTime: 2023-08-22 13:47:45
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
  <n-layout has-sider class="main-layout flex">
    <!-- sider -->
    <n-layout-sider
      collapse-mode="width"
      width="80"
      :collapsed="false"
      :collapsed-width="64"
      position="static"
      :native-scrollbar="false"
    >
      <MainNav />
    </n-layout-sider>

    <!-- right -->
    <n-layout class="layout-content flex flex-col">
      <n-layout-content position="absolute" class="h-[calc(100vh-30PX)] overflow-hidden">
        <slot />
      </n-layout-content>
      <!-- <Footer /> -->
      <!-- 底部状态条 -->
      <n-layout-footer bordered position="absolute" class="bottom-30PX">
        <StatusButtonBar />
      </n-layout-footer>
    </n-layout>

    <!-- 消息通知 -->
    <Notification />
  </n-layout>
</template>
