<!--
 * @Author: raventu
 * @Date: 2023-07-07 13:29:35
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-24 16:25:41
 * @FilePath: /cq-green-magpies-app/components/Chat/Nav/Friend.vue
 * @Description: 好友列表
-->
<script lang='ts' setup>
import type { TypeFriendItem, TypeGroupItem } from '@/api/cq'
import { getFriendList, getGroupList } from '@/api/cq'
import { useChatStore } from '~/store/useChatStore'
import { getQQGroupAvatar, getQQUserAvatar } from '~/utils/qq'

const Props = defineProps<{
  filter: string
}>()

const { setActiveChat } = useChatStore()
const showContent = ref<boolean>(false)
const friendList = ref<TypeFriendItem[]>([])
const groupList = ref<TypeGroupItem[]>([])

const contentLength = computed(() => friendList.value.length + groupList.value.length)
const filterFriendList = computed(() => {
  return friendList.value.filter((item) => {
    return [item.remark, item.nickname, `${item.user_id}`].some((value) => {
      return value?.includes(Props.filter)
    })
  })
})
const filterGroupList = computed(() => {
  return groupList.value.filter((item) => {
    return [item.group_name, `${item.group_id}`].some((value) => {
      return value?.includes(Props.filter)
    })
  })
})

function getFriendListFn() {
  return getFriendList().then((res) => {
    const { code, data } = res.data.value ?? { code: 400, data: [] }
    code === 200
      ? friendList.value = data
      : friendList.value = []
  }).catch(() => {
    console.error('获取好友列表失败')
  })
}

function getGroupListFn() {
  return getGroupList().then((res) => {
    const { code, data } = res.data.value ?? { code: 400, data: [] }
    code === 200
      ? groupList.value = data
      : groupList.value = []
  }).catch(() => {
    console.error('获取群组列表失败')
  })
}

onMounted(async () => {
  await getFriendListFn()
  await getGroupListFn()
})
</script>

<template>
  <div class="w-full rounded-2xl space-y-4">
    <div
      class="flex justify-between rounded-2xl px-5 py-2" bg="gray-300 dark:gray-600"
      @click=" showContent = !showContent"
    >
      <span>
        好友列表
      </span>
      <span>
        {{ `(${contentLength})` }}
      </span>
    </div>
    <!-- 对话内容 -->
    <div class="dialog-content overflow-hidden" :class="showContent ? 'h-max' : 'h-0'">
      <div v-if="contentLength === 0" class="empty-content">
        <div class="h-full w-full flex items-center justify-center text-gray-500 dark:text-gray-400">
          <i
            class="i-material-symbols-sentiment-very-dissatisfied-outline-rounded dark:i-material-symbols-sentiment-very-dissatisfied-rounded"
          />
          空列表
        </div>
      </div>
      <!-- 个人 -->
      <div v-for="(item, index) in filterFriendList" :key="index" @click="setActiveChat(item)">
        <div
          class="group flex justify-between rounded-2xl px-5 py-2 space-x-2" transition="all 0.3s ease-in-out"
          hover="bg-gray-300 dark:bg-gray-600"
        >
          <div class="friend-avatar h-15 w-15 overflow-hidden rounded-2xl">
            <img :src="getQQUserAvatar(item.user_id) " alt="">
          </div>
          <div class="flex flex-1 flex-col justify-start">
            <span>
              {{ item.remark }}
            </span>
            <span v-show="item.remark !== item.nickname" class="bg-transparent text-xs text-gray-500">
              {{ item.nickname }}
            </span>
            <span>
              {{ item.user_id }}
            </span>
          </div>
        </div>
      </div>
      <!-- 群组 -->
      <div v-for="(item, index) in filterGroupList" :key="index" @click="setActiveChat(item)">
        <div
          class="group flex justify-between rounded-2xl px-5 py-2 space-x-2" transition="all 0.3s ease-in-out"
          hover="bg-gray-300 dark:bg-gray-600"
        >
          <div class="friend-avatar h-15 w-15 overflow-hidden rounded-2xl">
            <img :src="getQQGroupAvatar(item.group_id) " alt="">
          </div>
          <div class="flex flex-1 flex-col justify-start">
            <span>
              {{ item.group_name }}
            </span>
            <span>
              {{ item.group_id }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
