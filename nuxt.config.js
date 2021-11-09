const express = require('express');

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Simple-blog',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'My First web blog!' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // add font from google url
      {rel : 'stylesheet', href : 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600&display=swap'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/styles/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/core-components.js',
    '~plugins/date-filter.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
  ],

  axios:{
    // documented at github nuxt/modules -> axios
    baseURL : process.env.BASE_URL || 'https://nuxt-blog-3c79d-default-rtdb.asia-southeast1.firebasedatabase.app',
    // avoid cors block
    credentials : false,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  env: {
    baseUrl: process.env.BASE_URL || 'https://nuxt-blog-3c79d-default-rtdb.asia-southeast1.firebasedatabase.app',
    fbAPIKey: 'AIzaSyDkhPra6oAWCjaWo-h0fWGeNBMduTKSbig'
  },

  router: {
    extendRoutes(routes, resolve){
      routes.push({
        path: '*',
        component: resolve(__dirname, 'pages/index.vue')
      })
    },
    // middleware log.js
    middleware : 'log'
  },

  transition: {
    // fade => kata awal di class animasi (main.css)
    name: 'fade',
    mode: 'out-in'
  },
  
  serverMiddleware: [express.json(), '~/api']
}
