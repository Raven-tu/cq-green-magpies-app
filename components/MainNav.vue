<!--
 * @Author: raventu
 * @Date: 2023-06-26 16:07:57
 * @LastEditors: raventu
 * @LastEditTime: 2023-06-26 17:41:53
 * @FilePath: /cq-green-magpies-app/components/MainNav.vue
 * @Description:
-->
<script lang='ts' setup>

</script>

<template>
  <div class="layout-nav bg-nav_bg h-100vh w-20 flex flex-col justify-between p-4" dark="bg-dk_nav_bg">
    <div class="flex flex-col space-y-6">
      <button class="text-4xl !outline-none">
        <div class="i-carbon-home" />
      </button>

      <button class="text-4xl !outline-none">
        <div class="i-carbon-chat-bot" />
      </button>
    </div>

    <DarkToggle class="items-self-end text-4xl" />
  </div>
</template>
