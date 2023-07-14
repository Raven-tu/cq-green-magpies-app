<!--
 * @Author: raventu
 * @Date: 2023-07-05 13:29:23
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-14 13:09:06
 * @FilePath: /cq-green-magpies-app/components/Sys/debug.vue
 * @Description:  系统-调试
-->
<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { useClientWsStore } from '~/store/useClientWsStore'

const { clientWsInstance } = storeToRefs(useClientWsStore())
const logs = ref<string[]>([])

onMounted(() => {
  if (clientWsInstance?.value) {
    clientWsInstance.value.onmessage = (event: MessageEvent) => {
      console.log('【调试】', event.data)
      logs.value.push(`【${new Date().toLocaleString()}】\n ${event.data}`)
    }
  }
})
</script>

<template>
  <ClientOnly>
    <n-card title="日志" class="h-full">
      <div class="h-70vh w-full flex flex-col overflow-y-scroll space-y-2">
        <p v-for="(item, index) in logs" :key="index">
          {{ item }}
        </p>
      </div>
    </n-card>
  </ClientOnly>
</template>
