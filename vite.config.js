import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { compression } from 'vite-plugin-compression2'

export default defineConfig(({ mode }) => ({
    plugins: [
        svelte({
            preprocess: {
                // Enable preprocessing for a better development experience
                style: ({ content }) => {
                    return { code: content }
                },
            },
            compilerOptions: {
                // Optimize for production builds
                dev: mode === 'development',
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
            output: {
                manualChunks: {
                    // Core framework chunk
                    svelte: ['svelte'],
                    // Third-party libraries
                    email: ['@emailjs/browser'],
                    // Critical path components
                    critical: [
                        './src/components/Navigation.svelte',
                        './src/components/Hero.svelte',
                        './src/components/LoadingSpinner.svelte',
                    ],
                    // Non-critical components
                    content: [
                        './src/components/Services.svelte',
                        './src/components/About.svelte',
                        './src/components/Skills.svelte',
                        './src/components/Projects.svelte',
                        './src/components/Contact.svelte',
                    ],
                    // UI utilities
                    ui: ['./src/components/Footer.svelte', './src/components/BackToTop.svelte'],
                },
                assetFileNames: assetInfo => {
                    const fileName = assetInfo.names?.[0] || ''
                    const extType = fileName.split('.').pop()?.toLowerCase() || 'asset'

                    if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                        return 'assets/img/[name]-[hash][extname]'
                    }
                    if (/woff2?|eot|ttf|otf/i.test(extType)) {
                        return 'assets/fonts/[name]-[hash][extname]'
                    }
                    if (/css/i.test(extType)) {
                        return 'assets/css/[name]-[hash][extname]'
                    }
                    return `assets/${extType}/[name]-[hash][extname]`
                },
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
            },
        },

        // Build optimization settings
        chunkSizeWarningLimit: 1000,
        minify: 'esbuild',
        reportCompressedSize: true,
        assetsInlineLimit: 2048,
        cssCodeSplit: true,
        sourcemap: false,

        // Target modern browsers for better optimization
        target: 'esnext',
    },

    optimizeDeps: {
        include: ['@emailjs/browser'],
        exclude: ['svelte'], // Svelte is already optimized
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
