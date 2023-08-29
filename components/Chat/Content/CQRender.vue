<!--
 * @Author: raventu
 * @Date: 2023-08-11 11:22:21
 * @LastEditors: raventu
 * @LastEditTime: 2023-08-29 17:11:48
 * @FilePath: /cq-green-magpies-app/components/Chat/Content/CQRender.vue
 * @Description: CQ码渲染
-->
<script lang='tsx' setup>
import type { TypeCQMsgObj } from '~/utils/CQcode'

type PartialCQMsgObj = Partial<TypeCQMsgObj>

const Props = defineProps<{
  parseMsg: PartialCQMsgObj[]
}>()

function downloadFile(url: string, fileName: string) {
  useFetch(url, {
    responseType: 'blob',
  }).then((res) => {
    const blob = new Blob([res.data.value as BlobPart], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }).catch((error) => {
    console.error(error)
  })
}

function formatFileSize(size: number) {
  if (size < 1024)
    return `${size}B`
  else if (size < 1024 * 1024)
    return `${(size / 1024).toFixed(2)}KB`
  else if (size < 1024 * 1024 * 1024)
    return `${(size / 1024 / 1024).toFixed(2)}MB`
  else
    return `${(size / 1024 / 1024 / 1024).toFixed(2)}GB`
}

// 渲染图片消息
const RenderImg = defineComponent({
  name: 'RenderImg',
  props: {
    msg: {
      type: Object as PropType<PartialCQMsgObj>,
      required: true,
    },
  },
  setup(props) {
    if (props.msg.type !== 'image')
      return () => <div></div>

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
// 渲染文字消息
const RenderText = defineComponent({
  name: 'RenderText',
  props: {
    msg: {
      type: Object as PropType<PartialCQMsgObj>,
      required: true,
    },
  },
  setup(props) {
    //  提取 文本中 普通文字 与 完整链接 如 https://www.bilibili.com/video/~

    if (props.msg.type !== 'text')
      return () => <div></div>

    const splitText = () => {
      const text = props.msg.text ?? ''
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
// 渲染群文件
const RenderGroupFile = defineComponent({
  name: 'RenderGroupFile',
  props: {
    msg: {
      type: Object as PropType<PartialCQMsgObj>,
      required: true,
    },
  },
  setup(props) {
    if (props.msg.type !== 'file')
      return () => <div></div>

    return () => (
      <div class={'flex items-center cursor-pointer'}
        onClick={() => downloadFile(props.msg?.url ?? '', props.msg?.name ?? '')}>
        {/*  */}
        <div class={'i-material-symbols-files text-7xl '} />
        <div>
          <p>
            {props.msg.name}
          </p>
          <p>
            {formatFileSize(props.msg?.size ?? 0)}
          </p>
        </div>
      </div>
    )
  },
})
</script>

<template>
  <div v-for="(item, index) in Props.parseMsg" :key="index" class="cq-render whitespace-pre p-2">
    <RenderImg v-if="item.type === 'image'" :msg="item" />
    <RenderText v-else-if="item.type === 'text'" :msg="item" />
    <RenderGroupFile v-else-if="item.type === 'file'" :msg="item" />
  </div>
</template>
