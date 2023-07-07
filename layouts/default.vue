<!--
 * @Author: raventu
 * @Date: 2023-05-21 20:06:47
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-07 09:56:20
 * @FilePath: /cq-green-magpies-app/layouts/default.vue
 * @Description:
-->

<script lang="ts" setup>
import StatusButtonBar from '~/components/Status/ButtonBar.vue'
</script>

<template>
  <main class="main-layout flex">
    <!-- left -->
    <MainNav />

    <!-- right -->
    <div class="layout-content flex flex-1 flex-col">
      <slot />
      <!-- 底部状态条 -->
      <StatusButtonBar />
    </div>

    <!-- <Footer /> -->
  </main>
</template>
