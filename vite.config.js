import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { compression } from 'vite-plugin-compression2'

export default defineConfig(({ mode }) => ({
    plugins: [
        svelte({
            compilerOptions: {
                // Optimize for production builds
                dev: mode === 'development',
                // Ensure CSS is handled properly
                css: 'external',
            },
        }),
        tailwindcss(),
        compression({
            algorithms: ['gzip', 'brotli'],
            threshold: 1024,
            deleteOriginalAssets: false,
            // Only compress in production builds
            exclude: mode === 'development' ? [/.*/] : [],
        }),
    ],

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            $lib: fileURLToPath(new URL('./src/lib', import.meta.url)),
        },
    },

    base: '/personal-website/',

    build: {
        rollupOptions: {
            input: {
                main: fileURLToPath(new URL('./src/main.js', import.meta.url)),
            },

            output: {
                // Force .js extension
                chunkFileNames: chunkInfo => {
                    // Log for debugging
                    console.log('Chunk:', chunkInfo.name, chunkInfo.facadeModuleId)
                    return 'assets/js/[name]-[hash].js'
                },
                entryFileNames: 'assets/js/[name]-[hash].js',

                // Simplified manual chunks
                manualChunks: {
                    // Core framework
                    'svelte-core': ['svelte', 'svelte/internal'],
                    emailjs: ['@emailjs/browser'],
                },

                assetFileNames: assetInfo => {
                    const fileName = assetInfo.names?.[0] || ''
                    const extType = fileName.split('.').pop()?.toLowerCase() || 'asset'

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

            // Cleanup externals and warnings
            external: [],
            onwarn: (warning, defaultHandler) => {
                // Be more permissive with warnings during debugging
                if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return
                if (warning.code === 'CIRCULAR_DEPENDENCY') return
                console.warn('Build warning:', warning.message)
                defaultHandler(warning)
            },
        },

        // Build optimization settings
        chunkSizeWarningLimit: 1000,
        minify: mode === 'production' ? 'esbuild' : false,
        reportCompressedSize: true,
        assetsInlineLimit: 2048,
        cssCodeSplit: true,
        sourcemap: mode === 'development',

        // Target modern browsers
        target: 'esnext',
    },

    optimizeDeps: {
        include: ['@emailjs/browser'],
        exclude: ['svelte'],
    },

    // Development server configuration
    server: {
        host: true,
        port: 5000,
        strictPort: false,
        open: true,
    },

    // Preview server configuration
    preview: {
        host: true,
        port: 3000,
        strictPort: false,
        open: true,
    },
}))
