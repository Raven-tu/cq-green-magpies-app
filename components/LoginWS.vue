<!--
 * @Author: raventu
 * @Date: 2023-06-26 17:38:51
 * @LastEditors: raventu
 * @LastEditTime: 2023-06-29 18:23:26
 * @FilePath: /cq-green-magpies-app/components/LoginWS.vue
 * @Description: 登录框
-->
<script lang='ts' setup>
const wsPath = ref<string>('')
const passwd = ref<string>('')
const checkBoxVal = ref<string[]>([])
const connectLoading = ref<boolean>(false)

function handleConnect() {
  connectLoading.value = true
  console.log('wsPath', wsPath.value)
  console.log('passwd', passwd.value)
  console.log('checkBoxVal', checkBoxVal.value)
  useFetch()
}
</script>

<template>
  <!-- h-120 w-90  TODO:美化登录 -->
  <div
    class="box-border h-80 w-90 flex flex-col items-center justify-around border-2 rounded-2xl bg-gray-200 p-4 card-shadow"
    dark="bg-gray-700"
  >
    <p class="text-2xl">
      websocket
    </p>
    <n-input v-model:value="wsPath" placeholder="websocket path" round class="!w-250PX">
      <template #prefix>
        <div class="i-carbon-link" />
      </template>
    </n-input>
    <n-input v-model:value="passwd" type="password" show-password-on="click" placeholder="passwd" round class="!w-250PX">
      <template #prefix>
        <div class="i-carbon-locked" />
      </template>
    </n-input>

    <!-- 复选框 -->
    <div>
      <n-checkbox-group v-model:value="checkBoxVal">
        <n-space item-style="display: flex;">
          <n-checkbox value="autoLogin" label="自动登录" />
          <n-checkbox value="savePasswd" label="保存密码" />
        </n-space>
      </n-checkbox-group>
    </div>

    <button class="rounded-xs m-3 w-250PX text-sm btn" @click="handleConnect">
      <span>
        GO
      </span>

      <div class="i-carbon-l" />
    </button>
  </div>
</template>

<style lang='less' scoped>
</style>
