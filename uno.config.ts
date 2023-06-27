/*
 * @Author: raventu
 * @Date: 2023-05-21 20:06:47
 * @LastEditors: raventu
 * @LastEditTime: 2023-06-26 17:34:09
 * @FilePath: /cq-green-magpies-app/uno.config.ts
 * @Description:
 */
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
    ['flex-center', 'flex justify-center items-center'],
    [
      'page-base',
      'page-tab-height flex flex-col py-3 flex-1 bg-page_bg box-border',
    ],
    ['absolute-lt', 'absolute left-0 top-0'],
    ['absolute-lb', 'absolute left-0 bottom-0'],
    ['absolute-rt', 'absolute right-0 top-0'],
    ['absolute-rb', 'absolute right-0 bottom-0'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  rules: [
    ['leading-line', { 'line-height': '1.6' }],
    [
      'card-shadow',
      {
        'box-shadow':
          '0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017',
      },
    ],
  ],
  theme: {
    breakpoints: {
      mi: '1400px',
    },
    colors: {
      light_full: '#FFFFFF',
      gary_CCC: '#CCCCCC',
      gary_999: '#999999',
      theme_success: '#36D399', // 成功
      theme_warning: '#FBBD23', // 警告
      theme_error: '#F87272', // 错误
      theme_info: '#3ABFF8', // 信息
      page_bg: '#F2F2F2', // 页面背景
      nav_bg: '#F5F5F5', // 页面背景
      dk_nav_bg: '#1E1E22', // 深色背景
    },
  },
})
