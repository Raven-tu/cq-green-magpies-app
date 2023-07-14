/*
 * @Author: raventu
 * @Date: 2023-07-14 09:59:37
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-14 11:16:46
 * @FilePath: /cq-green-magpies-app/store/useClientWsStore.ts
 * @Description: 客户端 ws store
 */
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useClientWsStore = defineStore('clientWsStore', () => {
  const connectFlag = ref(false)
  const host = ref<string>('')
  const port = useAppConfig().wsServerPort
  const wsPath = computed(() => `ws://${host.value}:${port}`)
  const clientWs = ref<Ref< ReturnType<typeof useWebSocket> > | null>(null)
  const clientWsInstance = computed(() => clientWs.value?.ws)

  const initClientWs = () => {
    const ws = useWebSocket(wsPath.value, {
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
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useChatStore, import.meta.hot))
