<!--
 * @Author: raventu
 * @Date: 2023-07-05 13:29:23
 * @LastEditors: raventu
 * @LastEditTime: 2023-08-23 15:10:38
 * @FilePath: /cq-green-magpies-app/components/Sys/common.vue
 * @Description:  系统-通用设置
-->
<script lang='ts' setup>
import { useAppStore } from '~/store/useAppStore'

type TypeStoreKeys = keyof typeof chatSettings

const store = useAppStore()
const chatSettings = store.chatSettings
const storeChatKeys = computed(() => Object.keys(chatSettings) as TypeStoreKeys[])
</script>

<template>
  <ClientOnly>
    <div class="w-full flex flex-col space-y-2">
      <!-- 聊天 -->
      <n-card title="聊天" size="small" class="!bg-gray-300 dark:!bg-dark-300">
        <div v-for="(key, idx) in storeChatKeys" :key="idx">
          <div class="flex-center justify-between space-y-2">
            <div>
              {{ chatSettings[key].title }}
            </div>
            <n-switch v-model:value="chatSettings[key].val" />
          </div>
        </div>
      </n-card>
    </div>
  </ClientOnly>
</template>
