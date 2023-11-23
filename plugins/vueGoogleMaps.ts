import { defineNuxtPlugin } from '#app'
import  VueGoogleMaps from 'vue-google-maps-community-fork'
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  nuxtApp.vueApp.use(VueGoogleMaps, {
    load: {
      key: config.public.googleMapsApiKey,
    },
  });
})