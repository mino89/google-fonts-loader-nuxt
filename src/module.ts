import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin } from '@nuxt/kit'
import { constructURL, isValidURL, download, FontInputOutput } from 'google-fonts-helper'
export interface ModuleOptions {
  addPlugin: boolean
  families: any
  display: string
  download: boolean
  outputDir: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@google-fonts-loader/nuxt',
    configKey: 'googleFontsLoader'
  },
  defaults: {
    families: {},
    download: false,
    display: null,
    addPlugin: true,
    outputDir: null
  },
  setup (options, nuxt) {
    // defining my font object
    options.outputDir = nuxt.options.dir.assets
    const url = constructURL({
      families: options.families,
      display: options.display
    }).toString()

    const isValid = isValidURL(url)
    if (options.download) {
      if (isValid) {
        const downloader = download(url, {
          base64: false,
          overwriting: false,
          outputDir: `${nuxt.options.srcDir}/${options.outputDir}`,
          stylePath: 'fonts.css',
          fontsDir: 'fonts',
          fontsPath: './fonts'
        })

        downloader.hook('download-font:before', (font: FontInputOutput) => {
          console.log(font)
        })

        downloader.hook('download-font:done', (font: FontInputOutput) => {
          console.log(font)
        })

        downloader.execute()
      }
    }

    if (options.addPlugin) {
      const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
      nuxt.options.build.transpile.push(runtimeDir)
      addPlugin(resolve(runtimeDir, 'plugin'))
    }
  }
})
