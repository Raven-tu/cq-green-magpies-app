<!--
 * @Author: raventu
 * @Date: 2023-07-25 17:58:12
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-28 15:46:38
 * @FilePath: /cq-green-magpies-app/pages/setup.vue
 * @Description: 初始引导页
-->
<script lang='ts' setup>
import Account from '~/components/Setup/Account.vue'

definePageMeta({
  layout: 'blank',
})
</script>

<template>
  <div
    class="h-full flex-center"
    light="bg-gray-200"
    dark="bg-gray-800"
  >
    <n-message-provider>
      <Account />
    </n-message-provider>
  </div>
</template>
