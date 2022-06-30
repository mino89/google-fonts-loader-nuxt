import { defineNuxtConfig } from 'nuxt'
import GoogleFontsLoaderModule from '..'

export default defineNuxtConfig({
  modules: [
    GoogleFontsLoaderModule
  ],
  googleFontsLoader: {
    addPlugin: false,
    download: true,
    families: {
      Roboto: true
    },
    display: 'swap'

  }
})
