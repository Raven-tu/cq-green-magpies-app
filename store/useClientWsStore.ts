/*
 * @Author: raventu
 * @Date: 2023-07-14 09:59:37
 * @LastEditors: raventu
 * @LastEditTime: 2023-08-02 17:59:29
 * @FilePath: /cq-green-magpies-app/store/useClientWsStore.ts
 * @Description: 客户端 ws store
 */
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { UseWebSocketReturn } from '@vueuse/core'
import { useWebSocket } from '@vueuse/core'

export const useClientWsStore = defineStore('clientWsStore', () => {
  const connectFlag = ref(false)
  const host = ref<string>('')
  const port = useAppConfig().wsServerPort
  const wsPath = computed(() => `ws://${host.value}:${port}`)
  const wsQuery = computed(() => {
    const accessToken = useUserStore().getAccessToken()
    return `?accessToken=${accessToken}`
  })
  const clientWs = ref<UseWebSocketReturn<any> >()
  const clientWsInstance = computed(() => unref(unref(clientWs)?.ws))
  const clientWsStatus = computed(() => unref(unref(clientWs)?.status))
  const clientWsData = computed(() => unref(unref(clientWs)?.data))
  const clientWsSend = computed(() => (unref(clientWs)?.send))
  const clientWsOpen = computed(() => (unref(clientWs))?.open)
  const clientWsClose = computed(() => (unref(clientWs)?.close))

  const initClientWs = () => {
    const ws = useWebSocket(wsPath.value + wsQuery.value, {
      onConnected: () => {
        connectFlag.value = true
      },
    })

    clientWs.value = ws
  }

  onMounted(() => {
    const location = useBrowserLocation()
    host.value = location.value.hostname ?? ''
  })

  return {
    wsPath,
    clientWs,
    clientWsInstance,
    connectFlag,
    initClientWs,
    clientWsStatus, //  ws 状态
    clientWsData, //  ws 数据
    clientWsSend, //  ws 发送
    clientWsOpen, //  ws 打开
    clientWsClose, // ws 关闭
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useChatStore, import.meta.hot))
