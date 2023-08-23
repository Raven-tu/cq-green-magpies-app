<!--
 * @Author: raventu
 * @Date: 2023-07-04 18:36:37
 * @LastEditors: raventu
 * @LastEditTime: 2023-08-22 14:30:43
 * @FilePath: /cq-green-magpies-app/components/Sys/Nav.vue
 * @Description: 系统导航
-->
<script lang='ts' setup>
import Debug from './debug.vue'
import Common from './common.vue'
</script>

<template>
  <ClientOnly>
    <n-card
      title="设置" class="wh-full flex overflow-hidden"
      :content-style="{ overflow: 'hidden' }"
    >
      <n-tabs
        type="line" animated
        class="h-full overflow-hidden"
        :pane-wrapper-style="{ overflowY: 'auto', flex: '1', margin: '15px' }"
      >
        <n-tab-pane name="common" tab="通用">
          <Common />
        </n-tab-pane>
        <n-tab-pane name="debug" tab="实时日志">
          <Debug />
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </ClientOnly>
</template>
