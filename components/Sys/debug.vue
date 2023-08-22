<!--
 * @Author: raventu
 * @Date: 2023-07-05 13:29:23
 * @LastEditors: raventu
 * @LastEditTime: 2023-08-22 14:42:44
 * @FilePath: /cq-green-magpies-app/components/Sys/debug.vue
 * @Description:  系统-调试
-->
<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import type { LogInst } from 'naive-ui'
import { useClientWsStore } from '~/store/useClientWsStore'

const { clientWsInstance } = storeToRefs(useClientWsStore())
const logs = ref<string[]>([])
const logInstRef = ref<LogInst | null>(null)

onMounted(async () => {
  await nextTick()
  const instance = unref(clientWsInstance)
  if (instance) {
    instance.onmessage = (event: MessageEvent) => {
      console.log('【调试】', event.data)
      logs.value.push(`【${new Date().toLocaleString()}】\n ${event.data} \n`)
      // 滚动到底部
      if (logInstRef.value) {
        nextTick(() => {
          logInstRef.value?.scrollTo({ position: 'bottom', slient: true })
        })
      }
    }
  }
})
</script>

<template>
  <ClientOnly>
    <n-log ref="logInstRef" :lines="logs" :rows="37" trim class="h-full space-y-2" />
  </ClientOnly>
</template>
