import { defineNuxtPlugin } from '#app'
import  VueGoogleMaps from 'vue-google-maps-community-fork'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGoogleMaps, {
    load: {
      key: "AIzaSyDVsaZGmc2szDjt_xDqeoU_rKl5qNbJlOI",
    },
  })
})