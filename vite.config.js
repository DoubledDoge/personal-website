import { svelte } from '@sveltejs/vite-plugin-svelte'
import { fileURLToPath, URL } from 'node:url'
import Unfonts from 'unplugin-fonts/vite'
import { defineConfig } from 'vite'
import { compression } from 'vite-plugin-compression2'
import eslint from 'vite-plugin-eslint2'
import stylelint from 'vite-plugin-stylelint'
import preloadPlugin from 'vite-preload/plugin'

export default defineConfig(({ mode }) => ({
    plugins: [
        svelte({
            compilerOptions: {
                dev: mode === 'development',
                css: 'external',
            },
            preprocess:
                mode === 'production'
                    ? {
                          script: ({ content }) => ({
                              code: content
                                  .replace(/\/\*[\s\S]*?\*\//g, '')
                                  .replace(/(?<!['"`])\/\/(?![^'"`]*['"`])[^\r\n]*/g, ''),
                          }),
                          style: ({ content }) => ({
                              code: content.replace(/\/\*[\s\S]*?\*\//g, ''),
                          }),
                      }
                    : undefined,
        }),
        compression({
            algorithms: ['gzip', 'brotli'],
            threshold: 1024,
            deleteOriginalAssets: false,
            exclude: mode === 'development' ? [/.*/] : [],
        }),
        Unfonts({
            fontsource: {
                families: ['Inter Variable'],
            },
        }),
        preloadPlugin(),
        stylelint({
            cache: true,
            fix: true,
        }),
        eslint({
            cache: true,
            fix: true,
        }),
    ],

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            $lib: fileURLToPath(new URL('./src/lib', import.meta.url)),
            $data: fileURLToPath(new URL('./src/data', import.meta.url)),
            $components: fileURLToPath(new URL('./src/components', import.meta.url)),
            $styles: fileURLToPath(new URL('./src/styles', import.meta.url)),
            $assets: fileURLToPath(new URL('./src/assets', import.meta.url)),
        },
    },

    base: '/personal-website/',
    assetsInclude: ['**/*.webp', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.gif'],

    build: {
        rollupOptions: {
            output: {
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',

                manualChunks: {
                    'svelte-core': ['svelte', 'svelte/internal'],
                    emailjs: ['@emailjs/browser'],
                },

                assetFileNames: assetInfo => {
                    const fileName = assetInfo.names?.[0] || ''
                    const extType = fileName.split('.').pop()?.toLowerCase() || 'asset'

                    if (extType === 'svelte') {
                        return 'assets/js/[name]-[hash].js'
                    }

                    if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(extType)) {
                        return 'assets/img/[name]-[hash][extname]'
                    }
                    if (/woff2?|eot|ttf|otf/i.test(extType)) {
                        return 'assets/fonts/[name]-[hash][extname]'
                    }
                    if (/css/i.test(extType)) {
                        return 'assets/css/[name]-[hash][extname]'
                    }
                    return `assets/misc/[name]-[hash][extname]`
                },
            },

            external: [],
            onwarn: (warning, defaultHandler) => {
                if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return
                if (warning.code === 'CIRCULAR_DEPENDENCY') return
                defaultHandler(warning)
            },
        },

        chunkSizeWarningLimit: 1000,
        minify: mode === 'production' ? 'esbuild' : false,
        reportCompressedSize: true,
        assetsInlineLimit: 2048,
        cssCodeSplit: true,
        sourcemap: mode === 'development',
        target: 'esnext',

        ...(mode === 'production' && {
            esbuild: {
                target: 'esnext',
                drop: ['console', 'debugger'],
            },
        }),
    },

    optimizeDeps: {
        include: ['@emailjs/browser'],
        exclude: ['svelte'],
    },

    server: {
        host: true,
        port: 5000,
        strictPort: false,
        open: true,
    },

    preview: {
        host: true,
        port: 3000,
        strictPort: false,
        open: true,
    },
}))
