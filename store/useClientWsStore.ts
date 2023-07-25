/*
 * @Author: raventu
 * @Date: 2023-07-14 09:59:37
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-25 11:04:51
 * @FilePath: /cq-green-magpies-app/store/useClientWsStore.ts
 * @Description: 客户端 ws store
 */
import { acceptHMRUpdate, defineStore } from 'pinia'
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
  const clientWs = ref<ReturnType<typeof useWebSocket> | null>(null)
  const clientWsInstance = computed(() => clientWs.value?.ws)

  const initClientWs = () => {
    const ws = useWebSocket(wsPath.value + wsQuery.value, {
      onConnected: () => {
        connectFlag.value = true
      },
    })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
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
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useChatStore, import.meta.hot))
