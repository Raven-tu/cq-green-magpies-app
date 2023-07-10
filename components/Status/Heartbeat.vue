<!--
 * @Author: raventu
 * @Date: 2023-07-07 09:46:08
 * @LastEditors: raventu 
 * @LastEditTime: 2023-07-10 09:28:47
 * @FilePath: /cq-green-magpies-app/components/Status/Heartbeat.vue
 * @Description: CQ 心跳包 ping
-->
<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { useAppStore } from '~/store/useAppStore'

interface TypeHeartBeatMsg {
  meta_event_type: 'heartbeat'
  time: number
}

const { wsc, connectFlag } = storeToRefs(useAppStore())

const pingNum = ref<number>(-1)
const heartbeatMsg = ref<TypeHeartBeatMsg>({
  meta_event_type: 'heartbeat',
  time: 0,
})

const format = computed(() => pingNum.value >= 0 ? `${pingNum.value}ms` : 'offline')
const statusClass = computed(() => pingNum.value >= 0 ? 'text-green-500' : 'text-red-500')

function setPingNum() {
  const thisTime = new Date().getTime() / 1000
  const heartTime = heartbeatMsg.value.time
  pingNum.value = Number((thisTime - heartTime).toFixed(2))
}
const { pause, resume } = useIntervalFn(setPingNum, 5000)
pause()
watchOnce(connectFlag, () => {
  if (wsc.value) {
    resume()
    wsc.value.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data)
      if (data.meta_event_type === 'heartbeat')
        heartbeatMsg.value = data
    }
  }
})
</script>

<template>
  <div class="bg-nav_bg" dark="bg-dk_nav_bg">
    <n-popover trigger="hover" :delay="200" :duration="200">
      <template #trigger>
        <div
          class="flex-center px-2 py-1"
          hover="bg-light-100 dark:bg-dark-100"
        >
          <i i-material-symbols-ecg-heart :class="statusClass" />
        </div>
      </template>
      <span>
        <span class="text-xs">{{ format }}</span>
      </span>
    </n-popover>
  </div>
</template>
