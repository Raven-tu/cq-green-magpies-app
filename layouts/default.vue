<!--
 * @Author: raventu
 * @Date: 2023-05-21 20:06:47
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-24 16:37:01
 * @FilePath: /cq-green-magpies-app/layouts/default.vue
 * @Description:
-->

<script lang="ts" setup>
import StatusButtonBar from '~/components/Status/ButtonBar.vue'
import { useUserStore } from '~/store/useUserStore'
import { checkUserInfo } from '~/api/user/index'
import { useClientWsStore } from '~/store/useClientWsStore'
import { getLoginInfo } from '~/api/cq'

const userStore = useUserStore()
const clientWsStore = useClientWsStore()

async function checkCookie() {
  const { data } = await checkUserInfo()
  if (data.value?.code === 200)
    userStore.setUserInfo(data.value.data)
  else
    userStore.cleanUserInfo()
  return data.value?.code === 200
}

const checkFlag = await checkCookie()

// 获取登录信息
const { data: loginData } = await getLoginInfo()

if (loginData.value)
  userStore.setLoginInfo(loginData.value?.data)

onMounted(() => {
  if (checkFlag)
    clientWsStore.initClientWs()
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
  </main>
</template>
