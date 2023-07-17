<!--
 * @Author: raventu
 * @Date: 2023-05-21 20:06:47
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-17 15:32:54
 * @FilePath: /cq-green-magpies-app/layouts/default.vue
 * @Description:
-->

<script lang="ts" setup>
import StatusButtonBar from '~/components/Status/ButtonBar.vue'
import { useUserStore } from '~/store/useUserStore'
import { checkUserInfo } from '~/api/user/index'
import { useClientWsStore } from '~/store/useClientWsStore'

const userStore = useUserStore()
const clientWsStore = useClientWsStore()

async function checkCookie() {
  const res = await checkUserInfo()
  if (res.code === 200)
    userStore.setUserInfo(res.data)
  else
    userStore.cleanUserInfo()
  return res.code === 200
}

const checkFlag = await checkCookie()

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
