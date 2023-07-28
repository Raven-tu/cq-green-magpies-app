<!--
 * @Author: raventu
 * @Date: 2023-07-25 18:12:45
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-28 17:25:36
 * @FilePath: /cq-green-magpies-app/components/Setup/Account.vue
 * @Description: 账号注册
-->

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type {
  FormInst,
  FormItemInst,
  FormItemRule,
  FormRules,
} from 'naive-ui'
import {
  useMessage,
} from 'naive-ui'

import { userRegister } from '~/api/user'

interface ModelType {
  username: string
  password: string
  reenteredPassword: string
}

export default defineComponent({
  setup() {
    const formRef = ref<FormInst | null>(null)
    const rPasswordFormItemRef = ref<FormItemInst | null>(null)
    const message = useMessage()
    const loading = ref(false)
    const modelRef = ref<ModelType>({
      username: '',
      password: '',
      reenteredPassword: '',
    })
    function validatePasswordStartWith(
      rule: FormItemRule,
      value: string,
    ): boolean {
      return (
        !!modelRef.value.password
        && modelRef.value.password.startsWith(value)
        && modelRef.value.password.length >= value.length
      )
    }
    function validatePasswordSame(rule: FormItemRule, value: string): boolean {
      return value === modelRef.value.password
    }
    const rules: FormRules = {
      username: [
        {
          required: true,
          validator(rule: FormItemRule, value: string) {
            if (!value)
              return new Error('账号名不能为空')
            else if (value.length < 4)
              return new Error('账号名最少4个字符')
            else if (!/^[a-zA-Z0-9_]+$/.test(value))
              return new Error('账号名只能包含字母、数字、下划线')
            return true
          },
          trigger: ['input', 'blur'],
        },
      ],
      password: [
        {
          required: true,
          validator(rule: FormItemRule, value: string) {
            if (!value)
              return new Error('密码不能为空')
            else if (value.length < 8)
              return new Error('密码最少8个字符')
            return true
          },
          trigger: ['input', 'blur'],
        },
      ],
      reenteredPassword: [
        {
          required: true,
          message: '请再次输入密码',
          trigger: ['input', 'blur'],
        },
        {
          validator: validatePasswordStartWith,
          message: '两次密码输入不一致',
          trigger: 'input',
        },
        {
          validator: validatePasswordSame,
          message: '两次密码输入不一致',
          trigger: ['blur', 'password-input'],
        },
      ],
    }
    return {
      formRef,
      rPasswordFormItemRef,
      model: modelRef,
      loading,
      rules,
      handlePasswordInput() {
        if (modelRef.value.reenteredPassword)
          rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
      },
      handleValidateButtonClick(e: MouseEvent) {
        e.preventDefault()
        formRef.value?.validate((errors) => {
          if (!errors) {
            loading.value = true
            userRegister({
              username: modelRef.value.username,
              password: modelRef.value.password,
              admin: true,
            })
              .then((res) => {
                loading.value = false
                if (unref(res.data)?.code === 200) {
                  message.success('注册成功')
                  setTimeout(() => {
                    navigateTo('/', { replace: true })
                  }, 300)
                }
                else { throw new Error(unref(res.data)?.msg) }
              }).catch((err) => {
                console.error(err)
              })
          }
        })
      },
    }
  },
})
</script>

<template>
  <div class="w-640px overflow-hidden rounded-2xl shadow-md" dark="bg-gray-500">
    <n-card size="huge">
      <template #header>
        <div class="flex items-center justify-between">
          <div>
            <div class="text-2xl">
              账号注册
            </div>
            <div class="text-sm text-gray-500">
              管理员账号
            </div>
          </div>
          <div>
            <DarkToggle class="items-self-end text-xl" />
          </div>
        </div>
      </template>

      <n-form ref="formRef" :model="model" :rules="rules">
        <n-form-item path="username" label="账号">
          <n-input v-model:value="model.username" placeholder="输入账号" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input
            v-model:value="model.password" type="password" placeholder="输入密码" @input="handlePasswordInput"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item ref="rPasswordFormItemRef" first path="reenteredPassword" label="重复密码">
          <n-input
            v-model:value="model.reenteredPassword" :disabled="!model.password" type="password"
            placeholder="再次输入密码" @keydown.enter.prevent
          />
        </n-form-item>
        <n-row :gutter="[0, 24]">
          <n-col :span="24">
            <div style="display: flex; justify-content: flex-end">
              <n-button :disabled="model.username === null" round type="primary" :loading="loading" @click="handleValidateButtonClick">
                注册
              </n-button>
            </div>
          </n-col>
        </n-row>
      </n-form>
    </n-card>
  </div>
</template>
