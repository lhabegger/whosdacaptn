// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    projectId: "",
    clientEmail: "",
    privateKey: "",
    privateKeyId: "",
    public: {
      googleMapsApiKey: "",
    },
  },
  build: {
    transpile: ["vue-google-maps-community-fork", "@googlemaps/markercluster"],
  },
  modules: ["@nuxtjs/tailwindcss"],
  vite: {
    /* options for vite */
    // ssr: true // enable unstable server-side rendering for development (false by default)
    // experimentWarning: false // hide experimental warning message (disabled by default for tests)
    optimizeDeps: {
      include: [
        //"vue-google-maps-community-fork",
        "fast-deep-equal",
      ],
    },
    vue: {
      /* options for vite-plugin-vue2 */
    },
  },
  app: {
    head: {
      title: " Whos da Captn?",
      link: [
        { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
        { rel: "preconnect", href: "https://rsms.me/" },
      ],
      script: [
        {
          src: "https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyDVsaZGmc2szDjt_xDqeoU_rKl5qNbJlOI",
          defer: true,
        },
      ],
    },
  },
  sourcemap: {
    server: true,
    client: true,
  },
});

