<!--
 * @Author: raventu
 * @Date: 2023-07-04 18:36:37
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-05 13:32:05
 * @FilePath: /cq-green-magpies-app/components/sys/Nav.vue
 * @Description: 系统导航
-->
<script lang='ts' setup>
import Debug from './debug.vue'
</script>

<template>
  <ClientOnly>
    <n-card title="设置" style="margin-bottom: 16px">
      <n-tabs type="line" animated>
        <n-tab-pane name="调试" tab="debug">
          <Debug />
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </ClientOnly>
</template>
