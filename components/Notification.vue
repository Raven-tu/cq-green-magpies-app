<!--
 * @Author: raventu
 * @Date: 2023-08-02 15:11:57
 * @LastEditors: raventu
 * @LastEditTime: 2023-08-02 16:56:44
 * @FilePath: /cq-green-magpies-app/components/Notification.vue
 * @Description: 消息通知
-->
<script lang="ts">
import { defineComponent, h } from 'vue'
import { useNotification } from 'naive-ui'
import { useNoticeStore } from '~/store/useNoticeStore'

const Notice = defineComponent({
  setup() {
    useNotification()
    useNoticeStore()
  },
  render() {
    return h('dev',
      {
        Style: {
          display: 'none',
        },
      },
    )
  },
})

export default defineComponent({
  components: {
    Notice,
  },
})
</script>

<template>
  <n-notification-provider :max="3">
    <Notice />
  </n-notification-provider>
</template>
