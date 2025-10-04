import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
    preprocess: vitePreprocess(),

    compilerOptions: {
        css: 'external',
        runes: true,
        dev: true,
    },

    alias: {
        $lib: './src/lib',
        $assets: './src/assets',
        $styles: './src/styles',
        $components: './src/components',
        $data: './src/data',
    },

    typescript: {
        check: false,
    },
}
