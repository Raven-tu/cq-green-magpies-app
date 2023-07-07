<!--
 * @Author: raventu
 * @Date: 2023-07-07 09:45:24
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-07 12:43:58
 * @FilePath: /cq-green-magpies-app/components/Status/ButtonBar.vue
 * @Description: 下方状态条
-->
<script setup>
import Heartbeat from '~/components/Status/Heartbeat.vue'
</script>

<template>
  <div
    class="layout-nav box-border h-30PX w-full flex flex-row items-center justify-end bg-nav_bg px-4 py-1"
    dark="bg-dk_nav_bg"
  >
    <!-- 心跳包检测 -->
    <Heartbeat />
  </div>
</template>
