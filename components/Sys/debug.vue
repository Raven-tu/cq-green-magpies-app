<!--
 * @Author: raventu
 * @Date: 2023-07-05 13:29:23
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-07 12:43:52
 * @FilePath: /cq-green-magpies-app/components/Sys/debug.vue
 * @Description:  系统-调试
-->
<script lang='ts' setup>
import { useAppStore } from '~/store/useAppStore'

const { wsc } = useAppStore()
const logsHtml = ref('')

onMounted(() => {
  if (wsc) {
    wsc.onmessage = (event: MessageEvent) => {
      logsHtml.value += `<p>【${new Date().toLocaleString()}】\n ${event.data}}</p>`
    }
  }
})
</script>

<template>
  <ClientOnly>
    <n-card title="日志" style="margin-bottom: 16px">
      <p class="h-full w-full flex flex-col overflow-y-scroll space-y-2" v-html="logsHtml" />
    </n-card>
  </ClientOnly>
</template>
