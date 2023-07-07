<!--
 * @Author: raventu
 * @Date: 2023-07-07 09:45:24
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-07 13:22:06
 * @FilePath: /cq-green-magpies-app/components/Status/ButtonBar.vue
 * @Description: 下方状态条
-->
<script setup>
import Heartbeat from '~/components/Status/Heartbeat.vue'
</script>

<template>
  <div
    class="layout-nav box-border h-30PX w-full flex flex-row items-center justify-end px-4 py-1"
    bg="gray-300 dark:gray-800"
  >
    <!-- 心跳包检测 -->
    <Heartbeat />
  </div>
</template>
