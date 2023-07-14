<!--
 * @Author: raventu
 * @Date: 2023-05-21 20:06:47
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-14 11:10:51
 * @FilePath: /cq-green-magpies-app/app.vue
 * @Description: app entry
-->
<script setup lang="ts">
import { darkTheme } from 'naive-ui'

useHead({
  // title: appName,
})
const color = useColorMode()
const theme = computed(() => color.value === 'dark' ? darkTheme : null)
</script>

<template>
  <VitePwaManifest />
  <n-config-provider :theme="theme">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </n-config-provider>
</template>

<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

html.dark {
  background: #222;
  color: white;
}
</style>
