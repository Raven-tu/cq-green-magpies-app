<!--
 * @Author: raventu
 * @Date: 2023-06-26 16:07:57
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-14 11:14:31
 * @FilePath: /cq-green-magpies-app/components/MainNav.vue
 * @Description: 主导航栏
-->
<script lang='ts' setup>
import { useUserStore } from '~/store/useUserStore'

const router = useRouter()
const { getAccessToken } = useUserStore()

function switchRoute(route: string) {
  router.push(route)
}

const showLogin = computed(() => !getAccessToken())
</script>

<template>
  <div
    class="layout-nav h-100vh w-20 flex flex-col justify-between p-4"
    bg="gray-300 dark:gray-800"
  >
    <div class="flex flex-col space-y-6">
      <button class="text-4xl !outline-none" @click="switchRoute('/sys')">
        <div class="i-carbon-home" />
      </button>

      <button class="text-4xl !outline-none" @click="switchRoute('/chat')">
        <div class="i-carbon-chat-bot" />
      </button>

      <button v-show="showLogin" class="text-4xl !outline-none" @click="switchRoute('/login')">
        <div class="i-carbon:login" />
      </button>
    </div>

    <DarkToggle class="items-self-end text-4xl" />
  </div>
</template>
