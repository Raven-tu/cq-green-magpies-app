<!--
 * @Author: raventu
 * @Date: 2023-05-21 20:06:47
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-28 17:34:21
 * @FilePath: /cq-green-magpies-app/layouts/blank.vue
 * @Description: 空白布局
-->

<template>
  <main class="main-layout flex">
    <div class="layout-content h-100vh w-100vw flex flex-1 flex-col overflow-hidden">
      <slot />
    </div>
  </main>
</template>
