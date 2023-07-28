<!--
 * @Author: raventu
 * @Date: 2023-07-04 18:36:37
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-14 13:04:40
 * @FilePath: /cq-green-magpies-app/components/Sys/Nav.vue
 * @Description: 系统导航
-->
<script lang='ts' setup>
import Debug from './debug.vue'
</script>

<template>
  <ClientOnly>
    <n-card title="设置">
      <n-tabs type="line" animated>
        <n-tab-pane name="调试" tab="debug">
          <Debug />
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </ClientOnly>
</template>
