/// <reference types="vitest" />

import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'

// import VueMacros from "unplugin-vue-macros/vite"
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Markdown from 'unplugin-vue-markdown/vite'
import MarkdownItAnchor from 'markdown-it-anchor'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/], // <-- allows Vue to compile Markdown files
    }),
    Markdown({
      headEnabled: true,
      wrapperClasses: 'markdown-body',
      // markdownItUses: [prism],// default options passed to markdown-it
      // see: https://markdown-it.github.io/markdown-it/
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      // Class names for the wrapper div
      // A function providing the Markdown It instance gets the ability to apply custom settings/plugins
      markdownItSetup(md) {
        // for example
        md.use(MarkdownItAnchor)
      },
    }),
    // VueMacros({
    //   defineOptions: false,
    //   defineModels: false,
    //   plugins: {
    //     vue: Vue({
    //       script: {
    //         propsDestructure: true,
    //         defineModel: true,
    //       },
    //     }),
    //   },
    // }),

    // https://github.com/posva/unplugin-vue-router
    VueRouter({ extensions: ['.vue', '.md'] }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
        VueRouterAutoImports,
        {
          // add any other imports you were relying on
          'vue-router/auto': ['useLink'],
        },
      ],
      dts: true,
      dirs: ['./src/composables'],
      vueTemplate: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
    }),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    UnoCSS(),
  ],

  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
  },
})
