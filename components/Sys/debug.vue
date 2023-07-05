<!--
 * @Author: raventu
 * @Date: 2023-07-05 13:29:23
 * @LastEditors: raventu 
 * @LastEditTime: 2023-07-05 19:28:07
 * @FilePath: /cq-green-magpies-app/components/Sys/debug.vue
 * @Description:  系统-调试
-->
<template>
  <ClientOnly>
    <n-card title="日志" style="margin-bottom: 16px">
      <p class="w-full h-70vh space-y-2 overflow-y-scroll flex flex-col jus" v-html="logsHtml" />
    </n-card>
  </ClientOnly>
</template>
<script lang='ts' setup>
import { useAppStore } from '~/store/useAppStore'

const { wsc } = useAppStore()
const logsHtml = ref('')

onMounted(() => {
  if (wsc) {
    wsc.onmessage = ((event: MessageEvent) => {
      logsHtml.value += `<p>【${new Date().toLocaleString()}】\n ${event.data}}</p>`
    })
  }
})

</script>
