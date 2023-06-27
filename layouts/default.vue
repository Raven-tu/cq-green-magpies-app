<!--
 * @Author: raventu
 * @Date: 2023-05-21 20:06:47
 * @LastEditors: raventu
 * @LastEditTime: 2023-06-26 17:46:00
 * @FilePath: /cq-green-magpies-app/layouts/default.vue
 * @Description:
-->
<template>
  <main class="main-layout flex">
    <!-- left -->
    <MainNav />

    <!-- right -->
    <div class="layout-content flex-1">
      <slot />
    </div>

    <!-- <Footer /> -->
  </main>
</template>
