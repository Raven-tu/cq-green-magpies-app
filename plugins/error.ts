export default defineNuxtPlugin((nuxtApp)=>{
  nuxtApp.hook('app:error',(..._args) => {
    console.log('app:error')
  })
  nuxtApp.hook('vue:error', (..._args) => {
    console.log('app:error')
  })
})
