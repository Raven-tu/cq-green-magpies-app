<!--
 * @Author: raventu
 * @Date: 2023-08-11 11:22:21
 * @LastEditors: raventu
 * @LastEditTime: 2023-08-11 17:21:07
 * @FilePath: /cq-green-magpies-app/components/Chat/Content/CQRender.vue
 * @Description: CQ码渲染
-->
<script lang='tsx' setup>
import type { TypeCQMsgObj } from '~/utils/CQcode'

const Props = defineProps<{
  parseMsg: TypeCQMsgObj[]
}>()

const RenderImg = defineComponent({
  name: 'RenderImg',
  props: {
    msg: {
      type: Object as PropType<TypeCQMsgObj>,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <n-loading-bar-provider>
        <n-image
          class={'rounded-2xl overflow-hidden'}
          lazy={true}
          width='235'
          object-fit='fill'
          src={props.msg.url}
          v-slots={{
            placeholder: () => (
              <div class="h-100PX w-100PX flex-center bg-gray-400">
                {/* loading 动画 旋转 */}
                <n-icon size="40">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity=".5"></path><path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"></animateTransform></path></svg>
                </n-icon>
              </div>
            ),
          }}
        />
      </n-loading-bar-provider>
    )
  },
})

const RenderText = defineComponent({
  name: 'RenderText',
  props: {
    msg: {
      type: Object as PropType<TypeCQMsgObj>,
      required: true,
    },
  },
  setup(props) {
    //  提取 文本中 普通文字 与 完整链接 如 https://www.bilibili.com/video/BV1Yh4y1k72k
    const splitText = () => {
      const text = props.msg.text
      const reg = /(?<link>https?:\/\/[^\s]+)/g
      const result = text.split(reg).map((part) => {
        if (part.match(reg)) {
          return {
            type: 'link',
            value: part,
          }
        }
        return {
          type: 'text',
          value: part,
        }
      })
      return result ?? []
    }

    const msg = splitText()

    return () => (
      <p>
        {msg.map((item, index) => {
          if (item.type === 'text')
            return <span key={index}>{item.value}</span>
          if (item.type === 'link')
            return <a class={'decoration-blue-500 whitespace-pre text-blue-500 dark:text-white opacity-85 overflow-hidden underline decoration-3 underline-offset-5'} target="_blank" href={item.value}> {item.value}</a>
          return ''
        })}
      </p>
    )
  },
})
</script>

<template>
  <div v-for="(item, index) in Props.parseMsg" :key="index" class="cq-render whitespace-pre p-2">
    <RenderImg v-if="item.type === 'image'" :msg="item" />
    <RenderText v-else-if="item.type === 'text'" :msg="item" />
  </div>
</template>
