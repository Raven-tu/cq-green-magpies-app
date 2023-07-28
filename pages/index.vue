<!--
 * @Author: raventu
 * @Date: 2023-07-12 10:43:12
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-13 16:19:00
 * @FilePath: /cq-green-magpies-app/pages/index.vue
 * @Description: entry page
-->
<script setup lang="ts">
const online = useOnline()

definePageMeta({
  redirect: '/chat',
})
</script>

<template>
  <div>
    <Suspense>
      <ClientOnly>
        <div v-if="online" />
        <div v-else text-gray:80>
          You're offline
        </div>
      </ClientOnly>
      <template #fallback>
        <div italic op50>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
  </div>
</template>
